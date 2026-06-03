"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import {
  createAdminSession,
  destroyAdminSession,
  isValidAdminPassword,
  requireAdminSession,
} from "@/lib/auth";
import { defaultHomepageSettings } from "@/lib/homepage";
import { createSlug, normalizeTags, sanitizePostContent } from "@/lib/posts";
import { prisma } from "@/lib/prisma";

const postInputSchema = z.object({
  title: z.string().trim().min(3),
  slug: z.string().trim().optional(),
  excerpt: z.string().trim().min(20),
  content: z.string().trim().min(20),
  category: z.string().trim().max(40).optional(),
  tags: z.string().trim().max(160).optional(),
  featuredImage: z.string().trim().max(500).optional(),
  imageAlt: z.string().trim().max(120).optional(),
  isFeatured: z.boolean(),
  isPublished: z.boolean(),
});

const homepageSettingsSchema = z.object({
  heroEyebrow: z.string().trim().min(2).max(80),
  heroTitle: z.string().trim().min(10).max(180),
  heroDescription: z.string().trim().min(20).max(400),
});

function getValue(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value : "";
}

function getChecked(formData: FormData, name: string) {
  return formData.get(name) === "on";
}

async function ensureUniqueSlug(baseSlug: string, currentId?: string) {
  let candidate = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await prisma.post.findFirst({
      where: {
        slug: candidate,
        ...(currentId ? { id: { not: currentId } } : {}),
      },
      select: { id: true },
    });

    if (!existing) {
      return candidate;
    }

    counter += 1;
    candidate = `${baseSlug}-${counter}`;
  }
}

function revalidatePostPaths(slug: string, previousSlug?: string | null) {
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/admin");
  revalidatePath(`/blog/${slug}`);

  if (previousSlug && previousSlug !== slug) {
    revalidatePath(`/blog/${previousSlug}`);
  }
}

export async function loginAction(formData: FormData) {
  const password = getValue(formData.get("password"));

  if (!isValidAdminPassword(password)) {
    redirect("/admin/login?error=1");
  }

  await createAdminSession();
  redirect("/admin");
}

export async function logoutAction() {
  await destroyAdminSession();
  redirect("/admin/login");
}

export async function saveHomepageSettingsAction(formData: FormData) {
  await requireAdminSession();

  const parsed = homepageSettingsSchema.safeParse({
    heroEyebrow: getValue(formData.get("heroEyebrow")) || defaultHomepageSettings.heroEyebrow,
    heroTitle: getValue(formData.get("heroTitle")) || defaultHomepageSettings.heroTitle,
    heroDescription:
      getValue(formData.get("heroDescription")) ||
      defaultHomepageSettings.heroDescription,
  });

  if (!parsed.success) {
    redirect("/admin?settingsError=1");
  }

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      heroEyebrow: parsed.data.heroEyebrow,
      heroTitle: parsed.data.heroTitle,
      heroDescription: parsed.data.heroDescription,
    },
    update: {
      heroEyebrow: parsed.data.heroEyebrow,
      heroTitle: parsed.data.heroTitle,
      heroDescription: parsed.data.heroDescription,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin?settings=1");
}

export async function savePostAction(formData: FormData) {
  await requireAdminSession();

  const id = getValue(formData.get("id"));
  const existing = id
    ? await prisma.post.findUnique({
        where: { id },
        select: { id: true, slug: true, publishedAt: true },
      })
    : null;

  const parsed = postInputSchema.safeParse({
    title: getValue(formData.get("title")),
    slug: getValue(formData.get("slug")),
    excerpt: getValue(formData.get("excerpt")),
    content: getValue(formData.get("content")),
    category: getValue(formData.get("category")),
    tags: getValue(formData.get("tags")),
    featuredImage: getValue(formData.get("featuredImage")),
    imageAlt: getValue(formData.get("imageAlt")),
    isFeatured: getChecked(formData, "isFeatured"),
    isPublished: getChecked(formData, "isPublished"),
  });

  if (!parsed.success) {
    redirect(id ? `/admin/posts/${id}/edit?error=1` : "/admin/posts/new?error=1");
  }

  const slugSource = parsed.data.slug || parsed.data.title;
  const slug = await ensureUniqueSlug(createSlug(slugSource), id || undefined);
  const publishedAt = parsed.data.isPublished
    ? existing?.publishedAt ?? new Date()
    : null;

  const data = {
    title: parsed.data.title,
    slug,
    excerpt: parsed.data.excerpt,
    content: sanitizePostContent(parsed.data.content),
    category: parsed.data.category || null,
    tags: normalizeTags(parsed.data.tags || "") || null,
    featuredImage: parsed.data.featuredImage || null,
    imageAlt: parsed.data.imageAlt || null,
    isFeatured: parsed.data.isFeatured,
    isPublished: parsed.data.isPublished,
    publishedAt,
  };

  const post = existing
    ? await prisma.post.update({
        where: { id: existing.id },
        data,
      })
    : await prisma.post.create({
        data,
      });

  revalidatePostPaths(post.slug, existing?.slug);
  redirect(`/admin/posts/${post.id}/edit?success=1`);
}

export async function deletePostAction(formData: FormData) {
  await requireAdminSession();

  const id = getValue(formData.get("id"));

  if (!id) {
    redirect("/admin");
  }

  const post = await prisma.post.findUnique({
    where: { id },
    select: { slug: true },
  });

  if (!post) {
    redirect("/admin");
  }

  await prisma.post.delete({
    where: { id },
  });

  revalidatePostPaths(post.slug, post.slug);
  redirect("/admin?deleted=1");
}
