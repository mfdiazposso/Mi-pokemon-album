interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
  pokemonName?: string;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  showText?: boolean;
  className?: string;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onToggle,
  pokemonName = "",
  size = "medium",
  disabled = false,
  showText = true,
  className = "",
}) => {
  const sizeClasses = {
    small: "px-2 py-1 text-xs",
    medium: "px-4 py-2 text-sm",
    large: "px-6 py-3 text-base",
  };

  const iconSize = {
    small: "text-sm",
    medium: "text-lg",
    large: "text-xl",
  };

  const baseClasses = `
    rounded-lg font-medium transition-all duration-300 transform
    focus:outline-none focus:ring-2 focus:ring-offset-2
    ${sizeClasses[size]}
    ${
      disabled
        ? "cursor-not-allowed opacity-50"
        : "hover:scale-105 active:scale-95"
    }
  `;

  const favoriteClasses = isFavorite
    ? `
        bg-gradient-to-r from-red-400 to-pink-500 text-white shadow-lg
        hover:from-red-500 hover:to-pink-600 focus:ring-red-300
        ${disabled ? "" : "hover:shadow-xl"}
      `
    : `
        bg-gray-100 text-gray-600 border-2 border-gray-200
        hover:bg-gray-200 hover:border-gray-300 focus:ring-gray-300
        ${disabled ? "" : "hover:text-gray-700"}
      `;

  const handleClick = () => {
    if (!disabled) {
      onToggle();

      const button = document.activeElement as HTMLAnchorElement;
      if (button) {
        button.style.transform = "scale(0.95";
        setTimeout(() => {
          button.style.transform = "";
        }, 150);
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`${baseClasses} ${favoriteClasses} ${className}`}
      aria-label={`${isFavorite ? "Quitar de" : "Agregar a"} favoritos${
        pokemonName ? ` - ${pokemonName}` : ""
      }`}
      title={`${isFavorite ? "Quitar de" : "Agregar a"} favoritos`}
    >
      <span className="flex items-center justify-center gap-2">
        <span
          className={`transition-transform duration-200 ${iconSize[size]} ${
            isFavorite ? "animate-pulse" : ""
          }`}
        >
          {isFavorite ? "❤️" : "🤍"}
        </span>

        {showText && (
          <span className="font-medium">
            {isFavorite ? "Favorito" : "Me gusta"}
          </span>
        )}
      </span>

      {isFavorite && (
        <div className="absolute -top-1 -right-1 pointer-events-none">
          <div className="animate-bounce text-xs">✨</div>
        </div>
      )}
    </button>
  );
};
