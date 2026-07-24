import {
  FileText,
  CheckCircle,
  Award,
  IdCard,
  BookOpen,
  UserCheck,
  MapPin,
  AlertCircle,
} from "lucide-react";

export default function HowToApply() {
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

        .icon-box{
          transition:.35s;
        }

        .glow-card:hover .icon-box{
          transform:scale(1.12) rotate(-5deg);
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
              Admission Guide
            </span>

            <h1 className="text-5xl md:text-6xl font-bold">
              How To Apply
              <br />
              Admission Process
            </h1>

            <p
              className="mt-6 max-w-3xl mx-auto text-lg leading-8"
              style={{ color: "var(--text-secondary)" }}
            >
              Follow the step-by-step admission process carefully and ensure all required documents are submitted correctly for smooth verification.
            </p>

          </div>

          {/* APPLICATION STEPS */}
          <div className="glow-card glass rounded-3xl p-10 mt-14">

            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <FileText className="text-cyan-400" />
              Application Steps
            </h2>

            <div className="space-y-5">
              <div className="flex gap-3">
                <CheckCircle className="text-green-400 mt-1" />
                <p style={{ color: "var(--text-secondary)" }}>
                  All copies of relevant certificates must be self-attested and attached with the application form.
                </p>
              </div>

              <div className="flex gap-3">
                <CheckCircle className="text-green-400 mt-1" />
                <p style={{ color: "var(--text-secondary)" }}>
                  After filling the application form, paste a recent passport-size color photo and sign in all required places.
                </p>
              </div>

              <div className="flex gap-3">
                <CheckCircle className="text-green-400 mt-1" />
                <p style={{ color: "var(--text-secondary)" }}>
                  Ensure all details are correct before submission to avoid rejection.
                </p>
              </div>
            </div>

          </div>

          {/* DOCUMENTS */}
          <div className="glow-card glass rounded-3xl p-10 mt-14">

            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <Award className="text-purple-400" />
              Required Documents
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <div className="flex gap-3">
                <BookOpen className="text-cyan-400 icon-box" />
                <p style={{ color: "var(--text-secondary)" }}>
                  Senior Secondary / Higher Secondary Certificate & Pass Certificate
                </p>
              </div>

              <div className="flex gap-3">
                <BookOpen className="text-cyan-400 icon-box" />
                <p style={{ color: "var(--text-secondary)" }}>
                  Secondary School Certificate & Pass Certificate
                </p>
              </div>

              <div className="flex gap-3">
                <IdCard className="text-cyan-400 icon-box" />
                <p style={{ color: "var(--text-secondary)" }}>
                  Proof of Date of Birth
                </p>
              </div>

              <div className="flex gap-3">
                <FileText className="text-cyan-400 icon-box" />
                <p style={{ color: "var(--text-secondary)" }}>
                  Transfer Certificate
                </p>
              </div>

              <div className="flex gap-3">
                <UserCheck className="text-cyan-400 icon-box" />
                <p style={{ color: "var(--text-secondary)" }}>
                  Character Certificate from last institute
                </p>
              </div>

              <div className="flex gap-3">
                <FileText className="text-cyan-400 icon-box" />
                <p style={{ color: "var(--text-secondary)" }}>
                  Migration Certificate (if required)
                </p>
              </div>

              <div className="flex gap-3">
                <BookOpen className="text-cyan-400 icon-box" />
                <p style={{ color: "var(--text-secondary)" }}>
                  Provisional / Degree Certificate (PG only)
                </p>
              </div>

              <div className="flex gap-3">
                <MapPin className="text-cyan-400 icon-box" />
                <p style={{ color: "var(--text-secondary)" }}>
                  Address Proof (Ration Card / Govt ID)
                </p>
              </div>

            </div>

          </div>

          {/* IMPORTANT */}
          <div className="glow-card glass rounded-3xl p-10 mt-14">

            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-red-400">
              <AlertCircle />
              Important Instructions
            </h2>

            <div className="space-y-4">
              <p style={{ color: "var(--text-secondary)" }}>
                • Do not leave any column blank in the application form.
              </p>

              <p style={{ color: "var(--text-secondary)" }}>
                • Ensure all information is correct and verified.
              </p>

              <p style={{ color: "var(--text-secondary)" }}>
                • Incorrect details may lead to rejection of admission.
              </p>
            </div>

          </div>

          {/* MERIT */}
          <div className="glow-card glass rounded-3xl p-10 mt-14 text-center">

            <h2 className="text-3xl font-bold mb-4">
              Selection Process
            </h2>

            <p
              className="text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              Admission will be granted based on merit and performance in the Entrance / Admission Test.
            </p>

          </div>

        </div>
      </section>
    </>
  );
}