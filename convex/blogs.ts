import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./betterAuth/auth";

export const createBlog = mutation({
  args: { title: v.string(), description: v.string(), image: v.id("_storage") },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user) {
      throw new ConvexError("Not authenticated");
    }

    try {
      const newBlogId = await ctx.db.insert("blogs", {
        title: args.title,
        description: args.description,
        authorId: user._id,
        imageStorageId: args.image,
      });
      return newBlogId;
    } catch (error) {
      console.error("Error generating image upload URL:", error);
      throw new ConvexError("Failed to generate image upload URL");
    }
  },
});

export const getBlogs = query({
  args: {},
  handler: async function (ctx) {
    const blogs = await ctx.db.query("blogs").order("desc").collect();
    return Promise.all(
      blogs.map(async (blog) => ({
        ...blog,
        ...(blog.imageStorageId ? { url: await ctx.storage.getUrl(blog.imageStorageId) } : {}),
      })),
    );
  },
});

export const generateImageUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const getBlogById = query({
  args: { id: v.id("blogs") },
  handler: async (ctx, { id }) => {
    const blog = await ctx.db.get(id);
    if (!blog) {
      throw new ConvexError("Blog not found");
    }
    const blogWithUrl = {
      ...blog,
      ...(blog.imageStorageId ? { url: await ctx.storage.getUrl(blog.imageStorageId) } : {}),
    };
    return blogWithUrl;
  },
});
