import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = () =>
  axios.get(baseUrl).then((response) => response.data);

export const createAnecdote = (anecdote) => {
  if (anecdote.content.length < 5) {
    throw new Error("Content must be at least 5 characters long");
  }
  return axios.post(baseUrl, anecdote).then((response) => response.data);
};

export const updateAnecdote = (anecdote) =>
  axios
    .put(`${baseUrl}/${anecdote.id}`, anecdote)
    .then((response) => response.data);
