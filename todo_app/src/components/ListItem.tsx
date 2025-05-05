import clsx from "clsx";
import { Item } from "../App";

interface ListItemProps {
  item: Item;
  onRemove: (id: number) => void;
  onToggle: (id: number) => void;
}

export default function ListItem({ item, onRemove, onToggle }: ListItemProps) {
  return (
    <li>
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
