import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/PokeAPI/sprites/master/sprites/pokemon/**",
      },
      // Si quieres agregar más fuentes de imágenes:
      {
        protocol: "https",
        hostname: "pokeapi.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
