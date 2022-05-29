export type UserID = string;
export type ItemEntries = (
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

/** Specifies where the information is from, e.g. Players Handbook */
export interface Sourced {
  source?: string;
  page?: number;
}
