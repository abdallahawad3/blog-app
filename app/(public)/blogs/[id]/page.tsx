import { Separator } from "@/components/ui/separator";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";
import Image from "next/image";

const page = async ({ params }: { params: Promise<{ id: Id<"blogs"> }> }) => {
  const { id } = await params;
  const blog = await fetchQuery(api.blogs.getBlogById, { id });
  if (!blog) {
    return (
      <h1
        className="
    text-3xl font-bold underline text-red-500
    "
      >
        Blog not found
      </h1>
    );
  }
  return (
    <div className="py-10">
      <div className="relative w-full h-[500px] mb-8 rounded-xl overflow-hidden shadow-md">
        {blog.url && (
          <Image
            src={blog.url}
            alt={blog.title}
            fill
            className="object-center hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>

      <div className="space-y-4 flex flex-col">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">{blog.title}</h1>
        <p className="text-md text-muted-foreground">
          <span className="font-semibold tracking-tight mr-1 text-lg"> Created on:</span>
          {new Date(blog._creationTime).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <Separator className="my-4" />
      <p className="text-lg leading-relaxed whitespace-pre-wrap text-foreground/90">
        {blog.description}
      </p>
      <Separator className="my-4" />
    </div>
  );
};

export default page;
