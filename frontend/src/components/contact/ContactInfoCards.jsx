import { motion } from "framer-motion";
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock3,
} from "lucide-react";

const contactCards = [
  {
    icon: PhoneCall,
    title: "Call Us",
    value: "+91 7983978462",
    description: "Talk directly with our admission counsellors.",
    bg: "bg-cyan-100",
    color: "text-cyan-600",
  },
  {
    icon: Mail,
    title: "Email Us",
    value: "info@nextgenedu.in",
    description: "Send your admission related queries anytime.",
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
  {
    icon: MapPin,
    title: "Office Address",
    value: "Noida, Uttar Pradesh",
    description: "Visit our office for personalized guidance.",
    bg: "bg-emerald-100",
    color: "text-emerald-600",
  },
  {
    icon: Clock3,
    title: "Working Hours",
    value: "Mon - Sat (9 AM - 7 PM)",
    description: "We're available six days a week.",
    bg: "bg-violet-100",
    color: "text-violet-600",
  },
];

export default function ContactInfoCards() {
  return (
    <section className="mt-20">

      {/* Heading */}

      <div className="text-center mb-12">

        <span
          className="
            inline-flex
            items-center
            rounded-full
            bg-cyan-100
            px-5
            py-2
            text-sm
            font-semibold
            text-cyan-700
          "
        >
          Contact Information
        </span>

        <h2
          className="
            mt-5
            text-3xl
            md:text-4xl
            font-bold
            text-slate-900
          "
        >
          We're Always Ready To Help You
        </h2>

        <p
          className="
            mt-4
            max-w-2xl
            mx-auto
            text-slate-600
            leading-7
          "
        >
          Contact our experienced counsellors for admission guidance,
          university selection, scholarships, and complete enrollment
          assistance.
        </p>

      </div>

      {/* Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {contactCards.map((card, index) => {

          const Icon = card.icon;

          return (

            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              whileHover={{
                y: -8,
              }}
              className="
                group
                bg-white
                rounded-3xl
                border
                border-slate-100
                shadow-[0_15px_40px_rgba(15,23,42,.08)]
                hover:shadow-[0_25px_55px_rgba(6,182,212,.18)]
                p-7
                transition-all
                duration-500
              "
            >

              {/* Icon */}

              <div
                className={`
                  w-16
                  h-16
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  ${card.bg}
                `}
              >
                <Icon
                  size={30}
                  className={`
                    ${card.color}
                    transition-all
                    duration-500
                    group-hover:scale-110
                    group-hover:rotate-6
                  `}
                />
              </div>

              {/* Content */}

              <h3
                className="
                  mt-6
                  text-xl
                  font-bold
                  text-slate-900
                "
              >
                {card.title}
              </h3>

              <p
                className="
                  mt-2
                  font-semibold
                  text-cyan-600
                "
              >
                {card.value}
              </p>

              <p
                className="
                  mt-3
                  text-sm
                  leading-6
                  text-slate-500
                "
              >
                {card.description}
              </p>

            </motion.div>

          );

        })}

      </div>

    </section>
  );
}