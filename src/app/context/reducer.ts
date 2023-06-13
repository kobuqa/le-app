import type { AppAction, AppState } from "./context";

export default function reducer(state: AppState, action: AppAction): AppState {
  if (action.type === "setState") return action.payload;

  const copy = { ...state };

  if (action.type === "addDeck") {
    copy.decks = copy.decks.concat(action.payload);
  }

  if (action.type === "addToDeck") {
    const deckToAdd = copy.decks.find(({ id }) => id === action.payload.deckId);
    if (deckToAdd) deckToAdd.cards.push(action.payload.card);
  }
  if (action.type === "deleteDeck") {
    const deckToDeleteIndex = copy.decks.findIndex(
      ({ id }) => id === action.payload.deckId
    );

    if (
      deckToDeleteIndex &&
      copy.decks[deckToDeleteIndex].name !== "Default Deck"
    )
      copy.decks.splice(deckToDeleteIndex, 1);
  }

  if(action.type === 'renameDeck') {
    const deck = copy.decks.find(({ id }) => id === action.payload.deckId);
    if(deck) deck.name = action.payload.name;
  }

  localStorage.setItem("state", JSON.stringify(copy));

  return copy;
}
