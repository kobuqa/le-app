import React from "react";
import { slide as Menu } from "react-burger-menu";
import { NavLink } from "../navlink";

export const SideBar = (props: any) => {
  return (
    // Pass on our props
    <Menu {...props}>
      <span>Learn App</span>
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
