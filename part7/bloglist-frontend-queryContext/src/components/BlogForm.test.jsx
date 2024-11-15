import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BlogForm } from "./BlogForm";

test("calls createBlog with correct details when a new blog is created", async () => {
  const createBlog = vi.fn(); // Mock function
  const user = userEvent.setup();

  // Renderizar el componente BlogForm
  render(<BlogForm createBlog={createBlog} />);

  // Encontrar los inputs del formulario
  const titleInput = screen.getByPlaceholderText("write title here");
  const authorInput = screen.getByPlaceholderText("write author here");
  const urlInput = screen.getByPlaceholderText("write url here");
  const createButton = screen.getByText("Create");

  // Simular la interacción del usuario para llenar los inputs
  await user.type(titleInput, "New Blog Title");
  await user.type(authorInput, "Author Name");
  await user.type(urlInput, "https://blog-url.com");

  // Simular clic en el botón de crear
  await user.click(createButton);

  // Verificar que la función createBlog se haya llamado con los detalles correctos
  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: "New Blog Title",
    author: "Author Name",
    url: "https://blog-url.com",
  });
});