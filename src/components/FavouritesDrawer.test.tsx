import { useFavourites } from "../context/FavouritesContext";
import FavouritesDrawer from "./FavouritesDrawer";
import { fireEvent, render, screen } from "@testing-library/react";

const mockUsedNavigate = jest.fn();

jest.mock("../context/FavouritesContext");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUsedNavigate,
}));

describe("FavouritesDrawer", () => {
  const mockUseFavourites = useFavourites as jest.Mock;

  beforeEach(() => {
    mockUseFavourites.mockClear();
    mockUsedNavigate.mockClear();
  });

  it("should render empty text if no favourites are in the context", () => {
    mockUseFavourites.mockReturnValue({
      favourites: [],
      addFavourite: jest.fn(),
      removeFavourite: jest.fn(),
    });

    render(<FavouritesDrawer isOpen={true} onClose={jest.fn()} />);
    expect(screen.getByTestId("empty-favourites-drawer")).toBeInTheDocument();
  });

  it("should display a list of favourites if exists in the context and allow them to be removed", () => {
    const mockRemoveFavourite = jest.fn();

    mockUseFavourites.mockReturnValue({
      favourites: [
        { id: 1, name: "Event 1", type: "event" },
        { id: 2, name: "Venue 1", type: "venue" },
      ],
      addFavourite: jest.fn(),
      removeFavourite: mockRemoveFavourite,
    });

    render(<FavouritesDrawer isOpen={true} onClose={jest.fn()} />);

    expect(screen.getByText("Event 1")).toBeInTheDocument();
    expect(screen.getByText("Venue 1")).toBeInTheDocument();

    fireEvent.click(
      screen.getAllByRole("button", { name: /remove favourite/i })[0]
    );
    expect(mockRemoveFavourite).toHaveBeenCalledWith(1);
  });

  it("should navigate to the event/venue when clicking on the favourite item in the list", () => {
    const mockOnClose = jest.fn();

    mockUseFavourites.mockReturnValue({
      favourites: [
        { id: 1, name: "Event 1", type: "event" },
        { id: 2, name: "Venue 1", type: "venue" },
      ],
      addFavourite: jest.fn(),
      removeFavourite: jest.fn(),
    });

    render(<FavouritesDrawer isOpen={true} onClose={mockOnClose} />);

    fireEvent.click(screen.getByText("Event 1"));
    expect(mockUsedNavigate).toHaveBeenCalledWith("/events/1");
    expect(mockOnClose).toHaveBeenCalled();
  });
});
