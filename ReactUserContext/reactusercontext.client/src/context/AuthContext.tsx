import { createContext } from "react";
import getUser from "../authentication/getUser";
import { User } from "../authentication/types";

type Props = {
  children?: React.ReactNode;
};

const user = await getUser();
const AuthContext = createContext<User>(user);

const AuthProvider = ({ children }: Props) => {
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
