import React, { useState } from "react";
import { type Card as CardType } from "../page";
import { Input } from "@/components/input";
import { TextArea } from "@/components/textarea";
import { Button } from "@/components/button";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import { MoveCard } from "./move-card";

type Props = {
  card: CardType;
  onRemove: (cardId: string) => void;
  onMove: (params: {
    deckFromId: string;
    deckToId: string;
    cardId: string;
    duplicate: boolean;
  }) => void;
};
export const Card = ({ card, onRemove, onMove }: Props) => {
  const [duplicateMode, setDuplicateMode] = useState(false);

  return (
    <li
      key={card.id}
      className="border border-primary rounded-sm p-4 bg-hex bg-[4rem] bg-[length:5rem] aspect-square flex flex-col gap-4"
    >
      <div className="grow flex flex-col gap-4">
        <label className="text-slate-600 text-xs uppercase flex flex-col gap-2">
          Context
          <TextArea
            className="text-white"
            rows={4}
            disabled
            value={card.context}
          />
        </label>
        <label className="text-slate-600 text-xs  uppercase flex flex-col gap-2">
          Word
          <Input className="text-white" disabled value={card.word} />
        </label>

        <label className="text-slate-600 text-xs uppercase flex flex-col gap-2">
          Translation
          <TextArea
            className="text-white"
            rows={4}
            disabled
            value={card.translation}
          />
        </label>
      </div>

      <div className="flex justify-center gap-6">
        <Button intent="icon" onClick={() => onRemove(card.id)}>
          <MdDelete className="text-red-500 scale-150" />
        </Button>
        <Button intent="icon">
          <MdOutlineEdit className="text-blue-500 scale-150" />
        </Button>
        <MoveCard
          cardId={card.id}
          duplicateMode={duplicateMode}
          onChangeDuplicateMode={setDuplicateMode}
          onMove={onMove}
        />
      </div>
    </li>
  );
};
