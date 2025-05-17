import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

export default function CircleCursor() {
  const dotRef = useRef(null);
  const grayRingRef = useRef(null);

  const [isHoveringImage, setIsHoveringImage] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = grayRingRef.current;

    // Null refs.
    if (!dot || !ring) {
      return;
    }

    let targetX = 0;
    let targetY = 0;
    let ringX = 0;
    let ringY = 0;

    // Define lerp factor for ring animation
    const LERP_FACTOR = 0.15;

    const moveCursor = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;

      // Instantly move the dot to the cursor position
      // The -translate-x-1/2 -translate-y-1/2 in CSS centers it
      dot.style.left = `${targetX}px`;
      dot.style.top = `${targetY}px`;
    };

    window.addEventListener("mousemove", moveCursor);

    const checkHover = (event) => {
      const isOverImage = event.target.tagName === "IMG";
      setIsHoveringImage(isOverImage);
    };

    window.addEventListener("mouseover", checkHover);

    let animationFrameId;
    function animate() {
      // Apply LERP for smooth ring movement
      ringX += (targetX - ringX) * LERP_FACTOR;
      ringY += (targetY - ringY) * LERP_FACTOR;

      // Apply transform to center the ring
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
          "fixed top-0 left-0 z-40 w-10 h-10 rounded-full border",
          "pointer-events-none transform -translate-x-1/2 -translate-y-1/2",
          "transition-all duration-200 ease-out",
          !isHoveringImage
            ? "border-gray-500 opacity-50 scale-100 bg-transparent"
            : "border-gray-500 bg-gray-500 opacity-80 scale-150"
        )}
      />
      <div
        ref={dotRef}
        className={clsx(
          "fixed top-0 left-0 z-50 w-2 h-2 rounded-full bg-black",
          "pointer-events-none transform -translate-x-1/2 -translate-y-1/2",
          "transition-opacity duration-200 ease-out",
          { "opacity-0": isHoveringImage }
        )}
      />
    </>
  );
}
