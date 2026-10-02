/**
 * Romantic Ambient Piano / Chime Synthesizer
 * 
 * Provides a graceful, peaceful procedural piano melody using Web Audio API
 * when no custom MP3 file has been uploaded to public/audio/piano.mp3.
 */

class RomanticPianoSynth {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private currentStep: number = 0;
  private masterGain: GainNode | null = null;

  // Romantic progression in E major / C# minor (gentle, warm, emotional frequencies in Hz)
  private readonly notes = [
    329.63, // E4
    392.00, // G4
    440.00, // A4
    493.88, // B4
    587.33, // D5
    659.25, // E5
    783.99, // G5
    880.00, // A5
  ];

  // A romantic 16-step soothing arpeggio pattern
  private readonly pattern = [
    0, 2, 3, 5,
    1, 3, 4, 6,
    0, 3, 5, 7,
    2, 4, 5, 4,
  ];

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.12, this.ctx.currentTime); // Soft gentle volume
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playTone(freq: number, duration: number = 1.8) {
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const oscHarmonic = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    // Warm triangle + soft sine harmonic simulates an acoustic upright piano / music box
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    oscHarmonic.type = 'sine';
    oscHarmonic.frequency.setValueAtTime(freq * 2, now);

    // Realistic piano-like ADSR: quick punchy attack, slow exponential decay
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.exponentialRampToValueAtTime(0.28, now + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.08, now + 0.35);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(noteGain);
    oscHarmonic.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(now);
    oscHarmonic.start(now);
    osc.stop(now + duration);
    oscHarmonic.stop(now + duration);
  }

  public start() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.currentStep = 0;

    const tick = () => {
      if (!this.isPlaying) return;
      const noteIndex = this.pattern[this.currentStep % this.pattern.length];
      const freq = this.notes[noteIndex];
      this.playTone(freq, 2.2);

      // Play occasional soft low bass root note on downbeats
      if (this.currentStep % 4 === 0) {
        this.playTone(freq * 0.5, 3.0);
      }

      this.currentStep++;
      // Gentle pacing (600ms per note)
      this.timerId = window.setTimeout(tick, 620);
    };

    tick();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public setVolume(volume: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(Math.max(0, Math.min(1, volume * 0.15)), this.ctx.currentTime, 0.1);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  /**
   * Plays a magical, sparkling chime sound effect when stamping / redeeming a love coupon
   */
  public playStampChime() {
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const chimeFrequencies = [587.33, 880, 1174.66, 1760]; // D5, A5, D6, A6 sparkle chime

    chimeFrequencies.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.0001, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.18, now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 1.2);
    });
  }
}

export const pianoSynth = new RomanticPianoSynth();
