import type { MoveDirection } from "../types";
import { endsUpInValidPosition } from "../utilities/endsUpInValidPosition";
import useMapStore from "./map";
import useGameStore from "./game";
import { Object3D } from "three";

export const state: {
  currentRow: number;
  currentTile: number;
  movesQueue: MoveDirection[];
  ref: Object3D | null;
} = {
  currentRow: 0,
  currentTile: 0,
  movesQueue: [],
  ref: null,
};

export function setRef(ref: Object3D) {
  state.ref = ref;
}

// Queue player input.
export function queueMove(direction: MoveDirection) {
  // Check if move is valid.
  const isValidMove = endsUpInValidPosition(
    { rowIndex: state.currentRow, tileIndex: state.currentTile },
    [...state.movesQueue, direction]
  );

  if (!isValidMove) {
    return;
  }

  state.movesQueue.push(direction);
}

// Remove first movement command + move player.
export function stepCompleted() {
  const direction = state.movesQueue.shift();

  if (direction === "forward") {
    state.currentRow += 1;
  }

  if (direction === "left") {
    state.currentTile -= 1;
  }

  if (direction === "right") {
    state.currentTile += 1;
  }

  // TODO: is player supposed to be able to go backward?
  if (direction === "backward") {
    state.currentRow -= 1;
  }

  // Add new rows if player is running out of them.
  // TODO: How to clean up rows that are way behind?
  if (state.currentRow === useMapStore.getState().rows.length - 10) {
    useMapStore.getState().addRows();
  }

  // Update score.
  useGameStore.getState().updateScore(state.currentRow);
}
