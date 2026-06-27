import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./betterAuth/auth";

export const createBlog = mutation({
  args: { title: v.string(), description: v.string() },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user) {
      throw new ConvexError("Not authenticated");
    }
    const newBlogId = await ctx.db.insert("blogs", {
      title: args.title,
      description: args.description,
      authorId: user._id,
    });
    return newBlogId;
  },
});

export const getBlogs = query({
  args: {},
  handler: async function (ctx) {
    // const user = await authComponent.safeGetAuthUser(ctx);
    // if (!user) throw new ConvexError("Not Authenticated");
    const blogs = await ctx.db.query("blogs").order("desc").collect();
    return blogs;
  },
});
