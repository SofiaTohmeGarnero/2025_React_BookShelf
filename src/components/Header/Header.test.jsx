import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { describe } from "vitest";

describe("Header", () => {
  it("should render h1", () => {
    render(<Header />);
    expect(screen.getByText("Book Shelf")).toBeInTheDocument();
  });
});
