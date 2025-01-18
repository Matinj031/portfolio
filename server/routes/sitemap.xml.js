import { serverQueryContent } from "#content/server";
import { SitemapStream, streamToPromise } from "sitemap";

export default defineEventHandler(async (event) => {
  try {
    const docs = await serverQueryContent(event).find();
    const sitemap = new SitemapStream({
      hostname: process.env.HOSTNAME || "https://matinjahi.netlify.app",
    });

    // Always add homepage
    sitemap.write({
      url: "/",
      priority: 1,
    });

    // Add blog posts only if they exist
    if (docs && docs.length > 0) {
      docs.forEach((doc) => {
        sitemap.write({
          url: doc._path,
          priority: 0.5,
        });
      });
    }

    sitemap.end();
    return streamToPromise(sitemap);
  } catch (error) {
    console.error("Error generating sitemap:", error);
    throw error;
  }
});
