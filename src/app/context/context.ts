import { createContext } from "react";
import { Card, Deck } from "../decks/page";

export type AppState = { decks: Deck[] };

export type AddDeckAction = {
  type: "addDeck";
  payload: Deck;
};

export type AddToDeckAction = {
  type: "addToDeck";
  payload: {
    card: Card;
    deckId: string;
  };
};

export type DeleteDeckAction = {
  type: "deleteDeck";
  payload: { deckId: string };
};

export type SetStateAction = {
  type: "setState";
  payload: AppState;
};

export type AppAction =
  | AddDeckAction
  | AddToDeckAction
  | SetStateAction
  | DeleteDeckAction;

export type AppDispatch = (action: AppAction) => void;

export type AppContextType = {
  state: AppState;
  dispatch: AppDispatch;
};

export const AppContext = createContext<
  | {
      state: AppState;
      dispatch: AppDispatch;
    }
  | undefined
>(undefined);
