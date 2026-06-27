"use server";

import { getToken } from "@/lib/auth-server";
import type z from "zod";
import type { CREATE_BLOG_SCHEME } from "./_scheme/createBlog";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

export const createBlogMutation = async (data: z.infer<typeof CREATE_BLOG_SCHEME>) => {
  const token = await getToken();
  try {
    await fetchMutation(
      api.blogs.createBlog,
      {
        title: data.title,
        description: data.description,
      },
      {
        token,
      },
    );
    return { success: true };
  } catch (error) {
    console.error("Error creating blog:", error);
    return { success: false, error: (error as Error).message };
  }
};
