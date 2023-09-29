import { useState } from "react";

const CreateBlog = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const handleCreate = (e) => {
    e.preventDefault();
    createBlog(newBlog);

    setNewBlog({ title: "", author: "", url: "" });
  };

  const handleBlogChange = (e) => {
    const { name, value } = e.target;

    setNewBlog((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleCreate}>
      <div>
        title:{" "}
        <input
          required
          id="title"
          name="title"
          value={newBlog.title}
          onChange={handleBlogChange}
        />
      </div>
      <div>
        author:{" "}
        <input
          required
          name="author"
          id="author"
          value={newBlog.author}
          onChange={handleBlogChange}
        />
      </div>
      <div>
        url:{" "}
        <input
          required
          name="url"
          id="url"
          value={newBlog.url}
          onChange={handleBlogChange}
        />
      </div>
      <button type="submit" id="create-button">
        create
      </button>
    </form>
  );
};
export default CreateBlog;
