import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateBlog() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    author: "Admin",
    image: "",
    status: "Draft",
    seoTitle: "",
    seoDescription: "",
    content: "",
  });

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  };

  const calculateReadingTime = (content) => {
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / 200);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "title") {
      setFormData((prev) => ({
        ...prev,
        title: value,
        slug: generateSlug(value),
        seoTitle: prev.seoTitle === "" ? value : prev.seoTitle,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const existingBlogs = JSON.parse(localStorage.getItem("blogs") || "[]");

      const newBlog = {
        id: Date.now().toString(),

        title: formData.title,
        slug: formData.slug,
        category: formData.category,
        author: formData.author,

        image: formData.image || "https://via.placeholder.com/800x400",

        status: formData.status,

        seoTitle: formData.seoTitle,
        seoDescription: formData.seoDescription,

        content: formData.content,

        views: 0,

        readingTime: calculateReadingTime(formData.content),

        date: new Date().toLocaleDateString(),

        createdAt: new Date().toISOString(),
      };

      localStorage.setItem(
        "blogs",
        JSON.stringify([...existingBlogs, newBlog]),
      );

      alert("Blog Created Successfully");

      navigate("/admin/blogs");
    } catch (error) {
      console.error(error);
      alert("Failed to create blog");
    }
  };

  return (
    <div className="p-8">
      <div
        className="
        bg-white
        dark:bg-slate-900
        rounded-3xl
        shadow-lg
        p-8
        "
      >
        <h1
          className="
          text-3xl
          font-bold
          mb-8
          "
        >
          Create New Blog
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="
            w-full
            p-4
            border
            rounded-xl
            "
          />

          <input
            type="text"
            name="slug"
            value={formData.slug}
            readOnly
            placeholder="Slug"
            className="
            w-full
            p-4
            border
            rounded-xl
            bg-gray-100
            dark:bg-slate-800
            "
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="
            w-full
            p-4
            border
            rounded-xl
            "
          >
            <option value="">Select Category</option>

            <option value="MBA">MBA</option>

            <option value="Distance Education">Distance Education</option>

            <option value="Study Abroad">Study Abroad</option>

            <option value="Online Learning">Online Learning</option>
          </select>

          <input
            type="text"
            name="image"
            placeholder="Featured Image URL"
            value={formData.image}
            onChange={handleChange}
            className="
            w-full
            p-4
            border
            rounded-xl
            "
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="
            w-full
            p-4
            border
            rounded-xl
            "
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
            className="
            w-full
            p-4
            border
            rounded-xl
            "
          />

          <textarea
            rows="4"
            name="seoDescription"
            placeholder="SEO Description"
            value={formData.seoDescription}
            onChange={handleChange}
            className="
            w-full
            p-4
            border
            rounded-xl
            "
          />

          <textarea
            rows="12"
            name="content"
            placeholder="Write Blog Content..."
            value={formData.content}
            onChange={handleChange}
            required
            className="
            w-full
            p-4
            border
            rounded-xl
            "
          />

          <button
            type="submit"
            className="
            bg-cyan-500
            text-white
            px-8
            py-3
            rounded-xl
            hover:bg-cyan-600
            transition
            "
          >
            Save Blog
          </button>
        </form>
      </div>
    </div>
  );
}
