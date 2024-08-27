import { screen, fireEvent } from "@testing-library/react";
import { useSeatGeek } from "../utils/useSeatGeek";
import { renderWithProvider } from "../utils/renderWithProvider";
import Events from "./Events";

jest.mock("../utils/useSeatGeek", () => ({
  useSeatGeek: jest.fn(),
}));

describe("Events", () => {
  const mockData = {
    events: [
      {
        id: 1,
        performers: [{ image: "https://placehold.co/600x400/EEE/31343C" }],
        short_title: "Event A",
        datetime_utc: new Date("2023-09-15T18:00:00"),
        venue: { name_v2: "Venue A", display_location: "New York" },
      },
      {
        id: 2,
        performers: [{ image: "https://placehold.co/600x400/EEE/31343C" }],
        short_title: "Event B",
        datetime_utc: new Date("2023-10-20T20:00:00"),
        venue: { name_v2: "Venue B", display_location: "Los Angeles" },
      },
      {
        id: 3,
        performers: [{ image: "https://placehold.co/600x400/EEE/31343C" }],
        short_title: "Event C",
        datetime_utc: new Date("2023-08-05T16:00:00"),
        venue: { name_v2: "Venue C", display_location: "Chicago" },
      },
    ],
  };

  beforeEach(() => {
    (useSeatGeek as jest.Mock).mockReturnValue({ data: mockData, error: null });
  });

  it("sorts events by name ascending", () => {
    renderWithProvider(<Events />);
    const sortSelect = screen.getByTestId("sort-select");

    fireEvent.change(sortSelect, { target: { value: "name_asc" } });

    const eventItems = screen.getAllByRole("link", { name: /Event/ });
    expect(eventItems[0]).toHaveTextContent("Event A");
    expect(eventItems[1]).toHaveTextContent("Event B");
    expect(eventItems[2]).toHaveTextContent("Event C");
  });

  it("sorts events by nearest (ascending) date", () => {
    renderWithProvider(<Events />);
    const sortSelect = screen.getByTestId("sort-select");

    fireEvent.change(sortSelect, { target: { value: "nearest" } });

    const eventItems = screen.getAllByRole("link", { name: /Event/ });
    expect(eventItems[0]).toHaveTextContent("Event C");
    expect(eventItems[1]).toHaveTextContent("Event A");
    expect(eventItems[2]).toHaveTextContent("Event B");
  });

  it("filters events by the city location", () => {
    renderWithProvider(<Events />);
    const sortSelect = screen.getByTestId("location-select");

    fireEvent.change(sortSelect, { target: { value: "new york" } });

    const eventItems = screen.getAllByRole("link", { name: /Event/ });
    expect(eventItems).toHaveLength(1);
    expect(screen.getByTestId("event-location")).toHaveTextContent("New York");
  });
});
