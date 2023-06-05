"use client";

import { useEffect, useState } from "react";
import { Card } from "../cards/page";
import { Button } from "@/components/button";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@/components/input";
import { VscClose } from "react-icons/vsc";

export type Deck = {
  id: string;
  title: string;
  cards: Card[];
};

export default function Decks() {
  const [creating, setCreating] = useState(false);

  const [decks, setDecks] = useState<Deck[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const decks = localStorage.getItem("decks");
      if (decks) setDecks(JSON.parse(decks));
    }
  }, []);
  const onClose = () => setCreating(false);
  const containerMobile = {
    hidden: { opacity: 0, y: "-100%" },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: "100%",
      transition: {
        duration: 0.3,
      },
    },
  };

  const saveDeck = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "decks",
        JSON.stringify([
          ...decks,
          {
            id: "1",
            title: "Untitled#1",
            cards: [
              {
                id: `${Math.random()}`,
                word: "love",
                context: "What is love?",
                translation: "Love is strong feel",
              },
            ],
          },
        ])
      );
    }
  };

  return (
    <section className="flex flex-col h-full">
      <AnimatePresence>
        {creating && (
          <motion.div
            key="modal"
            onClick={(e) => e.stopPropagation()}
            initial="hidden"
            animate="show"
            exit="exit"
            variants={containerMobile}
            className="z-[1001] absolute top-0 left-0 w-screen h-full border border-primary bg-black p-4 flex flex-col"
          >
            <button className="absolute top-2 right-2" onClick={onClose}>
              <VscClose />
            </button>
            <label>
              Deck Name
              <Input value="New Deck #1" className="w-full" />
            </label>
            <div className="grow">
              <span>Manage Cards</span>
              <div className="flex">
                <div className="grow border">
                  <div>
                    <span>Love</span>
                  </div>
                </div>
                <div className="grow border">
                  <div>
                    <span>Not Love</span>
                  </div>
                </div>
              </div>
            </div>
            <Button
              onClick={() => {
                saveDeck();
                onClose();
              }}
            >
              Save
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <span className="text-center text-bold text-xl">Your Decks</span>
      <ul className="mt-4 grow">
        {decks.map((deck) => (
          <li key={deck.id}>
            <span>{deck.title}</span>
            <span>Cards:{deck.cards.length}</span>
          </li>
        ))}
      </ul>
      <Button onClick={() => setCreating(true)}>Add new Deck</Button>
    </section>
  );
}
