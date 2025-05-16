import { useRef, useEffect } from "react";

export default function ImageGallery({ images }) {
  const scrollRef = useRef(null);
  const SCROLL_SPEED = 1.5; // ← tweak this to go faster (>1) or slower (<1)

  useEffect(() => {
    const gallery = scrollRef.current;
    const onWheel = (event) => {
      if (window.innerWidth >= 1024) {
        event.preventDefault();
        gallery.scrollTo({
          left: gallery.scrollLeft + event.deltaY * SCROLL_SPEED,
          behavior: "smooth",
        });
      }
    };
    gallery.addEventListener("wheel", onWheel, { passive: false });
    return () => gallery.removeEventListener("wheel", onWheel);
  }, [SCROLL_SPEED]);

  return (
    <div
      ref={scrollRef}
      className="
        flex flex-col
        lg:flex-row lg:flex-nowrap lg:overflow-x-auto lg:overflow-y-hidden
        h-screen w-full
        space-y-16 lg:space-y-0
        lg:space-x-16
        py-16 px-16
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
            className="w-full lg:w-auto h-auto lg:h-screen object-contain"
          />
        </div>
      ))}
    </div>
  );
}
