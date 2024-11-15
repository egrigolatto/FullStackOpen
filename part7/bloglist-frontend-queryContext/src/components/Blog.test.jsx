import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Blog } from "./Blog";

test("renders content", () => {
  const blog = {
    title: "prueba1",
    author: "ema",
    url: "String",
  };

  render(<Blog blog={blog} />);

  // screen.debug();

  const element = screen.getByText(/prueba1/i);

  // screen.debug(element);

  expect(element).toBeDefined();
});

test("renders content container", () => {
  const blog = {
    title: "prueba1",
    author: "ema",
    url: "String",
  };

  const { container } = render(<Blog blog={blog} />);

  const div = container.querySelector(".blog");
  expect(div).toHaveTextContent("prueba1");
});

test("clicking the like button calls event handler once", async () => {
  const blog = {
    title: "prueba1",
    author: "ema",
    url: "String",
    likes: 0,
    user: { name: "tester" },
  };

  const mockHandler = vi.fn();

  render(
    <Blog
      blog={blog}
      addLike={mockHandler}
      currentUser={{ username: "tester" }}
    />
  );

  const user = userEvent.setup();

  // Primero mostrar el contenido con el botón "view"
  const viewButton = screen.getByText("view");
  await user.click(viewButton);

  // Luego, hacer clic en el botón "like"
  const likeButton = screen.getByText("like");
  await user.click(likeButton);
  await user.click(likeButton);

  // Verificar que el handler fue llamado una vez
  expect(mockHandler.mock.calls).toHaveLength(2);
});

test("renders blog title and author, but does not show url or likes by default", () => {
  const blog = {
    title: "TestBlog",
    author: "TestAuthor",
    url: "https://test-url.com",
    likes: 10,
    user: { name: "Test User" },
  };

  // Renderizar el componente Blog
  render(<Blog blog={blog} currentUser={{ username: "testuser" }} />);

  // Verificar que el título y el autor estén visibles
  const titleElement = screen.getByText(/TestBlog/i);
  expect(titleElement).toBeInTheDocument();

  const authorElement = screen.getByText(/TestAuthor/i);
  expect(authorElement).toBeInTheDocument();

  // Verificar que la URL no esté visible inicialmente
  const urlElement = screen.queryByText("https://test-url.com");
  expect(urlElement).toBeNull(); // queryByText no encuentra el elemento si está oculto

  // Verificar que el número de likes no esté visible inicialmente
  const likesElement = screen.queryByText("Likes: 10");
  expect(likesElement).toBeNull();
});

test("displays URL and number of likes when the 'view' button is clicked", async () => {
  const blog = {
    title: "Test Blog",
    author: "Test Author",
    url: "https://test-url.com",
    likes: 10,
    user: { name: "Test User" },
  };

  // Renderizar el componente Blog
  render(<Blog blog={blog} currentUser={{ username: "testuser" }} />);

  const user = userEvent.setup();

  // Asegurarse de que el botón "view" esté en el documento
  const viewButton = screen.getByText("view");
  expect(viewButton).toBeInTheDocument();

  // Simular el clic en el botón "view" para mostrar los detalles
  await user.click(viewButton);

  // Verificar que la URL esté visible después del clic usando regex
  const urlElement = screen.getByText(/https:\/\/test-url\.com/i);
  expect(urlElement).toBeInTheDocument();

  // Verificar que los likes estén visibles después del clic
  const likesElement = screen.getByText(/Likes: 10/i);
  expect(likesElement).toBeInTheDocument();
});