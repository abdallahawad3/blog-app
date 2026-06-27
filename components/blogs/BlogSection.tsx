import BlogCard from "./BlogCard";

interface IProps {
  data: { title: string; description: string; _id: string }[];
}

const BlogSection = ({ data }: IProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-4">
      {data.map((item) => (
        <BlogCard key={item.title} data={item} />
      ))}
    </div>
  );
};

export default BlogSection;
