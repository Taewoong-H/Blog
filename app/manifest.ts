import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "taewoong.log",
    short_name: "taewoong.log",
    description: "프론트엔드 개발자 Taewoong의 개발, 여행, 투자, 운동, 일상 기록.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f7f9",
    theme_color: "#2f54ff",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
