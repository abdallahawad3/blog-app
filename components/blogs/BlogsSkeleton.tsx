import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const BlogCardSkeleton = () => {
  return (
    <Card className="p-0 space-y-0">
      <CardHeader className="p-0">
        <Skeleton className="h-48 w-full rounded-t-xl rounded-b-none" />
      </CardHeader>

      <CardContent className="px-4 py-2 space-y-3">
        <Skeleton className="h-6 w-4/5" />

        <Skeleton className="h-4 w-full" />
      </CardContent>

      <CardFooter>
        <Skeleton className="h-10 w-full rounded-md" />
      </CardFooter>
    </Card>
  );
};

export default BlogCardSkeleton;
