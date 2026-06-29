import { fetchQuery } from "convex/nextjs";
import BlogCard from "./BlogCard";
import { api } from "@/convex/_generated/api";

const BlogSection = async () => {
  await new Promise((res) => setTimeout(res, 5000));
  const blogs = await fetchQuery(api.blogs.getBlogs);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-4">
      {blogs.map((item) => (
        <BlogCard key={item.title} data={item} />
      ))}
    </div>
  );
};

export default BlogSection;
