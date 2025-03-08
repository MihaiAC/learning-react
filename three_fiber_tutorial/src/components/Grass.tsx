import { tilesPerRow, tileSize } from "../constants";

type Props = {
  rowIndex: number;
  children?: React.ReactNode;
};

// Flat, wide, green box.
// As the game progresses, rowIndex will increase.
export function Grass({ rowIndex, children }: Props) {
  return (
    <group position-y={rowIndex * tileSize}>
      <mesh>
        <boxGeometry args={[tilesPerRow * tileSize, tileSize, 3]} />
        <meshLambertMaterial color={0xbaf455} flatShading />
      </mesh>
      {children}
    </group>
  );
}
