import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import * as bookService from "../../services/books";
import Form from "./Form";

describe("Form", () => {
  vi.mock("../../services/books");
  describe("Create", () => {
    it("should render all fields", () => {
      render(
        <BrowserRouter>
          <Form />
        </BrowserRouter>
      );
      expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/author/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/year/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/genre/i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /create/i })
      ).toBeInTheDocument();
    });

    it("should show validation errors if required fields are missing", async () => {
      render(
        <BrowserRouter>
          <Form />
        </BrowserRouter>
      );
      userEvent.click(screen.getByRole("button", { name: /create/i }));
      expect(await screen.findByText(/title is required/i)).toBeInTheDocument();
      expect(
        await screen.findByText(/author is required/i)
      ).toBeInTheDocument();
    });

    it("should create a book when submitting", async () => {
      bookService.postBook.mockResolvedValueOnce({ id: 1 });
      render(
        <BrowserRouter>
          <Form />
        </BrowserRouter>
      );

      await userEvent.type(screen.getByLabelText(/title/i), "Test Book");
      await userEvent.type(screen.getByLabelText(/author/i), "Tester");
      await userEvent.type(screen.getByLabelText(/year/i), "1888");
      await userEvent.type(screen.getByLabelText(/genre/i), "Novel");

      userEvent.click(screen.getByRole("button", { name: /create/i }));

      await waitFor(() => {
        expect(bookService.postBook).toHaveBeenCalledWith({
          title: "Test Book",
          author: "Tester",
          year: "1888",
          genre: "Novel",
        });
      });
    });
  });
  describe("Update", () => {
    it("should render update form with preloaded fields", async () => {
      bookService.getBook.mockResolvedValueOnce({
        title: "Test Book",
        author: "Tester",
        year: 1888,
        genre: "Novel",
      });
      render(
        <BrowserRouter>
          <Form id={1} />
        </BrowserRouter>
      );
      await waitFor(() => {
        expect(screen.getByLabelText(/title/i)).toHaveValue("Test Book");
        expect(screen.getByLabelText(/author/i)).toHaveValue("Tester");
        expect(screen.getByLabelText(/year/i)).toHaveValue(1888);
        expect(screen.getByLabelText(/genre/i)).toHaveValue("Novel");
      });
      expect(
        screen.getByRole("button", { name: /update/i })
      ).toBeInTheDocument();
    });
  });
});
