"use client";

import { useAppContext } from "@/app/context";
import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function DeckById() {
  const {
    state: { decks },
  } = useAppContext();

  const { id } = useParams();

  const currentDeck = decks.find((deck) => deck.id === id);

  if (!currentDeck)
    return (
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        Oops... Deck found!
      </span>
    );
  return (
    <div className="flex flex-col items-center w-full h-full p-2">
      <span className="uppercase text-slate-400 mb-2">{currentDeck.name}</span>
      <ul className="w-full grow flex flex-col gap-4 overflow-auto p-2 h-full">
        {currentDeck.cards.map((card) => (
          <li
            key={card.id}
            className="border flex flex-col gap-4 rounded-sm p-2"
          >
            <span>Word: {card.word}</span>
            <span>Context: {card.context}</span>
            <span>Translation: {card.translation}</span>
          </li>
        ))}
      </ul>
      <Link
        href="/decks"
        className="absolute bottom-8 uppercase bg-primary text-black hover:brightness-75 disabled:bg-slate-300 disabled:text-white transition-colors py-2 px-4 rounded-sm"
      >
        Go Back
      </Link>
    </div>
  );
}
