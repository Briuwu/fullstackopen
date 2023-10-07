import { useAllBlogs } from "@/hooks/useBlogs";
import { Blog } from "@/types";
import BlogLists from "./BlogLists";
import CreateForm from "./CreateForm";

const Home = () => {
  const { data: blogs, isLoading } = useAllBlogs();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <section className="mt-10 mx-3">
      <h1 className="text-3xl font-bold">Blog App</h1>
      <CreateForm />
      <div className="grid gap-5 my-10 md:grid-cols-3 sm:grid-cols-2">
        {blogs?.map((blog: Blog) => (
          <BlogLists key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
};
export default Home;
