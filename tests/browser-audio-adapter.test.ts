import { describe, expect, it } from 'vitest';
import { AssetIds } from '../src/assets/AssetIds';
import { BrowserAudioAdapter } from '../src/platform-browser/BrowserAudioAdapter';

describe('BrowserAudioAdapter', () => {
  it('ignores unknown sound ids without throwing', async () => {
    const adapter = new BrowserAudioAdapter({ contextFactory: () => fakeAudioContext() });

    await expect(
      adapter.play({ type: 'soundRequested', soundId: 'sound.unknown' }),
    ).resolves.toBe(false);
  });

  it('suppresses playback while muted', async () => {
    const context = fakeAudioContext();
    const adapter = new BrowserAudioAdapter({ contextFactory: () => context });
    adapter.setMuted(true);

    await expect(
      adapter.play({ type: 'soundRequested', soundId: AssetIds.sounds.tileMatch }),
    ).resolves.toBe(false);
    expect(context.oscillatorStarts).toBe(0);
  });

  it('uses synth fallback when no audio file is loaded', async () => {
    const context = fakeAudioContext();
    const adapter = new BrowserAudioAdapter({ contextFactory: () => context });

    await expect(
      adapter.play({ type: 'soundRequested', soundId: AssetIds.sounds.tileMatch }),
    ).resolves.toBe(true);
    expect(context.oscillatorStarts).toBe(1);
  });
});

function fakeAudioContext(): AudioContext & { oscillatorStarts: number } {
  const context = {
    currentTime: 0,
    sampleRate: 44_100,
    state: 'running',
    oscillatorStarts: 0,
    destination: {},
    resume: () => Promise.resolve(),
    decodeAudioData: async (buffer: ArrayBuffer) => buffer as unknown as AudioBuffer,
    createBuffer: (channels: number, length: number) => ({
      getChannelData: () => new Float32Array(length),
      numberOfChannels: channels,
      length,
      duration: length / 44_100,
      sampleRate: 44_100,
    }),
    createBufferSource: () => ({
      buffer: null,
      playbackRate: { value: 1 },
      connect: () => undefined,
      start: () => {
        context.oscillatorStarts += 1;
      },
      stop: () => undefined,
    }),
    createGain: () => ({
      gain: {
        setValueAtTime: () => undefined,
        exponentialRampToValueAtTime: () => undefined,
      },
      connect: () => undefined,
    }),
    createOscillator: () => ({
      type: 'sine',
      frequency: { setValueAtTime: () => undefined },
      connect: () => undefined,
      start: () => {
        context.oscillatorStarts += 1;
      },
      stop: () => undefined,
    }),
  };

  return context as unknown as AudioContext & { oscillatorStarts: number };
}
