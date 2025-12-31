class SoundManager {
  ctx: AudioContext | null = null;
  masterGain: GainNode | null = null;
  
  // Track active nodes
  ambianceNodes: AudioNode[] = [];
  sequencerTimers: number[] = [];
  
  holdOsc: OscillatorNode | null = null;
  holdGain: GainNode | null = null;

  bgBuffer: AudioBuffer | null = null;
  bgSource: AudioBufferSourceNode | null = null;

  isMuted: boolean = false;
  isLoadingMusic: boolean = false;
  
  init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      // If we have buffer but no source running, start it
      if (this.bgBuffer && !this.bgSource) {
        this.startAmbiance();
      }
      return;
    }
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    this.ctx = new AudioContext();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = this.isMuted ? 0 : 0.4;
    this.masterGain.connect(this.ctx.destination);

    this.loadBackgroundMusic();
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.ctx && this.masterGain) {
      const t = this.ctx.currentTime;
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.4, t, 0.5);
    }
    return this.isMuted;
  }

  reset() {
    this.stopAmbiance();
    this.stopHoldSound();
    // Restart ambiance if we have it loaded (reset usually returns to landing)
    if (this.bgBuffer) {
        this.startAmbiance();
    }
  }

  async loadBackgroundMusic() {
    if (!this.ctx || this.isLoadingMusic || this.bgBuffer) return;
    this.isLoadingMusic = true;
    try {
      // Expecting a file named 'oracle_ambiance.mp3' in the project root
      const response = await fetch('oracle_ambiance.mp3');
      if (!response.ok) throw new Error("File not found");
      const arrayBuffer = await response.arrayBuffer();
      this.bgBuffer = await this.ctx.decodeAudioData(arrayBuffer);
      this.startAmbiance();
    } catch (e) {
      console.warn("Background music file 'oracle_ambiance.mp3' not found. Playing silent.");
    } finally {
      this.isLoadingMusic = false;
    }
  }

  private startAmbiance() {
    if (!this.ctx || !this.masterGain || !this.bgBuffer) return;
    this.stopAmbiance();

    const source = this.ctx.createBufferSource();
    source.buffer = this.bgBuffer;
    source.loop = true;
    
    // Fade in
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.6, this.ctx.currentTime + 4);

    source.connect(gain);
    gain.connect(this.masterGain);
    source.start(0);

    this.bgSource = source;
    this.ambianceNodes.push(source, gain);
  }

  private stopAmbiance() {
    this.ambianceNodes.forEach(n => {
      try { n.disconnect(); } catch(e) {}
      if (n instanceof AudioBufferSourceNode || n instanceof OscillatorNode) {
        try { n.stop(); } catch(e) {}
      }
    });
    this.ambianceNodes = [];
    this.bgSource = null;
  }

  // --- SFX ---

  startHoldSound() {
    if (!this.ctx || !this.masterGain) this.init();
    if (!this.ctx || !this.masterGain) return;
    this.stopHoldSound(); // Ensure previous is killed

    const t = this.ctx.currentTime;
    this.holdOsc = this.ctx.createOscillator();
    this.holdGain = this.ctx.createGain();

    // Rising energy (Magic Charge)
    this.holdOsc.type = 'triangle'; 
    this.holdOsc.frequency.setValueAtTime(146.83, t); // D3
    this.holdOsc.frequency.exponentialRampToValueAtTime(293.66, t + 2); // Up an octave to D4

    // Tremolo (Shaking energy)
    const tremolo = this.ctx.createOscillator();
    tremolo.frequency.setValueAtTime(10, t);
    tremolo.frequency.linearRampToValueAtTime(20, t + 2);
    const tremGain = this.ctx.createGain();
    tremGain.gain.value = 50;
    tremolo.connect(tremGain);
    tremGain.connect(this.holdOsc.frequency);

    this.holdGain.gain.setValueAtTime(0, t);
    this.holdGain.gain.linearRampToValueAtTime(0.15, t + 2);

    this.holdOsc.connect(this.holdGain);
    this.holdGain.connect(this.masterGain);

    this.holdOsc.start(t);
    tremolo.start(t);
  }

  stopHoldSound() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    
    if (this.holdGain) {
        try {
            this.holdGain.gain.cancelScheduledValues(t);
            this.holdGain.gain.setTargetAtTime(0, t, 0.1);
            // Actually disconnect after fade
            const tempGain = this.holdGain;
            setTimeout(() => { try { tempGain.disconnect(); } catch(e){} }, 200);
        } catch(e) {}
    }

    if (this.holdOsc) {
        try {
            this.holdOsc.stop(t + 0.2);
        } catch(e) {}
    }
    
    this.holdOsc = null;
    this.holdGain = null;
  }

  playDoorOpen() {
    if (!this.ctx || !this.masterGain) return;
    const t = this.ctx.currentTime;

    // 1. Deep Stone Rumble (The weight)
    const bufferSize = this.ctx.sampleRate * 4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.setValueAtTime(80, t);
    noiseFilter.frequency.linearRampToValueAtTime(30, t + 4); 

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.5, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 4);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.masterGain);
    noise.start(t);

    // 2. The Creak (Rusty Metal / Old Wood)
    const creakOsc = this.ctx.createOscillator();
    creakOsc.type = 'sawtooth';
    creakOsc.frequency.setValueAtTime(100, t);
    creakOsc.frequency.exponentialRampToValueAtTime(40, t + 3.5); // Pitch drops as momentum gains

    const creakFilter = this.ctx.createBiquadFilter();
    creakFilter.type = 'bandpass';
    creakFilter.Q.value = 5;
    creakFilter.frequency.setValueAtTime(200, t);
    creakFilter.frequency.linearRampToValueAtTime(600, t + 2); // Filter sweep

    const creakGain = this.ctx.createGain();
    creakGain.gain.setValueAtTime(0.1, t);
    creakGain.gain.linearRampToValueAtTime(0.05, t + 2);
    creakGain.gain.linearRampToValueAtTime(0, t + 3.5);

    creakOsc.connect(creakFilter);
    creakFilter.connect(creakGain);
    creakGain.connect(this.masterGain);
    creakOsc.start(t);
    creakOsc.stop(t + 4);
  }

  playClick() {
    if (!this.ctx || !this.masterGain) this.init(); 
    if (!this.ctx || !this.masterGain) return;
    const t = this.ctx.currentTime;
    
    // HEAVY STONE THUD (Deeper & Longer)
    const osc = this.ctx.createOscillator();
    osc.type = 'triangle'; // Heavier body than sine
    osc.frequency.setValueAtTime(120, t); // Lower start pitch
    osc.frequency.exponentialRampToValueAtTime(30, t + 0.5); // Long drop
    
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 250; // Muffle it like stone

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.5); // 500ms tail

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.5);
  }

  playTransition() {
    if (!this.ctx || !this.masterGain) return;
    const t = this.ctx.currentTime;

    // Airy Whoosh (Magic Wind) - LOUDER
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.value = 1.5;
    filter.frequency.setValueAtTime(200, t);
    filter.frequency.exponentialRampToValueAtTime(600, t + 1.5);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.35, t + 0.5); 
    gain.gain.linearRampToValueAtTime(0, t + 2);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    noise.start(t);
  }

  playReveal() {
    if (!this.ctx || !this.masterGain) return;
    const t = this.ctx.currentTime;

    // The "Secret Found" Chord (D Minor 9)
    const freqs = [146.83, 220.00, 261.63, 349.23, 587.33]; // D3, A3, C4, F4, D5
    
    freqs.forEach((f, i) => {
      const osc = this.ctx!.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = f;
      
      const gain = this.ctx!.createGain();
      gain.gain.setValueAtTime(0, t);
      // Arpeggiated entry
      gain.gain.linearRampToValueAtTime(0.08, t + 0.1 + (i * 0.05)); 
      gain.gain.exponentialRampToValueAtTime(0.001, t + 6.0); 
      
      osc.connect(gain);
      gain.connect(this.masterGain!);
      osc.start(t);
      osc.stop(t + 6);
    });
  }
}

export const audio = new SoundManager();