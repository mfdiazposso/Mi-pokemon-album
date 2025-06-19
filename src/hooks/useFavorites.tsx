import { useEffect, useState } from "react";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("pokemon-favorites");
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error("Error loading favorites:", error);
        setFavorites([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("pokemon-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (pokemonName: string) => {
    const normalizedName = pokemonName.toLowerCase();

    setFavorites((prev) => {
      if (prev.includes(normalizedName)) {
        return prev.filter((name) => name !== normalizedName);
      } else {
        return [...prev, normalizedName];
      }
    });
  };

  const isFavorite = (pokemonName: string) => {
    return favorites.includes(pokemonName.toLowerCase());
  };

  const getFavoriteNames = () => {
    return [...favorites];
  };

  const cleanAllFavorites = () => {
    setFavorites([]);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    getFavoriteNames,
    cleanAllFavorites,
    favoritesCount: favorites.length,
  };
};
