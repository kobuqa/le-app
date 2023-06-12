"use client";

import { useState } from "react";
import { Button } from "@/components/button";

import { MdDelete, MdOutlineEdit, MdPlayCircle } from "react-icons/md";
import { DeckCreateModal } from "@/components/modals/deck-create";
import { useAppContext } from "../context";
import { useSnackbar } from "notistack";
import { TbCards } from "react-icons/tb";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

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
          <li
            onClick={() => router.push("/decks/" + deck.id)}
            key={deck.id}
            className="w-3/4 aspect-square cursor-pointer relative rounded-sm border border-primary bg-hex bg-[4rem] bg-[length:5rem] flex flex-col p-4 gap-4 deck hover:bg-primary hover:bg-opacity-10 transition-colors"
          >
            <div className="flex flex-col grow gap-4">
              <div className="flex items-center justify-between">
                <span className="uppercase ">{deck.name}</span>
                <div className="flex items-center gap-2 text-slate-400">
                  {deck.cards.length}
                  <TbCards />
                </div>
              </div>

              <div className="z-10 flex justify-around items-center grow">
                <button
                  className="cursor-default"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch({
                      type: "deleteDeck",
                      payload: { deckId: deck.id },
                    });
                  }}
                >
                  <MdDelete className="text-red-500 scale-150" />
                </button>
                <button>
                  <MdOutlineEdit className="text-blue-500 scale-150" />
                </button>
                <button>
                  <MdPlayCircle className="text-green-500 scale-150" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Button onClick={() => setCreating(true)}>Add new Deck</Button>
    </section>
  );
}
