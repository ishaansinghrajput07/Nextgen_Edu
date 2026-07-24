import { useState, useEffect, useMemo } from "react";
import {
  Search,
  Eye,
  Pencil,
  Trash2,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BlogsAdmin() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All");
  const [categoryFilter, setCategoryFilter] =
    useState("All");
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    try {
      const savedBlogs = JSON.parse(
        localStorage.getItem("blogs") || "[]"
      );

      setBlogs(
        Array.isArray(savedBlogs)
          ? savedBlogs
          : []
      );
    } catch (error) {
      console.error(
        "Error loading blogs:",
        error
      );
      setBlogs([]);
    }
  }, []);

 const deleteBlog = (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this blog?"
  );

  if (!confirmDelete) return;

  const updatedBlogs = blogs.filter(
    (blog) =>
      String(blog.id) !== String(id)
  );

  setBlogs(updatedBlogs);

  localStorage.setItem(
    "blogs",
    JSON.stringify(updatedBlogs)
  );
};
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        (blog.title || "")
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        statusFilter === "All" ||
        blog.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All" ||
        blog.category === categoryFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory
      );
    });
  }, [
    blogs,
    search,
    statusFilter,
    categoryFilter,
  ]);

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Blog Management
          </h1>

          <p className="text-gray-500 dark:text-gray-400">
            Manage Website Blogs
          </p>
        </div>

        <button
          onClick={() =>
            navigate(
              "/admin/blogs/create"
            )
          }
          className="flex items-center gap-2 bg-cyan-500 text-white px-5 py-3 rounded-xl hover:bg-cyan-600 transition"
        >
          <Plus size={18} />
          Create Blog
        </button>
      </div>

      {/* Filters */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search Blog..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
          className="p-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900"
        >
          <option value="All">
            All Status
          </option>
          <option value="Published">
            Published
          </option>
          <option value="Draft">
            Draft
          </option>
        </select>

        <select
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(
              e.target.value
            )
          }
          className="p-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900"
        >
          <option value="All">
            All Categories
          </option>
          <option value="MBA">
            MBA
          </option>
          <option value="Distance Education">
            Distance Education
          </option>
          <option value="Study Abroad">
            Study Abroad
          </option>
          <option value="Online Learning">
            Online Learning
          </option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-3xl overflow-x-auto shadow-sm">
        <table className="w-full min-w-[1000px]">
          <thead>
            <tr className="border-b border-gray-200 dark:border-slate-700">
              <th className="text-left p-4">
                Image
              </th>
              <th className="text-left p-4">
                Title
              </th>
              <th className="text-left p-4">
                Category
              </th>
              <th className="text-left p-4">
                Author
              </th>
              <th className="text-left p-4">
                Status
              </th>
              <th className="text-left p-4">
                Views
              </th>
              <th className="text-left p-4">
                Date
              </th>
              <th className="text-left p-4">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredBlogs.length ===
            0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="text-center py-12 text-gray-500"
                >
                  No Blogs Found
                </td>
              </tr>
            ) : (
              filteredBlogs.map(
                (blog) => (
                  <tr
                    key={blog.id}
                    className="border-b border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800 transition"
                  >
                    <td className="p-4">
                      <img
                        src={
                          blog.image ||
                          "https://via.placeholder.com/80"
                        }
                        alt={
                          blog.title ||
                          "Blog"
                        }
                        onError={(
                          e
                        ) => {
                          e.target.src =
                            "https://via.placeholder.com/80";
                        }}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                    </td>

                    <td className="p-4 font-medium">
                      {blog.title}
                    </td>

                    <td className="p-4">
                      {blog.category ||
                        "-"}
                    </td>

                    <td className="p-4">
                      {blog.author ||
                        "Admin"}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          blog.status ===
                          "Published"
                            ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400"
                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400"
                        }`}
                      >
                        {blog.status}
                      </span>
                    </td>

                    <td className="p-4">
                      {blog.views ||
                        0}
                    </td>

                    <td className="p-4">
                      {blog.date ||
                        "-"}
                    </td>

                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            navigate(
                              `/blog/${blog.slug}`
                            )
                          }
                          className="p-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30"
                        >
                          <Eye
                            size={16}
                          />
                        </button>

                        <button
  onClick={() =>
    navigate(
      `/admin/blogs/edit/${blog.id}`
    )
  }
  className="
    p-2 rounded-lg
    bg-yellow-500/20
    hover:bg-yellow-500/30
  "
>
  <Pencil size={16} />
</button>

                        <button
                          onClick={() =>
                            deleteBlog(
                              blog.id
                            )
                          }
                          className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30"
                        >
                          <Trash2
                            size={16}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}