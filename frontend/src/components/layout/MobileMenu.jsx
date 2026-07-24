import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import BookCounsellingButton from "./BookCounsellingButton";

const menuItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Universities", path: "/universities" },
  { name: "Courses", path: "/courses" },
  { name: "Success Stories", path: "/success-stories" },
  { name: "Contact", path: "/contact" },
];

export default function MobileMenu({
  isOpen,
  setIsOpen,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsOpen(false)}
            className="
fixed
inset-0
bg-black/40
backdrop-blur-[2px]
z-[998]
lg:hidden
"
          />

          {/* Mobile Menu */}
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            transition={{
              duration: 0.25,
            }}
           className="
lg:hidden
fixed
top-[88px]
left-0
right-0
w-full
bg-white
border-t
border-slate-200
shadow-2xl
overflow-hidden
z-[999]
"
          >
            <nav className="py-2">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="
block
px-6
py-4
text-black
font-medium
border-b
border-slate-100
hover:bg-cyan-50
hover:text-cyan-600
transition-all
duration-300
"
                >
                  {item.name}
                </Link>
              ))}

              <div className="p-5">
                <BookCounsellingButton />
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}