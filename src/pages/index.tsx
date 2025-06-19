"use client";
import React, { useState } from "react";
import { usePokemon } from "../hooks/usePokemon";
import { useFavorites } from "../hooks/useFavorites";
import { PokemonCard } from "../components/PokemonCard";
import { SearchBar } from "../components/SearchBar";
import { TabNavigation } from "../components/TabNavigation";
import { FavoriteSection } from "@/components/FavoriteSection";

export default function Home() {
  const { currentPokemon, loading, error, searchPokemon } = usePokemon();
  const { toggleFavorite, isFavorite, getFavoriteNames, favoritesCount } =
    useFavorites();
  const [activeTab, setActiveTab] = useState<"search" | "favorites">("search");

  const handleSearch = (searchTerm: string) => {
    searchPokemon(searchTerm);
  };

  const handleToggleFavorite = (pokemonName: string) => {
    toggleFavorite(pokemonName);
  };

  const handleTabChange = (tab: "search" | "favorites") => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 gap-5 p-4">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          🐾 Mi Álbum de Pokémon
        </h1>
        <p className="text-gray-600 text-lg">
          ¡Busca y colecciona tus Pokémon favoritos!
        </p>
      </div>

      <TabNavigation
        activeTab={activeTab}
        onTabChange={handleTabChange}
        favoritesCount={favoritesCount}
      />

      {activeTab === "search" ? (
        <div className="flex flex-col items-center gap-4">
          <SearchBar
            onSearch={handleSearch}
            isLoading={loading}
            placeholder="¿Qué Pokémon quieres encontrar?"
          />

          {loading && (
            <div className="text-center">
              <div className="inline-flex items-center px-6 py-3 bg-blue-100 text-blue-700 rounded-full">
                <div className="animate-spin mr-2">🔄</div>
                Buscando tu Pokémon...
              </div>
            </div>
          )}

          {error && (
            <div className="max-w-md mx-auto">
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                <div className="flex items-center">
                  <span className="mr-2">⚠️</span>
                  <span>{error}</span>
                </div>
              </div>
            </div>
          )}

          {currentPokemon && !loading && (
            <div className="flex justify-center">
              <PokemonCard
                pokemon={currentPokemon}
                isFavorite={isFavorite(currentPokemon.name)}
                onToggleFavorite={handleToggleFavorite}
              />
            </div>
          )}

          {!currentPokemon && !loading && !error && (
            <div className="text-center text-gray-500 mt-12">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-xl">¡Busca tu primer Pokémon!</p>
              <p className="text-sm mt-2">
                Prueba con "pikachu", "charizard" o cualquier otro nombre
              </p>
            </div>
          )}
        </div>
      ) : (
        <FavoriteSection
          favoriteNames={getFavoriteNames()}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={isFavorite}
        />
      )}
    </div>
  );
}
