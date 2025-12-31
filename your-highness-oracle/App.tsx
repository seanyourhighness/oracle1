import React, { useState, useCallback, useEffect } from 'react';
import { RitualState, UserSelections, Strain } from './types';
import { STRAINS, calculateOutcome, getRandomNarration } from './data';
import { LandingScreen } from './components/LandingScreen';
import { DoorTransition } from './components/DoorTransition';
import { Interstitial } from './components/Interstitial';
import { ChoiceScreen } from './components/ChoiceScreen';
import { RevealScreen } from './components/RevealScreen';
import { audio } from './audio';

export default function App() {
  const [state, setState] = useState<RitualState>('LANDING');
  const [selections, setSelections] = useState<UserSelections>({
    primary: null,
    path: null,
    omen: null,
    seal: null
  });
  const [outcome, setOutcome] = useState<Strain | null>(null);
  const [currentNarration, setCurrentNarration] = useState("");
  const [isMuted, setIsMuted] = useState(false);

  // Helper to advance state with a narration
  const advanceWithNarration = (nextState: RitualState, specificText?: string) => {
    audio.playTransition();
    setCurrentNarration(specificText || getRandomNarration());
    setState(nextState);
  };

  // State Machine Handlers
  const handleHoldComplete = useCallback(() => {
    setState('DOOR_OPENING');
  }, []);

  const handleDoorOpened = useCallback(() => {
    setCurrentNarration("Step forward. The veil yields to steady hands.");
    audio.playTransition(); // Added audio trigger for text appearance
    setState('INTERSTITIAL_1');
  }, []);

  const handleInterstitialComplete = useCallback(() => {
    setState(prev => {
      switch (prev) {
        case 'INTERSTITIAL_1': return 'CHOICE_1';
        case 'INTERSTITIAL_2': return 'CHOICE_2';
        case 'INTERSTITIAL_3': return 'CHOICE_3';
        case 'INTERSTITIAL_4': return 'CHOICE_4';
        default: return prev;
      }
    });
  }, []);

  const handleChoice1 = (val: 'FORTITUDE' | 'MERRIMENT' | 'TRANQUILITY' | 'REST') => {
    setSelections(prev => ({ ...prev, primary: val }));
    advanceWithNarration('INTERSTITIAL_2');
  };

  const handleChoice2 = (val: 'COURT' | 'ROAD' | 'CLOISTER') => {
    setSelections(prev => ({ ...prev, path: val }));
    advanceWithNarration('INTERSTITIAL_3');
  };

  const handleChoice3 = (val: 'ORCHARD' | 'RELIQUARY') => {
    setSelections(prev => ({ ...prev, omen: val }));
    advanceWithNarration('INTERSTITIAL_4');
  };

  const handleChoice4 = (val: 'SWIFT' | 'LATE') => {
    const finalSelections = { ...selections, seal: val };
    setSelections(finalSelections);
    const result = calculateOutcome(finalSelections);
    setOutcome(result);
    audio.playTransition();
    setState('REVEAL_ARCHETYPE');
  };

  const handleReset = () => {
    audio.reset(); // Stop all music
    setSelections({ primary: null, path: null, omen: null, seal: null });
    setOutcome(null);
    setState('LANDING');
    localStorage.clear();
  };

  const toggleMute = () => {
    const muted = audio.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="relative w-full h-[100dvh] bg-slate-950 overflow-hidden font-sans text-amber-50">
      
      {/* Background Ambience / Haze Layer */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
         <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/40 via-slate-950 to-slate-950" />
      </div>

      {/* LANDING */}
      {state === 'LANDING' && (
        <LandingScreen onComplete={handleHoldComplete} />
      )}

      {/* DOOR TRANSITION */}
      {(state === 'DOOR_OPENING' || state === 'INTERSTITIAL_1') && (
        <DoorTransition onOpenComplete={handleDoorOpened} />
      )}

      {/* INTERSTITIALS */}
      {(state.startsWith('INTERSTITIAL')) && (
        <Interstitial 
          text={currentNarration} 
          onComplete={handleInterstitialComplete}
          isInitial={state === 'INTERSTITIAL_1'}
        />
      )}

      {/* CHOICE 1 */}
      {state === 'CHOICE_1' && (
        <ChoiceScreen 
          title="What do you seek?"
          options={[
            { label: 'Fortitude', value: 'FORTITUDE' },
            { label: 'Merriment', value: 'MERRIMENT' },
            { label: 'Tranquility', value: 'TRANQUILITY' },
            { label: 'Rest', value: 'REST' },
          ]}
          onSelect={handleChoice1}
        />
      )}

      {/* CHOICE 2 */}
      {state === 'CHOICE_2' && (
        <ChoiceScreen 
          title="Where does your spirit wander?"
          options={[
            { label: 'The Court', value: 'COURT' },
            { label: 'The Road', value: 'ROAD' },
            { label: 'The Cloister', value: 'CLOISTER' },
          ]}
          onSelect={handleChoice2}
        />
      )}

      {/* CHOICE 3 */}
      {state === 'CHOICE_3' && (
        <ChoiceScreen 
          title="Which omen calls to you?"
          options={[
            { label: 'Sunlit Orchard', value: 'ORCHARD' },
            { label: 'Midnight Reliquary', value: 'RELIQUARY' },
          ]}
          onSelect={handleChoice3}
        />
      )}

      {/* CHOICE 4 */}
      {state === 'CHOICE_4' && (
        <ChoiceScreen 
          title="When shall the oath be sealed?"
          options={[
            { label: 'The Swift Hour', value: 'SWIFT' },
            { label: 'The Late Hour', value: 'LATE' },
          ]}
          onSelect={handleChoice4}
        />
      )}

      {/* REVEAL */}
      {(state === 'REVEAL_ARCHETYPE' || state === 'REVEAL_CARD') && outcome && (
        <RevealScreen result={outcome} onReset={handleReset} />
      )}

      {/* Mute Button */}
      <button 
        onClick={toggleMute}
        className="absolute bottom-6 right-6 z-50 p-3 rounded-full bg-slate-900/50 border border-amber-900/30 text-amber-500/50 hover:text-amber-500 hover:border-amber-500 transition-all duration-300"
        aria-label="Toggle Sound"
      >
        {isMuted ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
             <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        )}
      </button>

    </div>
  );
}
