import { useEffect, useState } from "react";
import { getTrustedUniversities } from "../../../services/universityService";
import UniversityLogoCard from "./UniversityLogoCard"; // Yahan logo card import hoga

function MarqueeRow({ universities, direction = "left" }) {
  const items = [
    ...universities,
    ...universities,
    ...universities,
    ...universities,
  ];

  return (
    <div className="relative w-full overflow-visible">
      {/* Left Fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-20 h-full w-12 bg-gradient-to-r from-white to-transparent sm:w-20"
      />

      {/* Right Fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 z-20 h-full w-12 bg-gradient-to-l from-white to-transparent sm:w-20"
      />

      {/* Marquee Track */}
      <div
        className={`university-marquee-track flex w-max items-center gap-4 ${
          direction === "right"
            ? "university-marquee-right"
            : "university-marquee-left"
        }`}
      >
        {items.map((university, index) => (
          <UniversityLogoCard
            key={`${university._id || index}-${direction}-${index}`}
            university={university}
          />
        ))}
      </div>
    </div>
  );
}

export default function UniversitySlider() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  // BACKEND API UNTOUCHED
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        setLoading(true);
        const res = await getTrustedUniversities();
        setUniversities(res.universities || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#205a4c] border-t-transparent" />
      </div>
    );
  }

  if (!universities.length) {
    return null;
  }

  const row1 = universities.filter((_, index) => index % 2 === 0);
  const row2 = universities.filter((_, index) => index % 2 !== 0);

  return (
    <div
      style={{
        paddingTop: "45px",
        paddingBottom: "55px",
        paddingLeft: "30px",
        paddingRight: "30px",
        marginTop: "0px",
        marginBottom: "0px"
      }}
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden bg-white"
    >
      <div className="flex flex-col gap-4">
        {/* ROW 1 — RIGHT */}
        <MarqueeRow universities={row1} direction="right" />

        {/* ROW 2 — LEFT */}
        {row2.length > 0 && (
          <MarqueeRow universities={row2} direction="left" />
        )}
      </div>

      <style>{`
        .university-marquee-track {
          will-change: transform;
        }

        .university-marquee-left {
          animation: universityMarqueeLeft 35s linear infinite;
        }

        .university-marquee-right {
          animation: universityMarqueeRight 35s linear infinite;
        }

        .university-marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes universityMarqueeLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes universityMarqueeRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        @media (max-width: 640px) {
          .university-marquee-left,
          .university-marquee-right {
            animation-duration: 22s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .university-marquee-left,
          .university-marquee-right {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}