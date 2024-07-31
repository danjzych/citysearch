import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Results from "../components/Results";
import mockCityData from "./__mocks__/mockCityData";

describe("results", () => {
  it("displays not found message when city prop has no length", () => {
    render(<Results cities={[]} />);
    expect(screen.getByText(/Nothing here/i)).toBeInTheDocument();
  });

  it("disaplys cities data as list", () => {
    render(<Results cities={mockCityData} />);
    expect(screen.getByText(/Madison, Wisconsin/i)).toBeInTheDocument();
  });
});
