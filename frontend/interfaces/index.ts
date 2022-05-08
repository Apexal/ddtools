type AbilityName = "str" | "dex" | "con" | "int" | "wis";
type SkillName =
  | "Acrobatics"
  | "Animal Handling"
  | "Arcana"
  | "Athletics"
  | "Deception"
  | "History"
  | "Insight"
  | "Intimidation"
  | "Investigation"
  | "Medicine"
  | "Nature"
  | "Perception"
  | "Performance"
  | "Persuasion"
  | "Religion"
  | "Sleight of Hand"
  | "Stealth"
  | "Survival";
type SizeName = "tiny" | "small" | "medium" | "large" | "huge" | "gargantuan";
type Alignment =
  | "lawful good"
  | "neutral good"
  | "chaotic good"
  | "lawful neutral"
  | "true neutral"
  | "chaotic neutral"
  | "lawful evil"
  | "neutral evil"
  | "chaotic evil";

export interface Campaign {
  /** Player-facing name of campaign */
  name: string;

  /** Player-facing description of campaign */
  description?: string;

  /** Public URLs to world maps */
  worldMapUrls: string[];

  /** The user(s) running the campaign, i.e. the campaign owners */
  dms: User[];

  /** List of notes only DMs can access */
  dmNotes: Note[];

  /** The users participating in the campaign as players */
  players: User[];

  /** List of notes */
  playerNotes: Note[];
}

export interface Note {
  /** Creator and owner of note */
  userId: string;
  /** Optional title of note */
  title?: string;
  /** The content of the note in ____ format */
  body: string;
  /** When the note was created */
  timestamp: Date;
  /** Who can view the note */
  visibility: "owners" | "all";
}

export interface User {}

export interface Creature {
  name: string;
  size: SizeName;
  speed: number;
  abilityScores: {
    [ability in AbilityName]: number;
  };
  hitPoints: {
    current: number;
    temporary: number;
    max: number;
  };
  armorClass: number;
  skills: {
    [skill in SkillName]: {
      /** Value of skill modifier before any proficiency or expertise is applied */
      rawModifier: number;
      isProficient: boolean;
      hasExpertise: boolean;
    };
  };
  savingThrowProficiencies: AbilityName[];
}

export interface Character extends Creature {
  nickname?: string;
  race: Race;
  level: number;
  alignment: Alignment;
  height?: number;
  weight?: number;
  proficiencyBonus: number;
  hitDice: {
    current: number;
    max: number;
  };
  deathSaves: {
    successes: number;
    failures: number;
  };
  personalityTraits: string[];
  ideals: string[];
  bonds: string[];
  flaws: string[];
}

export interface Race {
  name: string;
  subtype?: string;
}
