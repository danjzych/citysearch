import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Search from "./Search";
import CitySearch from "../api";
import { City } from "../types";

// const mockUseSearchParams = vi.fn();
// vi.mock("react-router-dom", async () => {
//   const actual = await vi.importActual("react-router-dom");
//   return {
//     ...actual,
//     useSearchParams: vi.fn(),
//   };
// });

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

const mockGetCities = vi.fn().mockResolvedValue(mockCityData);
CitySearch.getCities = mockGetCities;

describe("Search", () => {
  it("focuses input on page loads", () => {
    render(<Search />, { wrapper: MemoryRouter });
    const input = screen.getByPlaceholderText("Madison, WI");
    expect(input).toHaveFocus();
  });

  it("uses address query string to pre-populate input", async () => {
    render(
      <MemoryRouter initialEntries={["?address=madison"]}>
        <Search />
      </MemoryRouter>
    );
    expect(screen.getByDisplayValue("madison")).toBeInTheDocument();
  });

  it("updates search params with search input value", () => {});

  it("calls api with correct URLSearchParams", async () => {
    render(<Search />, { wrapper: MemoryRouter });
    const user = userEvent.setup();
    const input = screen.getByPlaceholderText("Madison, WI");
    await act(async () => await user.type(input, "madison"));

    expect(mockGetCities).toHaveBeenCalledWith("madison");
  });

  it("updates results with api results", async () => {
    render(<Search />, { wrapper: MemoryRouter });
    const user = userEvent.setup();
    const input = screen.getByPlaceholderText("Madison, WI");
    await act(async () => await user.type(input, "m"));

    expect(screen.getByText(/Milwaukee/i)).toBeInTheDocument();
  });

  it("transitions paginated data approprately on forward and backward click");
});
