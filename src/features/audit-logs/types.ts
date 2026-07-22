import { Action } from "@generated/prisma";

export interface DBHistoryLog {
  id: string;
  action: Action;
  entity: string;
  oldValue: string | null;
  newValue: string;
  createdAt: Date;
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
    role: string | null;
  };
}

export interface RawHistoryLog extends Omit<DBHistoryLog, "createdAt"> {
  createdAt: string;
}
