import type { GameEvent } from '../core/GameEvents';
import { AssetIds } from '../assets/AssetIds';
import {
  getSoundManifestEntries,
  getSoundManifestEntry,
  type SoundManifestEntry,
} from '../audio/SoundManifest';
import { resolveBrowserAssetUrl } from './BrowserAssetUrl';

type SoundRequestEvent = Extract<GameEvent, { type: 'soundRequested' }>;

export interface BrowserAudioAdapterOptions {
  contextFactory?: () => AudioContext | null;
  fetchArrayBuffer?: (url: string) => Promise<ArrayBuffer>;
}

export class BrowserAudioAdapter {
  private audioContext: AudioContext | null = null;
  private muted = false;
  private bgmUserMuted = false;
  private readonly loadedBuffers = new Map<string, AudioBuffer>();
  private readonly missingSoundIds = new Set<string>();
  private readonly walkLoopsByMonsterId = new Map<string, { source: AudioBufferSourceNode; gain: GainNode }>();
  private readonly walkLoopStartPending = new Set<string>();
  private backgroundLoop: { source: AudioBufferSourceNode; gain: GainNode } | null = null;
  private backgroundMusicStartInFlight = false;

  constructor(private readonly options: BrowserAudioAdapterOptions = {}) {}

  setMuted(muted: boolean): void {
    this.muted = muted;
    if (muted) {
      this.stopTrialWalkLoop();
      this.stopBackgroundMusic();
    } else {
      void this.ensureBackgroundMusicPlaying();
    }
  }

  /** Mutes only the looping background music (SFX still follow {@link setMuted}). */
  setBackgroundMusicMuted(bgmMuted: boolean): void {
    if (this.bgmUserMuted === bgmMuted) {
      return;
    }
    this.bgmUserMuted = bgmMuted;
    if (bgmMuted) {
      this.stopBackgroundMusic();
    } else if (!this.muted) {
      void this.ensureBackgroundMusicPlaying();
    }
  }

  /**
   * One looping Walking.ogg per walking Trial monster (separate nodes so footsteps do not collapse to one mix).
   * Volume is half of manifest defaultVolume.
   */
  syncTrialWalkLoops(activeMonsterIds: readonly string[]): void {
    if (this.muted) {
      this.stopTrialWalkLoop();
      return;
    }

    const desired = new Set(activeMonsterIds.filter((id) => id.length > 0));

    for (const monsterId of [...this.walkLoopsByMonsterId.keys()]) {
      if (!desired.has(monsterId)) {
        this.disposeTrialWalkLoop(monsterId);
      }
    }

    for (const monsterId of [...this.walkLoopStartPending]) {
      if (!desired.has(monsterId)) {
        this.walkLoopStartPending.delete(monsterId);
      }
    }

    if (desired.size === 0) {
      return;
    }

    const entry = getSoundManifestEntry(AssetIds.sounds.enemyWalkLoop);
    const buffer = this.loadedBuffers.get(AssetIds.sounds.enemyWalkLoop);
    if (entry == null || buffer == null) {
      return;
    }

    const missingLoop = [...desired].filter((monsterId) => !this.walkLoopsByMonsterId.has(monsterId));
    if (missingLoop.length === 0) {
      return;
    }

    for (const monsterId of missingLoop) {
      this.walkLoopStartPending.add(monsterId);
    }

    const jobMonsterIds = [...missingLoop];

    void this.resume()
      .then(() => {
        if (this.muted) {
          this.stopTrialWalkLoop();
          return;
        }

        const ctx = this.getContext();
        const buf = this.loadedBuffers.get(AssetIds.sounds.enemyWalkLoop);
        if (ctx == null || buf == null || this.muted) {
          return;
        }

        const baseVolume = clampVolume(entry.defaultVolume * 0.5);

        for (const monsterId of jobMonsterIds) {
          if (!this.walkLoopStartPending.has(monsterId)) {
            continue;
          }

          if (this.walkLoopsByMonsterId.has(monsterId)) {
            this.walkLoopStartPending.delete(monsterId);
            continue;
          }

          const source = ctx.createBufferSource();
          const gain = ctx.createGain();
          source.buffer = buf;
          source.loop = true;
          source.playbackRate.value = walkPlaybackRateJitter(monsterId);
          gain.gain.setValueAtTime(baseVolume, ctx.currentTime);
          source.connect(gain);
          gain.connect(ctx.destination);
          const startWhen = Math.max(ctx.currentTime, 0);
          source.start(startWhen);
          this.walkLoopsByMonsterId.set(monsterId, { source, gain });
          this.walkLoopStartPending.delete(monsterId);
        }
      })
      .catch(() => undefined);
  }

  stopTrialWalkLoop(): void {
    for (const monsterId of [...this.walkLoopsByMonsterId.keys()]) {
      this.disposeTrialWalkLoop(monsterId);
    }
    this.walkLoopStartPending.clear();
  }

  stopBackgroundMusic(): void {
    this.backgroundMusicStartInFlight = false;
    if (this.backgroundLoop == null) {
      return;
    }

    const loop = this.backgroundLoop;
    this.backgroundLoop = null;

    try {
      loop.source.stop();
    } catch {
      // already stopped
    }

    try {
      loop.source.disconnect();
      loop.gain.disconnect();
    } catch {
      // ignore
    }
  }

