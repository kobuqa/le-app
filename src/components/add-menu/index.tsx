import { useAppContext } from "@/app/context";
import { Menu } from "@headlessui/react";

export const AddMenu = ({ disabled, onSave }: any) => {
  const {
    state: { decks },
  } = useAppContext();

  return (
    <div className="relative w-full flex justify-center">
      <Menu>
        <Menu.Button
          disabled={disabled}
          className="uppercase bg-primary text-black hover:enabled:brightness-75 disabled:bg-slate-300 disabled:text-white transition-colors py-2 px-4 rounded-sm"
        >
          Add to Deck
        </Menu.Button>
        <Menu.Items className="flex flex-col absolute bottom-14 left-1/2 -translate-x-1/2 border border-slate-400 rounded-sm bg-blacky w-5/6 ">
          <span className="mx-auto p-2 text-slate-300 uppercase">
            Choose a Deck
          </span>
          <div className="p-2 max-h-72 overflow-auto">
            {decks.map((deck) => (
              <Menu.Item key={deck.name}>
                {({ active }) => (
                  <button
                    onClick={() => onSave(deck.id)}
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
        </Menu.Items>
      </Menu>
    </div>
  );
};
