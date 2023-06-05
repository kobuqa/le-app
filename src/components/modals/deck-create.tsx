import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@/components/input";
import { VscClose } from "react-icons/vsc";
import { Button } from "../button";
import { Card } from "@/app/cards/page";
import { FaArrowsAltH } from "react-icons/fa";
import Dnd from "../dnd/dnd";
import { Deck } from "@/app/decks/page";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (newDeck: Deck) => void;
};
export const DeckCreateModal = ({ open, onClose, onSave }: Props) => {
  const [deckName, setDeckName] = useState("Untitled deck");
  const [items, setItems] = useState<{ cards: Card[]; deck: Card[] }>({
    cards: [],
    deck: [],
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cards = localStorage.getItem("cards");
      if (cards) setItems((p) => ({ ...p, cards: JSON.parse(cards) }));
    }
  }, []);

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

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="modal"
          onClick={(e) => e.stopPropagation()}
          initial="hidden"
          animate="show"
          exit="exit"
          variants={containerMobile}
          className="z-[1001] absolute top-0 left-0 w-screen h-full bg-black p-6 flex flex-col gap-4"
        >
          <button className="absolute top-4 right-6" onClick={onClose}>
            <VscClose />
          </button>
          <label>
            Deck Name
            <Input
              value={deckName}
              onChange={({ target: { value } }) => setDeckName(value)}
              className="w-full"
            />
          </label>
          <div className="flex justify-around">
            <span>Cards</span>
            <span>Deck</span>
          </div>
          <Dnd items={items} setItems={setItems} />
          <Button
            onClick={() => {
              onSave({
                id: String(Math.random()),
                title: deckName,
                cards: items.deck,
              });
              onClose();
            }}
          >
            Save
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
