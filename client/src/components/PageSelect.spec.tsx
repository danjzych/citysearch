import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PageSelect from "./PageSelect";

const mockChangePage = vi.fn();

describe("PageSelect", () => {
  it("displays correct page number", () => {
    render(<PageSelect page={1} numPages={2} changePage={mockChangePage} />);
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("disables back button when on page one", () => {
    render(<PageSelect page={1} numPages={2} changePage={mockChangePage} />);
    expect(screen.getByTestId("pagination_back_button")).toBeDisabled();
  });

  it("disables forward button when on last page", () => {
    render(<PageSelect page={2} numPages={2} changePage={mockChangePage} />);
    expect(screen.getByTestId("pagination_forward_button")).toBeDisabled();
  });

  it("calls changePage function on pagination button click", async () => {
    render(<PageSelect page={1} numPages={2} changePage={mockChangePage} />);
    const user = userEvent.setup();

    const forwardButton = screen.getByTestId("pagination_forward_button");
    await user.click(forwardButton);
    expect(mockChangePage).toHaveBeenCalled();
  });
});
