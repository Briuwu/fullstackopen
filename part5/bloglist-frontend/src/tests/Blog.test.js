import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Blog from "../components/Blog";

describe("Blog component", () => {
  const removeBlog = jest.fn();
  const updateBlog = jest.fn();

  const blog = {
    title: "Test title",
    author: "Test author",
    url: "Test url",
    likes: 0,
  };

  test("renders title and author, but not URL or likes by default", () => {
    render(
      <Blog blog={blog} removeBlog={removeBlog} updateBlog={updateBlog} />
    );

    const titleAndAuthor = screen.getByText(`${blog.title} ${blog.author}`);
    expect(titleAndAuthor).toBeInTheDocument();

    const url = screen.queryByText(blog.url);
    expect(url).not.toBeInTheDocument();

    const likes = screen.queryByText(`likes ${blog.likes}`);
    expect(likes).not.toBeInTheDocument();
  });

  test('renders URL and likes when "view" button is clicked', () => {
    render(<Blog blog={blog} />);

    const viewButton = screen.getByText("view");
    fireEvent.click(viewButton);

    const url = screen.getByText(blog.url);
    expect(url).toBeInTheDocument();

    const likes = screen.getByText(`likes ${blog.likes}`);
    expect(likes).toBeInTheDocument();
  });

  test("clicking like button twice calls event handler twice", () => {
    const blog = {
      title: "Test Blog",
      author: "Test Author",
      url: "http://test.com",
      likes: 0,
    };
    const mockHandler = jest.fn();

    const component = render(
      <Blog blog={blog} updateBlog={mockHandler} removeBlog={() => {}} />
    );

    const viewButton = screen.getByText("view");
    fireEvent.click(viewButton);

    const button = component.getByText("like");
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
