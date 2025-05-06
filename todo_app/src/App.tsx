import { useEffect, useState } from "react";
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

const LOCAL_STORAGE_ITEMS_KEY = "todo-items";
const LOCAL_STORAGE_MAX_ID_KEY = "todo-max-id";

function App() {
  const [displayMode, setDisplayMode] = useState<DisplayMode>("all");
  const [items, setItems] = useState<Item[]>(() => {
    try {
      const savedItemsString = localStorage.getItem(LOCAL_STORAGE_ITEMS_KEY);
      if (savedItemsString) {
        const savedItems = JSON.parse(savedItemsString);
        if (Array.isArray(savedItems)) {
          return savedItems;
        }
      }
    } catch (error) {
      console.error("Error loading items from localStorage:", error);
    }
    return [];
  });

  const [maxId, setMaxId] = useState(() => {
    try {
      const savedMaxIdString = localStorage.getItem(LOCAL_STORAGE_MAX_ID_KEY);
      if (savedMaxIdString) {
        const savedMaxId = parseInt(savedMaxIdString, 10);
        if (!isNaN(savedMaxId)) {
          return savedMaxId;
        }
      }
    } catch (error) {
      console.error("Error loading maxId from localStorage:", error);
    }
    return 0;
  });

  const activeCount = items.filter((item) => item.status === "active").length;

  // Save items to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_ITEMS_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Error saving items to localStorage:", error);
    }
  }, [items]);

  // Save maxId to localStorage whenever maxId changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_MAX_ID_KEY, maxId.toString());
    } catch (error) {
      console.error("Error saving maxId to localStorage:", error);
    }
  }, [maxId]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        // Minimum drag distance
        distance: 10,
      },
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex(
      (item) => item.id.toString() === active.id
    );
    const newIndex = items.findIndex((item) => item.id.toString() === over.id);
    setItems((items) => arrayMove(items, oldIndex, newIndex));
  }

  function addItem(text: string) {
    setItems((items) => [
      ...items,
      { text: text, status: "active", id: maxId },
    ]);
    setMaxId((id) => id + 1);
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
      <div className="relative z-1 container mx-auto flex flex-col items-center max-w-lg bg-image bg-no-repeat">
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
            items={items.map((item) => item.id.toString())}
            strategy={verticalListSortingStrategy}
          >
            <ul className="bg-todo-bgColor todo-rounded-md overflow-hidden shadow-md w-full">
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

        <div className="w-full flex flex-col gap-y-4 bg-transparent sm:flex-row sm:gap-x-4 sm:gap-y-0 sm:bg-todo-bgColor sm:p-4 sm:justify-between sm:rounded-md sm:shadow-md">
          <div className="flex justify-between items-center bg-todo-bgColor p-4 sm:p-0 sm:contents sm:bg-transparent shadow-md sm:shadow-none rounded-b-md sm:rounded-b-none">
            <p className="sm:order-1 text-neutralColor">
              {activeCount} items left
            </p>
            <button
              className="sm:order-3 text-neutralColor cursor-pointer"
              onClick={removeCompleted}
            >
              Clear completed
            </button>
          </div>

          {/* Transparent on mobile to show gap */}
          <div className="h-4 bg-transparent sm:hidden" />

          <div className="flex justify-center items-center bg-todo-bgColor p-4 sm:contents sm:bg-transparent sm:p-0 rounded-md shadow-md sm:rounded-none sm:shadow-none">
            <div className="flex gap-x-2 sm:order-2 text-activeColor">
              <button
                className="display-button"
                onClick={() => setDisplayMode("all")}
              >
                All
              </button>
              <button
                className="display-button"
                onClick={() => setDisplayMode("active")}
              >
                Active
              </button>
              <button
                className="display-button"
                onClick={() => setDisplayMode("completed")}
              >
                Completed
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-neutralColor">Drag and drop to reorder list</p>
        </div>
      </div>
    </div>
  );
}

export default App;
