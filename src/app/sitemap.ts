import type { MetadataRoute } from "next";

import { getPublishedPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

function toAbsoluteUrl(value: string) {
  return new URL(value, siteConfig.url).toString();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteConfig.url}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${siteConfig.url}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  try {
    const posts = await getPublishedPosts();

    const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: post.updatedAt ?? post.publishedAt ?? post.createdAt,
      changeFrequency: "weekly",
      priority: 0.8,
      ...(post.featuredImage
        ? { images: [toAbsoluteUrl(post.featuredImage)] }
        : {}),
    }));

    return [...staticRoutes, ...postRoutes];
  } catch {
    return staticRoutes;
  }
}
