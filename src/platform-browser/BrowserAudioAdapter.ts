import type { GameEvent } from '../core/GameEvents';
import {
  getSoundManifestEntries,
  getSoundManifestEntry,
  type FallbackSynthProfile,
  type SoundManifestEntry,
} from '../audio/SoundManifest';

type SoundRequestEvent = Extract<GameEvent, { type: 'soundRequested' }>;

export interface BrowserAudioAdapterOptions {
  contextFactory?: () => AudioContext | null;
  fetchArrayBuffer?: (url: string) => Promise<ArrayBuffer>;
}

export class BrowserAudioAdapter {
  private audioContext: AudioContext | null = null;
  private muted = false;
  private readonly loadedBuffers = new Map<string, AudioBuffer>();
  private readonly missingSoundIds = new Set<string>();

  constructor(private readonly options: BrowserAudioAdapterOptions = {}) {}

  setMuted(muted: boolean): void {
    this.muted = muted;
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
    const loadedBuffer = this.loadedBuffers.get(entry.id);

    if (loadedBuffer != null) {
      playBuffer(context, loadedBuffer, volume, playbackRate);
      return true;
    }

    playSynthFallback(context, entry.fallback, volume, playbackRate);
    return true;
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
      const arrayBuffer = await this.fetchArrayBuffer(entry.browserUrl);
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

function playBuffer(
  context: AudioContext,
  buffer: AudioBuffer,
  volume: number,
  playbackRate: number,
): void {
  const source = context.createBufferSource();
  const gain = context.createGain();
  source.buffer = buffer;
  source.playbackRate.value = playbackRate;
  gain.gain.setValueAtTime(volume, context.currentTime);
  source.connect(gain);
  gain.connect(context.destination);
  source.start();
}

function playSynthFallback(
  context: AudioContext,
  fallback: FallbackSynthProfile,
  volume: number,
  playbackRate: number,
): void {
  if (fallback.waveform === 'noise') {
    playNoiseFallback(context, fallback, volume, playbackRate);
    return;
  }

  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const startTime = context.currentTime;
  const durationSec = (fallback.durationMs / 1000) / playbackRate;
  const attackSec = fallback.attackMs / 1000;
  const releaseSec = fallback.releaseMs / 1000;
  const stopTime = startTime + durationSec;

  oscillator.type = fallback.waveform;
  oscillator.frequency.setValueAtTime(fallback.frequencyHz * playbackRate, startTime);
  shapeGain(gain.gain, startTime, stopTime, attackSec, releaseSec, volume);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(startTime);
  oscillator.stop(stopTime);
}

function playNoiseFallback(
  context: AudioContext,
  fallback: FallbackSynthProfile,
  volume: number,
  playbackRate: number,
): void {
  const sampleRate = context.sampleRate;
  const durationSec = (fallback.durationMs / 1000) / playbackRate;
  const frameCount = Math.max(1, Math.floor(sampleRate * durationSec));
  const buffer = context.createBuffer(1, frameCount, sampleRate);
  const channel = buffer.getChannelData(0);

  for (let index = 0; index < channel.length; index += 1) {
    channel[index] = Math.random() * 2 - 1;
  }

  playBuffer(context, buffer, volume, playbackRate);
}

function shapeGain(
  gain: AudioParam,
  startTime: number,
  stopTime: number,
  attackSec: number,
  releaseSec: number,
  volume: number,
): void {
  gain.setValueAtTime(0.0001, startTime);
  gain.exponentialRampToValueAtTime(Math.max(0.0001, volume), startTime + attackSec);
  gain.setValueAtTime(Math.max(0.0001, volume), Math.max(startTime, stopTime - releaseSec));
  gain.exponentialRampToValueAtTime(0.0001, stopTime);
}

function clampVolume(volume: number): number {
  return Math.max(0, Math.min(1, volume));
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}
