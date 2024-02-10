import { fireEvent, render, screen } from "@testing-library/react";
import { Blog } from "./Blog";

describe("Blog Component", () => {
  const blog = {
    title: "blog",
    author: "emita",
    url: "http://www.jorgeelcurioso.com",
    likes: 10,
    user: { name: "AuthorName", username: "author_username" }
  }

  const { title, author, url, likes, user } = blog;

   const mockAddLike = vi.fn();

  beforeEach(() => {
    render(<Blog blog={blog} addLike={mockAddLike} />);
  });

 

  test("renders content", () => {
    expect(screen.getByText(title)).toBeDefined();
    expect(screen.queryByText(/blog/i)).toBeDefined();
    // expect('2').toBe('2')
  });

  // queryByText retorna null si no encuentra el elemento, mientras que getByText arroja una excepción si no lo encuentra.

  test("should show only the title and not the other elements", () => {
    expect(screen.getByText(title)).toBeDefined();
    expect(screen.queryByText(author)).toBeNull();
    expect(screen.queryByText(url)).toBeNull();
    expect(screen.queryByText(likes)).toBeNull();
  });

  test("should show the other elements after pressing the button", () => {
    expect(screen.getByText(title)).toBeDefined();
     const boton = screen.getByText(/view/i);
    fireEvent.click(boton);
    
    expect(screen.queryByText(author)).toBeDefined();
    expect(screen.queryByText(url)).toBeDefined();
    expect(screen.queryByText(likes)).toBeDefined();
    expect(screen.queryByText(user)).toBeDefined();
    expect(screen.queryByText(user.name)).toBeDefined();
    expect(screen.queryByText(user.username)).toBeDefined();
  });

  test("should call the addLike handler twice when the like button is clicked twice", () => {

    const boton = screen.getByText(/view/i);
    fireEvent.click(boton);

    const likeButton = screen.getByText(/like/i);

  
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(mockAddLike).toHaveBeenCalledTimes(2);
  });

  // test("", () => { });
  // test("", () => {});
});
