import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  ArrowRight,
  BadgeCheck,
  PhoneCall,
  MessageCircle,
  Star,
} from "lucide-react";

export default function HeroContent({ slide }) {
  return (
    <div className="relative w-full max-w-4xl">

      {/* ================= BADGE ================= */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
          inline-flex
          max-w-full
          items-center
          gap-2
          rounded-full
          border
          border-cyan-300/30
          bg-white/10
          px-4
          py-2
          backdrop-blur-xl

          sm:gap-3
          sm:px-5
          sm:py-2.5

          lg:px-6
          lg:py-3
        "
      >
        <BadgeCheck
          className="
            h-[17px]
            w-[17px]
            shrink-0
            text-cyan-300

            sm:h-[19px]
            sm:w-[19px]

            lg:h-5
            lg:w-5
          "
        />

        <span
          className="
            truncate
            text-xs
            font-semibold
            text-white

            sm:text-sm

            lg:text-base
          "
        >
          {slide.badge}
        </span>
      </motion.div>

      {/* ================= TITLE ================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 35,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.15,
          duration: 0.8,
        }}
        className="
          mt-5
          max-w-3xl

          sm:mt-6
        "
      >
        <h1
          className="
            text-[30px]
            font-black
            leading-[1.08]
            tracking-tight
            text-white

            sm:text-[42px]
            sm:leading-[1.06]

            md:text-[50px]

            lg:text-[62px]
            lg:leading-[1.05]
          "
        >
          {slide.title}
        </h1>
      </motion.div>

      {/* ================= LINE ================= */}

      <motion.div
        initial={{
          width: 0,
        }}
        animate={{
          width: 180,
        }}
        transition={{
          delay: 0.4,
          duration: 0.6,
        }}
        className="
          mt-5
          h-1
          max-w-[130px]
          rounded-full
          bg-gradient-to-r
          from-cyan-400
          via-sky-400
          to-blue-500

          sm:mt-6
          sm:max-w-[160px]

          lg:max-w-[180px]
        "
      />

      {/* ================= DESCRIPTION ================= */}

      <motion.p
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.35,
        }}
        className="
          mt-4
          max-w-xl
          text-sm
          leading-6
          text-white/85

          sm:mt-5
          sm:text-base
          sm:leading-7

          lg:mt-7
          lg:max-w-2xl
          lg:text-lg
          lg:leading-8
        "
      >
        {slide.description}
      </motion.p>

      {/* ================= STATS ================= */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.45,
        }}
        className="
          mt-6
          grid
          grid-cols-2
          gap-x-6
          gap-y-5

          sm:mt-7
          sm:flex
          sm:flex-wrap
          sm:items-center
          sm:gap-8

          lg:mt-8
          lg:gap-10
        "
      >

        {/* Rating */}

        <div>
          <div className="flex gap-0.5 sm:gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="
                  h-4
                  w-4

                  sm:h-[18px]
                  sm:w-[18px]
                "
                fill="#FBBF24"
                stroke="#FBBF24"
              />
            ))}
          </div>

          <p
            className="
              mt-1.5
              text-xs
              font-semibold
              text-white

              sm:mt-2
              sm:text-sm

              lg:text-base
            "
          >
            {slide.rating} Student Rating
          </p>
        </div>

        {/* Universities */}

        <div>
          <h3
            className="
              text-2xl
              font-bold
              text-white

              sm:text-3xl
            "
          >
            {slide.universities}
          </h3>

          <p
            className="
              text-xs
              text-white/70

              sm:text-sm
            "
          >
            Partner Universities
          </p>
        </div>

        {/* Success */}

        <div>
          <h3
            className="
              text-2xl
              font-bold
              text-white

              sm:text-3xl
            "
          >
            {slide.success}
          </h3>

          <p
            className="
              text-xs
              text-white/70

              sm:text-sm
            "
          >
            Admission Success
          </p>
        </div>
      </motion.div>

      {/* ================= BUTTONS ================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.65,
        }}
        className="
          mt-7
          flex
          w-full
          flex-col
          gap-3

          sm:mt-8
          sm:flex-row
          sm:flex-wrap
          sm:gap-3

          lg:mt-10
          lg:gap-4
        "
      >

        {/* Primary */}

        <Link
          to="/contact"
          className="
            group
            inline-flex
            w-full
            items-center
            justify-center
            gap-2.5
            rounded-2xl
            bg-cyan-500
            px-6
            py-3.5
            text-sm
            font-semibold
            text-white
            shadow-[0_20px_40px_rgba(6,182,212,.35)]
            transition-all
            duration-300
            hover:-translate-y-1
            hover:bg-cyan-600

            sm:w-auto
            sm:px-6
            sm:py-3.5

            lg:gap-3
            lg:px-8
            lg:py-4
            lg:text-base
          "
        >
          Get Free Counselling

          <ArrowRight
            className="
              h-[18px]
              w-[18px]
              transition-transform
              duration-300
              group-hover:translate-x-1

              lg:h-5
              lg:w-5
            "
          />
        </Link>

        {/* Call */}

        <a
          href="tel:+919217381363"
          className="
            inline-flex
            w-full
            items-center
            justify-center
            gap-2.5
            rounded-2xl
            border
            border-white/20
            bg-white/10
            px-6
            py-3.5
            text-sm
            font-semibold
            text-white
            backdrop-blur-lg
            transition-all
            duration-300
            hover:-translate-y-1
            hover:bg-white/20

            sm:w-auto

            lg:gap-3
            lg:px-7
            lg:py-4
            lg:text-base
          "
        >
          <PhoneCall
            className="
              h-[18px]
              w-[18px]

              lg:h-5
              lg:w-5
            "
          />

          Call Now
        </a>

        {/* WhatsApp */}

        <a
          href="https://wa.me/919217381365"
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex
            w-full
            items-center
            justify-center
            gap-2.5
            rounded-2xl
            bg-green-500
            px-6
            py-3.5
            text-sm
            font-semibold
            text-white
            shadow-lg
            shadow-green-900/20
            transition-all
            duration-300
            hover:-translate-y-1
            hover:bg-green-600

            sm:w-auto

            lg:gap-3
            lg:px-7
            lg:py-4
            lg:text-base
          "
        >
          <MessageCircle
            className="
              h-[18px]
              w-[18px]

              lg:h-5
              lg:w-5
            "
          />

          WhatsApp
        </a>
      </motion.div>
    </div>
  );
}

