import {
  GraduationCap,
  FileText,
  Send,
  CheckCircle,
  BookOpen,
  Mail,
  Users,
} from "lucide-react";

export default function AdmissionProcess() {
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
              Admission Process
            </span>

            <h1 className="text-4xl md:text-5xl font-bold">
  Admission Process
</h1>

            <p
              className="mt-6 max-w-3xl mx-auto text-lg leading-8"
              style={{ color: "var(--text-secondary)" }}
            >
              We offer admissions to a wide range of undergraduate, postgraduate,
              diploma, and certification programs designed to help students build
              strong careers.
            </p>

          </div>

          {/* PROGRAMS */}
          <div className="glow-card glass rounded-3xl p-10 mt-14">

            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <GraduationCap className="text-cyan-400" />
              Available Programs
            </h2>

            <div className="grid md:grid-cols-2 gap-5 text-lg">

              <div className="flex gap-3">
                <CheckCircle className="text-green-400 mt-1" />
                <p style={{ color: "var(--text-secondary)" }}>
                  Undergraduate Courses (B.A, B.Com, BBA, etc.)
                </p>
              </div>

              <div className="flex gap-3">
                <CheckCircle className="text-green-400 mt-1" />
                <p style={{ color: "var(--text-secondary)" }}>
                  Postgraduate Courses (MBA, MCA, M.Com, etc.)
                </p>
              </div>

              <div className="flex gap-3">
                <CheckCircle className="text-green-400 mt-1" />
                <p style={{ color: "var(--text-secondary)" }}>
                  Diploma Programs
                </p>
              </div>

              <div className="flex gap-3">
                <CheckCircle className="text-green-400 mt-1" />
                <p style={{ color: "var(--text-secondary)" }}>
                  Certification Courses
                </p>
              </div>

            </div>

          </div>

          {/* PROCEDURE */}
          <div className="glow-card glass rounded-3xl p-10 mt-14">

            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <FileText className="text-purple-400" />
              Procedure for Admission
            </h2>

            <div className="space-y-5">

              <div className="flex gap-3">
                <Send className="text-cyan-400 mt-1" />
                <p style={{ color: "var(--text-secondary)" }}>
                  Visit our website and select the program of interest.
                </p>
              </div>

              <div className="flex gap-3">
                <Mail className="text-cyan-400 mt-1" />
                <p style={{ color: "var(--text-secondary)" }}>
                  Get the admission form and mail it to the mentioned address.
                </p>
              </div>

              <div className="flex gap-3">
                <FileText className="text-cyan-400 mt-1" />
                <p style={{ color: "var(--text-secondary)" }}>
                  Attach all required documents including mark sheets, academic records,
                  birth proof, residence proof, and certificates.
                </p>
              </div>

              <div className="flex gap-3">
                <Users className="text-cyan-400 mt-1" />
                <p style={{ color: "var(--text-secondary)" }}>
                  Submit six passport-size photographs along with demand draft of first installment fees.
                </p>
              </div>

              <div className="flex gap-3">
                <BookOpen className="text-cyan-400 mt-1" />
                <p style={{ color: "var(--text-secondary)" }}>
                  For assistance, visit the university office and meet an education counsellor.
                </p>
              </div>

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
              The application process is simple and fully online, allowing students to apply from anywhere.
            </p>

          </div>

        </div>
      </section>
    </>
  );
}