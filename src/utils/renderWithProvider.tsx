import { BrowserRouter } from "react-router-dom";
import { ReactElement } from "react";
import { render } from "@testing-library/react";
import { FavouritesProvider } from "../context/FavouritesContext";

export const renderWithProvider = (ui: ReactElement) => {
  return render(
    <BrowserRouter>
      <FavouritesProvider>{ui}</FavouritesProvider>
    </BrowserRouter>
  );
};
