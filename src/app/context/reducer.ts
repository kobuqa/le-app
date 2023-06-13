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

  if(action.type === 'removeCardFromDeck') {
    const deck = copy.decks.find(({ id }) => id === action.payload.deckId);
    if(deck) {
      const cardToDelete = deck.cards.findIndex(({id}) => id === action.payload.cardId);
      if(~cardToDelete) deck.cards.splice(cardToDelete, 1);
    }
  }

  if(action.type === "moveCard") {
    const { deckFromId, deckToId, cardId, duplicate } = action.payload
    const deckFromMove = copy.decks.find(({ id }) => id === deckFromId);
    const deckToMove = copy.decks.find(({ id }) => id === deckToId);

    if(deckFromMove && deckToMove) {
      const cardToMoveIndex = deckFromMove.cards.findIndex(({id}) => id === cardId);
      if (~cardToMoveIndex) deckToMove.cards.push(deckFromMove.cards[cardToMoveIndex]);
      if(!duplicate) deckFromMove.cards.splice(cardToMoveIndex, 1)
    }
  }

  localStorage.setItem("state", JSON.stringify(copy));

  return copy;
}
