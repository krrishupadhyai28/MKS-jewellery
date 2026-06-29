import { FiX } from "react-icons/fi";

function ImageLightbox({ open, image, onClose }) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-6"
    >
      <button
        onClick={onClose}
        className="absolute right-6 top-6 rounded-full bg-white p-3"
      >
        <FiX size={24} />
      </button>

      <img
        src={image}
        alt=""
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] max-w-[90vw] rounded-3xl object-contain"
      />
    </div>
  );
}

export default ImageLightbox;