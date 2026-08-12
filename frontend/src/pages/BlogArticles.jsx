import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Clock3,
  Search,
  Tag,
} from "lucide-react";
import { Link } from "react-router-dom";

const BlogArticles = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const articles = [
    {
      id: 1,
      title: "How to Choose the Right College After 12th",
      excerpt:
        "A practical guide to comparing colleges, courses, fees, placements, location and career opportunities before taking admission.",
      category: "College Guide",
      date: "Aug 10, 2026",
      readTime: "6 min read",
      image:
        "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1200&q=80",
      featured: true,
    },
    {
      id: 2,
      title: "Best Career Options After 12th Science",
      excerpt:
        "Explore popular career paths after 12th Science including engineering, technology, healthcare, research and other professional fields.",
      category: "Career",
      date: "Aug 08, 2026",
      readTime: "7 min read",
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 3,
      title: "B.Tech vs BCA: Which Course Is Better?",
      excerpt:
        "Understand the difference between B.Tech and BCA, eligibility, duration, career opportunities and future scope.",
      category: "Courses",
      date: "Aug 06, 2026",
      readTime: "5 min read",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 4,
      title: "How to Compare College Fees and Placements",
      excerpt:
        "Don't compare colleges only by their fees. Learn which factors you should check before choosing a university.",
      category: "College Guide",
      date: "Aug 04, 2026",
      readTime: "5 min read",
      image:
        "https://cdn.pixabay.com/photo/2015/07/31/11/45/library-869061_1280.jpg",
    },
    {
      id: 5,
      title: "Top Skills Students Should Learn for Better Careers",
      excerpt:
        "Discover practical technical and professional skills that can improve your career opportunities after graduation.",
      category: "Career",
      date: "Aug 02, 2026",
      readTime: "6 min read",
      image:
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 6,
      title: "What Should You Check Before Taking Admission?",
      excerpt:
        "From accreditation and faculty to placements and campus facilities, here are the important things to verify.",
      category: "Admission",
      date: "Jul 30, 2026",
      readTime: "5 min read",
      image:
        "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 7,
      title: "How Counselling Can Help You Choose a Career",
      excerpt:
        "Understand how professional career counselling can help students identify suitable courses and career paths.",
      category: "Career",
      date: "Jul 28, 2026",
      readTime: "4 min read",
      image:
        "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 8,
      title: "Guide to University Admission Process",
      excerpt:
        "A simple step-by-step overview of application, document verification, counselling, offer letter and enrollment.",
      category: "Admission",
      date: "Jul 25, 2026",
      readTime: "6 min read",
      image:
        "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80",
    },
  ];

  const categories = [
    "All",
    "College Guide",
    "Career",
    "Courses",
    "Admission",
  ];

  const filteredArticles = useMemo(() => {
    const value = search.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesCategory =
        activeCategory === "All" || article.category === activeCategory;

      const matchesSearch =
        !value ||
        article.title.toLowerCase().includes(value) ||
        article.excerpt.toLowerCase().includes(value) ||
        article.category.toLowerCase().includes(value);

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const featuredArticle = articles.find((article) => article.featured);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-cyan-200/40 blur-3xl" />

        <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-sky-200/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-700">
              <BookOpen className="h-4 w-4" />
              NextGen Education Blog
            </div>

            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Learn. Explore.
              <span className="block bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700 bg-clip-text text-transparent">
                Make Better Decisions.
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Explore useful articles about colleges, courses, admissions,
              careers and everything students need to make confident education
              decisions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          FEATURED ARTICLE
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-[280px] overflow-hidden sm:min-h-[360px] lg:min-h-[440px]">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />

              <div className="absolute bottom-5 left-5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-black text-cyan-700 shadow-lg">
                Featured Article
              </div>
            </div>

            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
              <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-500">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50 px-3 py-1.5 text-cyan-700">
                  <Tag className="h-3.5 w-3.5" />
                  {featuredArticle.category}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" />
                  {featuredArticle.date}
                </span>
              </div>

              <h2 className="mt-5 text-2xl font-black leading-tight text-slate-900 sm:text-3xl lg:text-4xl">
                {featuredArticle.title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                {featuredArticle.excerpt}
              </p>

              <div className="mt-6 flex items-center gap-4">
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <Clock3 className="h-4 w-4" />
                  {featuredArticle.readTime}
                </span>

                <Link
  to={`/blog/${featuredArticle.id}`}
  className="
    group
    inline-flex
    items-center
    gap-2
    rounded-xl
    bg-slate-900
    px-5
    py-3
    text-sm
    font-bold
    !text-white
    transition-all
    duration-300
    hover:bg-cyan-600
    hover:!text-white
  "
>
  <span className="!text-white">Read Article</span>

  <ArrowRight
    className="
      h-4
      w-4
      !text-white
      transition-transform
      duration-300
      group-hover:translate-x-1
    "
  />
</Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* =====================================================
          SEARCH + FILTER
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-100"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                    activeCategory === category
                      ? "bg-cyan-600 text-white shadow-md shadow-cyan-500/20"
                      : "bg-slate-100 text-slate-600 hover:bg-cyan-50 hover:text-cyan-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          ARTICLES
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-cyan-600">
              Latest Insights
            </p>

            <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
              Latest Articles
            </h2>
          </div>

          <p className="hidden text-sm font-medium text-slate-500 sm:block">
            {filteredArticles.length} articles
          </p>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-slate-300" />

            <h3 className="mt-5 text-xl font-black text-slate-900">
              No articles found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try another search term or select a different category.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.45,
                  delay: Math.min(index * 0.05, 0.2),
                }}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl hover:shadow-slate-200/60"
              >
                <Link to={`/blog/${article.id}`}>
                  <div className="relative h-52 overflow-hidden bg-slate-100">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-black text-cyan-700 shadow-sm">
                      {article.category}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-400">
                      <span className="inline-flex items-center gap-1">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {article.date}
                      </span>

                      <span>•</span>

                      <span className="inline-flex items-center gap-1">
                        <Clock3 className="h-3.5 w-3.5" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="mt-3 line-clamp-2 text-lg font-black leading-7 text-slate-900 transition group-hover:text-cyan-700">
                      {article.title}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                      {article.excerpt}
                    </p>

                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-black text-cyan-600">
                      Read More
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700 px-6 py-12 text-center shadow-xl shadow-cyan-900/10 sm:px-10">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="relative">
            <h2 className="text-2xl font-black text-white sm:text-3xl">
              Need Help Choosing Your Career?
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-cyan-50 sm:text-base">
              Our counsellors can help you understand courses, colleges,
              eligibility and career opportunities.
            </p>

            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-black text-cyan-700 shadow-lg transition hover:-translate-y-1 hover:bg-slate-50"
            >
              Talk to a Counsellor
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogArticles;

