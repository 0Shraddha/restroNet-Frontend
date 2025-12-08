// components/Modal.js
export default function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-[9999]  bg-black/40 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 relative my-4">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}
