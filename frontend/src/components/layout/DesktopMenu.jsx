import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const DesktopMenu = ({ navLinks = [] }) => {
  const [activeMenu, setActiveMenu] = useState(null);

  return (
    <nav
      className="
    flex
    items-center
    gap-1
    "
    >
      {navLinks.map((item) => {
        if (!item.megaMenu) {
          return (
            <Link
              key={item.title}
              to={item.path}
              className="
              px-4
              py-2
              text-sm
              font-semibold
              text-slate-700
              rounded-lg
              hover:text-sky-600
              hover:bg-sky-50
              transition
              "
            >
              {item.title}
            </Link>
          );
        }

        return (
          <div
            key={item.title}
            className="
            relative
            "
            onMouseEnter={() => setActiveMenu(item.title)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button
              className="
              flex
              items-center
              gap-1
              px-4
              py-2
              text-sm
              font-semibold
              text-slate-700
              rounded-lg
              hover:text-sky-600
              hover:bg-sky-50
              transition
              "
            >
              {item.title}

              <ChevronDown
                className="
                h-4
                w-4
                "
              />
            </button>

            <AnimatePresence>
              {activeMenu === item.title && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: 10,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="
                  absolute
                  top-12
                  left-0
                  w-[520px]
                  bg-white
                  rounded-2xl
                  shadow-2xl
                  border
                  border-slate-100
                  p-5
                  z-50
                  "
                >
                  {item.sections.map((section) => (
                    <div
                      key={section.title}
                      className="
                      mb-5
                      last:mb-0
                      "
                    >
                      <h4
                        className="
                      text-xs
                      uppercase
                      tracking-widest
                      font-black
                      text-sky-600
                      mb-3
                      "
                      >
                        {section.title}
                      </h4>

                      <div
                        className="
                      grid
                      grid-cols-2
                      gap-3
                      "
                      >
                        {section.items.map((subItem) => (
                          <Link
                            key={subItem.title}
                            to={subItem.path}
                            className="
                            group
                            flex
                            gap-3
                            p-3
                            rounded-xl
                            border
                            border-slate-100
                            hover:border-sky-200
                            hover:bg-sky-50
                            transition
                            "
                          >
                            <div
                              className="
                            h-10
                            w-10
                            rounded-xl
                            bg-gradient-to-br
                            from-sky-500
                            to-cyan-500
                            flex
                            items-center
                            justify-center
                            text-white
                            shrink-0
                            "
                            >
                              <subItem.icon
                                className="
                                h-5
                                w-5
                                "
                              />
                            </div>

                            <div>
                              <h5
                                className="
                              text-sm
                              font-bold
                              text-slate-800
                              group-hover:text-sky-600
                              "
                              >
                                {subItem.title}
                              </h5>

                              <p
                                className="
                              text-xs
                              text-slate-500
                              mt-1
                              line-clamp-2
                              "
                              >
                                {subItem.description}
                              </p>
                            </div>

                            <ChevronRight
                              className="
                              h-4
                              w-4
                              text-slate-400
                              ml-auto
                              mt-1
                              "
                            />
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </nav>
  );
};

export default DesktopMenu;
