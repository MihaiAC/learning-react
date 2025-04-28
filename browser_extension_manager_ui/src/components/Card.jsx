/* eslint-disable react/prop-types */
import { useState } from "react";
import { DisplayState } from "../data/DisplayState";

export default function Card({ card, displayState, removeSelf }) {
  const [isActive, setIsActive] = useState(true);

  if (
    (displayState === DisplayState.active && !isActive) ||
    (displayState === DisplayState.inactive && isActive)
  ) {
    return null;
  }

  return (
    <div className="card">
      <img className="w-16 h-16" src={card.logo} alt={card.name} />
      <h3>{card.name}</h3>
      <p>{card.description}</p>
      <button onClick={() => removeSelf()}>Remove</button>
    </div>
  );
}
