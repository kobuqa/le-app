import { useAppContext } from "@/app/context";
import { Button } from "@/components/button";
import { Toggle } from "@/components/toggle";
import { Menu } from "@headlessui/react";
import { useParams } from "next/navigation";
import { useSnackbar } from "notistack";
import { IoCopyOutline } from "react-icons/io5";

type Props = {
  cardId: string;
  onMove: (params: {
    deckFromId: string;
    deckToId: string;
    cardId: string;
    duplicate: boolean;
  }) => void;
  duplicateMode: boolean;
  onChangeDuplicateMode: (value: boolean) => void;
};
export const MoveCard = ({
  cardId,
  onMove,
  duplicateMode,
  onChangeDuplicateMode,
}: Props) => {
  const {
    state: { decks },
  } = useAppContext();
  const { id: deckFromId } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <div className="relative">
      <Menu>
        <Menu.Button>
          <Button intent="icon">
            <IoCopyOutline className="text-green-500 scale-150" />
          </Button>
        </Menu.Button>
        <Menu.Items className="flex flex-col absolute bottom-14 -left-3/4 -translate-x-1/2 border border-slate-400 rounded-sm bg-blacky w-[16rem]">
          <span className="mx-auto p-2 text-slate-300 uppercase text-md">
            Choose a Deck
          </span>

          <div className="p-2 max-h-52 overflow-auto">
            {decks.map((deck) => (
              <Menu.Item key={deck.name}>
                {({ active }) => (
                  <button
                    onClick={() => {
                      onMove({
                        deckToId: deck.id,
                        deckFromId,
                        cardId,
                        duplicate: duplicateMode,
                      });
                      enqueueSnackbar("Card has been successfully moved!", {
                        variant: "success",
                        autoHideDuration: 2000,
                        anchorOrigin: {
                          vertical: "top",
                          horizontal: "right",
                        },
                      });
                    }}
                    className={`${
                      active && "bg-primary text-black"
                    } w-full [&:not(:last-child)]:border-b p-2 border-slate-400`}
                  >
                    {deck.name}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>

          <Toggle
            enabled={duplicateMode}
            onChange={onChangeDuplicateMode}
            className="my-2 self-center"
            leftText="move"
            rightText="duplicate"
          />
        </Menu.Items>
      </Menu>
    </div>
  );
};
