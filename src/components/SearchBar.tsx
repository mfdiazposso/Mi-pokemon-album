import { useState } from "react";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
  isLoading?: boolean;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Busca un Pokémon..",
  isLoading = false,
  className = "",
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  const handleClear = () => {
    setSearchTerm("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`max-w-md mx-auto mb-8 ${className} flex flex-col gap-2`}
    >
      <div className="relative flex">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          disabled={isLoading}
          className={`flex-1 px-4 py-3 border-2 border-blue-300 rounded-l-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder-gray-400 text-gray-700 ${
            isLoading ? "bg-gray-100 cursor-not-allowed" : "bg-white"
          } transition-all duration-200`}
        />

        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-20 top-1/3 transform-translate-y-1/2 text-gray-400 hover:text-gray-600"
            disabled={isLoading}
          >
            ✖️
          </button>
        )}

        <button
          type="submit"
          disabled={isLoading || !searchTerm.trim()}
          className={`px-6 py-3 rounded-r-lg font-medium transition-all duration-200 ${
            isLoading || !searchTerm.trim()
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white hover:shadow-lg transform hover:scale-105"
          }`}
        >
          {isLoading ? "🔄" : "🔍"}
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 justify-center">
        <span className="text-sm text-gray-500">Prueba con:</span>
        {["pikachu", "charizard", "bulbasaur", "squirtle"].map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => {
              setSearchTerm(suggestion);
              onSearch(suggestion);
            }}
            disabled={isLoading}
            className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors duration-200 capitalize"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </form>
  );
};
