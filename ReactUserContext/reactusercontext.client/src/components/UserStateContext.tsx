import React, { useState } from "react";
import { UserState } from "./types";

const UserStateContext = React.createContext<UserState>({
  UserId: "",
  PersonId: "",
  LoggedIn: false,
  Claims: [],
});

export const GlobalStateProvider = ({ children }) => {
  const [state, setState] = useState<UserState>({
    UserId: "",
    PersonId: "",
    LoggedIn: false,
    Claims: [],
  });

  return (
    <UserStateContext.Provider value={state}>
      {children}
    </UserStateContext.Provider>
  );
};
