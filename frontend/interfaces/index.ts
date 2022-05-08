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

export interface Character {}
