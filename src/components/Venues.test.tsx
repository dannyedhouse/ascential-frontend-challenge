import { screen, fireEvent } from "@testing-library/react";
import { useSeatGeek } from "../utils/useSeatGeek";
import Venues from "./Venues";
import { renderWithProvider } from "../utils/renderWithProvider";

jest.mock("../utils/useSeatGeek", () => ({
  useSeatGeek: jest.fn(),
}));

describe("Venues Component", () => {
  const mockData = {
    venues: [
      {
        id: 1,
        name_v2: "Venue A",
        display_location: "New York",
        num_upcoming_events: 5,
      },
      {
        id: 2,
        name_v2: "Venue B",
        display_location: "Los Angeles",
        num_upcoming_events: 3,
      },
      {
        id: 3,
        name_v2: "Venue C",
        display_location: "Chicago",
        num_upcoming_events: 7,
      },
    ],
  };

  beforeEach(() => {
    (useSeatGeek as jest.Mock).mockReturnValue({ data: mockData, error: null });
  });

  it("sorts venues by name ascending", () => {
    renderWithProvider(<Venues />);
    const sortSelect = screen.getByTestId("sort-select");

    fireEvent.change(sortSelect, { target: { value: "name_asc" } });

    const venueItems = screen.getAllByRole("link", { name: /Venue/ });
    expect(venueItems[0]).toHaveTextContent("Venue A");
    expect(venueItems[1]).toHaveTextContent("Venue B");
    expect(venueItems[2]).toHaveTextContent("Venue C");
  });

  it("sorts venues by number of upcoming events descending", () => {
    renderWithProvider(<Venues />);
    const sortSelect = screen.getByTestId("sort-select");

    fireEvent.change(sortSelect, { target: { value: "num_events_desc" } });

    const venueItems = screen.getAllByRole("link", { name: /Venue/ });
    expect(venueItems[0]).toHaveTextContent("Venue C");
    expect(venueItems[1]).toHaveTextContent("Venue A");
    expect(venueItems[2]).toHaveTextContent("Venue B");
  });

  it("filters venues by the city location", () => {
    renderWithProvider(<Venues />);
    const sortSelect = screen.getByTestId("location-select");

    fireEvent.change(sortSelect, { target: { value: "new york" } });

    const venueItems = screen.getAllByRole("link", { name: /Venue/ });
    expect(venueItems).toHaveLength(1);
    expect(screen.getByTestId("venue-location")).toHaveTextContent("New York");
  });
});
