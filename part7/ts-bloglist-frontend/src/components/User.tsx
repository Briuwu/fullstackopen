import { Link, useParams } from "react-router-dom";
import { useGetOneUser } from "@/hooks/useBlogs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const User = () => {
  const { id } = useParams<{ id: string }>();
  const { data: user, isLoading } = useGetOneUser(id ?? "");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  console.log(user);

  return (
    <section className="mt-10">
      <h1 className="text-3xl font-bold uppercase">{user.name}</h1>
      <div className="my-10">
        <Table className="max-w-sm my-10">
          <TableCaption>A list of added blogs</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Added blogs</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {user?.blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell className="font-bold uppercase">
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};
export default User;
