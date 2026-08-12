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
        hidden lg:block
        relative
        overflow-hidden
        border-b border-sky-400/20
        bg-gradient-to-r
        from-slate-950
        via-sky-950
        to-cyan-950
        text-white
      "
    >
      {/* Subtle Glow */}
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

      <div
        className="
          relative
          mx-auto
          flex
          min-h-[48px]
          max-w-[1440px]
          items-center
          justify-between
          gap-6
          px-5
          xl:px-8
        "
      >
        {/* ================= LEFT ================= */}

        <div className="flex items-center gap-5 xl:gap-7">
          {/* Phone */}

          <a
            href="tel:+919217381363"
            className="
              group
              flex
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
                items-center
                justify-center
                rounded-lg
                bg-white/10
                ring-1
                ring-white/10
                transition
                group-hover:bg-cyan-400/15
              "
            >
              <Phone className="h-3.5 w-3.5 text-cyan-300" />
            </span>

            <span>+91 92173 81363</span>
          </a>

          {/* Divider */}

          <span className="hidden h-5 w-px bg-white/15 xl:block" />

          {/* Email */}

          <a
            href="mailto:Support@nextgenedu.co"
            className="
              group
              flex
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
                items-center
                justify-center
                rounded-lg
                bg-white/10
                ring-1
                ring-white/10
                transition
                group-hover:bg-cyan-400/15
              "
            >
              <Mail className="h-3.5 w-3.5 text-cyan-300" />
            </span>

            <span>Support@nextgenedu.co</span>
          </a>

          {/* Location */}

          <div
            className="
              hidden
              xl:flex
              items-center
              gap-2.5
              text-sm
              font-medium
              text-white/75
            "
          >
            <MapPin className="h-4 w-4 text-cyan-300" />

            <span>PAN India Admission</span>
          </div>
        </div>

        {/* ================= RIGHT ================= */}

        <div className="flex items-center gap-4">
          {/* Trust Badge */}

          <div
            className="
              hidden
              xl:flex
              items-center
              gap-2
              rounded-full
              border
              border-white/10
              bg-white/5
              px-3.5
              py-1.5
              backdrop-blur-md
            "
          >
            <BadgeCheck className="h-4 w-4 text-emerald-300" />

            <span className="text-xs font-bold text-white/90">
              Trusted Admission Experts
            </span>
          </div>

          {/* Social Icons */}

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
                bg-white/5
                text-white/80
                ring-1
                ring-white/10
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
                bg-white/5
                text-white/80
                ring-1
                ring-white/10
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#1877F2]
                hover:text-white
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
                bg-white/5
                text-white/80
                ring-1
                ring-white/10
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-gradient-to-br
                hover:from-purple-500
                hover:via-pink-500
                hover:to-orange-400
                hover:text-white
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
                xl:flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                bg-white/5
                text-white/80
                ring-1
                ring-white/10
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#0A66C2]
                hover:text-white
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
                xl:flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                bg-white/5
                text-white/80
                ring-1
                ring-white/10
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-red-600
                hover:text-white
              "
            >
              <FaYoutube size={14} />
            </a>
          </div>

          {/* Divider */}

          <div className="h-6 w-px bg-white/15" />

          {/* WhatsApp CTA */}

          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              hidden
              xl:flex
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
              hover:bg-emerald-500
              hover:text-white
              hover:shadow-lg
              hover:shadow-emerald-500/20
            "
          >
            <FaWhatsapp size={14} />

            <span>WhatsApp Us</span>

            <ArrowUpRight
              className="
                h-3.5
                w-3.5
                transition-transform
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </a>

          {/* Apply Now */}

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