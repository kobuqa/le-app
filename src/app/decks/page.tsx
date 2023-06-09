"use client";

import { useEffect, useState } from "react";
import { Card } from "../cards/page";
import { Button } from "@/components/button";

import { MdDelete, MdOutlineEdit, MdPlayCircle } from "react-icons/md";
import { DeckCreateModal } from "@/components/modals/deck-create";

export type Deck = {
  id: string;
  title: string;
  cards: Card[];
};

export default function Decks() {
  const [creating, setCreating] = useState(false);

  const [decks, setDecks] = useState<Deck[]>([]);

  const onClose = () => setCreating(false);

  const saveDeck = (newDeck: Deck) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("decks", JSON.stringify([...decks, newDeck]));
      setDecks((p) => p.concat(newDeck));
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const decks = localStorage.getItem("decks");
      if (decks) setDecks(JSON.parse(decks));
    }
  }, []);

  return (
    <section className="flex flex-col h-full overflow-hidden">
      <DeckCreateModal open={creating} onSave={saveDeck} onClose={onClose} />
      <span className="text-center text-bold text-xl">Decks</span>
      <ul className="grid grid-cols-1 my-5 gap-4 overflow-auto pr-2 grow">
        {decks.map((deck) => (
          <li
            key={deck.id}
            className="rounded-sm border flex flex-col p-4 gap-4 aspect-video"
          >
            <div className="flex grow">
              <div className="flex flex-col grow">
                <span>{deck.title}</span>
                <span>Cards:{deck.cards.length}</span>
              </div>

              <div className="flex flex-col gap-4 justify-center">
                <button>
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
