import React, { useState } from "react";
import { MdDelete, MdOutlineEdit, MdPlayCircle } from "react-icons/md";
import { TbCards } from "react-icons/tb";
import { useRouter } from "next/navigation";
import type { Deck as DeckType } from "./page";
import { Button } from "@/components/button";
import { useAppContext } from "../context";
import { motion } from "framer-motion";
import { Input } from "@/components/input";
import { useSnackbar } from "notistack";
import { VscClose } from "react-icons/vsc";

type Props = {
  deck: DeckType;
};

export const Deck = ({ deck }: Props) => {
  const router = useRouter();
  const [isEditable, setIsEditable] = useState(false);
  const [deckName, setDeckName] = useState(() => deck.name);

  const enableEdit = () => setIsEditable(true);
  const disableEdit = () => setIsEditable(false);

  const { dispatch } = useAppContext();
  const { enqueueSnackbar } = useSnackbar();

  const rename = () => {
    dispatch({
      type: "renameDeck",
      payload: { deckId: deck.id, name: deckName },
    });
  };

  return (
    <>
      {isEditable && (
        <motion.div className="z-[1000] border border-primary rounded-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 flex flex-col gap-4 bg-black">
          <button className="absolute top-4 right-6" onClick={disableEdit}>
            <VscClose />
          </button>
          <label className="uppercase text-center flex flex-col gap-4">
            Rename Deck
            <Input
              value={deckName}
              onChange={({ target }) => setDeckName(target.value)}
            />
          </label>
          <Button
            onClick={() => {
              rename();
              disableEdit();
              enqueueSnackbar("Deck has been renamed.", {
                variant: "success",
                autoHideDuration: 2000,
                anchorOrigin: {
                  vertical: "top",
                  horizontal: "right",
                },
              });
            }}
          >
            Rename
          </Button>
        </motion.div>
      )}
      <li
        onClick={() => router.push("/decks/" + deck.id)}
        key={deck.id}
        className="relative w-3/4 aspect-square cursor-pointer rounded-sm border border-primary bg-hex bg-[4rem] bg-[length:5rem] flex flex-col p-4 gap-4 deck hover:bg-primary hover:bg-opacity-10 transition-colors"
      >
        <div className="flex flex-col grow gap-4">
          <div className="flex items-center justify-between">
            <span className="uppercase">{deck.name}</span>
            <div className="flex items-center gap-2 text-slate-400">
              {deck.cards.length}
              <TbCards />
            </div>
          </div>
          <div className="z-10 flex justify-around items-center grow">
            {deck.name !== "Default Deck" && (
              <Button
                intent="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch({
                    type: "deleteDeck",
                    payload: { deckId: deck.id },
                  });
                  enqueueSnackbar(`Deck ${deck.name} has been deleted.`, {
                    variant: "success",
                    autoHideDuration: 1000,
                    anchorOrigin: {
                      vertical: "top",
                      horizontal: "right",
                    },
                  });
                }}
              >
                <MdDelete className="text-red-500 scale-150" />
              </Button>
            )}
            <Button
              intent="icon"
              onClick={(e) => {
                e.stopPropagation();
                enableEdit();
              }}
            >
              <MdOutlineEdit className="text-blue-500 scale-150" />
            </Button>
            <Button intent="icon">
              <MdPlayCircle className="text-green-500 scale-150" />
            </Button>
          </div>
        </div>
      </li>
    </>
  );
};
