import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://anvora.ai";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/dashboard/", "/sign-in", "/sign-up", "/api/", "/api"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
