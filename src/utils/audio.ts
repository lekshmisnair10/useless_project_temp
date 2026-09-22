class AudioManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isInitialized: boolean = false;
  private currentBarkAudio: HTMLAudioElement | null = null;
  private barkTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    const savedMute = localStorage.getItem('puppyshaadi_muted');
    this.isMuted = savedMute === 'true';
    
    // Auto-attempt playing the opening barking MP3 on first load / reload
    this.setupAutoPlayOnLoad();
  }

  // Play audiopapkin-barking-two-large-dogs-296527.mp3 for only 15 seconds
  public playOpeningBarkFile(volume = 0.75): Promise<void> {
    if (this.isMuted) return Promise.resolve();

    return new Promise((resolve) => {
      try {
        if (!this.currentBarkAudio) {
          this.currentBarkAudio = new Audio('/audiopapkin-barking-two-large-dogs-296527.mp3');
        }

        // Clear existing timer if any
        if (this.barkTimer) {
          clearTimeout(this.barkTimer);
          this.barkTimer = null;
        }

        this.currentBarkAudio.volume = volume;
        this.currentBarkAudio.currentTime = 0;
        
        const playPromise = this.currentBarkAudio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Automatically stop/fade out after strictly 15 seconds
              this.barkTimer = setTimeout(() => {
                if (this.currentBarkAudio && !this.currentBarkAudio.paused) {
                  const audioEl = this.currentBarkAudio;
                  let fadeVol = audioEl.volume;
                  const fadeInterval = setInterval(() => {
                    if (fadeVol > 0.08) {
                      fadeVol -= 0.08;
                      audioEl.volume = Math.max(0, fadeVol);
                    } else {
                      clearInterval(fadeInterval);
                      audioEl.pause();
                      audioEl.currentTime = 0;
                      audioEl.volume = volume; // reset volume for next time
                    }
                  }, 50);
                }
              }, 15000); // exactly 15 seconds

              resolve();
            })
            .catch(() => {
              // Autoplay was prevented by browser policy
              resolve();
            });
        } else {
          resolve();
        }
      } catch {
        resolve();
      }
    });
  }

  public stopBarkAudio() {
    if (this.barkTimer) {
      clearTimeout(this.barkTimer);
      this.barkTimer = null;
    }
    if (this.currentBarkAudio) {
      this.currentBarkAudio.pause();
      this.currentBarkAudio.currentTime = 0;
    }
  }

  private setupAutoPlayOnLoad() {
    if (typeof window === 'undefined') return;

    const tryPlay = () => {
      this.playOpeningBarkFile().catch(() => {});
    };

    // Attempt immediately
    if (document.readyState === 'complete') {
      tryPlay();
    } else {
      window.addEventListener('load', tryPlay, { once: true });
    }

    // Modern browsers require 1 user gesture if autoplay policy is strict
    const onFirstInteraction = () => {
      this.initCtx();
      this.playOpeningBarkFile();
      window.removeEventListener('click', onFirstInteraction);
      window.removeEventListener('keydown', onFirstInteraction);
      window.removeEventListener('touchstart', onFirstInteraction);
    };

    window.addEventListener('click', onFirstInteraction, { once: true });
    window.addEventListener('keydown', onFirstInteraction, { once: true });
    window.addEventListener('touchstart', onFirstInteraction, { once: true });
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isInitialized = true;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    localStorage.setItem('puppyshaadi_muted', String(this.isMuted));
    if (this.currentBarkAudio) {
      this.currentBarkAudio.muted = this.isMuted;
    }
    if (this.isMuted) {
      this.stopBarkAudio();
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public isReady(): boolean {
    return this.isInitialized && this.ctx?.state === 'running';
  }

  // Realistic Bark using noise buffer + pitch swept oscillator
  public playBark(pitch: number = 180, duration: number = 0.22, intensity: number = 0.5) {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // 1. Pitched Body (Formant resonance)
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = 'sawtooth';
      
      osc.frequency.setValueAtTime(pitch * 0.7, now);
      osc.frequency.exponentialRampToValueAtTime(pitch * 1.5, now + 0.04);
      osc.frequency.exponentialRampToValueAtTime(pitch * 0.5, now + duration);

      oscGain.gain.setValueAtTime(0.01, now);
      oscGain.gain.linearRampToValueAtTime(intensity * 0.7, now + 0.03);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.Q.setValueAtTime(4.0, now);

      osc.connect(filter);
      filter.connect(oscGain);
      oscGain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);

      // 2. Breath / Air Puff Noise
      const bufferSize = this.ctx.sampleRate * duration;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(1100, now);
      noiseFilter.Q.setValueAtTime(2.5, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.01, now);
      noiseGain.gain.linearRampToValueAtTime(intensity * 0.4, now + 0.02);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.8);

      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);

      whiteNoise.start(now);
      whiteNoise.stop(now + duration);
    } catch {
      // Audio fallback
    }
  }

  // Double Bark
  public playDoubleBark(pitch: number = 190) {
    if (this.isMuted) return;
    this.playBark(pitch, 0.18, 0.45);
    setTimeout(() => {
      this.playBark(pitch * 1.08, 0.22, 0.5);
    }, 170);
  }

  // Tiny Pomeranian / Shih Tzu Yap
  public playTinyBark() {
    if (this.isMuted) return;
    this.playBark(380, 0.12, 0.35);
  }

  // Dramatic Husky / Cinema Bark
  public playDramaticBark() {
    if (this.isMuted) return;
    this.playOpeningBarkFile(0.85);
  }

  // Overdramatic Malayalam Movie Trailer Sting
  public playCinematicSting() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // Heavy Timpani / Dhol boom
      const boom = this.ctx.createOscillator();
      const boomGain = this.ctx.createGain();
      boom.type = 'triangle';
      boom.frequency.setValueAtTime(160, now);
      boom.frequency.exponentialRampToValueAtTime(38, now + 0.8);
      boomGain.gain.setValueAtTime(0.7, now);
      boomGain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
      boom.connect(boomGain);
      boomGain.connect(this.ctx.destination);
      boom.start(now);
      boom.stop(now + 0.9);

      // Dramatic Suspense Minor Chord
      const freqs = [130.81, 155.56, 196.00, 246.94];
      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const o = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        o.type = idx % 2 === 0 ? 'sawtooth' : 'triangle';
        o.frequency.setValueAtTime(freq, now + 0.05);

        const f = this.ctx.createBiquadFilter();
        f.type = 'lowpass';
        f.frequency.setValueAtTime(300, now);
        f.frequency.exponentialRampToValueAtTime(2400, now + 0.3);
        f.frequency.exponentialRampToValueAtTime(600, now + 1.5);

        g.gain.setValueAtTime(0.01, now);
        g.gain.linearRampToValueAtTime(0.18, now + 0.2);
        g.gain.exponentialRampToValueAtTime(0.001, now + 1.6);

        o.connect(f);
        f.connect(g);
        g.connect(this.ctx.destination);

        o.start(now + 0.05);
        o.stop(now + 1.6);
      });

      // Overlay a sharp bark in the middle for comedy
      setTimeout(() => {
        this.playBark(175, 0.22, 0.5);
      }, 350);
    } catch {
      // ignore
    }
  }

  // Romantic Celesta / Chime
  public playRomanticChime() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, i) => {
        if (!this.ctx) return;
        const now = this.ctx.currentTime + i * 0.12;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.25, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.8);
      });
    } catch {
      // ignore
    }
  }

  // Comedic Rejection Boing
  public playRejectionBoing() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.5);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.5);
    } catch {
      // ignore
    }
  }

  // Match / Shaadi Triumphant Fanfare
  public playMatchSound() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const chords = [
        { freqs: [392.00, 493.88, 587.33], time: 0, dur: 0.25 },
        { freqs: [440.00, 554.37, 659.25], time: 0.22, dur: 0.25 },
        { freqs: [523.25, 659.25, 783.99, 1046.50], time: 0.44, dur: 0.9 },
      ];

      chords.forEach(chord => {
        chord.freqs.forEach(freq => {
          if (!this.ctx) return;
          const now = this.ctx.currentTime + chord.time;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.01, now);
          gain.gain.linearRampToValueAtTime(0.18, now + 0.04);
          gain.gain.exponentialRampToValueAtTime(0.001, now + chord.dur);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now);
          osc.stop(now + chord.dur);
        });
      });
    } catch {
      // ignore
    }
  }

  // Soft Notification Pop
  public playNotificationSound() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.08);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.2);
    } catch {
      // ignore
    }
  }

  // Full Opening Sequence with actual audio file
  public async playOpeningSequence(): Promise<void> {
    this.initCtx();
    if (this.isMuted) return;

    // Play the real recorded dog barking audio file
    await this.playOpeningBarkFile(0.9);

    // Follow with romantic chime
    await new Promise(r => setTimeout(r, 1200));
    this.playRomanticChime();

    // Tiny notification chime
    await new Promise(r => setTimeout(r, 600));
    this.playNotificationSound();
  }

  // Malayalam Parody Voice Dialogue
  public speakMalayalamParody(malayalamText: string, onStart?: () => void, onEnd?: () => void) {
    if (this.isMuted) {
      if (onStart) onStart();
      if (onEnd) setTimeout(onEnd, 2500);
      return;
    }

    this.playCinematicSting();

    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(malayalamText);
        const voices = window.speechSynthesis.getVoices();
        const mlVoice = voices.find(v => v.lang.includes('ml') || v.lang.includes('ML')) 
          || voices.find(v => v.lang.includes('en-IN') || v.lang.includes('hi-IN'))
          || voices[0];

        if (mlVoice) {
          utterance.voice = mlVoice;
        }

        utterance.pitch = 0.88;
        utterance.rate = 0.92;

        utterance.onstart = () => {
          if (onStart) onStart();
        };

        utterance.onend = () => {
          if (onEnd) onEnd();
        };

        utterance.onerror = () => {
          if (onEnd) onEnd();
        };

        setTimeout(() => {
          window.speechSynthesis.speak(utterance);
        }, 320);

      } catch {
        if (onStart) onStart();
        if (onEnd) setTimeout(onEnd, 2500);
      }
    } else {
      if (onStart) onStart();
      if (onEnd) setTimeout(onEnd, 2500);
    }
  }
}

export const audio = new AudioManager();
