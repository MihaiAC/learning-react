// App.jsx
import { useMemo } from "react";
import ImageGallery from "./ImageGallery";

export default function App() {
  const images = useMemo(() => {
    const modules = import.meta.glob("./assets/*.svg", { eager: true });
    return Object.values(modules).map((mod) => mod.default);
  }, []);

  return (
    <div className="min-h-screen">
      <ImageGallery images={images} />
    </div>
  );
}
