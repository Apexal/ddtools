const ABILITIES = ["str", "dex", "con", "int", "wis", "cha"] as const;

const SKILLS = [
  "acrobatics",
  "animal handling",
  "arcana",
  "athletics",
  "deception",
  "history",
  "insight",
  "intimidation",
  "investigation",
  "medicine",
  "nature",
  "perception",
  "performance",
  "persuasion",
  "religion",
  "sleight of Hand",
  "stealth",
  "survival",
] as const;

const SIZES = [
  "tiny",
  "small",
  "medium",
  "large",
  "huge",
  "gargantuan",
] as const;

const ALIGNMENTS = [
  "lawful good",
  "neutral good",
  "chaotic good",
  "lawful neutral",
  "true neutral",
  "chaotic neutral",
  "lawful evil",
  "neutral evil",
  "chaotic evil",
] as const;

const DAMAGE_TYPES = [
  "piercing",
  "slashing",
  "bludgeoning",
  "acid",
  "cold",
  "fire",
  "force",
  "lightning",
  "necrotic",
  "posion",
  "psychic",
  "radiant",
  "thunder",
] as const;

const CONDITIONS = [
  "blinded",
  "charmed",
  "deafened",
  "exhaustion",
  "frightened",
  "grappled",
  "incapacitated",
  "invisible",
  "necrotic",
  "paralyzed",
  "petrified",
  "poisoned",
  "prone",
  "restrained",
  "stunned",
  "unconscious",
] as const;

const SENSES = [
  "blindsight",
  "darkvision",
  "tremorsense",
  "truesight",
] as const;

const ITEM_TYPES = [
  "$",
  "A",
  "AF",
  "AIR",
  "AT",
  "EM",
  "EXP",
  "FD",
  "G",
  "GS",
  "GV",
  "HA",
  "INS",
  "LA",
  "M",
  "MA",
  "MNT",
  "MR",
  "OTH",
  "P",
  "R",
  "RD",
  "RG",
  "S",
  "SC",
  "SCF",
  "SHP",
  "T",
  "TAH",
  "TG",
  "VEH",
  "WD",
] as const;

const SPELL_COMPONENTS = ["v", "s", "m"] as const;

const RARITIES = [
  "rare",
  "uncommon",
  "very rare",
  "legendary",
  "artifact",
  "common",
  "none",
  "unknown",
  "unknown (magic)",
  "varies",
] as const;

type UserID = string;
type Entries =
  | string[]
  | {
      name: string;
      entries: string[];
      type: "entries";
    }[];

/** Represents a object that will be stored as a document in a Firebase collection. */
export interface FirestoreDoc {
  ref?: any;
  id?: any;
}

/** Adds a field indicating the main owner of the entity */
export interface Owned {
  ownerUserId: UserID;
}

export interface Timestamped {
  createdAt: number;
  updatedAt?: number;
}

/** Adds a field indicating who this entity is shared with besides the owner. */
export interface Shareable {
  sharedWith: {
    permission: "read" | "write";
    target: "players" | "dms" | UserID[];
  }[];
}

export interface Campaign extends FirestoreDoc, Timestamped {
  /** Player-facing name of campaign */
  name: string;
  /** Color for campaign to display in UI */
  color?: string;
  /** Player-facing description of campaign, e.g. backstory */
  description?: string;
  /** Public URLs to world maps */
  worldMapUrls?: string[];
  /** The id(s) of user(s) running the campaign, i.e. the campaign owners */
  dmUserIds?: UserID[];
  /** The names of the users(s) running the campaign. AUTO UPDATED BY FIREBASE FUNCTIONS */
  dmUserNames?: string[];
  /** The emails of user(s) currently with pending invites to DM */
  dmInviteEmails?: string[];
  /** The ids of users participating in the campaign as players */
  playerUserIds?: UserID[];
  /** The emails of user(s) currently with pending invites to play */
  playerInviteEmails?: string[];
  /** Current mode, determines the view displayed to players and DMs */
  mode: "combat" | "out-of-combat";
}

export interface Note extends FirestoreDoc, Owned, Shareable, Timestamped {
  /** Optional title of note */
  title?: string;
  /** The content of the note in ____ format */
  body: string;
}

