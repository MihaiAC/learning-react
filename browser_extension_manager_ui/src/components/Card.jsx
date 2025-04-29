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
    <div className="bg-primary rounded-2xl p-4 border-neutral border shadow-md flex flex-col space-y-4">
      <div className="flex space-x-4">
        <img className="w-16 h-16" src={card.logo} alt={card.name} />
        <div className="flex flex-col space-y-2">
          <h3 className="font-bold text-lg">{card.name}</h3>
          <p className="text-sm w-3/4">{card.description}</p>
        </div>
      </div>

      <div className="flex items-center">
        <button onClick={() => removeSelf()}>Remove</button>
        <input
          type="checkbox"
          defaultChecked={isActive}
          className="toggle toggle-primary w-1/2 h-1/2"
          onChange={(e) => setIsActive(e.target.checked)}
        />
      </div>
    </div>
  );
}
