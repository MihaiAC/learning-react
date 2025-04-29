import { useState, useEffect } from "react";
import { CardData } from "./data/CardData";
import { DisplayState } from "./data/DisplayState";
import data from "./data/data.json";
import Card from "./components/Card";
import { useTheme } from "./ui/hooks/useTheme";
import { ToggleButton } from "./ui/ToggleButton";

function App() {
  const [cards, setCards] = useState([]);
  const [displayState, setDisplayState] = useState(DisplayState.all);
  const { theme, toggleTheme, isDark } = useTheme();

  // Read the card data from data.json.
  useEffect(() => {
    const cardData = data.map(
      (item, idx) => new CardData(idx, item.logo, item.name, item.description)
    );

    setCards(cardData);
  }, []);

  function removeCard(id) {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  }

  return (
    <div className="min-h-screen w-full gradient-bg">
      <div className="container mx-auto">
        <section id="header" className="mx-4">
          <div className="flex flex-row justify-between w-full bg-primary rounded-xl p-2">
            <div className="flex items-center gap-2">
              <img
                src="assets/images/logo.svg"
                alt="Company logo"
                className="h-8 w-8"
              />
              <h1 className="font-bold text-xl">Extensions</h1>
            </div>

            <ToggleButton />
          </div>
        </section>
        <section id="cards">
          <div
            id="display-controls"
            className="flex items-center justify-between"
          >
            <h1>Extensions List</h1>
            <div id="controls-buttons">
              <button type="button" className="btn">
                All
              </button>
              <button type="button" className="btn">
                Active
              </button>
              <button type="button" className="btn">
                Inactive
              </button>
            </div>
          </div>
          <div id="cards">
            <button onClick={() => setDisplayState(DisplayState.all)}>
              All
            </button>
            <button onClick={() => setDisplayState(DisplayState.active)}>
              Active
            </button>
            <button onClick={() => setDisplayState(DisplayState.inactive)}>
              Inactive
            </button>

            {cards.map((card) => (
              <Card
                key={card.id}
                card={card}
                displayState={displayState}
                removeSelf={() => removeCard(card.id)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
