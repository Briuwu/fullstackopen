export type Blog = {
  id: string;
  title: string;
  author: string;
  url: string;
  likes: number;
  user: User;
  comments: string[];
};

export type User = {
  username: string;
  name: string;
  id: string;
};

export type Credentials = {
  username: string;
  password: string;
};

export type UserType = {
  name: string;
  id: string;
  username: string;
  blogs: [
    {
      author: string;
      id: string;
      likes: number;
      title: string;
      url: string;
    }
  ];
};
