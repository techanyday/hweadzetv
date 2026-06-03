import sanitizeHtml from "sanitize-html";
import slugify from "slugify";

import { prisma } from "@/lib/prisma";

type RawPost = NonNullable<Awaited<ReturnType<typeof prisma.post.findFirst>>>;

export type PostRecord = Omit<RawPost, "tags"> & {
  tags: string[];
  readingTime: string;
};

const allowedTags = [
  ...sanitizeHtml.defaults.allowedTags,
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "img",
];

const allowedAttributes = {
  ...sanitizeHtml.defaults.allowedAttributes,
  a: ["href", "name", "target", "rel"],
  img: ["src", "alt"],
};

function toTags(value: string | null) {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((item: string) => item.trim())
    .filter(Boolean);
}

function toReadingTime(content: string) {
  const plainText = sanitizeHtml(content, {
    allowedTags: [],
    allowedAttributes: {},
  }).trim();
  const words = plainText ? plainText.split(/\s+/).length : 0;
  const minutes = Math.max(1, Math.ceil(words / 180));

  return `${minutes} min read`;
}

function mapPost(post: RawPost): PostRecord {
  return {
    ...post,
    tags: toTags(post.tags),
    readingTime: toReadingTime(post.content),
  };
}

export function sanitizePostContent(content: string) {
  return sanitizeHtml(content, {
    allowedTags,
    allowedAttributes,
    allowedSchemes: ["http", "https", "mailto"],
  });
}

export function createSlug(title: string) {
  const baseSlug = slugify(title, {
    lower: true,
    strict: true,
    trim: true,
  });

  return baseSlug || `post-${Date.now()}`;
}

export function normalizeTags(input: string) {
  return input
    .split(",")
    .map((item: string) => item.trim())
    .filter(Boolean)
    .join(", ");
}

export async function getHomepageContent() {
  const [featuredRows, latestRows, popularRows] = await Promise.all([
    prisma.post.findMany({
      where: { isPublished: true, isFeatured: true },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      take: 3,
    }),
    prisma.post.findMany({
      where: { isPublished: true },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      take: 9,
    }),
    prisma.post.findMany({
      where: { isPublished: true },
      orderBy: [{ views: "desc" }, { publishedAt: "desc" }, { createdAt: "desc" }],
      take: 5,
    }),
  ]);

  const featured = featuredRows.length > 0 ? featuredRows.map(mapPost) : latestRows.slice(0, 1).map(mapPost);

  return {
    featured,
    latest: latestRows.map(mapPost),
    popular: popularRows.map(mapPost),
  };
}

export async function getPublishedPosts() {
  const rows = await prisma.post.findMany({
    where: { isPublished: true },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  });

  return rows.map(mapPost);
}

export async function getPublishedPostBySlug(slug: string) {
  const row = await prisma.post.findFirst({
    where: { slug, isPublished: true },
  });

  return row ? mapPost(row) : null;
}

export async function getAdminPostById(id: string) {
  const row = await prisma.post.findUnique({
    where: { id },
  });

  return row ? mapPost(row) : null;
}

export async function getAdminPosts() {
  const rows = await prisma.post.findMany({
    orderBy: [{ updatedAt: "desc" }],
  });

  return rows.map(mapPost);
}

export async function getRelatedPosts(currentSlug: string, category?: string | null) {
  const rows = await prisma.post.findMany({
    where: {
      isPublished: true,
      slug: { not: currentSlug },
      ...(category ? { category } : {}),
    },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    take: 3,
  });

  return rows.map(mapPost);
}

export async function incrementPostViews(slug: string) {
  await prisma.post.updateMany({
    where: { slug, isPublished: true },
    data: {
      views: {
        increment: 1,
      },
    },
  });
}
