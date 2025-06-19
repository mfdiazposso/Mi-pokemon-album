export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  height: number;
  weight: number;
  types: Array<{
    type: {
      name: string;
    };
  }>;
}

export interface PokemonListItem {
  name: string;
  url: string;
}
