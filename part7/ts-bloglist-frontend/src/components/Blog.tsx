import { useParams } from "react-router-dom";
import { useBlog } from "@/hooks/useBlogs";
import Comments from "./Comments";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "./ui/card";

const Blog = () => {
  const id = useParams<{ id: string }>().id;
  const { data: blog, isLoading } = useBlog(id ?? "");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>{blog?.title}</CardTitle>
          <CardDescription>{blog?.author}</CardDescription>
        </CardHeader>
        <CardContent>
          <CardDescription>{blog?.url}</CardDescription>
          <CardDescription>likes: {blog?.likes}</CardDescription>
        </CardContent>
        <CardFooter>
          <Comments id={id ?? ""} />
        </CardFooter>
      </Card>
    </section>
  );
};
export default Blog;
