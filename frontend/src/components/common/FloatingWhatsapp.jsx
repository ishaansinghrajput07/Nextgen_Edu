import { MessageCircle } from "lucide-react";

export default function FloatingWhatsapp() {
  return (
    <a
      href="https://wa.me/919999999999"
      target="_blank"
      rel="noreferrer"
      className="
      fixed
      bottom-20
      right-6
      z-[999]
      bg-green-500
      p-4
      rounded-full
      shadow-lg
      hover:scale-110
      transition
      animate-pulse
      "
    >
      <MessageCircle
        size={28}
        className="text-white"
      />
    </a>
  );
}