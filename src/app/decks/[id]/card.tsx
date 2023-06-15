import React, { useEffect, useState } from "react";
import { type Card as CardType } from "../page";
import { Input } from "@/components/input";
import { TextArea } from "@/components/textarea";
import { Button } from "@/components/button";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import { MoveCard } from "./move-card";
import { AnimatePresence, motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useAppContext } from "@/app/context";
import { HiSpeakerWave } from "react-icons/hi2";
import useSound from "use-sound";

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
  const { id } = useParams();
  const { dispatch } = useAppContext();
  const [duplicateMode, setDuplicateMode] = useState(false);
  const [editableMode, setEditableMode] = useState(false);

  const [explanation, setExplanation] = useState(() => card.explanation);
  const [translation, setTranslation] = useState(() => card.translation);
  const [usage, setUsage] = useState(() => card.usage);
  const [context, setContext] = useState(() => card.context);
  const [word, setWord] = useState(() => card.word);

  const toggleEditable = () => setEditableMode((p) => !p);

  useEffect(() => {
    if (!editableMode) {
      dispatch({
        type: "updateCard",
        payload: {
          card: { ...card, explanation, translation, context, word, usage },
          deckId: id,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editableMode]);
  let audio = new Audio(
    "https://lzg-prd-tmp.s3.amazonaws.com/4EcpXML443Ddsg8F3gUntB.mp3"
  );

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
        <div className="grow flex flex-col">
          {editableMode ? (
            <div className="flex flex-col gap-4">
              <Input
                placeholder="Word"
                value={word}
                className="text-white"
                onChange={({ target }) => setWord(target.value)}
              />
              <TextArea
                placeholder="Context"
                className="text-white"
                rows={3}
                disabled
                value={context}
                onChange={({ target }) => setContext(target.value)}
              />
              <TextArea
                className="text-white"
                rows={3}
                disabled
                value={explanation}
                onChange={({ target }) => setExplanation(target.value)}
              />
              <TextArea
                className="text-white"
                rows={3}
                disabled
                value={usage}
                onChange={({ target }) => setUsage(target.value)}
              />
              <Input
                className="text-white"
                disabled
                value={translation}
                onChange={({ target }) => setTranslation(target.value)}
              />
            </div>
          ) : (
            <>
              <span className=" text-teal-400 text-center text-2xl font-bold">
                {card.word
                  .split(" ")
                  .map((word) => word[0].toUpperCase() + word.slice(1))
                  .join(" ")}
                <Button
                  intent="icon"
                  className="p-1 ml-5 text-white"
                  onClick={() => audio.play()}
                >
                  <HiSpeakerWave />
                </Button>
              </span>
              <div className="text-teal-400 text-lg text-center">
                {card.context}
              </div>
              <div className="flex flex-col gap-4 mt-8">
                <span className="text-amber-200 flex flex-col">
                  <span className="text-slate-300 text-xs">Explanation</span>
                  {card.explanation}
                </span>
                <span className="text-purple-300 flex flex-col">
                  <span className="text-slate-300 text-xs">
                    Example of usage
                  </span>
                  {card.usage}
                </span>
                {card.translation && (
                  <span className="text-lime-200 flex flex-col">
                    <span className="text-slate-300 text-xs">Translation</span>
                    {card.translation}
                  </span>
                )}
              </div>
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
