import { Suspense } from "react";
import BlogSection from "@/components/blogs/BlogSection";
import BlogCardSkeleton from "@/components/blogs/BlogsSkeleton";

const BlogsPage = () => {
  return (
    <div className="py-12">
      <div className="text-center pb-12">
        <h1 className="text-3xl font-bold mb-4">Our Blog</h1>
        <p className="mx-auto tracking-tight text-muted-foreground max-w-2xl">
          Welcome to our blog! Here, we share insights, updates, and stories from our team. Stay
          tuned for the latest news and articles on various topics that interest you.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <BlogCardSkeleton key={index} />
            ))}
          </div>
        }
      >
        <BlogSection />
      </Suspense>
    </div>
  );
};

export default BlogsPage;
