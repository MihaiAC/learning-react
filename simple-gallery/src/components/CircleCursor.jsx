import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

const LERP_FACTOR = 0.15; // Make LERP_FACTOR a constant outside

export default function CircleCursor({ isModalOpen }) {
  const dotRef = useRef(null);
  const grayRingRef = useRef(null);
  const titleRef = useRef(null);

  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [hoveredImageTitle, setHoveredImageTitle] = useState(null);

  // Refs for mouse position and smoothed ring/title position
  const mouseX = useRef(
    typeof window !== "undefined" ? window.innerWidth / 2 : 0
  );
  const mouseY = useRef(
    typeof window !== "undefined" ? window.innerHeight / 2 : 0
  );
  const ringSmoothedX = useRef(
    typeof window !== "undefined" ? window.innerWidth / 2 : 0
  );
  const ringSmoothedY = useRef(
    typeof window !== "undefined" ? window.innerHeight / 2 : 0
  );

  // Effect to clear title when modal opens/closes or hover state changes
  useEffect(() => {
    if (isModalOpen || !isHoveringImage) {
      if (hoveredImageTitle !== null) {
        setHoveredImageTitle(null);
      }
    }
  }, [isModalOpen, isHoveringImage, hoveredImageTitle]);

  // Effect for handling global mouseover to detect image hover
  useEffect(() => {
    const checkHoverGlobal = (event) => {
      const hoveredElement = event.target.closest(
        '[data-image-wrapper="true"]'
      );
      if (hoveredElement) {
        setIsHoveringImage(true);
        const title = hoveredElement.dataset.imageTitle;
        if (title) {
          setHoveredImageTitle(title);
        } else {
          setHoveredImageTitle(null);
        }
      } else {
        setIsHoveringImage(false);
        setHoveredImageTitle(null);
      }
    };

    window.addEventListener("mouseover", checkHoverGlobal);
    // Handle mouse leaving window to reset hover state
    const handleMouseLeaveWindow = () => {
      setIsHoveringImage(false);
      setHoveredImageTitle(null);
    };
    document.documentElement.addEventListener(
      "mouseleave",
      handleMouseLeaveWindow
    );

    return () => {
      window.removeEventListener("mouseover", checkHoverGlobal);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeaveWindow
      );
    };
  }, []);

  // Effect for cursor movement and animation
  useEffect(() => {
    const dot = dotRef.current;
    const ring = grayRingRef.current;
    const titleEl = titleRef.current;

    if (!dot || !ring) {
      return;
    }

    const moveListener = (event) => {
      mouseX.current = event.clientX;
      mouseY.current = event.clientY;

      // Dot position is immediate
      dot.style.left = `${mouseX.current}px`;
      dot.style.top = `${mouseY.current}px`;
    };

    window.addEventListener("mousemove", moveListener);

    let animationFrameId;
    const animate = () => {
      // LERP the ring's position
      ringSmoothedX.current +=
        (mouseX.current - ringSmoothedX.current) * LERP_FACTOR;
      ringSmoothedY.current +=
        (mouseY.current - ringSmoothedY.current) * LERP_FACTOR;

      ring.style.left = `${ringSmoothedX.current}px`;
      ring.style.top = `${ringSmoothedY.current}px`;

      if (titleEl) {
        if (hoveredImageTitle && !isModalOpen) {
          const ringCurrentWidth = ring.offsetWidth;
          const ringRadius = ringCurrentWidth / 2 || 20; // Fallback radius
          const offset = 5;

          titleEl.style.left = `${ringSmoothedX.current + ringRadius * 0.707 + offset}px`;
          titleEl.style.top = `${ringSmoothedY.current + ringRadius * 0.707 + offset}px`;
          titleEl.style.opacity = "1";
        } else {
          titleEl.style.opacity = "0";
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    // Initialize ringSmoothed positions to current mouse to prevent initial jump from (0,0)
    // ringSmoothedX.current = mouseX.current;
    // ringSmoothedY.current = mouseY.current;

    animationFrameId = requestAnimationFrame(animate); // Start animation

    return () => {
      window.removeEventListener("mousemove", moveListener);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isModalOpen, hoveredImageTitle]);

  return (
    <>
      <div
        ref={grayRingRef}
        className={clsx(
          "fixed top-0 left-0 z-[51] w-10 h-10 rounded-full border",
          "pointer-events-none transform -translate-x-1/2 -translate-y-1/2",
          "transition-all duration-200 ease-out",
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
          "fixed top-0 left-0 z-[52] w-2 h-2 rounded-full bg-black",
          "pointer-events-none transform -translate-x-1/2 -translate-y-1/2",
          "transition-opacity duration-200 ease-out",
          { "opacity-0": isHoveringImage || isModalOpen }
        )}
      />
      <div
        ref={titleRef}
        className={clsx(
          "fixed top-0 left-0 z-[52] pointer-events-none",
          "text-white text-5xl font-bold whitespace-nowrap px-2 py-1 rounded",
          "transition-opacity duration-200 ease-out opacity-0",
          "text-outline-black-css"
        )}
      >
        {hoveredImageTitle}
      </div>
    </>
  );
}
