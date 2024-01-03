import { ButtonType } from "antd/lib/button";
import { ReactNode } from "react";

export type LoginProvider =
  | { node: ReactNode; href: string; type: ButtonType }
  | { node: React.FC<{ href: string }>; href: string; type: "component" };

export interface UserSessionClaim {
  type: string;
  value: string;
}

export interface User {
  Authenticated: boolean;
  UserId: string;
  Email: string;
  Logouturl: string;
  Claims: UserSessionClaim[];
}
