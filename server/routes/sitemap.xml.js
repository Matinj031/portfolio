import { SitemapStream, streamToPromise } from "sitemap";

export default defineEventHandler(async (event) => {
  try {
    const sitemap = new SitemapStream({
      hostname: process.env.HOSTNAME || "https://matinjahi.netlify.app",
    });

    // Add homepage
    sitemap.write({
      url: "/",
      changefreq: "monthly",
      priority: 1,
    });

    // Add static pages
    sitemap.write({
      url: "/projects",
      changefreq: "monthly",
      priority: 0.8,
    });

    sitemap.write({
      url: "/contact",
      changefreq: "yearly",
      priority: 0.5,
    });

    sitemap.end();
    return streamToPromise(sitemap);
  } catch (error) {
    console.error("Error generating sitemap:", error);
    throw error;
  }
});
