import { useEffect, useState } from "react";
import { X } from "lucide-react";
import ContactForm from "../contact/ContactForm";

export default function ContactPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 45000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-600 shadow-lg transition hover:bg-slate-100 hover:text-slate-900"
          aria-label="Close contact form"
        >
          <X size={22} />
        </button>

        <ContactForm
          isPopup={true}
          onSuccess={handleClose}
        />
      </div>
    </div>
  );
}