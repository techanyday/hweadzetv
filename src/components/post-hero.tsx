import Image from "next/image";
import Link from "next/link";

import type { PostRecord } from "@/lib/posts";

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

export function PostHero({ post }: { post: PostRecord }) {
  return (
    <article className="grid overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] shadow-[0_30px_120px_rgba(0,0,0,0.35)] lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-8 p-8 md:p-10 lg:p-12">
        <div className="inline-flex items-center rounded-full border border-fuchsia-400/25 bg-fuchsia-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-fuchsia-200">
          Featured story
        </div>

        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.28em] text-white/45">
            <span>{post.category || "Editorial"}</span>
            <span>{formatDate(post.publishedAt)}</span>
            <span>{post.readingTime}</span>
          </div>

          <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-6xl">
            {post.title}
          </h1>

          <p className="max-w-2xl text-base leading-8 text-white/70 md:text-lg">
            {post.excerpt}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            href={`/blog/${post.slug}`}
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-white/85"
          >
            Read the feature
          </Link>
        </div>
      </div>

      <div className="relative min-h-[320px]">
        {post.featuredImage ? (
          <Image
            src={post.featuredImage}
            alt={post.imageAlt || post.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.65),_rgba(168,85,247,0.30)_40%,_rgba(9,9,11,1)_78%)]" />
        )}
      </div>
    </article>
  );
}
