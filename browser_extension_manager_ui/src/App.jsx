import { useState, useEffect } from "react";
import { CardData } from "./data/CardData";
import { DisplayState } from "./data/DisplayState";
import data from "./data/data.json";
import Card from "./components/Card";
import { useTheme } from "./ui/hooks/useTheme";

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
    <div className={"min-h-screen w-full gradient-bg"}>
      <button onClick={() => setDisplayState(DisplayState.all)}>All</button>
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
  );
}

export default App;
