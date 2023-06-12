import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@/components/input";
import { VscClose } from "react-icons/vsc";
import { Button } from "../button";
import { Deck } from "@/app/decks/page";
import { v4 as uuid } from "uuid";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (newDeck: Deck) => void;
};
export const DeckCreateModal = ({ open, onClose, onSave }: Props) => {
  const [deckName, setDeckName] = useState("");

  const containerMobile = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
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
          className="z-[1001] border border-slate-400 rounded-sm  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4  bg-black p-6 flex flex-col gap-4"
        >
          <button className="absolute top-4 right-6" onClick={onClose}>
            <VscClose />
          </button>
          <label className="uppercase  text-center">
            New Deck
            <Input
              placeholder="Provide a Deck Name"
              value={deckName}
              onChange={({ target: { value } }) => setDeckName(value)}
              className="w-full mt-4"
            />
          </label>

          <Button
            onClick={() => {
              onSave({
                id: uuid(),
                name: deckName,
                cards: [],
              });
              setDeckName("");
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