  private ensureBackgroundMusicPlaying(): void {
    if (this.muted || this.bgmUserMuted || this.backgroundLoop != null || this.backgroundMusicStartInFlight) {
      return;
    }

    const entry = getSoundManifestEntry(AssetIds.sounds.musicBackground);
    const buffer = this.loadedBuffers.get(AssetIds.sounds.musicBackground);
    if (entry == null || buffer == null) {
      return;
    }

    this.backgroundMusicStartInFlight = true;
    void this.resume()
      .then(() => {
        this.backgroundMusicStartInFlight = false;
        if (this.muted || this.bgmUserMuted || this.backgroundLoop != null) {
          return;
        }

        const ctx = this.getContext();
        const buf = this.loadedBuffers.get(AssetIds.sounds.musicBackground);
        if (ctx == null || buf == null || this.muted || this.bgmUserMuted) {
          return;
        }

        const volume = clampVolume(entry.defaultVolume);
        const source = ctx.createBufferSource();
        const gain = ctx.createGain();
        source.buffer = buf;
        source.loop = true;
        source.connect(gain);
        gain.connect(ctx.destination);
        const startWhen = Math.max(ctx.currentTime, 0);
        gain.gain.setValueAtTime(volume, startWhen);
        source.start(startWhen);
        this.backgroundLoop = { source, gain };
      })
      .catch(() => {
        this.backgroundMusicStartInFlight = false;
      });
  }

  private disposeTrialWalkLoop(monsterId: string): void {
    this.walkLoopStartPending.delete(monsterId);
    const loop = this.walkLoopsByMonsterId.get(monsterId);
    if (loop == null) {
      return;
    }

    this.walkLoopsByMonsterId.delete(monsterId);

    try {
      loop.source.stop();
    } catch {
      // already stopped
    }

    try {
      loop.source.disconnect();
      loop.gain.disconnect();
    } catch {
      // ignore
    }
  }

  async preload(entries: readonly SoundManifestEntry[] = getSoundManifestEntries()): Promise<void> {
    await Promise.all(entries.map((entry) => this.loadEntry(entry)));
  }

  async resume(): Promise<void> {
    const context = this.getContext();
    if (context == null || context.state !== 'suspended') {
      return;
    }

    await context.resume().catch(() => undefined);
  }

  async play(event: SoundRequestEvent): Promise<boolean> {
    if (this.muted) {
      return false;
    }

    const entry = getSoundManifestEntry(event.soundId);
    if (entry == null) {
      return false;
    }

    const context = this.getContext();
    if (context == null) {
      return false;
    }

    await this.resume();

    const volume = clampVolume((event.volume ?? entry.defaultVolume) * (event.intensity ?? 1));
    const playbackRate = Math.max(0.25, event.playbackRate ?? 1);
    const delaySec = Math.max(0, event.delaySec ?? 0);
    const startWhen = context.currentTime + delaySec;
    const loadedBuffer = this.loadedBuffers.get(entry.id);

    if (loadedBuffer != null) {
      playBuffer(context, loadedBuffer, volume, playbackRate, startWhen);
      return true;
    }

    return false;
  }

  private async loadEntry(entry: SoundManifestEntry): Promise<void> {
    if (this.loadedBuffers.has(entry.id) || this.missingSoundIds.has(entry.id)) {
      return;
    }

    const context = this.getContext();
    if (context == null) {
      this.missingSoundIds.add(entry.id);
      return;
    }

    try {
      const arrayBuffer = await this.fetchArrayBuffer(resolveBrowserAssetUrl(entry.browserUrl));
      const decoded = await context.decodeAudioData(arrayBuffer.slice(0));
      this.loadedBuffers.set(entry.id, decoded);
    } catch {
      this.missingSoundIds.add(entry.id);
    }
  }

  private async fetchArrayBuffer(url: string): Promise<ArrayBuffer> {
    if (this.options.fetchArrayBuffer != null) {
      return this.options.fetchArrayBuffer(url);
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Audio request failed for ${url}: ${response.status}`);
    }

    return response.arrayBuffer();
  }

  private getContext(): AudioContext | null {
    if (this.audioContext != null) {
      return this.audioContext;
    }

    if (this.options.contextFactory != null) {
      this.audioContext = this.options.contextFactory();
      return this.audioContext;
    }

    const AudioContextCtor = window.AudioContext ?? window.webkitAudioContext;
    if (AudioContextCtor == null) {
      return null;
    }

    this.audioContext = new AudioContextCtor();
    return this.audioContext;
  }
}

function walkPlaybackRateJitter(monsterId: string): number {
  let hash = 2166136261;
  for (let index = 0; index < monsterId.length; index += 1) {
    hash ^= monsterId.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  const unit = (hash >>> 0) / 0xffffffff;
  return 0.96 + unit * 0.08;
}

function playBuffer(
  context: AudioContext,
  buffer: AudioBuffer,
  volume: number,
  playbackRate: number,
  when: number,
): void {
  const source = context.createBufferSource();
  const gain = context.createGain();
  source.buffer = buffer;
  source.playbackRate.value = playbackRate;
  source.connect(gain);
  gain.connect(context.destination);
  const startWhen = Math.max(context.currentTime, when);
  gain.gain.setValueAtTime(volume, startWhen);
  source.start(startWhen);
}

function clampVolume(volume: number): number {
  return Math.max(0, Math.min(1, volume));
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}
