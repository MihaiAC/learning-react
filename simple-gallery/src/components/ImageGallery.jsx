import { useRef, useEffect } from "react"; // Removed useState
import { motion, AnimatePresence } from "framer-motion";
import { CloseIcon } from "./CloseIcon";

// Accept selectedImage and setSelectedImage as props
export default function ImageGallery({
  images,
  selectedImage,
  setSelectedImage,
}) {
  const scrollRef = useRef(null);
  const SCROLL_SPEED = 1.5;

  // Local selectedImage state is removed

  useEffect(() => {
    const gallery = scrollRef.current;
    if (!gallery) return;

    const onWheel = (event) => {
      if (
        window.innerWidth >= 1024 &&
        gallery.classList.contains("lg:overflow-x-auto")
      ) {
        if (
          gallery.contains(event.target) &&
          !event.target.closest(".description-panel-class")
        ) {
          event.preventDefault();
          gallery.scrollTo({
            left: gallery.scrollLeft + event.deltaY * SCROLL_SPEED,
            behavior: "smooth",
          });
        }
      }
    };
    gallery.addEventListener("wheel", onWheel, { passive: false });
    return () => gallery.removeEventListener("wheel", onWheel);
  }, [SCROLL_SPEED]);

  const handleRightClick = (event, image) => {
    event.preventDefault();
    setSelectedImage(image);
  };

  const handleClose = (event) => {
    event.preventDefault();
    setSelectedImage(null);
  };

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  return (
    <>
      <div
        ref={scrollRef}
        className="
          flex flex-col
          w-full
          flex-grow
          lg:flex-grow-0
          lg:flex-row lg:flex-nowrap
          lg:h-screen
          lg:overflow-x-auto lg:overflow-y-hidden
          space-y-16 lg:space-y-0
          lg:space-x-16
          py-16 px-16
        "
      >
        {images.map((image) => (
          <div
            key={image.id}
            data-image-wrapper="true" // Added data attribute for hover detection
            onContextMenu={(e) => handleRightClick(e, image)}
            className="
              w-full flex-shrink-0
              lg:w-auto
              lg:h-full
              flex items-center justify-center
              shadow-lg group
              transition-all duration-300 ease-out
              hover:shadow-xl
            "
          >
            <img
              src={image.src}
              alt={image.title || `Image ${image.id}`}
              className="
                w-full object-contain
                lg:w-auto
                lg:h-full
                transition-transform duration-300 ease-out
                group-hover:scale-103
              "
            />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && ( // Use prop
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(event) => handleClose(event)}
              onContextMenu={(event) => handleClose(event)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40" // Backdrop z-index: 40
            />

            <motion.div
              key="description-panel"
              className="description-panel-class
                fixed bottom-0 left-0 right-0
                p-6 pt-8 sm:p-8 sm:pt-10
                bg-slate-800/75 dark:bg-black/65 text-white
                backdrop-blur-xl shadow-2xl
                z-50 rounded-t-xl sm:rounded-t-2xl
                flex flex-col max-h-[60vh] sm:max-h-[50vh] overflow-y-auto" // Panel z-index: 50
              initial={{ y: "100%", opacity: 0.5 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: { duration: 0.5, ease: "circOut" },
              }}
              exit={{
                y: "100%",
                opacity: 0,
                transition: { duration: 0.3, ease: "circIn" },
              }}
            >
              <button
                onClick={handleClose}
                className="
                  absolute top-3 right-3 sm:top-4 sm:right-4
                  p-2 rounded-full text-gray-300 hover:text-white
                  hover:bg-white/10 transition-colors
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-white
                "
                aria-label="Close description"
              >
                <CloseIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <h2 className="text-xl sm:text-2xl font-semibold mb-1">
                {selectedImage.title}
              </h2>
              <p className="text-sm sm:text-base text-gray-300 mb-3">
                {selectedImage.place} – {selectedImage.year}
              </p>
              {selectedImage.explanation && (
                <p className="text-base sm:text-lg text-gray-200 leading-relaxed">
                  {selectedImage.explanation}
                </p>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
