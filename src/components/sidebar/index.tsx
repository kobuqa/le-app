import React from "react";
import { slide as Menu } from "react-burger-menu";
import { NavLink } from "../navlink";

export const SideBar = (props: any) => {
  return (
    <Menu {...props}>
      <span>Twigo Learn</span>
      <NavLink path="/" onClick={props.close}>
        Add a Card
      </NavLink>
      <NavLink path="/cards" onClick={props.close}>
        Cards
      </NavLink>
      <NavLink path="/decks" onClick={props.close}>
        Decks
      </NavLink>
    </Menu>
  );
};
