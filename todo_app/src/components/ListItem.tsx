import clsx from "clsx";
import { Item } from "../App";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ListItemProps {
  item: Item;
  onRemove: (id: number) => void;
  onToggle: (id: number) => void;
}

export default function ListItem({ item, onRemove, onToggle }: ListItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div>
        <input
          type="checkbox"
          checked={item.status === "completed"}
          onChange={() => onToggle(item.id)}
        />
      </div>
      <span className={clsx({ "line-through": item.status === "completed" })}>
        {item.text}
      </span>
      <button onClick={() => onRemove(item.id)}>X</button>
    </li>
  );
}
