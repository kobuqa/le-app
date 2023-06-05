import React from "react";
import { slide as Menu } from "react-burger-menu";
import { NavLink } from "../navlink";
import Image from "next/image";
import { RiAddBoxFill } from "react-icons/ri";
import { HiSquare3Stack3D } from "react-icons/hi2";
import { TbCards } from "react-icons/tb";
export const SideBar = (props: any) => {
  return (
    <Menu {...props}>
      <Image src="/logo.png" width={120} height={20} alt="Logo" />
      <NavLink path="/" onClick={props.close} className="uppercase">
        <RiAddBoxFill />
        New Card
      </NavLink>
      <NavLink path="/cards" onClick={props.close}>
        <TbCards />
        Cards
      </NavLink>
      <NavLink path="/decks" onClick={props.close}>
        <HiSquare3Stack3D />
        Decks
      </NavLink>
    </Menu>
  );
};
