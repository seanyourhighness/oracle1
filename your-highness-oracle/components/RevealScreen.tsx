import React, { useEffect, useState } from 'react';
import { Strain } from '../types';
import { audio } from '../audio';

interface RevealScreenProps {
  result: Strain;
  onReset: () => void;
}

export const RevealScreen: React.FC<RevealScreenProps> = ({ result, onReset }) => {
  const [stage, setStage] = useState<'ARCHETYPE' | 'DETAILS' | 'CARD'>('ARCHETYPE');

  useEffect(() => {
    // Play mystical reveal chord on mount
    audio.playReveal();

    // Sequence the reveal
    const timer1 = setTimeout(() => setStage('DETAILS'), 2500);
    const timer2 = setTimeout(() => {
      setStage('CARD');
      audio.playTransition(); // Subtle whoosh when card appears
    }, 5500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-slate-950 overflow-y-auto">
      
      {/* Archetype Reveal */}
      <div className={`
        flex flex-col items-center text-center transition-all duration-1000
        ${stage === 'CARD' ? 'scale-75 -translate-y-8 opacity-60' : 'scale-100 translate-y-0 opacity-100'}
      `}>
        {/* Illuminated Sigil Container */}
        <div className="relative mb-8 w-48 h-48 flex items-center justify-center">
          {/* Glowing Background Ring */}
          <div className="absolute inset-0 rounded-full border border-amber-500/30 bg-amber-900/10 shadow-[0_0_50px_rgba(245,158,11,0.2)] animate-pulse-slow"></div>
          
          {/* Inner Decorative Ring */}
          <div className="absolute inset-2 rounded-full border border-dashed border-amber-600/50"></div>

          {/* SVG Sigil */}
          <svg 
            viewBox={result.archetype.sigil.viewBox} 
            className="w-24 h-24 text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.6)]"
            fill="currentColor"
          >
            <path d={result.archetype.sigil.path} />
          </svg>
        </div>

        <h2 className="font-serif text-2xl md:text-4xl text-amber-100 tracking-[0.15em] uppercase mb-4">
          {result.archetype.name}
        </h2>
        
        {/* Description Fade In */}
        <p className={`
          font-serif text-lg text-amber-200/80 italic max-w-md
          transition-opacity duration-1000 delay-500
          ${stage !== 'ARCHETYPE' ? 'opacity-100' : 'opacity-0 translate-y-4'}
        `}>
          "{result.archetype.description}"
        </p>
      </div>

      {/* Strain Card */}
      <div className={`
        mt-8 w-full max-w-md bg-slate-900 border border-amber-800/50 p-6 md:p-8
        flex flex-col items-center shadow-2xl relative
        transition-all duration-1000 ease-out transform
        ${stage === 'CARD' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'}
      `}>
        <div className="absolute -top-3 bg-slate-950 px-4 text-xs font-serif text-amber-500 tracking-widest uppercase border border-amber-900">
          The Oracle Prescribes
        </div>

        <h3 className="font-serif text-3xl md:text-4xl text-amber-50 mb-2 text-center">
          {result.name}
        </h3>
        
        <p className="font-sans text-sm text-amber-400 uppercase tracking-widest mb-6 border-b border-amber-900/30 pb-4 w-full text-center">
          {result.flavor}
        </p>

        <div className="grid grid-cols-2 gap-8 w-full mb-8 text-center">
          <div>
            <span className="block text-xs text-slate-500 uppercase tracking-wider mb-2">Terpenes</span>
            <ul className="text-sm text-slate-300 font-serif space-y-1">
              {result.terpenes.map(t => <li key={t}>{t}</li>)}
            </ul>
          </div>
          <div>
            <span className="block text-xs text-slate-500 uppercase tracking-wider mb-2">Effects</span>
            <ul className="text-sm text-slate-300 font-serif space-y-1">
              {result.effects.map(e => <li key={e}>{e}</li>)}
            </ul>
          </div>
        </div>

        <a 
          href={result.url} 
          target="_top" 
          rel="noopener noreferrer"
          className="w-full text-center bg-amber-700 hover:bg-amber-600 text-white font-serif tracking-widest py-4 px-6 transition-colors duration-300 shadow-lg mb-4"
          onClick={() => audio.playClick()}
        >
          VIEW STRAIN
        </a>

        <button 
          onClick={() => {
            audio.playClick();
            onReset();
          }}
          className="text-xs text-slate-500 hover:text-amber-500 transition-colors uppercase tracking-widest mt-2"
        >
          Begin Another Ritual
        </button>
      </div>

    </div>
  );
};
