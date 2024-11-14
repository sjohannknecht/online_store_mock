import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal from "../ui/Modal";

describe("Modal", () => {
  test("displays its children.", () => {
    const text = "test";
    render(<Modal>{text}</Modal>);
    expect(screen.getByText(/test/i)).toBeInTheDocument();
  });
});
