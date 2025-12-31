import React, { useEffect, useState } from 'react';

interface InterstitialProps {
  text: string;
  duration?: number; // Total duration including fades
  onComplete: () => void;
  isInitial?: boolean;
}

export const Interstitial: React.FC<InterstitialProps> = ({ 
  text, 
  onComplete,
  isInitial = false
}) => {
  const [phase, setPhase] = useState<'in' | 'hold' | 'out'>('in');
  
  // Timings
  const FADE_IN = 1500;
  const HOLD = isInitial ? 2500 : 2000;
  const FADE_OUT = 1000;

  useEffect(() => {
    // Phase 1: Fade In (Starts immediately via render state 'in', switches to 'hold' after mount tick)
    const holdTimer = setTimeout(() => {
      setPhase('hold');
    }, 50);

    // Phase 2: Switch to Out
    const outTimer = setTimeout(() => {
      setPhase('out');
    }, FADE_IN + HOLD);

    // Phase 3: Complete
    const doneTimer = setTimeout(() => {
      onComplete();
    }, FADE_IN + HOLD + FADE_OUT);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(outTimer);
      clearTimeout(doneTimer);
    };
  }, [FADE_IN, HOLD, FADE_OUT, onComplete]);

  // Dynamic classes for the "Zoom Forward + Focus" effect
  const getAnimationClass = () => {
    switch(phase) {
      case 'in':
        // Start: Far away (small), blurry, transparent, slightly lower
        return 'opacity-0 blur-xl scale-75 translate-y-8';
      case 'hold':
        // Middle: Present (normal size), sharp, opaque, centered
        return 'opacity-100 blur-0 scale-100 translate-y-0';
      case 'out':
        // End: Moved past viewer (large), blurry, transparent
        return 'opacity-0 blur-lg scale-125 -translate-y-8';
      default:
        return '';
    }
  };

  const transitionDuration = phase === 'hold' ? FADE_IN : FADE_OUT;

  return (
    <div 
      className={`
        absolute inset-0 z-30 flex items-center justify-center px-8 overflow-hidden pointer-events-none
        transition-colors duration-[1500ms]
        ${phase === 'in' ? 'bg-slate-950/0' : 'bg-slate-950/50'}
      `}
    >
      <p 
        className={`
          font-serif text-xl md:text-3xl text-center text-amber-50/90 leading-relaxed max-w-2xl
          will-change-transform transform-gpu
          transition-all ease-out
          ${getAnimationClass()}
        `}
        style={{ transitionDuration: `${transitionDuration}ms` }}
      >
        {text}
      </p>
    </div>
  );
};
