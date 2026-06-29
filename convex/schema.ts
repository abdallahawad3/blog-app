import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  blogs: defineTable({
    title: v.string(),
    description: v.string(),
    imageStorageId: v.id("_storage"),
    authorId: v.string(),
  }),
});
