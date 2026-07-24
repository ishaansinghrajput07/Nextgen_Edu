import { useParams, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

export default function EditBlog() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    slug: "",
    category: "",
    image: "",
    status: "Draft",
    seoTitle: "",
    seoDescription: "",
    content: "",
  });

  useEffect(() => {
    try {
      const blogs = JSON.parse(localStorage.getItem("blogs") || "[]");

      const blog = blogs.find((b) => String(b.id) === String(id));

      if (blog) {
        setFormData({
          id: blog.id || "",
          title: blog.title || "",
          slug: blog.slug || "",
          category: blog.category || "",
          image: blog.image || "",
          status: blog.status || "Draft",
          seoTitle: blog.seoTitle || "",
          seoDescription: blog.seoDescription || "",
          content: blog.content || "",
        });
      } else {
        alert("Blog not found");
        navigate("/admin/blogs");
      }
    } catch (error) {
      console.error(error);
      alert("Error loading blog");
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    try {
      const blogs = JSON.parse(localStorage.getItem("blogs") || "[]");

      const updatedBlogs = blogs.map((blog) =>
        String(blog.id) === String(id)
          ? {
              ...blog,
              ...formData,
              id: blog.id,
            }
          : blog,
      );

      localStorage.setItem("blogs", JSON.stringify(updatedBlogs));

      alert("Blog Updated Successfully");

      navigate("/admin/blogs");
    } catch (error) {
      console.error(error);
      alert("Failed to update blog");
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm">
        <h1 className="text-3xl font-bold mb-8">Edit Blog</h1>

        <form onSubmit={handleUpdate} className="space-y-5">
          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-4 border rounded-xl"
          />

          <input
            type="text"
            name="slug"
            placeholder="Blog Slug"
            value={formData.slug}
            onChange={handleChange}
            className="w-full p-4 border rounded-xl"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-4 border rounded-xl"
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-4 border rounded-xl"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-4 border rounded-xl"
          >
            <option value="Draft">Draft</option>

            <option value="Published">Published</option>
          </select>

          <input
            type="text"
            name="seoTitle"
            placeholder="SEO Title"
            value={formData.seoTitle}
            onChange={handleChange}
            className="w-full p-4 border rounded-xl"
          />

          <textarea
            rows="3"
            name="seoDescription"
            placeholder="SEO Description"
            value={formData.seoDescription}
            onChange={handleChange}
            className="w-full p-4 border rounded-xl"
          />

          <textarea
            rows="10"
            name="content"
            placeholder="Blog Content"
            value={formData.content}
            onChange={handleChange}
            className="w-full p-4 border rounded-xl"
          />

          <div className="flex gap-3">
            <button
              type="submit"
              className="
              bg-green-500
              hover:bg-green-600
              text-white
              px-8 py-3
              rounded-xl
              "
            >
              Update Blog
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/blogs")}
              className="
              bg-gray-500
              hover:bg-gray-600
              text-white
              px-8 py-3
              rounded-xl
              "
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
