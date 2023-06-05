"use client";

import { useState } from "react";
import { MdDelete, MdOutlineEdit, MdAddCircleOutline } from "react-icons/md";
export type Card = {
  id: string;
  context: string;
  word: string;
  translation: string;
};
export default function Cards() {
  const [cards, setCards] = useState<Card[]>(() => {
    if (typeof window !== "undefined") {
      const cards = localStorage.getItem("cards");
      if (cards) return JSON.parse(cards);
    }

    return [];
  });

  return (
    <section className="flex flex-col h-full overflow-hidden">
      <span className="text-center text-bold text-xl uppercase">Cards</span>
      <ul className="grid grid-cols-1 mt-5 gap-4 overflow-auto pr-2">
        {cards.map((card) => (
          <li
            key={card.id}
            className="rounded-sm border flex p-4 gap-4 aspect-square"
          >
            <div className="flex flex-col gap-2">
              <span className="text-xs">Context: {card.context}</span>
              <span className="text-xs">Word: {card.word}</span>
              <span className="text-xs">Translation: {card.translation}</span>
            </div>
            <div className="flex flex-col gap-4 justify-center">
              <button>
                <MdDelete className="text-red-500 scale-150" />
              </button>
              <button>
                <MdOutlineEdit className="text-blue-500 scale-150" />
              </button>
              <button>
                <MdAddCircleOutline className="text-green-300 scale-150" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
