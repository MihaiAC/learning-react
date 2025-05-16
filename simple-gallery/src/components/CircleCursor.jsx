import { useEffect, useRef } from "react";

export default function CircleCursor() {
  const dotRef = useRef(null);
  const grayRingRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = grayRingRef.current;

    let targetX = 0;
    let targetY = 0;
    let ringX = 0;
    let ringY = 0;

    const moveCursor = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;

      dot.style.transform = `translate(${targetX}px, ${targetY}px)`;
    };

    window.addEventListener("mousemove", moveCursor);

    function animate() {
      ringX += (targetX - ringX) * 0.15;
      ringY += (targetY - ringY) * 0.15;

      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <>
      <div
        ref={grayRingRef}
        className="fixed opacity-50 top-0 left-0 z-40 w-10 h-10 rounded-full border border-gray-500 pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
      ></div>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-50 w-2 h-2 rounded-full bg-black pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
}
