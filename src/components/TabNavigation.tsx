interface TabNavigationProps {
  activeTab: "search" | "favorites";
  onTabChange: (tab: "search" | "favorites") => void;
  favoritesCount: number;
  className?: string;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
  favoritesCount,
  className = "",
}) => {
  const tabClasses = (isActive: boolean) =>
    `px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
      isActive
        ? "bg-blue-500 text-white shadow-lg transform scale-105"
        : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-800 border-2 border-gray-200"
    }`;

  return (
    <div className={`flex justify-center gap-4 mb-8 ${className}`}>
      <button
        onClick={() => onTabChange("search")}
        className={tabClasses(activeTab === "search")}
      >
        <span>🔍</span>
        <span>Buscar Pokémon</span>
      </button>

      <button
        onClick={() => onTabChange("favorites")}
        className={tabClasses(activeTab === "favorites")}
      >
        <span>❤️</span>
        <span className="text-gray-800">Mis Favoritos</span>
        {favoritesCount > 0 && (
          <span
            className={`ml-1 px-2 py-1 rounded-full text-xs font-bold ${
              activeTab === "favorites"
                ? "bg-white text-blue-500"
                : "bg-blue-500 text-white"
            }`}
          >
            favoritesCount
          </span>
        )}
      </button>
    </div>
  );
};
