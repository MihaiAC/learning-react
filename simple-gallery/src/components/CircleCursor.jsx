import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Accept isModalOpen prop
export default function CircleCursor({ isModalOpen }) {
  const dotRef = useRef(null);
  const grayRingRef = useRef(null);

  const [isHoveringImage, setIsHoveringImage] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = grayRingRef.current;

    if (!dot || !ring) {
      return;
    }

    let targetX = 0;
    let targetY = 0;
    let ringX = 0;
    let ringY = 0;

    const LERP_FACTOR = 0.15;

    const moveCursor = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;

      dot.style.left = `${targetX}px`;
      dot.style.top = `${targetY}px`;
    };

    window.addEventListener("mousemove", moveCursor);

    const checkHover = (event) => {
      // Updated hover detection: check for the data-image-wrapper attribute
      const isOverImageArea = !!event.target.closest(
        '[data-image-wrapper="true"]'
      );
      setIsHoveringImage(isOverImageArea);
    };

    window.addEventListener("mouseover", checkHover);

    let animationFrameId;
    function animate() {
      ringX += (targetX - ringX) * LERP_FACTOR;
      ringY += (targetY - ringY) * LERP_FACTOR;

      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", checkHover);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div
        ref={grayRingRef}
        className={clsx(
          // Increased z-index to be above modal elements (backdrop z-40, panel z-50)
          "fixed top-0 left-0 z-[51] w-10 h-10 rounded-full border",
          "pointer-events-none transform -translate-x-1/2 -translate-y-1/2",
          "transition-all duration-200 ease-out",
          // Conditional styling based on isModalOpen, then isHoveringImage
          isModalOpen
            ? "border-gray-300 bg-gray-300 opacity-80 scale-150"
            : isHoveringImage
              ? "border-gray-500 bg-gray-500 opacity-80 scale-150"
              : "border-gray-500 opacity-50 scale-100 bg-transparent"
        )}
      />
      <div
        ref={dotRef}
        className={clsx(
          // Increased z-index to be above modal panel and ring
          "fixed top-0 left-0 z-[52] w-2 h-2 rounded-full bg-black",
          "pointer-events-none transform -translate-x-1/2 -translate-y-1/2",
          "transition-opacity duration-200 ease-out",
          // Dot disappears if hovering image area OR if modal is open
          { "opacity-0": isHoveringImage || isModalOpen }
        )}
      />
    </>
  );
}
