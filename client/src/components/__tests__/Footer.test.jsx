import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Footer from "../Footer/Footer";

describe("Footer", () => {
  test("renders with one list and zero list items if no entries as prop are provided", () => {
    render(<Footer></Footer>);
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.queryAllByRole("listitem").length).toEqual(0);
  });

  test("renders with one list and two list items if two entries as prop are provided", () => {
    const entries = [
      {
        title: "Home",
        path: "/",
      },
      {
        title: "Products",
        path: "products",
      },
    ];
    render(<Footer entries={entries}></Footer>, { wrapper: MemoryRouter });
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.queryAllByRole("listitem").length).toEqual(2);
  });
});
