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

        {/* Plain-Tailwind toggle, thumb as sibling */}
        <label className="relative inline-flex items-center cursor-pointer ml-4">
          {/* Hidden checkbox */}
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="sr-only peer"
          />

          {/* Track */}
          <div className="w-11 h-6 bg-gray-300 rounded-full transition-colors duration-200 peer-checked:bg-accent peer-focus:ring-2 peer-focus:ring-accent border-2 border-secondary peer-focus:border-2 peer-focus:border-primary" />

          {/* Thumb */}
          <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-5" />
        </label>
      </div>
    </div>
  );
}
