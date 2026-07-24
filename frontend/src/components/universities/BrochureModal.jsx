import Modal from "../common/Modal";

export default function BrochureModal({ isOpen, onClose, university }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-3xl font-bold mb-4">Download Brochure</h2>

      <p className="mb-6 text-gray-400">{university?.name}</p>

      <div className="space-y-4">
        <input
          placeholder="Name"
          className="
          w-full
          p-4
          rounded-xl
          bg-black/20
          "
        />

        <input
          placeholder="Phone Number"
          className="
          w-full
          p-4
          rounded-xl
          bg-black/20
          "
        />

        <button
          className="
          w-full
          bg-purple-500
          py-4
          rounded-xl
          hover:bg-purple-600
          transition
          "
        >
          Download PDF
        </button>
      </div>
    </Modal>
  );
}
