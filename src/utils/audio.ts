/**
 * Web Audio API synthesizer for realistic electric hypercar sound
 * Uses an oscillator and filter modulated by scroll velocity.
 * Purely client-side and opt-in.
 */

class HypercarAudioEngine {
  private ctx: AudioContext | null = null;
  private osc: OscillatorNode | null = null;
  private subOsc: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private isMuted: boolean = true;
  private baseFreq: number = 55; // Deep rumble

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);

      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(250, this.ctx.currentTime);
      this.filter.Q.setValueAtTime(3, this.ctx.currentTime);

      // Primary turbine oscillator (sawtooth for electric motor growl)
      this.osc = this.ctx.createOscillator();
      this.osc.type = 'sawtooth';
      this.osc.frequency.setValueAtTime(this.baseFreq, this.ctx.currentTime);

      // Sub-bass oscillator
      this.subOsc = this.ctx.createOscillator();
      this.subOsc.type = 'sine';
      this.subOsc.frequency.setValueAtTime(this.baseFreq / 2, this.ctx.currentTime);

      this.osc.connect(this.filter);
      this.subOsc.connect(this.filter);
      this.filter.connect(this.gainNode);
      this.gainNode.connect(this.ctx.destination);

      this.osc.start();
      this.subOsc.start();
    } catch {
      // AudioContext unavailable or restricted
    }
  }

  public toggleMute(): boolean {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;

    if (this.gainNode && this.ctx) {
      const targetGain = this.isMuted ? 0 : 0.08;
      this.gainNode.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.1);
    }

    return !this.isMuted;
  }

  public updateSpeed(speedKmh: number, velocityDelta: number) {
    if (this.isMuted || !this.ctx || !this.osc || !this.subOsc || !this.filter || !this.gainNode) return;

    const normalized = Math.min(speedKmh / 420, 1);
    const targetFreq = this.baseFreq + normalized * 320 + Math.abs(velocityDelta) * 20;
    const filterFreq = 200 + normalized * 1800;

    this.osc.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.05);
    this.subOsc.frequency.setTargetAtTime(targetFreq / 2, this.ctx.currentTime, 0.05);
    this.filter.frequency.setTargetAtTime(filterFreq, this.ctx.currentTime, 0.05);

    // Dynamic volume bump on active acceleration
    const dynamicVolume = Math.min(0.08 + Math.abs(velocityDelta) * 0.04, 0.15);
    this.gainNode.gain.setTargetAtTime(dynamicVolume, this.ctx.currentTime, 0.08);
  }

  public getMutedStatus(): boolean {
    return this.isMuted;
  }
}

export const audioEngine = new HypercarAudioEngine();
