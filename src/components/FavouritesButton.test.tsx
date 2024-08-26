import { render, screen, fireEvent } from "@testing-library/react";
import FavouritesButton from "./FavouritesButton";
import { useFavourites } from "../context/FavouritesContext";

jest.mock("../context/FavouritesContext");

describe("FavouritesButton", () => {
  const mockUseFavourites = useFavourites as jest.Mock;
  const mockAddFavourite = jest.fn();
  const mockRemoveFavourite = jest.fn();

  beforeEach(() => {
    mockUseFavourites.mockClear();
  });

  it("should render FavouritesButton", () => {
    mockUseFavourites.mockReturnValue({
      favourites: [
        { id: "1", name: "Event 1", type: "event" },
        { id: "2", name: "Venue 1", type: "venue" },
      ],
      addFavourite: mockAddFavourite,
      removeFavourite: mockRemoveFavourite,
    });

    render(<FavouritesButton id="1" name="Event 1" type="event" />);

    const button = screen.getByRole("button", { name: /add to favourites/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-label", "Add to favourites");
  });

  it("should add to favourites when event/venue clicked and not currently a favourite", () => {
    mockUseFavourites.mockReturnValue({
      favourites: [{ id: "1", name: "Event 1", type: "event" }],
      addFavourite: mockAddFavourite,
      removeFavourite: mockRemoveFavourite,
    });

    render(<FavouritesButton id="2" name="Event 2" type="event" />);

    fireEvent.click(screen.getByRole("button", { name: /add to favourites/i }));
    expect(mockAddFavourite).toHaveBeenCalledWith({
      id: "2",
      name: "Event 2",
      type: "event",
    });
  });

  it("should remove from favourites when clicked and currently a favourite", () => {
    mockUseFavourites.mockReturnValue({
      favourites: [
        { id: "1", name: "Event 1", type: "event" },
        { id: "2", name: "Venue 1", type: "venue" },
      ],
      addFavourite: mockAddFavourite,
      removeFavourite: mockRemoveFavourite,
    });

    render(<FavouritesButton id="1" name="Venue 1" type="venue" />);
    fireEvent.click(screen.getByRole("button", { name: /add to favourites/i }));
    expect(mockRemoveFavourite).toHaveBeenCalledWith("1");
  });
});
