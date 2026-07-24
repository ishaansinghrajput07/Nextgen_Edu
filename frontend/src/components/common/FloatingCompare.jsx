import { Link } from "react-router-dom";

import {
  useCompare,
} from "../../context/CompareContext";

export default function FloatingCompare() {
  const {
    compareItems,
  } = useCompare();

  if (
    compareItems.length === 0
  )
    return null;

  return (
    <div
      className="
      fixed
      bottom-5
      left-1/2
      -translate-x-1/2
      z-50
      glass
      px-6
      py-4
      rounded-2xl
      flex
      items-center
      gap-4
      shadow-2xl
      "
    >
      <span>
        {compareItems.length}
        {" "}
        Universities Selected
      </span>

      <Link
        to="/compare"
        className="
        bg-cyan-500
        px-5
        py-2
        rounded-xl
        hover:bg-cyan-600
        "
      >
        Compare Now
      </Link>
    </div>
  );
}