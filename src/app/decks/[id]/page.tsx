"use client";

import { useAppContext } from "@/app/context";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Card } from "./card";
import { Button } from "@/components/button";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { AnimatePresence } from "framer-motion";

export default function DeckById() {
  const [currentCard, setCurrentCard] = useState(0);
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

  const [direction, setDirection] = useState<"left" | "right">("right");

  const next = () => {
    if (currentDeck && currentCard < currentDeck.cards.length - 1)
      setCurrentCard((p) => p + 1);
    setDirection("right");
  };

  const prev = () => {
    if (currentCard > 0) setCurrentCard((p) => p - 1);
    setDirection("left");
  };
  if (!currentDeck)
    return (
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        Oops... Deck found!
      </span>
    );

  return (
    <div className="flex flex-col items-center w-full h-full p-2 overflow-hidden gap-6">
      <span className="uppercase text-slate-400">{currentDeck.name}</span>
      <Card
        direction={direction}
        card={currentDeck.cards[currentCard]}
        onRemove={removeCard}
        onMove={moveCard}
      />
      {currentDeck.cards.length === 0 && (
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          Current Deck has no cards :(
        </span>
      )}
      <div className="flex gap-8 items-center">
        <Button intent="icon" onClick={prev}>
          <FiArrowLeft />
        </Button>
        <span>
          {currentCard + 1} / {currentDeck.cards.length}
        </span>
        <Button intent="icon" onClick={next}>
          <FiArrowRight />
        </Button>
      </div>
    </div>
  );
}
