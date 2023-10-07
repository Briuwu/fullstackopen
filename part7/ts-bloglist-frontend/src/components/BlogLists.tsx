import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Blog } from "@/types";
import { Link } from "react-router-dom";

type BlogListsProps = {
  blog: Blog;
};

const BlogLists = ({ blog }: BlogListsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{blog.author}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default BlogLists;
