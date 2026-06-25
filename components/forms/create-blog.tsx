"use client";

import { cn } from "@/lib/utils";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import type z from "zod";
import { CREATE_BLOG_SCHEME } from "@/app/_scheme/createBlog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { createBlogMutation } from "@/app/actions";

const CreateBlogForm = ({ className, ...props }: React.ComponentProps<"form">) => {
  const router = useRouter();
  const [isPending, setTransition] = useTransition();
  const form = useForm<z.infer<typeof CREATE_BLOG_SCHEME>>({
    resolver: zodResolver(CREATE_BLOG_SCHEME),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(data: z.infer<typeof CREATE_BLOG_SCHEME>) {
    setTransition(async function () {
      const result = await createBlogMutation(data);
      if (!result.success) {
        toast.error(`Error creating blog: ${result.error}`);
        return;
      }
      toast.success("Blog created successfully");
      form.reset();
      setTimeout(() => {
        router.push("/");
      }, 2000);
    });
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn(
        "flex flex-col gap-6 w-full bg-card text-card-foreground rounded-lg border p-6 ",
        className,
      )}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create an new blog</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter your blog details below
          </p>
        </div>
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="title">Blog Title</FieldLabel>
              <Input
                {...field}
                id="title"
                aria-invalid={fieldState.invalid}
                placeholder="Enter your blog title"
                autoComplete="off"
                type="text"
                className="py-5"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="textarea-message">Message</FieldLabel>
              <FieldDescription>Enter your message below.</FieldDescription>
              <Textarea
                {...field}
                aria-invalid={fieldState.invalid}
                id="textarea-message"
                placeholder="Type your message here."
                rows={5}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field>
          <Button type="submit">
            {isPending ? (
              <span className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </span>
            ) : (
              "Create Blog"
            )}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default CreateBlogForm;
