import {
  describe,
  it,
  expect,
  vi,
  beforeAll,
  afterEach,
  beforeEach,
} from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Search from "../components/Search";
import CitySearch from "../api";
import mockCityData from "./__mocks__/mockCityData";

const mockGetCities = vi.fn().mockResolvedValue(mockCityData);
CitySearch.getCities = mockGetCities;

describe("Search", () => {
  beforeAll(() => {
    //@ts-ignore this is a workaround for a bug in @testing-library/react - https://github.com/testing-library/user-event/issues/1115, https://github.com/testing-library/react-testing-library/issues/1197
    globalThis.jest = { advanceTimersByTime: vi.advanceTimersByTime.bind(vi) };
  });
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("focuses input on page loads", () => {
    render(<Search />, { wrapper: MemoryRouter });
    const input = screen.getByPlaceholderText("Madison, WI");
    expect(input).toHaveFocus();
  });

  it("uses address query string to pre-populate input", async () => {
    render(
      <MemoryRouter initialEntries={["?address=madison"]}>
        <Search />
      </MemoryRouter>,
    );
    expect(screen.getByDisplayValue("madison")).toBeInTheDocument();
  });

  it("calls api with correct URLSearchParams", async () => {
    render(<Search />, { wrapper: MemoryRouter });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const input = screen.getByPlaceholderText("Madison, WI");

    await user.type(input, "madison");
    act(() => vi.advanceTimersByTime(301));

    expect(mockGetCities).toHaveBeenCalledWith(
      new URLSearchParams({ address: "madison" }),
    );
  });

  it("updates results with api results", async () => {
    render(<Search />, { wrapper: MemoryRouter });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const input = screen.getByPlaceholderText("Madison, WI");

    await user.type(input, "madison");
    await act(() => vi.advanceTimersByTime(301));

    expect(screen.getByText(/Milwaukee/i)).toBeInTheDocument();
  });

  it("transitions paginated data approprately on forward and backward click", async () => {
    render(<Search />, { wrapper: MemoryRouter });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const input = screen.getByPlaceholderText("Madison, WI");
    const forwardButton = screen.getByTestId("pagination_forward_button");

    await user.type(input, "madison");
    await act(() => vi.advanceTimersByTime(301));

    expect(screen.getByText(/Milwaukee/i)).toBeInTheDocument();

    await act(async () => await user.click(forwardButton));
  });
});
