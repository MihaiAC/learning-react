import { useRef, useEffect } from "react";

export default function ImageGallery({ images }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    const onWheel = (e) => {
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
      className="
        flex flex-col
        lg:flex-row lg:flex-nowrap lg:overflow-x-auto lg:overflow-y-hidden
        h-screen w-full
        space-y-16 lg:space-y-0
        lg:space-x-16
        p-16
      "
    >
      {images.map((src, idx) => (
        <div
          key={idx}
          className="w-full lg:w-auto h-auto lg:h-screen flex-shrink-0 flex items-center justify-center shadow-lg"
        >
          <img
            src={src}
            alt={`rect-${idx + 1}`}
            className="w-full lg:w-auto h-auto lg:h-screen  object-contain"
          />
        </div>
      ))}
    </div>
  );
}
