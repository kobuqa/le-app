// @ts-nocheck
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function Item(props) {
  const { context, word } = props;

  return (
    <div className="w-full h-10 border my-2 rounded-sm p-2 overflow-hidden">
      Word: {word} Context: {context}
    </div>
  );
}

export default function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Item id={props.id} context={props.data.context} word={props.data.word} />
    </div>
  );
}
