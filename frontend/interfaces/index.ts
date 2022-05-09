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
  /** The character's optional nickname */
  nickname?: string;
  /** The character's current experience points (if used in campaign) */
  xp?: number;
  /** The character's race */
  race: Race;
  /** The character's class(es) */
  classes: Class[];
  /** The character's current level */
  level: number;
  /** The character's moral alignment */
  alignment: Alignment;
  /** The character's current proficiency bonus */
  proficiencyBonus: number;
  /** The character's hit dice info */
  hitDice: {
    current: number;
    max: number;
  };
  /** The character's current death saves info */
  deathSaves: {
    successes: number;
    failures: number;
  };
  /** The character's physical attribute descriptions */
  physical: {
    age?: number;
    eyes?: string;
    hair?: string;
    skin?: string;
    height?: number;
    weight?: number;
    description?: string;
  };
  /** The character's personality descriptions */
  personality: {
    traits?: string[];
    ideals?: string[];
    bonds?: string[];
    flaws?: string[];
    backstory?: string;
  };
  /** The character's feats */
  feats: Feat[];
  /** The character's weapons (equipped and not) */
  weapons: Weapon[];
  /** The character's currently equipped items */
  equipment: Equipment[];
  /** The character's current loot */
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
