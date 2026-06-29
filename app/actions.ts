"use server";

import { getToken } from "@/lib/auth-server";
import type z from "zod";
import type { CREATE_BLOG_SCHEME } from "./_scheme/createBlog";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import type { FileWithPreview } from "@/hooks/use-file-upload";

export const createBlogMutation = async (
  data: z.infer<typeof CREATE_BLOG_SCHEME> & {
    image: FileWithPreview;
  },
) => {
  const token = await getToken();
  if (!token) {
    return { success: false, error: "User is not authenticated" };
  }

  try {
    const imageUrl = await fetchMutation(api.blogs.generateImageUploadUrl, {}, { token });

    const imageFile = data.image.file as File;

    const uploadResponse = await fetch(imageUrl, {
      method: "POST",
      headers: {
        "Content-Type": imageFile.type,
      },
      body: imageFile,
    });

    if (!uploadResponse.ok) {
      const text = await uploadResponse.text();
      throw new Error(`Upload failed: ${uploadResponse.status} — ${text}`);
    }

    const result = await uploadResponse.json();
    const storageId = result.storageId;

    if (!storageId) {
      throw new Error("No storageId returned from upload");
    }

    await fetchMutation(
      api.blogs.createBlog,
      {
        title: data.title,
        description: data.description,
        image: storageId,
      },
      { token },
    );

    return { success: true };
  } catch (error) {
    console.error("Error creating blog:", error);
    return { success: false, error: (error as Error).message };
  }
};
