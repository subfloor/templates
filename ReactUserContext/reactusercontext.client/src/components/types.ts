export interface UserState {
  UserId: string;
  PersonId: string;
  LoggedIn: boolean;
  Claims: Claim[];
}

export interface Claim {
  type: string;
  value: string;
}
