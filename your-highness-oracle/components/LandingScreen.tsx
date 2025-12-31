import React, { useState, useRef, useEffect } from 'react';
import { audio } from '../audio';

interface LandingScreenProps {
  onComplete: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ onComplete }) => {
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const requestRef = useRef<number>(0);
  const startTimeRef = useRef<number | null>(null);

  const DURATION = 2000;

  const animate = (time: number) => {
    if (!startTimeRef.current) startTimeRef.current = time;
    const elapsed = time - startTimeRef.current;
    const p = Math.min(elapsed / DURATION, 1);
    
    setProgress(p);

    if (p < 1) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      onComplete();
      audio.stopHoldSound(); // Stop the rising sound
    }
  };

  const startHold = (e: React.SyntheticEvent) => {
    audio.init(); // Initialize audio context on first interaction
    
    if (e.type === 'touchstart') {
       // e.preventDefault(); 
    }
    setHolding(true);
    audio.startHoldSound(); // Start audio
    
    startTimeRef.current = null;
    requestRef.current = requestAnimationFrame(animate);
  };

  const endHold = () => {
    setHolding(false);
    audio.stopHoldSound(); // Stop audio
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    
    // Drain animation
    const drain = () => {
      setProgress(prev => {
        const next = prev - 0.08; // Fast drain
        if (next <= 0) return 0;
        requestAnimationFrame(drain);
        return next;
      });
    };
    drain();
  };

  // Handle keydown for accessibility (Space/Enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.code === 'Space' || e.code === 'Enter') && !holding) {
        setHolding(true);
        audio.init();
        audio.startHoldSound();
        startTimeRef.current = null;
        requestRef.current = requestAnimationFrame(animate);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        endHold();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [holding]);

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950 text-amber-50 select-none overflow-hidden">
      
      {/* Title */}
      <h1 className="font-serif text-4xl md:text-6xl tracking-widest text-amber-500 mb-12 uppercase opacity-90">
        The Oracle
      </h1>

      {/* Beam Container */}
      <div className="relative w-12 h-64 md:h-80 flex flex-col justify-end items-center mb-12">
        {/* The Beam */}
        <div 
          className="w-1 bg-amber-400 shadow-[0_0_30px_5px_rgba(251,191,36,0.6)] rounded-full transition-all duration-75 ease-linear"
          style={{ 
            height: `${progress * 100}%`,
            width: `${Math.max(4, progress * 16)}px`, // Widen slightly at top
            opacity: 0.5 + (progress * 0.5)
          }}
        />
        
        {/* Base Glow */}
        <div className="absolute bottom-0 w-8 h-1 bg-amber-500 blur-lg" />
      </div>

      {/* Button Area */}
      <div 
        className="relative group cursor-pointer"
        onMouseDown={startHold}
        onMouseUp={endHold}
        onMouseLeave={endHold}
        onTouchStart={startHold}
        onTouchEnd={endHold}
      >
        <button 
          className={`
            relative px-8 py-4 border border-amber-800/50 bg-slate-900/50 
            font-serif text-lg tracking-widest text-amber-100/80 
            transition-all duration-500
            ${holding ? 'scale-95 border-amber-500/80 text-amber-50' : 'hover:border-amber-700'}
          `}
          style={{
            boxShadow: holding ? '0 0 20px rgba(245, 158, 11, 0.2)' : 'none'
          }}
        >
          BEGIN THE RITUAL
        </button>
      </div>

      {/* Instructions */}
      <div className="mt-6 text-center space-y-2 opacity-60 font-sans text-xs md:text-sm tracking-wide text-amber-100/50">
        <p>Press and hold for 2 seconds to begin.</p>
        <p className={`${holding ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
          Release to cancel.
        </p>
      </div>

    </div>
  );
};
