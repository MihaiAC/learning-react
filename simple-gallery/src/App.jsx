import { useMemo, useState } from "react";
import ImageGallery from "./components/ImageGallery";
import CircleCursor from "./components/CircleCursor";
import { imageDetailsData } from "./data/imageDetails";

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = useMemo(() => {
    const imageModules = import.meta.glob("./assets/*.svg", { eager: true });

    return Object.entries(imageModules).map(([path, module]) => {
      const filename = path.split("/").pop().replace(".svg", "");
      const details = imageDetailsData[filename] || {
        title: `Image ${filename}`,
        place: "Unknown Place",
        year: "N/A",
        explanation: "No description available.",
      };

      return {
        id: filename,
        src: module.default,
        ...details,
      };
    });
  }, []);

  return (
    <div className="app-wrapper flex flex-col h-full bg-gray-100">
      <CircleCursor isModalOpen={!!selectedImage} />
      <ImageGallery
        images={images}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </div>
  );
}
