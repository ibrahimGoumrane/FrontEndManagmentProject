import { User } from "./Users";

export interface Id {
  id: string | number;
}
export interface Team {
  id: string;
  name: string;
  ownerId: Id;
  teamImage?: string;
}
export interface TeamCreation {
  name: string;
  ownerId: Id;
}

export interface TeamData {
  id: string;
  name: string;
  ownerName: string;
  ownerEmail: string;
  members: User[];
}
