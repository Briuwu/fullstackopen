import { useState } from "react";
import { useCreateBlog } from "@/hooks/useBlogs";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import useNotification from "@/hooks/useNotification";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const CreateForm = () => {
  const [open, setOpen] = useState(false);
  const { handleNotification } = useNotification();
  const addBlog = useCreateBlog();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = (e.target as HTMLFormElement).titleBlog.value;
    const author = (e.target as HTMLFormElement).author.value;
    const url = (e.target as HTMLFormElement).url.value;

    if (!title || !author || !url) return alert("Please fill all the fields");

    addBlog.mutate({ title, author, url });
    handleNotification("Blog created successfully", "success");

    (e.target as HTMLFormElement).titleBlog.value = "";
    (e.target as HTMLFormElement).author.value = "";
    (e.target as HTMLFormElement).url.value = "";
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="mt-5">
        <Button variant="secondary">Create New</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-3xl">Add new Blog</DialogTitle>
          <form onSubmit={handleSubmit} className="my-5 grid gap-5">
            <div className="grid gap-3 items-center">
              <Label htmlFor="titleBlog" className="font-bold text-md">
                Title
              </Label>
              <Input type="text" id="titleBlog" name="titleBlog" />
            </div>
            <div className="grid gap-3 items-center">
              <Label htmlFor="author" className="font-bold text-md">
                Author
              </Label>
              <Input type="text" id="author" name="author" />
            </div>
            <div className="grid gap-3 items-center">
              <Label htmlFor="url" className="font-bold text-md">
                Url
              </Label>
              <Input type="text" id="url" name="url" />
            </div>
            <Button>Create</Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default CreateForm;
