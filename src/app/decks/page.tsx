"use client";

import { useState } from "react";
import { Button } from "@/components/button";

import { DeckCreateModal } from "@/components/modals/deck-create";
import { useAppContext } from "../context";
import { useSnackbar } from "notistack";
import { Deck } from "./deck";

export type Deck = {
  id: string;
  name: string;
  cards: Card[];
};

export type Card = {
  id: string;
  context: string;
  word: string;
  translation: string;
};

export default function Decks() {
  const [creating, setCreating] = useState(false);

  const {
    state: { decks },
    dispatch,
  } = useAppContext();

  const { enqueueSnackbar } = useSnackbar();
  const onClose = () => setCreating(false);

  const saveDeck = (newDeck: Deck) => {
    dispatch({ type: "addDeck", payload: newDeck });
    enqueueSnackbar("Deck has been created.", {
      variant: "success",
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  };

  return (
    <section className="flex flex-col h-full overflow-hidden">
      <DeckCreateModal open={creating} onSave={saveDeck} onClose={onClose} />
      <span className="text-center text-bold text-xl">Decks</span>
      <ul className="mt-4 flex flex-col items-center overflow-auto grow gap-6 p-8">
        {decks.map((deck) => (
          <Deck deck={deck} key={deck.id} />
        ))}
      </ul>
      <Button onClick={() => setCreating(true)}>Add new Deck</Button>
    </section>
  );
}
