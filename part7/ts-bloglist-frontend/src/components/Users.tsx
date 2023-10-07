import { useGetAllUsers } from "@/hooks/useBlogs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { UserType } from "@/types";

const Users = () => {
  const { data: users, isLoading } = useGetAllUsers();

  console.log(users);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Table className="max-w-sm my-10">
      <TableCaption>A list of created users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Blogs Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((user: UserType) => (
          <TableRow key={user.id}>
            <TableCell className="font-bold uppercase">
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </TableCell>
            <TableCell>{user.blogs.length}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default Users;
