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
type DamageType =
  | "piercing"
  | "slashing"
  | "bludgeoning"
  | "acid"
  | "cold"
  | "fire"
  | "force"
  | "lightning"
  | "necrotic"
  | "posion"
  | "psychic"
  | "radiant"
  | "thunder";

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
  languages: string[];
}

export interface Character extends Creature {
  nickname?: string;
  xp?: number;
  race: Race;
  classes: Class[];
  level: number;
  alignment: Alignment;
  proficiencyBonus: number;
  hitDice: {
    current: number;
    max: number;
  };
  deathSaves: {
    successes: number;
    failures: number;
  };
  physical: {
    age?: number;
    eyes?: string;
    hair?: string;
    skin?: string;
    height?: number;
    weight?: number;
    description?: string;
  };
  personality: {
    traits?: string[];
    ideals?: string[];
    bonds?: string[];
    flaws?: string[];
    backstory?: string;
  };
  feats: Feat[];
  weapons: Weapon[];
  equipment: Equipment[];
  treasure: {
    platinum: number;
    // electrum: number; // Aaron hates electrum
    gold: number;
    silver: number;
    copper: number;
  };
}

export interface Race {
  name: string;
  subtype?: string;
}

export interface Class {
  name: string;
  spellcasting: AbilityName | null;
}

export interface Item {
  name: string;
  description?: string;
  isMagic: boolean;
  weight?: number;
}

export interface Weapon extends Item {
  category: string;
  damage: {
    dice: Dice;
    type: DamageType;
  };
  range: Range;
  throwRange: Range;
  isEquipped: boolean;
}

export interface Dice {
  sides: number;
  count: number;
  modifier: number;
}

export interface Range {
  normal: number;
  long: number;
}

export interface Equipment extends Item {
  quantity: number;
}

export interface Feat {
  name: string;
  description?: string;
}
