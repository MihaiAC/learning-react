import { useState } from "react";
import AddItem from "./components/AddItem";
import ListItem from "./components/ListItem";

export type DisplayMode = "all" | "active" | "completed";
export type ItemStatus = "active" | "completed";
export type Item = {
  id: number;
  text: string;
  status: ItemStatus;
};

let MAX_ID = 0;

function App() {
  const [displayMode, setDisplayMode] = useState<DisplayMode>("all");
  const [items, setItems] = useState<Item[]>([]);
  const activeCount = items.filter((item) => item.status === "active").length;

  function addItem(text: string) {
    setItems((items) => [
      ...items,
      { text: text, status: "active", id: MAX_ID },
    ]);
    MAX_ID += 1;
  }

  function removeItem(id: number) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function toggleItemStatus(id: number) {
    setItems((items) =>
      items.map((item) =>
        item.id !== id
          ? item
          : {
              ...item,
              status: item.status === "active" ? "completed" : "active",
            }
      )
    );
  }

  function removeCompleted() {
    setItems((items) => items.filter((item) => item.status !== "completed"));
  }

  return (
    <>
      <AddItem onAdd={addItem}></AddItem>
      <ul>
        {items
          .filter(
            (item) => displayMode === "all" || item.status === displayMode
          )
          .map((item) => (
            <ListItem
              key={item.id}
              item={item}
              onRemove={removeItem}
              onToggle={toggleItemStatus}
            ></ListItem>
          ))}
      </ul>
      <div>
        <p>{activeCount} items left</p>
        <div>
          <button onClick={() => setDisplayMode("all")}>All</button>
          <button onClick={() => setDisplayMode("active")}>Active</button>
          <button onClick={() => setDisplayMode("completed")}>Completed</button>
        </div>
        <div>
          <button onClick={() => removeCompleted()}>Clear completed</button>
        </div>
      </div>
    </>
  );
}

export default App;
