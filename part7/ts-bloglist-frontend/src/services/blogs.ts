import axios from "axios";
import { Blog } from "../types";
const baseUrl = "/api/blogs";

let token: string | null = null;

const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getOne = async (id: string) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.get(`${baseUrl}/${id}`, config);
  return response.data;
};

const getComments = async (id: string) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.get(`${baseUrl}/${id}/comments`, config);
  return response.data;
};

const create = async (newBlog: {
  title: string;
  author: string;
  url: string;
}) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const update = async (blog: Blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config);
  return response.data;
};

const addComment = async (blog: { id: string; comment: string }) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(
    `${baseUrl}/${blog.id}/comments`,
    { comment: blog.comment },
    config
  );
  return response.data;
};

const remove = async (id: string) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};


export default {
  getAll,
  create,
  update,
  remove,
  setToken,
  getOne,
  getComments,
  addComment,
};
