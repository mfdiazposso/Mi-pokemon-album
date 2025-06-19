import { Pokemon, PokemonListItem } from "@/types/pokemon";

const API_BASE = "https://pokeapi.co/api/v2";

export const fetchPokemonList = async (): Promise<PokemonListItem[]> => {
  const response = await fetch(`${API_BASE}/pokemon?limit=20`);
  const data = await response.json();
  return data.results;
};

export const fetchPokemonByName = async (name: string): Promise<Pokemon> => {
  const response = await fetch(`${API_BASE}/pokemon/${name}`);
  const data = await response.json();
  return data;
};
