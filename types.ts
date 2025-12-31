export type RitualState = 
  | 'LANDING'
  | 'DOOR_OPENING'
  | 'INTERSTITIAL_1'
  | 'CHOICE_1'
  | 'INTERSTITIAL_2'
  | 'CHOICE_2'
  | 'INTERSTITIAL_3'
  | 'CHOICE_3'
  | 'INTERSTITIAL_4'
  | 'CHOICE_4'
  | 'REVEAL_ARCHETYPE'
  | 'REVEAL_CARD';

export interface Strain {
  id: string;
  name: string;
  url: string;
  flavor: string;
  terpenes: string[];
  effects: string[];
  scores: {
    energy: number;
    social: number;
    calm: number;
    rest: number;
    fruity: number;
    earthy: number;
  };
  archetype: Archetype;
}

export interface Archetype {
  name: string;
  sigil: { path: string; viewBox: string };
  description: string;
}

export interface UserSelections {
  primary: 'FORTITUDE' | 'MERRIMENT' | 'TRANQUILITY' | 'REST' | null;
  path: 'COURT' | 'ROAD' | 'CLOISTER' | null;
  omen: 'ORCHARD' | 'RELIQUARY' | null;
  seal: 'SWIFT' | 'LATE' | null;
}
