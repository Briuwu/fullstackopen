import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "@/services/blogs";
import userService from "@/services/users";
import { Blog, UserType } from "@/types";
import useNotification from "./useNotification";

export const useAllBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });
};

export const useBlog = (id: string) => {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => blogService.getOne(id),
  });
};

export const useCreateBlog = () => {
  const { handleNotification } = useNotification();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: blogService.create,
    onSuccess: (blog) => {
      queryClient.invalidateQueries(["blogs"]);
      handleNotification(`${blog.title} created`, "success");
    },
  });
};

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog: Blog) => {
      const previousBlogs: Blog[] | undefined = queryClient.getQueryData([
        "blogs",
      ]);
      queryClient.setQueryData(
        ["blogs"],
        previousBlogs?.map((blog) =>
          blog.id === updatedBlog.id ? updatedBlog : blog
        )
      );
    },
  });
};

export const useComment = () => {
  const { handleNotification } = useNotification();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: blogService.addComment,
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
      handleNotification("comment added", "success");
    },
  });
};

export const useGetAllComments = (id: string) => {
  return useQuery({
    queryKey: ["comments", id],
    queryFn: () => blogService.getComments(id),
  });
};

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
  });
};

export const useGetOneUser = (id: string) => {
  return useQuery<UserType>({
    queryKey: ["user", id],
    queryFn: () => userService.getOne(id),
  });
};
