import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

const ArrowButtonUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 p-3 bg-red-800 rounded-full text-white shadow-lg hover:bg-red-900 transition z-20"
        >
          <ChevronUp className="w-8 h-8" />
        </button>
      )}
    </>
  );
};

export default ArrowButtonUp;
