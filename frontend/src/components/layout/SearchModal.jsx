import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const searchItems = [
  {
    title: "B.Tech Admission",
    category: "Engineering",
    path: "/courses/engineering",
  },
  {
    title: "MBA Admission",
    category: "Management",
    path: "/courses/mba",
  },
  {
    title: "MBBS Admission",
    category: "Medical",
    path: "/courses/medical",
  },
  {
    title: "BCA",
    category: "Computer",
    path: "/courses/bca",
  },
  {
    title: "MCA",
    category: "Computer",
    path: "/courses/mca",
  },
  {
    title: "LLB",
    category: "Law",
    path: "/courses/law",
  },
  {
    title: "Online MBA",
    category: "Online",
    path: "/courses/online-mba",
  },
  {
    title: "PhD Admission",
    category: "Research",
    path: "/courses/phd",
  },
];

const SearchModal = ({ open, setOpen }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const filtered = searchItems.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[90] bg-slate-900/60 backdrop-blur-md"
          />

          <motion.div
            initial={{
              opacity: 0,
              y: -40,
              scale: .95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            className="fixed left-1/2 top-24 z-[100] w-[95%] max-w-2xl -translate-x-1/2"
          >
            <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">

              <div className="flex items-center border-b border-slate-200 px-6 py-5">

                <Search className="mr-4 h-6 w-6 text-slate-400"/>

                <input
                  autoFocus
                  value={query}
                  onChange={(e)=>setQuery(e.target.value)}
                  placeholder="Search Universities, Courses..."
                  className="flex-1 text-lg outline-none"
                />

                <button
                  onClick={()=>setOpen(false)}
                >
                  <X/>
                </button>

              </div>

              <div className="max-h-[420px] overflow-y-auto p-4">

                {filtered.map((item)=>(
                  <Link
                    key={item.title}
                    to={item.path}
                    onClick={()=>setOpen(false)}
                    className="flex items-center justify-between rounded-2xl p-4 transition hover:bg-sky-50"
                  >

                    <div>

                      <h3 className="font-bold text-slate-800">
                        {item.title}
                      </h3>

                      <p className="text-sm text-slate-500">
                        {item.category}
                      </p>

                    </div>

                    <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-700">
                      Open
                    </span>

                  </Link>
                ))}

              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;