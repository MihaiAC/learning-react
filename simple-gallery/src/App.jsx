import { useMemo } from "react";
import ImageGallery from "./ImageGallery";
import CircleCursor from "./components/CircleCursor";

export default function App() {
  const images = useMemo(() => {
    const modules = import.meta.glob("./assets/*.svg", { eager: true });
    return Object.values(modules).map((mod) => mod.default);
  }, []);

  return (
    <div className="min-h-screen">
      <CircleCursor />
      <ImageGallery images={images} />
    </div>
  );
}
