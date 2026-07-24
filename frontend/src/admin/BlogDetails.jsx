import { useParams } from "react-router-dom";

export default function BlogDetails() {
  const { slug } = useParams();

  const blogs = JSON.parse(
    localStorage.getItem("blogs") || "[]"
  );

  const blog = blogs.find(
    (item) => item.slug === slug
  );

  if (!blog) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold">
          Blog Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">

      <img
        src={blog.image}
        alt={blog.title}
        className="
        w-full
        h-[400px]
        object-cover
        rounded-3xl
        mb-8
        "
      />

      <h1
        className="
        text-5xl
        font-bold
        mb-4
        "
      >
        {blog.title}
      </h1>

      <div
        className="
        flex
        gap-4
        text-gray-500
        mb-8
        "
      >
        <span>
          Author:
          {" "}
          {blog.author}
        </span>

        <span>
          Category:
          {" "}
          {blog.category}
        </span>

        <span>
          Views:
          {" "}
          {blog.views}
        </span>
      </div>

      <div
        className="
        prose
        max-w-none
        "
      >
        {blog.content}
      </div>

    </div>
  );
}