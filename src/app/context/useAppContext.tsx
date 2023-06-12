import { useContext } from "react";

import type { AppContextType } from "./context";
import { AppContext } from "./context";

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("AppContext must be used within a AppContextProvider");
  }

  return context;
};
