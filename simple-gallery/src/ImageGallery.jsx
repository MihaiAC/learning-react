import { useRef, useEffect } from "react";

export default function ImageGallery({ images }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;

    if (!el) return;

    const onWheel = (e) => {
      // Only trigger on large screens
      if (window.innerWidth >= 1024) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });

    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div
      ref={scrollRef}
      className="flex flex-col lg:flex-row lg:overflow-x-scroll h-screen w-full"
    >
      {images.map((src, i) => (
        <div
          key={i}
          className="w-full h-screen lg:w-1/2 lg:h-full flex-shrink-0"
        >
          <img
            src={src}
            alt={`rect-${i + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
