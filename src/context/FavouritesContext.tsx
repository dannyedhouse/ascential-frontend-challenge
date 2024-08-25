import React, { createContext, useContext, useState, useEffect } from "react";

export interface FavouritesItem {
  id: string;
  name: string;
  type: "event" | "venue";
}

interface FavouritesContext {
  favourites: FavouritesItem[];
  addFavourite: (favouritesItem: FavouritesItem) => void;
  removeFavourite: (itemId: string) => void;
}

// Context
const FavouritesContext = createContext<FavouritesContext | undefined>(
  undefined
);

interface FavouritesProviderProps {
  children: React.ReactNode;
}

// Provider
export const FavouritesProvider = ({ children }: FavouritesProviderProps) => {
  const [favourites, setFavourites] = useState<FavouritesItem[]>([]);

  useEffect(() => {
    const savedFavourites = localStorage.getItem("favourites");
    if (savedFavourites) {
      setFavourites(JSON.parse(savedFavourites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const addFavourite = (item: FavouritesItem) => {
    setFavourites((prev) => [...prev, item]);
  };

  const removeFavourite = (itemId: string) => {
    setFavourites((prev) => prev.filter((item) => item.id !== itemId));
  };

  return (
    <FavouritesContext.Provider
      value={{ favourites, addFavourite, removeFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

// useContext
export const useFavourites = () => {
  const context = useContext(FavouritesContext);
  if (context === undefined) {
    throw new Error("useFavourites must be used within a FavouritesProvider");
  }
  return context;
};
