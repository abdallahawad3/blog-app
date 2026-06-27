import CreateBlogForm from "@/components/forms/create-blog";

const CreateBlogPage = () => {
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="font-extrabold text-4xl tracking-tight sm:text-5xl">Create Blog</h1>
        <p className="text-xl text-muted-foreground mt-4">Create your own blog article...</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <CreateBlogForm />
      </div>
    </div>
  );
};

export default CreateBlogPage;
