export default function Modal({
  isOpen,
  onClose,
  children,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="
      fixed
      inset-0
      z-50
      bg-black/70
      flex
      items-center
      justify-center
      p-4
      "
    >
      <div
        className="
        glass
        w-full
        max-w-lg
        rounded-3xl
        p-8
        relative
        "
      >
        <button
          onClick={onClose}
          className="
          absolute
          right-5
          top-5
          text-2xl
          "
        >
          ×
        </button>

        {children}
      </div>
    </div>
  );
}