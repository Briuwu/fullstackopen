import { useComment, useGetAllComments } from "@/hooks/useBlogs";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Comments = ({ id }: { id: string }) => {
  const { data: comments, isLoading } = useGetAllComments(id);
  const addComment = useComment();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const comment = (e.target as HTMLFormElement).comment.value;
    addComment.mutate({ id, comment });
    (e.target as HTMLFormElement).comment.value = "";
  };

  return (
    <div>
      <h2 className="font-bold text-2xl">Comments</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3 my-5">
        <Input type="text" id="comment" name="comment" />
        <Button type="submit">add comment</Button>
      </form>
      <ul className="list-disc list-inside">
        {comments.map((comment: string, index: number) => (
          <li key={comment + index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};
export default Comments;
