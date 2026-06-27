interface IProps {
  data: { title: string; description: string; _id: string };
}

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

const BlogCard = ({ data }: IProps) => {
  console.log(data.description.length, data.description);
  return (
    <Card className="p-0 space-y-0">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full overflow-hidden">
          <Link href={`blogs/${data._id}`}>
            <Image className="object-cover" fill alt="This is an image" src={"/placeholder.jpg"} />
          </Link>
        </div>
      </CardHeader>
      <CardContent className="px-4 py-2 space-y-1  overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <Link href={`blogs/${data._id}`} className="text-xl hover:text-primary font-bold mb-1">
          {data.title.length > 50 ? data.title.substring(0, 50) + "..." : data.title}
        </Link>
        <p className="text-muted-foreground text-sm wrap-break-word ">
          {data.description.length > 20
            ? `${data.description.substring(0, 20)}...`
            : data.description}
        </p>
      </CardContent>

      <CardFooter className="bg-none">
        <Link
          href={`blogs/${data._id}`}
          className={`${buttonVariants({ variant: "default" })} w-full`}
        >
          Read More
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
