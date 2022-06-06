export type UserID = string;
export type Entries = (
  | string
  | {
      name: string;
      entries: string[];
    }
)[];

export type CampaignUserSummary = {
  displayName: string;
} & (
  | {
      as: "dm";
    }
  | {
      as: "player";
      currentCharacterName?: string;
    }
);

export type CampaignUserSummaries = {
  [userId: string]: CampaignUserSummary;
};

/** Adds a field indicating the main owner of the entity */
export interface Owned {
  ownerUserId: UserID;
}

export interface Timestamped {
  createdAt: Date;
  updatedAt?: Date;
}

/** Adds a field indicating who this entity is shared with besides the owner. */
export interface Shareable {
  sharedWith: {
    permission: "read" | "write";
    target: "players" | "dms" | UserID[];
  }[];
}

/** Specifies where the information is from, e.g. Players Handbook */
export interface Sourced {
  source?: string;
  page?: number;
}
