import BlogSection from "@/components/blogs/BlogSection";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";

const BlogsPage = async () => {
  const blogs = await fetchQuery(api.blogs.getBlogs);
  return (
    <div className="py-12">
      <div className="text-center pb-12">
        <h1 className="text-3xl font-bold mb-4">Our Blog</h1>
        <p className="mx-auto tracking-tight text-muted-foreground max-w-2xl">
          Welcome to our blog! Here, we share insights, updates, and stories from our team. Stay
          tuned for the latest news and articles on various topics that interest you.
        </p>
      </div>

      <BlogSection data={blogs} />
    </div>
  );
};

export default BlogsPage;
