import { fireEvent, render, screen } from "@testing-library/react";
import { BlogForm } from "./BlogForm";


describe("BlogForm Component", () => {
  test("should call createBlog handler with correct details when creating a new blog", () => {
    // Mock functions
    const mockCreateBlog = vi.fn();
    const mockHandleError = vi.fn();
    const mockHandleNotification = vi.fn();

    // Renderizar el componente BlogForm con las funciones simuladas
    render(
      <BlogForm
        createBlog={mockCreateBlog}
        handleError={mockHandleError}
        handleNotification={mockHandleNotification}
      />
    );

    // Simular la entrada de datos en el formulario
    fireEvent.change(screen.getByRole("textbox", { name: 'title' }), {
      target: { value: "Blog Title" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: 'author' }), {
      target: { value: "Blog Author" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: 'url' }), {
      target: { value: "http://blogurl.com" },
    });

    // Simular el envío del formulario
    fireEvent.click(screen.getByText(/Create/));

    // Verificar que la función createBlog fue llamada con los detalles correctos
    expect(mockCreateBlog).toHaveBeenCalledWith({
      title: "Blog Title",
      author: "Blog Author",
      url: "http://blogurl.com",
    });

    // Verificar que las funciones mockHandleError y mockHandleNotification no fueron llamadas (porque todos los campos estaban completos)
    expect(mockHandleError).not.toHaveBeenCalled();
    expect(mockHandleNotification).toHaveBeenCalledWith(
      "A new blog Blog Title by Blog Author"
    );
  });
});

