import {
  Phone,
  Mail,
  MapPin,
  BadgeCheck,
  ArrowUpRight,
} from "lucide-react";

import {
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const TopBar = () => {
  const whatsappNumber = "919217381365";

  return (
    <div
      className="
        hidden
        lg:block
        relative
        overflow-hidden
        border-b
        border-sky-400/20
        bg-gradient-to-r
        from-slate-950
        via-sky-950
        to-cyan-950
        text-white
      "
    >
      {/* ================= SUBTLE GLOW ================= */}

      <div
        className="
          pointer-events-none
          absolute
          -top-20
          left-1/3
          h-32
          w-72
          rounded-full
          bg-cyan-400/10
          blur-3xl
        "
      />

      {/* ================= CONTAINER ================= */}

      <div
        className="
          relative
          flex
          min-h-[48px]
          w-full
          items-center
          justify-between
          gap-5
          px-[30px]
        "
      >
        {/* ================= LEFT ================= */}

        <div
          className="
            flex
            min-w-0
            items-center
            gap-4
            xl:gap-5
          "
        >
          {/* ================= PHONE ================= */}

          <a
            href="tel:+919217381363"
            className="
              group
              flex
              shrink-0
              items-center
              gap-2.5
              text-sm
              font-medium
              text-white/90
              transition-all
              duration-300
              hover:text-cyan-300
            "
          >
            <span
              className="
                flex
                h-7
                w-7
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-cyan-400/10
                ring-1
                ring-cyan-400/20
                transition-all
                duration-300
                group-hover:bg-cyan-400/20
              "
            >
              <Phone className="h-3.5 w-3.5 text-cyan-300" />
            </span>

            <span className="whitespace-nowrap">
              +91 92173 81363
            </span>
          </a>

          {/* Divider */}

          <span className="hidden h-5 w-px bg-white/15 xl:block" />

          {/* ================= EMAIL ================= */}

          <a
            href="mailto:Support@nextgenedu.co"
            className="
              group
              flex
              min-w-0
              items-center
              gap-2.5
              text-sm
              font-medium
              text-white/90
              transition-all
              duration-300
              hover:text-violet-300
            "
          >
            <span
              className="
                flex
                h-7
                w-7
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-violet-400/10
                ring-1
                ring-violet-400/20
                transition-all
                duration-300
                group-hover:bg-violet-400/20
              "
            >
              <Mail className="h-3.5 w-3.5 text-violet-300" />
            </span>

            <span className="truncate">
              Support@nextgenedu.co
            </span>
          </a>

          {/* ================= LOCATION ================= */}

          <div
            className="
              hidden
              items-center
              gap-2.5
              text-sm
              font-medium
              text-white/75
              xl:flex
            "
          >
            <span
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-lg
                bg-orange-400/10
                ring-1
                ring-orange-400/20
              "
            >
              <MapPin className="h-3.5 w-3.5 text-orange-300" />
            </span>

            <span>PAN India Admission</span>
          </div>
        </div>

        {/* ================= RIGHT ================= */}

        <div
          className="
            flex
            shrink-0
            items-center
            gap-3
          "
        >
          {/* ================= TRUST BADGE ================= */}

          <div
            className="
              hidden
              items-center
              gap-2
              rounded-full
              border
              border-white/10
              bg-white/5
              px-3.5
              py-1.5
              backdrop-blur-md
              xl:flex
            "
          >
            <BadgeCheck className="h-4 w-4 text-emerald-300" />

            <span className="whitespace-nowrap text-xs font-bold text-white/90">
              Trusted Admission Experts
            </span>
          </div>

          {/* ================= SOCIAL ICONS ================= */}

          <div className="flex items-center gap-1.5">
            {/* WhatsApp */}

            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                bg-[#25D366]/10
                text-[#25D366]
                ring-1
                ring-[#25D366]/30
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#25D366]
                hover:text-white
                hover:ring-[#25D366]
              "
            >
              <FaWhatsapp size={15} />
            </a>

            {/* Facebook */}

            <a
              href="#"
              aria-label="Facebook"
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                bg-[#1877F2]/10
                text-[#1877F2]
                ring-1
                ring-[#1877F2]/30
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#1877F2]
                hover:text-white
                hover:ring-[#1877F2]
              "
            >
              <FaFacebookF size={13} />
            </a>

            {/* Instagram */}

            <a
              href="#"
              aria-label="Instagram"
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                bg-[#E1306C]/10
                text-[#E1306C]
                ring-1
                ring-[#E1306C]/30
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#E1306C]
                hover:text-white
                hover:ring-[#E1306C]
              "
            >
              <FaInstagram size={14} />
            </a>

            {/* LinkedIn */}

            <a
              href="#"
              aria-label="LinkedIn"
              className="
                hidden
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                bg-[#0A66C2]/10
                text-[#0A66C2]
                ring-1
                ring-[#0A66C2]/30
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#0A66C2]
                hover:text-white
                hover:ring-[#0A66C2]
                xl:flex
              "
            >
              <FaLinkedinIn size={13} />
            </a>

            {/* YouTube */}

            <a
              href="#"
              aria-label="YouTube"
              className="
                hidden
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                bg-[#FF0000]/10
                text-[#FF0000]
                ring-1
                ring-[#FF0000]/30
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#FF0000]
                hover:text-white
                hover:ring-[#FF0000]
                xl:flex
              "
            >
              <FaYoutube size={14} />
            </a>
          </div>

          {/* Divider */}

          <div className="hidden h-6 w-px bg-white/15 xl:block" />

          {/* ================= WHATSAPP CTA ================= */}

          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              hidden
              items-center
              gap-2
              rounded-full
              border
              border-emerald-400/30
              bg-emerald-400/10
              px-4
              py-1.5
              text-xs
              font-bold
              text-emerald-300
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-emerald-500
              hover:text-white
              hover:shadow-lg
              hover:shadow-emerald-500/20
              xl:flex
            "
          >
            <FaWhatsapp size={14} />

            <span>WhatsApp Us</span>

            <ArrowUpRight
              className="
                h-3.5
                w-3.5
                transition-transform
                duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </a>

          {/* ================= APPLY NOW ================= */}

          <a
            href="/registration-form"
            className="
              group
              relative
              z-10
              inline-flex
              items-center
              justify-center
              gap-1.5
              rounded-full
              bg-white
              px-4
              py-2
              text-xs
              font-extrabold
              !text-sky-700
              shadow-lg
              shadow-black/10
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-cyan-50
              hover:!text-sky-800
              hover:shadow-xl
            "
          >
            <span className="!text-sky-700">
              Apply Now
            </span>

            <ArrowUpRight
              className="
                h-3.5
                w-3.5
                !text-sky-700
                transition-transform
                duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;