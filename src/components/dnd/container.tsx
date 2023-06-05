// @ts-nocheck

import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableItem from "./sortable-item";

const containerStyle = {
  background: "#dadada",
  padding: 10,
  margin: 10,
  flex: 1,
};

export default function Container(props) {
  const { id, items } = props;

  const { setNodeRef } = useDroppable({
    id,
  });
  return (
    <SortableContext
      id={id}
      items={items}
      strategy={verticalListSortingStrategy}
    >
      <div ref={setNodeRef} className="min-w-1/2 w-1/2 border rounded-sm p-2">
        {items.map((item) => (
          <SortableItem key={item.id} id={item.id} data={item} />
        ))}
      </div>
    </SortableContext>
  );
}
