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

/** https://www.dndbeyond.com/sources/basic-rules/monsters#Size */
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
  /** The id(s) of user(s) running the campaign, i.e. the campaign owners */
  dmUserIds: string[];
  /** List of notes only DMs can access */
  dmNotes: Note[];
  /** The ids of users participating in the campaign as players */
  playerUserIds: string[];
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
  /** The name of the creature */
  name: string;
  /** The creature's current size */
  size: SizeName;
  /** The creature's current speed */
  speed: number;
  /** The creature's ability scores */
  abilityScores: {
    [ability in AbilityName]: number;
  };
  /** The creature's hitpoint info */
  hitPoints: {
    current: number;
    temporary: number;
    max: number;
  };
  /** The creature's current armor class */
  armorClass: number;
  /** The creature's skill values, proficiencies, and expertises */
  skills: {
    [skill in SkillName]: {
      /** Value of skill modifier before any proficiency or expertise is applied */
      rawModifier: number;
      isProficient: boolean;
      hasExpertise: boolean;
    };
  };
  /** The saving throws the creature is proficient in  */
  savingThrowProficiencies: AbilityName[];
  /** The creature's understood languages */
  languages: string[];
  /** The special senses the creature has (https://www.dndbeyond.com/sources/basic-rules/monsters#Senses) */
  senses: {
    blindsight: boolean;
    darkvision: boolean;
    tremorsense: boolean;
    truesight: boolean;
  };
  /** The creature's tags (https://www.dndbeyond.com/sources/basic-rules/monsters#Tags) */
  tags: string[];
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
  /** Whether the character is currently inspired */
  hasInspiration: boolean;
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
