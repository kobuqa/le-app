import { useState } from "react";
import { Switch } from "@headlessui/react";
import clsx from "clsx";

type Props = {
  leftText: string;
  rightText: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
  className?: string;
};
export const Toggle = ({
  leftText = "on",
  rightText = "off",
  enabled = true,
  onChange,
  className,
}: Props) => {
  return (
    <div className={clsx(className, "flex items-center gap-2 mx-2")}>
      <span className="uppercase text-[10px] font-bold text-slate-400">
        {leftText}
      </span>
      <Switch
        checked={enabled}
        onChange={onChange}
        className={`${enabled ? "bg-[#198484]" : "bg-[#29cece]"}
          relative inline-flex h-[20px] w-[2.5rem] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? "translate-x-5" : "translate-x-0"}
            pointer-events-none inline-block h-[1rem] w-[1rem] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
      <span className="uppercase text-[10px] font-bold text-slate-400">
        {rightText}
      </span>
    </div>
  );
};
