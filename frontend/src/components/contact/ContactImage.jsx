import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";

import contactImage from "../../assets/hero/contact.png";

export default function ContactImage() {
  return (
    <div className="relative flex items-center justify-center">

      {/* ================= Background Glow ================= */}

      <div className="absolute w-[700px] h-[700px] rounded-full bg-cyan-300/20 blur-[150px]" />

      <div className="absolute w-[450px] h-[450px] rounded-full bg-sky-200/30 blur-[120px]" />

      {/* ================= Ring 1 ================= */}

      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 45,
          ease: "linear",
        }}
        className="
          absolute
          w-[520px]
          h-[520px]
          rounded-full
          border-2
          border-dashed
          border-cyan-300/40
        "
      />

      {/* ================= Ring 2 ================= */}

      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          repeat: Infinity,
          duration: 70,
          ease: "linear",
        }}
        className="
          absolute
          w-[400px]
          h-[400px]
          rounded-full
          border
          border-dashed
          border-sky-200
        "
      />

      {/* ================= Floating Phone ================= */}

      <motion.div
        animate={{
          y: [-10, 10, -10],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
        }}
        className="
          absolute
          left-2
          top-12
          z-30
          w-16
          h-16
          rounded-2xl
          bg-white
          shadow-xl
          flex
          items-center
          justify-center
        "
      >
        <Phone
          size={28}
          className="text-cyan-600"
        />
      </motion.div>

      {/* ================= Floating Mail ================= */}

      <motion.div
        animate={{
          y: [10, -10, 10],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
        }}
        className="
          absolute
          right-4
          top-24
          z-30
          w-16
          h-16
          rounded-2xl
          bg-white
          shadow-xl
          flex
          items-center
          justify-center
        "
      >
        <Mail
          size={28}
          className="text-blue-600"
        />
      </motion.div>

      {/* ================= Floating Map ================= */}

      <motion.div
        animate={{
          y: [-8, 10, -8],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
        }}
        className="
          absolute
          left-12
          bottom-16
          z-30
          w-16
          h-16
          rounded-2xl
          bg-white
          shadow-xl
          flex
          items-center
          justify-center
        "
      >
        <MapPin
          size={28}
          className="text-emerald-600"
        />
      </motion.div>

      {/* ================= Floating Chat ================= */}

      <motion.div
        animate={{
          y: [8, -8, 8],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
        }}
        className="
          absolute
          right-10
          bottom-14
          z-30
          w-14
          h-14
          rounded-full
          bg-cyan-500
          shadow-xl
          flex
          items-center
          justify-center
        "
      >
        <MessageCircle
          size={22}
          className="text-white"
        />
      </motion.div>

      {/* ================= Main Image ================= */}

      <motion.img
        src={contactImage}
        alt="Contact"
        initial={{
          opacity: 0,
          y: 40,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.8,
        }}
        whileHover={{
          scale: 1.02,
        }}
        className="
          relative
          z-20
          w-[760px]
          max-w-full
          -mt-10
          object-contain
          drop-shadow-[0_30px_70px_rgba(8,145,178,.25)]
        "
      />

      {/* ================= Bottom Glass Card ================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.8,
        }}
        className="
          absolute
          bottom-0
          left-1/2
          -translate-x-1/2
          w-[330px]
          rounded-3xl
          bg-white/80
          backdrop-blur-xl
          border
          border-white
          shadow-[0_20px_45px_rgba(15,23,42,.08)]
          px-6
          py-5
          z-30
        "
      >
        <div className="flex items-center justify-between">

          <div>
            <h3 className="text-3xl font-bold text-slate-900">
              24/7
            </h3>

            <p className="text-sm text-slate-500">
              Admission Support
            </p>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-cyan-100 flex items-center justify-center">
            <Phone
              size={28}
              className="text-cyan-600"
            />
          </div>

        </div>
      </motion.div>

    </div>
  );
}