import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 75 = padrão; 90 = foto de fundo do herói (4K)
    qualities: [75, 90],
  },
};

export default nextConfig;
