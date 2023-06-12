import React, { useEffect } from "react";
import { v4 as uuid } from "uuid";

import reducer from "./reducer";
import { AppContext } from "./context";

export const AppContextProvider: React.FC<React.PropsWithChildren> = function ({
  children,
}): JSX.Element {
  const [appState, appDispatch] = React.useReducer(reducer, {
    decks: [],
  });

  useEffect(() => {
    // LS initialization
    if (typeof window !== "undefined") {
      const state = localStorage.getItem("state");

      if (!state) {
        const defaultDeck = { id: uuid(), name: "Default Deck", cards: [] };

        appDispatch({
          type: "addDeck",
          payload: defaultDeck,
        });
      } else {
        appDispatch({ type: "setState", payload: JSON.parse(state) });
      }
    }
  }, []);

  const appContextValue = React.useMemo(
    () => ({
      state: appState,
      dispatch: appDispatch,
    }),
    [appState]
  );

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};
