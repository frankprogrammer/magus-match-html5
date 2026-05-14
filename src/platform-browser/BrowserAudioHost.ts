import type { GameEvent } from '../core/GameEvents';
import type { AudioState } from '../presentation/AudioState';
import {
  getSoundManifestEntriesForBrowserPreload,
  type SoundManifestEntry,
} from '../audio/SoundManifest';

type SoundRequestEvent = Extract<GameEvent, { type: 'soundRequested' }>;

interface BrowserAudio {
  setMuted(muted: boolean): void;
  setBackgroundMusicMuted(bgmMuted: boolean): void;
  preload(entries?: readonly SoundManifestEntry[]): Promise<void>;
  resume(): Promise<void>;
  play(event: SoundRequestEvent): Promise<boolean>;
  syncTrialWalkLoops(activeMonsterIds: readonly string[]): void;
  stopTrialWalkLoop(): void;
  stopBackgroundMusic(): void;
}

export class BrowserAudioHost {
  private audio: BrowserAudio | null = null;
  private audioPreloadStarted = false;
  private unlockRequested = false;

  constructor(
    private readonly enabled = true,
    private readonly preloadEntries: readonly SoundManifestEntry[] = getSoundManifestEntriesForBrowserPreload(),
  ) {
    if (!this.enabled) {
      return;
    }

    void import('./BrowserAudioAdapter').then(({ BrowserAudioAdapter }) => {
      this.audio = new BrowserAudioAdapter();
      if (this.unlockRequested) {
        this.unlock();
      }
    });
  }

  get isEnabled(): boolean {
    return this.enabled;
  }

  unlock(): void {
    this.unlockRequested = true;
    if (!this.enabled || this.audio == null) {
      return;
    }

    void this.audio.resume();
    if (this.audioPreloadStarted) {
      return;
    }

    this.audioPreloadStarted = true;
    void this.audio.preload(this.preloadEntries);
  }

  syncState(state: AudioState): void {
    if (!this.enabled || this.audio == null) {
      return;
    }

    this.audio.setMuted(state.muted);
    this.audio.setBackgroundMusicMuted(state.bgmMuted);
    this.audio.syncTrialWalkLoops(state.trialWalkingMonsterIds);
  }

  handleEvent(event: GameEvent): void {
    if (event.type !== 'soundRequested' || !this.enabled || this.audio == null) {
      return;
    }

    void this.audio.play(event);
  }

  dispose(): void {
    this.audio?.stopTrialWalkLoop();
    this.audio?.stopBackgroundMusic();
  }
}
