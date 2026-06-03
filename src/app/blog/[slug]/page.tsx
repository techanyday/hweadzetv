import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PostCard } from "@/components/post-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ViewTracker } from "@/components/view-tracker";
import {
  getPublishedPostBySlug,
  getRelatedPosts,
  type PostRecord,
} from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

function formatDate(value: Date | null) {
  if (!value) {
    return "Draft";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(value);
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    return {
      title: `Story not found | ${siteConfig.name}`,
    };
  }

  return {
    title: `${post.title} | ${siteConfig.name}`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage
        ? [
            {
              url: post.featuredImage,
              alt: post.imageAlt || post.title,
            },
          ]
        : undefined,
    },
  };
}

export default async function BlogPostPage(
  props: PageProps<"/blog/[slug]">
) {
  const { slug } = await props.params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.slug, post.category);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_24%),linear-gradient(180deg,_#09090f_0%,_#111827_100%)] text-white">
      <ViewTracker slug={post.slug} />
      <SiteHeader />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-14 px-6 py-14 lg:px-10">
        <section className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start">
          <article className="space-y-8">
            <div className="space-y-5">
              <Link
                href="/blog"
                className="inline-flex rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/55 transition hover:border-white/20 hover:text-white"
              >
                Back to stories
              </Link>
              <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.28em] text-white/45">
                <span>{post.category || "Editorial"}</span>
                <span>{formatDate(post.publishedAt)}</span>
                <span>{post.readingTime}</span>
                <span>{post.views.toLocaleString()} views</span>
              </div>
              <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-6xl">
                {post.title}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-white/65">
                {post.excerpt}
              </p>
            </div>

            {post.featuredImage ? (
              <div className="relative aspect-[16/9] overflow-hidden rounded-[32px] border border-white/10">
                <Image
                  src={post.featuredImage}
                  alt={post.imageAlt || post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 70vw"
                />
              </div>
            ) : null}

            <div
              className="blog-prose rounded-[32px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.24)]"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {post.tags.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/65"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            ) : null}
          </article>

          <aside className="space-y-6 lg:sticky lg:top-28">
            <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.24)]">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/45">
                About this story
              </p>
              <div className="mt-5 space-y-4 text-sm text-white/65">
                <p>
                  Published by {siteConfig.name} with a premium editorial layout optimized for long-form reading.
                </p>
                <p>Featured image upload, rich formatting, and automatic sections are all managed from the admin studio.</p>
              </div>
            </div>

            {relatedPosts.length > 0 ? (
              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/45">
                  Related stories
                </p>
                {relatedPosts.map((relatedPost: PostRecord) => (
                  <PostCard key={relatedPost.id} post={relatedPost} compact />
                ))}
              </div>
            ) : null}
          </aside>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
