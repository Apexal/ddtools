import {
  FirestoreDoc,
  Timestamped,
  UserID,
  CampaignUserSummaries,
  Owned,
  Shareable,
} from "../utils";

export interface Campaign extends FirestoreDoc, Timestamped {
  /** Player-facing name of campaign */
  name: string;
  /** Color for campaign to display in UI */
  color?: string;
  /** Player-facing description of campaign, e.g. backstory */
  description?: string;
  /** The id(s) of user(s) running the campaign, i.e. the campaign owners */
  dmUserIds?: UserID[];
  /** The emails of user(s) currently with pending invites to DM */
  dmInviteEmails?: string[];
  /** The ids of users participating in the campaign as players */
  playerUserIds?: UserID[];
  /** Auto-updated summaries of users to be able to display role, ID, name, and character name (if player) without DB lookups. */
  userSummaries?: CampaignUserSummaries;
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

/** An event that is logged. */
export interface EventLogItem extends FirestoreDoc, Timestamped {
  type:
    | "campaign-created"
    | "campaign-updated"
    | "player-invited"
    | "dm-invited"
    | "player-invite-accepted"
    | "dm-invite-accepted"
    | "player-invite-declined"
    | "dm-invite-declined"; // Add types as they are needed here
  message?: string;
  payload?: any;
  sourceUserIds?: UserID[];
  targetUserIds?: UserID[];
  userSummaries?: CampaignUserSummaries;
}

export interface Audio extends FirestoreDoc, Owned, Shareable, Timestamped {
  name: string;
  description?: string;
  isPlaying?: boolean;
  isLooped?: boolean;
  defaultVolume?: number;
  /** Path to file in Firebase Storage, e.g. "campaigns/camp1/cave.mp3" */
  filePath: string;
}
