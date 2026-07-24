import { Link } from "react-router-dom";

export default function FloatingAdmission() {
  return (
    <div
      className="
      fixed
      bottom-5
      right-5
      z-50
      "
    >
      <Link
        to="/contact"
        className="
        bg-cyan-500
        hover:bg-cyan-600
        text-white
        px-6
        py-4
        rounded-2xl
        shadow-2xl
        font-semibold
        flex
        items-center
        gap-2
        transition
        "
      >
        🎓 Free Counselling
      </Link>
    </div>
  );
}