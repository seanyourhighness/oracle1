import React, { useState } from 'react';
import { audio } from '../audio';

interface Option {
  label: string;
  subLabel?: string; 
  value: string;
}

interface ChoiceScreenProps {
  title?: string;
  options: Option[];
  onSelect: (value: any) => void;
}

export const ChoiceScreen: React.FC<ChoiceScreenProps> = ({ title, options, onSelect }) => {
  const [exiting, setExiting] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelect = (value: any, index: number) => {
    if (exiting) return;
    
    audio.playClick(); // Play Click SFX
    
    setSelectedIndex(index);
    setExiting(true);
    
    setTimeout(() => {
      onSelect(value);
    }, 800);
  };

  return (
    <div 
      className={`
        absolute inset-0 z-20 flex flex-col items-center justify-center p-6
        transition-opacity duration-700
        ${exiting ? 'opacity-0 pointer-events-none' : 'opacity-100'}
      `}
    >
      {title && (
        <h2 className="font-serif text-amber-500/50 text-sm tracking-[0.2em] uppercase mb-12">
          {title}
        </h2>
      )}

      <div className="grid grid-cols-1 gap-6 w-full max-w-md">
        {options.map((opt, idx) => (
          <button
            key={opt.value}
            onClick={() => handleSelect(opt.value, idx)}
            disabled={exiting}
            className={`
              group relative py-6 px-4 border border-amber-900/30 bg-slate-900/40
              transition-all duration-500 ease-out
              hover:border-amber-600/50 hover:bg-slate-800/60
              ${selectedIndex === idx ? 'bg-amber-900/20 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : ''}
              ${exiting && selectedIndex !== idx ? 'opacity-0 scale-95' : ''}
            `}
          >
            <span className="font-serif text-xl md:text-2xl text-amber-100 tracking-wide group-hover:text-amber-50 transition-colors">
              {opt.label}
            </span>
            {opt.subLabel && (
              <span className="block mt-2 font-sans text-xs text-amber-500/60 uppercase tracking-widest">
                {opt.subLabel}
              </span>
            )}
            
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-amber-700/0 group-hover:border-amber-500/50 transition-colors duration-500" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-amber-700/0 group-hover:border-amber-500/50 transition-colors duration-500" />
          </button>
        ))}
      </div>
    </div>
  );
};
