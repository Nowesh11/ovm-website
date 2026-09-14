import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Bearing, Expansion Joints and Anti-Seismic Device used to be three
     pages; they now share one, with each line at its own anchor. */
  async redirects() {
    const combined = "/technologies/bearing-expansion-joints-anti-seismic-device";
    return ["bearing", "expansion-joints", "anti-seismic-device"].map((id) => ({
      source: `/technologies/${id}`,
      destination: `${combined}#${id}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
