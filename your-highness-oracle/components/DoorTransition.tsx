import React, { useEffect, useState } from 'react';
import { audio } from '../audio';

interface DoorTransitionProps {
  onOpenComplete: () => void;
}

export const DoorTransition: React.FC<DoorTransitionProps> = ({ onOpenComplete }) => {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    // Play sound immediately on mount
    audio.playDoorOpen();

    // Trigger opening animation immediately after mount
    const timer = setTimeout(() => {
      setOpened(true);
    }, 100);

    // Notify parent much earlier so text starts fading in while doors are opening
    const completionTimer = setTimeout(() => {
      onOpenComplete();
    }, 800); 

    return () => {
      clearTimeout(timer);
      clearTimeout(completionTimer);
    };
  }, [onOpenComplete]);

  return (
    <div className="absolute inset-0 z-40 pointer-events-none flex overflow-hidden">
      {/* Left Door */}
      <div 
        className={`
          w-1/2 h-full bg-slate-950 border-r border-amber-900/30
          flex items-center justify-end
          transition-transform duration-[2500ms] ease-in-out
          ${opened ? '-translate-x-full' : 'translate-x-0'}
        `}
      >
         <div className="mr-8 opacity-20 text-amber-900 text-9xl font-serif">☾</div>
      </div>

      {/* Right Door */}
      <div 
        className={`
          w-1/2 h-full bg-slate-950 border-l border-amber-900/30
          flex items-center justify-start
          transition-transform duration-[2500ms] ease-in-out
          ${opened ? 'translate-x-full' : 'translate-x-0'}
        `}
      >
        <div className="ml-8 opacity-20 text-amber-900 text-9xl font-serif">☀</div>
      </div>
      
      {/* Light Leak in Center */}
      <div className={`
        absolute inset-0 flex justify-center
        transition-opacity duration-500
        ${opened ? 'opacity-0' : 'opacity-100'}
      `}>
        <div className="w-[1px] h-full bg-amber-500 shadow-[0_0_50px_10px_rgba(251,191,36,0.3)]" />
      </div>
    </div>
  );
};
