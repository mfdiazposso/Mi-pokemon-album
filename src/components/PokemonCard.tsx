import { Pokemon } from "@/types/pokemon";
import Image from "next/image";
import { FavoriteButton } from "./FavoriteButton";

interface PokemonCardProps {
  pokemon: Pokemon;
  isFavorite: boolean;
  onToggleFavorite: (name: string) => void;
  className?: string;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  isFavorite,
  onToggleFavorite,
  className = "",
}) => {
  const handleFavoriteToggle = () => {
    onToggleFavorite(pokemon.name);
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-lg p-6 m-2 max-w-sm transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-gray-100 hover:border-blue-200 ${className}`}
    >
      <div className="relative">
        <Image
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          width={250}
          height={250}
          className="mx-auto drop-shadow-lg"
        />
        <div className="absolute top-0 right-0">
          <FavoriteButton
            isFavorite={isFavorite}
            onToggle={handleFavoriteToggle}
            pokemonName={pokemon.name}
            size="small"
            showText={false}
          />
        </div>
      </div>

      <div className="text-center mt-4 flex flex-col gap-2">
        <h3 className="text-2xl font-bold text-gray-800 capitalize mb-2">
          {pokemon.name}
        </h3>

        <div className="grid grid-cols-2 gap-4 ">
          <div className="bg-blue-50 rounded-lg p-2">
            <p className="text-xs text-blue-600 font-medium">Altura</p>
            <p className="text-lg font-bold text-blue-800">{pokemon.height}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-2">
            <p className="text-xs text-green-600 font-medium">Peso</p>
            <p className="text-lg font-bold text-green-800">{pokemon.weight}</p>
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-500 mb-2">Tipos</p>
          <div className="flex justify-center gap-2">
            {pokemon.types.map((type, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium capitalize"
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>

        <FavoriteButton
          isFavorite={isFavorite}
          onToggle={handleFavoriteToggle}
          pokemonName={pokemon.name}
        />
      </div>
    </div>
  );
};
