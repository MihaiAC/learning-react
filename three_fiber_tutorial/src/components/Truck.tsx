import { ColorRepresentation, Group } from "three";
import { tileSize } from "../constants";
import Wheel from "./Wheel";
import { useRef } from "react";
import useVehicleAnimation from "../hooks/useVehicleAnimation";
import useHitDetection from "../hooks/useHitDetection";

export const truckTileLength = 5;

type Props = {
  rowIndex: number;
  initialTileIndex: number;
  direction: boolean;
  speed: number;
  color: ColorRepresentation;
};

// Same as car.
export function Truck({
  rowIndex,
  initialTileIndex,
  direction,
  speed,
  color,
}: Props) {
  const truck = useRef<Group>(null);
  useVehicleAnimation(truck, direction, speed);
  useHitDetection(truck, rowIndex);

  return (
    <group
      position-x={initialTileIndex * tileSize}
      rotation-z={direction ? 0 : Math.PI}
      ref={truck}
    >
      <mesh position={[-15, 0, 25]} castShadow receiveShadow>
        <boxGeometry args={[70, 35, 35]} />
        <meshLambertMaterial color={0xb4c6fc} flatShading />
      </mesh>
      <mesh position={[35, 0, 20]} castShadow receiveShadow>
        <boxGeometry args={[30, 30, 30]} />
        <meshLambertMaterial color={color} flatShading />
      </mesh>
      <Wheel x={-35} />
      <Wheel x={5} />
      <Wheel x={37} />
    </group>
  );
}
