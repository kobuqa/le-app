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

export type UpdateCardAction = {
  type: "updateCard";
  payload: {
    deckId: string;
    card: Card;
  };
};

export type DeleteDeckAction = {
  type: "deleteDeck";
  payload: { deckId: string };
};

export type RenameDeckAction = {
  type: "renameDeck";
  payload: { deckId: string; name: string };
};
export type RemoveCardFromDeckAction = {
  type: "removeCardFromDeck";
  payload: { deckId: string; cardId: string };
};

export type MoveCardAction = {
  type: "moveCard";
  payload: {
    deckFromId: string;
    deckToId: string;
    cardId: string;
    duplicate: boolean;
  };
};
export type SetStateAction = {
  type: "setState";
  payload: AppState;
};

export type AppAction =
  | AddDeckAction
  | AddToDeckAction
  | SetStateAction
  | DeleteDeckAction
  | RenameDeckAction
  | RemoveCardFromDeckAction
  | MoveCardAction
  | UpdateCardAction;

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
