import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const MegaMenu = ({ open, menu }) => {
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    if (menu?.sections?.length) {
      setActiveSection(menu.sections[0]);
    }
  }, [menu]);

  if (!menu) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 18 }}
          transition={{ duration: .25 }}
          className="absolute left-1/2 top-full z-50 mt-5 -translate-x-1/2"
        >
          <div className="w-[950px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_25px_80px_rgba(0,0,0,.12)]">

            <div className="grid grid-cols-12">

              {/* LEFT */}

              <div className="col-span-3 bg-slate-50 border-r border-slate-200 p-6">

                <p className="mb-5 text-xs font-black uppercase tracking-[0.25em] text-sky-600">
                  Categories
                </p>

                <div className="space-y-2">

                  {menu.sections.map((section)=>(
                    <button
                      key={section.title}
                      onMouseEnter={()=>setActiveSection(section)}
                      className={`w-full rounded-2xl px-5 py-4 text-left transition-all duration-300

                      ${
                        activeSection?.title===section.title
                        ? "bg-sky-600 text-white shadow-lg"
                        : "hover:bg-white"
                      }`}
                    >
                      <h3 className="font-bold">
                        {section.title}
                      </h3>
                    </button>
                  ))}

                </div>

              </div>

              {/* RIGHT */}

              <div className="col-span-9 p-8">

                <AnimatePresence mode="wait">

                  {activeSection && (

                    <motion.div
                      key={activeSection.title}
                      initial={{opacity:0,x:20}}
                      animate={{opacity:1,x:0}}
                      exit={{opacity:0,x:-20}}
                    >

                      <h2 className="mb-6 text-2xl font-black text-slate-900">
                        {activeSection.title}
                      </h2>

                      <div className="grid grid-cols-2 gap-4">

                        {activeSection.items.map((item)=>{

                          const Icon=item.icon;

                          return(

                            <Link
                              key={item.title}
                              to={item.path}
                              className="group rounded-2xl border border-slate-200 p-5 transition-all duration-300 hover:border-sky-300 hover:bg-sky-50"
                            >

                              <div className="flex items-start gap-4">

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 text-white">

                                  <Icon className="h-6 w-6"/>

                                </div>

                                <div>

                                  <h3 className="font-bold text-slate-800 group-hover:text-sky-600">
                                    {item.title}
                                  </h3>

                                  <p className="mt-1 text-sm text-slate-500">
                                    {item.description}
                                  </p>

                                </div>

                              </div>

                            </Link>

                          )

                        })}

                      </div>

                      {/* CTA */}

                      <div className="mt-8 rounded-3xl bg-gradient-to-r from-sky-600 to-cyan-500 p-6 text-white">

                        <div className="flex items-center justify-between">

                          <div>

                            <h3 className="text-2xl font-black">
                              Still Confused?
                            </h3>

                            <p className="mt-2 text-white/90">
                              Get FREE Career Counselling from our experts.
                            </p>

                          </div>

                          <Link
                            to="/book-counselling"
                            className="flex items-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-sky-700"
                          >
                            Book Now

                            <ArrowRight className="h-5 w-5"/>

                          </Link>

                        </div>

                      </div>

                    </motion.div>

                  )}

                </AnimatePresence>

              </div>

            </div>

          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MegaMenu;