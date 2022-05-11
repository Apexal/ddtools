import * as util from './util';
import * as spell from './spell';




export interface FirestoreDoc {
  ref: any;
  id: any;
}

export interface Campaign extends FirestoreDoc {
  /** Player-facing name of campaign */
  name: string;
  /** Player-facing description of campaign */
  description?: string;
  /** Public URLs to world maps */
  worldMapUrls?: string[];
  /** The id(s) of user(s) running the campaign, i.e. the campaign owners */
  dmUserIds?: string[];
  /** The emails of user(s) currently with pending invites to DM */
  dmInviteEmails?: string[];
  /** List of notes only DMs can access */
  dmNotes?: Note[];
  /** The ids of users participating in the campaign as players */
  playerUserIds?: string[];
  /** The emails of user(s) currently with pending invites to play */
  playerInviteEmails?: string[];
  /** List of notes */
  playerNotes?: Note[];
}

export interface Note {
  /** Creator and owner of note */
  authorUserId: string;
  /** Optional title of note */
  title?: string;
  /** The content of the note in ____ format */
  body: string;
  /** When the note was created */
  timestamp: number;
  /** Who can view the note */
  visibility: "owners" | "all";
}

export interface User {}

export interface Creature {
  /** The name of the creature */
  name: string;
  /** The creature's current size */
  size: typeof util.SIZES[number];
  /** The creature's current speeds */
  speed: {
    /** The basic speed show on the character sheet */
    walking: number;
    climbing: number;
    swimming: number;
    flying: number;
    burrowing: number;
  };
  /** The creature's ability scores */
  abilityScores: {
    [ability in typeof util.ABILITIES[number]]: number;
  };
  /** The creature's hitpoint info */
  hitPoints: {
    current: number;
    temporary: number;
    max: number;
  };
  // hasShield: boolean; // TODO: determine if needed
  /** The creature's current armor class */
  armorClass: number;
  /** The creature's passive perception/wisdom */
  passivePerception: number;
  /** The creature's skill values (taking into consideration proficiencies, expertises, etc.) */
  skills: {
    [skill in typeof util.SKILLS[number]]: number;
  };
  /** List of skills the creature is proficient in */
  skillProficiencies: typeof util.SKILLS[number][];
  /** List of skills the creature has expertise in */
  skillExpertises: typeof util.SKILLS[number][];
  /** The creature's saving throw modifiers (taking into consideration proficiencies, etc.) */
  savingThrows: {
    [ability in typeof util.ABILITIES[number]]: number;
  };
  /** The saving throws the creature is proficient in  */
  savingThrowProficiencies: typeof util.ABILITIES[number][];
  /** The creature's understood languages */
  languages: string[];
  /** The special senses the creature has and their ranges in feet (https://www.dndbeyond.com/sources/basic-rules/monsters#Senses) */
  senses: {
    [sense in typeof util.SENSES[number]]: number;
  };
  /** The creature's current conditions */
  conditions: typeof util.CONDITIONS[number][];
  /** List of conditions the creature is immune to */
  conditionImmunities: typeof util.CONDITIONS[number][];
  /** List of damage types the creature is immune to */
  damageImmunities: typeof util.DAMAGE_TYPES[number][];
  /** List of damage types the creature has resistance to */
  damageResistances: typeof util.DAMAGE_TYPES[number][];
  /** List of damage types the creature is vulnerable to */
  damageVulnerabilities: typeof util.DAMAGE_TYPES[number][];
  /** The creature's tags (https://www.dndbeyond.com/sources/basic-rules/monsters#Tags) */
  tags: string[];
}

export interface Character extends Creature {
  /** The character's optional nickname */
  nickname?: string;
  /** The character's current experience points (if used in campaign) */
  xp: number;
  /** The character's race */
  race: Race;
  /** The character's class(es) */
  classes: Class[];
  /** The character's moral alignment */
  alignment: typeof util.ALIGNMENTS[number];
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
    age: number;
    eyes: string;
    hair: string;
    skin: string;
    height: number;
    weight: number;
    description: string;
  };
  /** The character's personality descriptions */
  personality: {
    traits: string[];
    ideals: string[];
    bonds: string[];
    flaws: string[];
    backstory: string;
  };
  /** The character's feats */
  feats: spell.Feat[];
  weaponProficiencies: string[];
  armorProficiencies: string[];
  toolProficiencies: string[];
  /** The character's current spells */
  spells?: spell.Spell[];
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


export interface Source {
	name: string;
	pages: number[];
}

export interface Race {
  name: string;
  subtype?: string;
  source?: Source;
}

export interface Class {
  name: string;
  spellcastingAbility?: typeof util.ABILITIES[number];
  /** The classes current level */
  level: number;
  source?: Source;
}

export interface Item {
  name: string;
  description: string;
  isMagic: boolean;
  weight: number;
  source?: Source;
}

export interface Weapon extends Item {
  category: string;
  damage: {
    diceRoll: DiceRoll;
    type: typeof util.DAMAGE_TYPES[number];
  };
  range: Range;
  throwRange: Range;
  isEquipped: boolean;
}

export interface DiceRoll {
  /** The dice to roll */
  sides: number;
  /** The number of times to roll the `sides`-sided dice */
  count: number;
  /** The modifier to add onto the roll value */
  modifier: number;
}



export interface Equipment extends Item {
  quantity: number;
}
