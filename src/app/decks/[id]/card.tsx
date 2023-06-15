import React, { useState } from "react";
import { type Card as CardType } from "../page";
import { Input } from "@/components/input";
import { TextArea } from "@/components/textarea";
import { Button } from "@/components/button";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import { MoveCard } from "./move-card";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  direction: "left" | "right";
  card: CardType;
  onRemove: (cardId: string) => void;
  onMove: (params: {
    deckFromId: string;
    deckToId: string;
    cardId: string;
    duplicate: boolean;
  }) => void;
};
export const Card = ({ card, onRemove, onMove, direction }: Props) => {
  const [duplicateMode, setDuplicateMode] = useState(false);
  const [editableMode, setEditableMode] = useState(false);

  const toggleEditable = () => setEditableMode((p) => !p);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={card.id}
        variants={{
          hidden: {
            // translateX:
            //   typeof window !== "undefined"
            //     ? direction === "right"
            //       ? window.innerWidth
            //       : -window.innerWidth
            //     : 0,
            opacity: 0,
            transition: {
              duration: 0.1,
            },
          },
          visible: {
            // translateX: 0,
            opacity: 1,
          },
          exit: {
            // translateX:
            //   typeof window !== "undefined"
            //     ? direction === "right"
            //       ? -window.innerWidth
            //       : window.innerWidth
            //     : 0,
            opacity: 0,
            transition: {
              duration: 0.1,
            },
          },
        }}
        className="bg-hex bg-[4rem] bg-[length:5rem] flex flex-col gap-4 w-full grow pt-4"
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="grow flex flex-col gap-4">
          {editableMode ? (
            <>
              <Input className="text-white" disabled value={card.word} />

              <TextArea
                className="text-white"
                rows={4}
                disabled
                value={card.context}
              />

              <TextArea
                className="text-white"
                rows={4}
                disabled
                value={card.translation}
              />
            </>
          ) : (
            <>
              <span className="uppercase text-teal-400 text-center text-xl">
                `{card.word}`
              </span>
              <div className="text-cyan-400 text-lg">{card.context}</div>
              <span className="text-amber-200 flex flex-col">
                <span className="text-slate-300 text-xs">Explanation:</span>
                Very cold
              </span>
              <span className="text-purple-300 flex flex-col">
                <span className="text-slate-300 text-xs">
                  Example of usage:
                </span>
                It is so cold
              </span>
              <span className="text-lime-200 flex flex-col">
                <span className="text-slate-300 text-xs">
                  Example of usage:
                </span>
                Очень холодно
              </span>
            </>
          )}
        </div>

        <div className="flex justify-center gap-6">
          <Button intent="icon" onClick={() => onRemove(card.id)}>
            <MdDelete className="text-red-500 scale-150" />
          </Button>
          <Button intent="icon" onClick={toggleEditable}>
            <MdOutlineEdit className="text-blue-500 scale-150" />
          </Button>
          <MoveCard
            cardId={card.id}
            duplicateMode={duplicateMode}
            onChangeDuplicateMode={setDuplicateMode}
            onMove={onMove}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
