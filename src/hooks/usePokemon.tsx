import {
  fetchPokemonByName,
  fetchPokemonList,
} from "../../services/pokemonApi";
import { Pokemon, PokemonListItem } from "@/types/pokemon";
import { useEffect, useState } from "react";

export const usePokemon = () => {
  const [pokemonList, setpokemonList] = useState<PokemonListItem[]>([]);
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPkemonList = async () => {
      try {
        setLoading(true);
        const list = await fetchPokemonList();
        setpokemonList(list);
      } catch (err) {
        setError("Oops! No pudimos cargar los pokémon");
      } finally {
        setLoading(false);
      }
    };

    loadPkemonList();
  }, []);

  const searchPokemon = async (name: string) => {
    try {
      setLoading(true);
      setError(null);
      const pokemon = await fetchPokemonByName(name.toLowerCase());
      setCurrentPokemon(pokemon);
    } catch (err) {
      setError("No encontramos ese Pokémon");
      setCurrentPokemon(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    pokemonList,
    currentPokemon,
    loading,
    error,
    searchPokemon,
  };
};
