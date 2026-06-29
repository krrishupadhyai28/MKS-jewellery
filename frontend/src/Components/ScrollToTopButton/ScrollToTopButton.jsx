import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

function ScrollToTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!show) return null;

  return (
    <button
      onClick={scrollTop}
      className="fixed bottom-6 right-6 z-50 rounded-full bg-[#C9A227] p-4 text-white shadow-xl transition-all duration-300 hover:scale-110 hover:bg-black"
    >
      <FiArrowUp size={22} />
    </button>
  );
}

export default ScrollToTopButton;