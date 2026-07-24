import {
  CheckCircle,
  GraduationCap,
  BookOpen,
  Award,
} from "lucide-react";

export default function EligibilityCriteria() {
  return (
    <>
      <style>{`
        @keyframes borderGlow{
          0%{
            box-shadow:
            0 0 10px rgba(34,211,238,.20),
            0 0 20px rgba(34,211,238,.08);
          }

          50%{
            box-shadow:
            0 0 18px rgba(168,85,247,.30),
            0 0 35px rgba(34,211,238,.15);
          }

          100%{
            box-shadow:
            0 0 10px rgba(34,211,238,.20),
            0 0 20px rgba(34,211,238,.08);
          }
        }

        .glow-card{
          animation:borderGlow 3s ease-in-out infinite;
          border:1px solid rgba(255,255,255,.10);
          transition:.35s;
          backdrop-filter:blur(18px);
        }

        .glow-card:hover{
          transform:translateY(-8px);
        }

        .hero-box{
          background:
          linear-gradient(
            135deg,
            rgba(6,182,212,.10),
            rgba(168,85,247,.08)
          );
        }
      `}</style>

      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">

          {/* HERO */}
          <div className="glow-card hero-box rounded-[40px] p-12 md:p-16 text-center">

            <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/15 text-cyan-400 font-medium mb-6">
              Eligibility Criteria
            </span>

            <h1 className="text-5xl md:text-6xl font-bold">
              Eligibility Criteria
            </h1>

            <p
              className="mt-6 max-w-3xl mx-auto text-lg leading-8"
              style={{ color: "var(--text-secondary)" }}
            >
              Minimum eligibility requirements for Undergraduate and Postgraduate courses.
            </p>

          </div>

          {/* UG */}
          <div className="glow-card glass rounded-3xl p-10 mt-14">

            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <GraduationCap className="text-cyan-400" />
              Undergraduate (UG) Courses
            </h2>

            <div className="flex gap-3">
              <CheckCircle className="text-green-400 mt-1" />
              <p style={{ color: "var(--text-secondary)" }}>
                Candidates who have passed Class XII with at least 50% aggregate marks
                are eligible for UG admission.
              </p>
            </div>

          </div>

          {/* PG */}
          <div className="glow-card glass rounded-3xl p-10 mt-14">

            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <BookOpen className="text-purple-400" />
              Postgraduate (PG) Courses
            </h2>

            <div className="flex gap-3">
              <CheckCircle className="text-green-400 mt-1" />
              <p style={{ color: "var(--text-secondary)" }}>
                Candidates who have completed a graduation degree from a recognized
                university are eligible to apply for PG courses.
              </p>
            </div>

          </div>

          {/* NOTE */}
          <div className="glow-card glass rounded-3xl p-10 mt-14 text-center">

            <h2 className="text-3xl font-bold mb-4">
              Important Note
            </h2>

            <p
              className="text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              Eligibility criteria may vary depending on the course and university requirements.
            </p>

          </div>

        </div>
      </section>
    </>
  );
}