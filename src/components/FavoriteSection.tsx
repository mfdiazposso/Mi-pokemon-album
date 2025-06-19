import { Pokemon } from "@/types/pokemon";
import { useEffect, useState } from "react";
import { PokemonCard } from "./PokemonCard";

interface FavoriteSectionProps {
  favoriteNames: string[];
  onToggleFavorite: (name: string) => void;
  isFavorite: (name: string) => boolean;
  className?: string;
}

export const FavoriteSection: React.FC<FavoriteSectionProps> = ({
  favoriteNames,
  onToggleFavorite,
  isFavorite,
  className = "",
}) => {
  const [favoritePokemon, setFavoritePokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFavorites = async () => {
      if (favoriteNames.length === 0) {
        setFavoritePokemon([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const pokemonPromises = favoriteNames.map(async (name) => {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
          );
          if (!response.ok) {
            throw new Error(`Error al cargar ${name}`);
          }
          return await response.json();
        });

        const pokemonData = await Promise.all(pokemonPromises);
        setFavoritePokemon(pokemonData);
      } catch (err) {
        setError("Error al cargar algunos Pokémon favoritos");
        console.error("Error loading favorites:", err);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [favoriteNames]);

  if (favoriteNames.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-6xl mb-4">💔</div>
        <h3 className="text-2xl font-bold text-gray-600 mb-2">
          No tienes favoritos aún
        </h3>
        <p className="text-gray-500">
          ¡Busca Pokémon y marca los que más te gusten con el corazón
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          ❤️ Mis Pokémon
        </h2>
        <p className="text-gray-600">
          Tienes {favoriteNames.length} Pokémon en tu colección
        </p>
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-flex items-center px-6 py-3 bg-pink-100 text-pink-700 rounded-full">
            <div className="animate-spin mr-2">🔄</div>
            Cargando tus favoritos...
          </div>
        </div>
      )}

      {error && (
        <div className="max-w-md mx-auto mb-6">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
            <div className="flex items-center">
              <span className="mr-2">⚠️</span>
              <span>{error}</span>
            </div>
          </div>
        </div>
      )}

      {!loading && favoritePokemon.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {favoritePokemon.map((pokemon) => (
            <PokemonCard
              key={pokemon.name}
              pokemon={pokemon}
              isFavorite={isFavorite(pokemon.name)}
              onToggleFavorite={onToggleFavorite}
              className="w-full max-w-sm"
            />
          ))}
        </div>
      )}

      {favoriteNames.length > 0 && !loading && (
        <div className="text-center mt-8">
          <button
            onClick={() => {
              if (
                window.confirm(
                  "¿Estás seguro de que quieres quitar todos los Pokémon de favoritos?"
                )
              ) {
                favoriteNames.forEach((name) => onToggleFavorite(name));
              }
            }}
            className="px-6 py-2 bg-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 text-sm"
          >
            🗑️ Limpiar todos los favoritos
          </button>
        </div>
      )}
    </div>
  );
};
