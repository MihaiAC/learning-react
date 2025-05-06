import { useState } from "react";
import AddItem from "./components/AddItem";
import ListItem from "./components/ListItem";
import BackgroundImage from "./components/BackgroundImage";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";

import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import ThemeToggleButton from "./components/ThemeToggleButton";

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

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);
    setItems((items) => arrayMove(items, oldIndex, newIndex));
  }

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
    <div className="w-full h-screen bg-bgColor overflow-hidden relative px-8">
      {/* Couldn't make bg- stretch only horizontally. I found some solutions for Tailwind3, but none for Tailwind4. */}
      <BackgroundImage />
      <div className="relative z-1 container mx-auto flex flex-col items-center max-w-lg bg-image bg-no-repeat bg-size-[100%_200px] sm:bg-size-[100%_300px]">
        <div className="flex justify-between w-full mt-16 items-center">
          <h1 className="text-white text-4xl font-bold tracking-[0.5em] ">
            TODO
          </h1>
          <ThemeToggleButton />
        </div>
        <AddItem onAdd={addItem}></AddItem>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={items.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
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
          </SortableContext>
        </DndContext>

        <div>
          <p>{activeCount} items left</p>
          <div>
            <button onClick={() => setDisplayMode("all")}>All</button>
            <button onClick={() => setDisplayMode("active")}>Active</button>
            <button onClick={() => setDisplayMode("completed")}>
              Completed
            </button>
          </div>
          <div>
            <button onClick={() => removeCompleted()}>Clear completed</button>
          </div>
        </div>

        <div>
          <p>Drag and drop to reorder list</p>
        </div>
      </div>
    </div>
  );
}

export default App;
