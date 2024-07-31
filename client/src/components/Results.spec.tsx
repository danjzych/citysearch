import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Results from "./Results";
import { City } from "../types";

const mockCityData: City[] = [
  {
    id: 1,
    name: "Madison",
    lat: "43.0752983",
    lng: "-89.393898",
    state_name: "Wisconsin",
    state_abrv: "WI",
    url: "https://www.rentable.co/madison-wi",
  },
  {
    id: 2,
    name: "Milwaukee",
    lat: "43.028801",
    lng: "-87.9720001",
    state_name: "Wisconsin",
    state_abrv: "WI",
    url: "https://www.rentable.co/milwaukee-wi",
  },
];

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