export interface Creature extends Owned, Shareable, Timestamped, Sourced {
  /** The name of the creature */
  name: string;
  /** The creature's current size */
  size: typeof SIZES[number];
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
    [ability in typeof ABILITIES[number]]: number;
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
    [skill in typeof SKILLS[number]]: number;
  };
  /** List of skills the creature is proficient in */
  skillProficiencies: typeof SKILLS[number][];
  /** List of skills the creature has expertise in */
  skillExpertises: typeof SKILLS[number][];
  /** The creature's saving throw modifiers (taking into consideration proficiencies, etc.) */
  savingThrows: {
    [ability in typeof ABILITIES[number]]: number;
  };
  /** The saving throws the creature is proficient in  */
  savingThrowProficiencies: typeof ABILITIES[number][];
  /** The creature's understood languages */
  languages: string[];
  /** The special senses the creature has and their ranges in feet (https://www.dndbeyond.com/sources/basic-rules/monsters#Senses) */
  senses: {
    [sense in typeof SENSES[number]]: number;
  };
  /** The creature's current conditions */
  conditions: typeof CONDITIONS[number][];
  /** List of conditions the creature is immune to */
  conditionImmunities: typeof CONDITIONS[number][];
  /** List of damage types the creature is immune to */
  damageImmunities: typeof DAMAGE_TYPES[number][];
  /** List of damage types the creature has resistance to */
  damageResistances: typeof DAMAGE_TYPES[number][];
  /** List of damage types the creature is vulnerable to */
  damageVulnerabilities: typeof DAMAGE_TYPES[number][];
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
  alignment: typeof ALIGNMENTS[number];
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
  feats: Feat[];
  weaponProficiencies: string[];
  armorProficiencies: string[];
  toolProficiencies: string[];
  /** The character's current spells */
  spells?: Spell[];
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

export interface Race extends Sourced {
  name: string;
  subtype?: string;
}

export interface Class extends Sourced {
  name: string;
  spellcastingAbility?: typeof ABILITIES[number];
  /** The classes current level */
  level: number;
}

export interface Item extends Owned, Shareable, Timestamped, Sourced {
  name: string;
  rarity: typeof RARITIES[number];
  type?: typeof ITEM_TYPES[number];
  typeAlt?: typeof ITEM_TYPES[number];
  ac?: number;
  isMagic: boolean;
  /** M=melee, R=ranged, G=gear, GV=generic variant, SHP=vehicle, MNT=mount, TAH=tack and harness, HA=heavy armor */
  weight?: number;
  /** Value in copper */
  value?: number;
  entries: Entries;
}

export interface Weapon extends Item {
  weaponCategory: string;
  damage: {
    diceRoll: DiceRoll;
    type: typeof DAMAGE_TYPES[number];
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

export interface Range {
  normal: number;
  long: number;
}

export interface Equipment extends Item {
  quantity: number;
}

export interface Feat extends Sourced {
  name: string;
  description: string;
}

export interface SpellDuration {
  type: "timed" | "instant";
  duration?: {
    type: "round" | "hour" | "day";
    amount: number;
  };
  /** When the spell ends */
  ends?: string[];
  concentration?: boolean;
}

export interface SpellRange {
  type: "point" | "cone" | "cube" | "cylinder" | "line" | "sphere";
  distance: {
    type: "self" | "feet" | "touch";
    amount?: number;
  };
}

export interface Spell extends Sourced {
  name: string;
  /** Description of spell and effects */
  entries: Entries;
  /** Spell level where 0 means cantrip */
  level: number;
  /** How long it takes to cast the spell */
  time: {
    number: number;
    unit: "action" | "bonus" | "reaction" | "minute";
  }[];
  /** How far you can cast the spell */
  range: SpellRange;
  /** Required components to cast the spell */
  components: {
    [component in typeof SPELL_COMPONENTS[number]]:
      | boolean
      | {
          text: string;
          cost: number;
        };
  };
  /** Duration of spell effect */
  duration: SpellDuration[];
  meta?: {
    ritual?: boolean;
  };
  school: string; // TODO: list out schools
  /** The possible damage types the spell inflicts */
  damageInflict: typeof DAMAGE_TYPES[number][];
  /** The possible conditions the spell inflicts */
  conditionInflict: typeof CONDITIONS[number][];
  /** The possible saving throws the target has to roll */
  savingThrow: typeof ABILITIES[number][];
  spellAttack: string[];
  tags: string[];
}

/** Specifies where the information is from, e.g. Players Handbook */
export interface Sourced {
  source?: string;
  page?: number;
}
