export interface Id {
  id: string | number;
}
export interface Team {
  id: string;
  name: string;
  ownerId: Id;
}
export interface TeamCreation {
  name: string;
  ownerId: Id;
}

