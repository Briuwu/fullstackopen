import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { createAnecdote, getAnecdotes, updateAnecdote } from "../requests";
import useNotification from "./useNotification";
export const useAnecdotes = () => {
  return useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
  });
};

export const useCreateAnecdote = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();
  const { mutate } = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (anecdote) => {
      const anecdotes = queryClient.getQueryData({ queryKey: ["anecdotes"] });
      queryClient.setQueryData(
        { queryKey: ["anecdotes"] },
        anecdotes.concat(anecdote)
      );
    },
    onError: (err) => showNotification(err.message),
  });
  return mutate;
};

export const useUpdateAnecdote = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (anecdote) => {
      const anecdotes = queryClient.getQueryData({ queryKey: ["anecdotes"] });
      queryClient.setQueryData(
        { queryKey: ["anecdotes"] },
        anecdotes.map((a) => (a.id === anecdote.id ? anecdote : a))
      );
    },
  });
  return mutate;
};
