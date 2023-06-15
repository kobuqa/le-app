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
    "https://storage.googleapis.com/kagglesdsdata/datasets/829978/1417968/harvard.wav?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20230613%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20230613T083953Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=9973b52df7d1bc00f3282d6bab4bce11c926c54949f2602ef9a154e632f3d3389deae33a4e14fee4b0e6d09587b8e4d7fb4d5014b9841e2439f130d6dde9ec019c00b3c09864f238d7c9405c51916e0e62b894816f96b443438b2f1104080490315bbe7e4cfe34bb455641416ac376888336034ed4cecb49ad00022d04fa7e2c58ef3b5029ce9f847aec552cf47b9f6e416c987f6173c24911264c8e8760081c59788e364bc565f23372a43e9088fd91d0fb58cbdab617ca6fc7940ee43c1762ce65cbc9f3c41e37f4ea58fea3845e20e981900d2c6d4fac14d93ffe7825584b1b70d217ddb6c55ad48ffc64badea18b9aa97036c391de07cc7ac12a33824dde"
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
