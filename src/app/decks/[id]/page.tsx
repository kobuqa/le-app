"use client";

import { useAppContext } from "@/app/context";
import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card } from "./card";

export default function DeckById() {
  const {
    state: { decks },
    dispatch,
  } = useAppContext();

  const { id } = useParams();

  const removeCard = (cardId: string) => {
    dispatch({ type: "removeCardFromDeck", payload: { deckId: id, cardId } });
  };

  const moveCard = ({
    deckFromId,
    deckToId,
    cardId,
    duplicate,
  }: {
    deckFromId: string;
    deckToId: string;
    cardId: string;
    duplicate: boolean;
  }) => {
    dispatch({
      type: "moveCard",
      payload: { deckFromId, deckToId, cardId, duplicate },
    });
  };

  const currentDeck = decks.find((deck) => deck.id === id);

  if (!currentDeck)
    return (
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        Oops... Deck found!
      </span>
    );
  return (
    <div className="flex flex-col items-center w-full h-full p-2">
      <span className="uppercase text-slate-400">{currentDeck.name}</span>
      {currentDeck.cards.length > 0 && (
        <ul className="w-full h-full overflow-auto p-2 mt-2 mb-20 grid grid-cols-1 gap-4">
          {currentDeck.cards.map((card) => (
            <Card
              card={card}
              onRemove={removeCard}
              onMove={moveCard}
              key={card.id}
            />
          ))}
        </ul>
      )}
      {currentDeck.cards.length === 0 && (
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          Current Deck has no cards :(
        </span>
      )}

      <Link
        href="/decks"
        className="absolute bottom-8 uppercase bg-primary text-black hover:brightness-75 disabled:bg-slate-300 disabled:text-white transition-colors py-2 px-4 rounded-sm"
      >
        Go Back
      </Link>
    </div>
  );
}
