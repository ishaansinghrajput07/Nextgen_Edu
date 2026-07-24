import { Download } from "lucide-react";

export default function RegistrationForm() {
  const handleDownload = () => {
    // public folder me rakhna: /registrationform.pdf
    const link = document.createElement("a");
    link.href = "/RegistrationForm.pdf";
    link.download = "RegistrationForm.pdf";
    link.click();
  };

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

        .btn-glow{
          transition: all .3s ease;
          box-shadow: 0 0 20px rgba(34,211,238,.3);
        }

        .btn-glow:hover{
          transform: scale(1.05);
          box-shadow: 0 0 30px rgba(168,85,247,.5);
        }
      `}</style>

      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 flex justify-center">

          {/* CENTER GLASS CARD */}
          <div className="glow-card hero-box rounded-[40px] p-16 md:p-24 text-center w-full max-w-3xl">

            <h1 className="text-4xl md:text-5xl font-bold">
              Download Registration Form
            </h1>

            <p
              className="mt-5 text-lg max-w-xl mx-auto"
              style={{ color: "var(--text-secondary)" }}
            >
              Click below to download the official admission registration form.
              Fill it carefully and submit with required documents.
            </p>

            {/* BUTTON */}
            <button
              onClick={handleDownload}
              className="btn-glow mt-10 px-8 py-4 rounded-xl bg-cyan-500 text-white font-semibold flex items-center gap-2 mx-auto"
            >
              <Download size={20} />
              Download PDF
            </button>

          </div>

        </div>
      </section>
    </>
  );
}