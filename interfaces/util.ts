
/* The basic stats for characters/creatures */
export const ABILITIES = ["str", "dex", "con", "int", "wis", "cha"] as const;

/* Skills
 - Each associated ability is marked as a comment next to its corresponding skill
*/
export const SKILLS = [
  "acrobatics",         // DEX
  "animal handling",    // WIS
  "arcana",             // INT
  "athletics",          // STR
  "deception",          // CHR
  "history",            // INT
  "insight",            // WIS
  "intimidation",       // CHR
  "investigation",      // INT
  "medicine",           // WIS
  "nature",             // INT
  "perception",         // WIS
  "performance",        // CHR
  "persuasion",         // CHR
  "religion",           // INT
  "sleight of Hand",    // DEX
  "stealth",            // DEX
  "survival",           // WIS
] as const;


/* Types of damage that can be inflicted */
export const DAMAGE_TYPES = [
    "piercing",         // Sharp object (e.g, spear or arrow)
    "slashing",         // Cut or gash (e.g, blades)
    "bludgeoning",      // Blunt damage (e.g, club or mace)
    "acid",             // Corrosive damage, causes burning and stinging, sometimes burns through materials
    "cold",             // Frigid pain/numbness caused by subzero temperatures
    "fire",             // Heat damage from exposure to high temperatures
    "force",            // Magic energy, moves at high velocity, pushes targets away
    "lightning",        // Damage from high voltage of electricity
    "necrotic",         // Damage to life force, involves death/decay/corruption
    "poison",           // Toxic damage from poisonous/venomous substances entering the body
    "psychic",          // Damage dealt to mind through telepathic abilities
    "radiant",          // Holy damage, usually related to a god or celestial object
    "thunder",          // Percussive noise, loud enough to cause damage
] as const;

/* Status effects that can be inflicted */
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

/* Types of sights that a creature may have */
export const SENSES = [
    "blindsight",
    "darkvision",
    "tremorsense",
    "truesight",
] as const;

/* 
Resistance, Vulnerability, and Immunity for the target of an attack
 - Dictionary of the form {interaction, modifier}
 - The damage of the attack is multiplied by the modifier
*/
export const DAMAGE_INTERACTIONS = {
    "resistance": 0.5,
    "vulnerability": 2,
    "immunity": 0
}

/* Alignments for characters and creatures 
 - Determines behavior and moral compass
*/
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


/* Sizes for characters and creatures
Tiny:        2.5 x 2.5ft approx. space, 1d4 hit die,   2.5 avg HP/die
Small:       5 x 5ft approx. space,     1d6 hit die,   3.5 avg HP/die
Medium:      5 x 5ft approx. space,     1d8 hit die,   4.5 avg HP/die
Large:       10 x 10ft approx. space,   1d10 hit die,  5.5 avg HP/die
Huge:        15 x 15ft approx. space,   1d12 hit die,  6.5 avg HP/die
Gargantuan:  20 x 20ft approx. space,   1d20 hit die,  10.5 avg HP/die
*/
export const SIZES = [
    "tiny",
    "small",
    "medium",
    "large",
    "huge",
    "gargantuan",
] as const;


/* The effective range of an action 
 - 0 to normal range: standard attack
 - normal range to long range: attack with disadvantage
 - Cannot attack beyond long range
*/
export interface Range {
    normal: number;
    long: number;
  }