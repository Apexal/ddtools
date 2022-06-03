export const ABILITIES = ["str", "dex", "con", "int", "wis", "cha"] as const;

export const SKILLS = [
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

export const SKILLS_TO_ABILITIES: {
  [skill in typeof SKILLS[number]]: typeof ABILITIES[number];
} = {
  acrobatics: "dex",
  "animal handling": "wis",
  arcana: "int",
  athletics: "str",
  deception: "cha",
  history: "int",
  insight: "wis",
  intimidation: "cha",
  investigation: "int",
  medicine: "wis",
  nature: "int",
  perception: "wis",
  performance: "cha",
  persuasion: "cha",
  religion: "int",
  "sleight of Hand": "dex",
  stealth: "dex",
  survival: "wis",
};

export const SIZES = [
  "tiny",
  "small",
  "medium",
  "large",
  "huge",
  "gargantuan",
] as const;

export const ALIGNMENTS = [
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

export const DAMAGE_TYPES = [
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

export const CONDITIONS = [
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

export const SENSES = [
  "blindsight",
  "darkvision",
  "tremorsense",
  "truesight",
] as const;

export const ITEM_TYPES = [
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

export const SPELL_COMPONENTS = ["v", "s", "m"] as const;

export const RARITIES = [
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
