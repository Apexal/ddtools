import * as util from './util';


export interface Feat {
	name: string;
	description: string;
	source?: Source;
}
/* Components required to cast spell
Verbal (V):   Chanting of words, any non-silenced characters can cast
Somatic (S):  Gestures, must have a free hand to cast
Material (M): Required objects. Can use Component Pouch or 
			   Spellcasting focus as replacement. Must have free hand 
			   to access materials.
*/
const SPELL_COMPONENTS = ["v", "s", "m"] as const;


/* Spell Duration 
 - The length of time that the spell persists.
 - The effects of some spells persist until dispelled or destroyed.
*/
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

/* Spell Range 
 - Some spells have an effective range, and cannot be cast
    too far away or too close to the target.
*/
export interface SpellRange {
	type: "point" | "cone" | "cube" | "cylinder" | "line" | "sphere";
	distance: {
	  type: "self" | "feet" | "touch";
	  amount?: number;
	};
}
/* Magic Schools
 - Spells are grouped into eight schools, which help describe their function
*/
const MAGIC_SCHOOL = [
    "abjuration",
    "conjuration",
    "divination",
    "enchantment",
    "evocation",
    "illusion",
    "necromancy",
    "transmutation"
]


/* Spell */
export interface Spell {
	name: string;
	/** Description of spell and effects */
	entries: string[];
	/* How powerful a spell is, from 0 (cantrip) to 9 */
	level: number;
	/* How many spell slots the spell requires 
	 - Dictionary of form {slot level, # slots required}
	 - Spells have a minimum slot requirement
	 - Some spells can be cast at higher levels for bonus effect(s)
	*/
	spellSlots: {
		1: number;
		2: number,
		3: number,
		4: number,
		5: number,
		6: number,
		7: number,
		8: number,
		9: number,
	}
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
	/* The school of magic the spell belongs to */
	school: typeof MAGIC_SCHOOL;
	/** The possible damage types the spell inflicts */
	damageInflict: typeof util.DAMAGE_TYPES[number][];
	/** The possible conditions the spell inflicts */
	conditionInflict: typeof util.CONDITIONS[number][];
	/** The possible saving throws the target has to roll */
	savingThrow: typeof util.ABILITIES[number][];
	spellAttack: string[];
	tags: string[];
	source?: Source;
}

export interface Source {
	name: string;
	pages: number[];
}
