import Image from "next/image";
import Link from "next/link";

import type { PostRecord } from "@/lib/posts";

type PostCardProps = {
  post: PostRecord;
  compact?: boolean;
};

function formatDate(value: Date | null) {
  if (!value) {
    return "Draft";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(value);
}

export function PostCard({ post, compact = false }: PostCardProps) {
  return (
    <article className={`group overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] shadow-[0_24px_80px_rgba(0,0,0,0.24)] transition hover:-translate-y-1 hover:border-white/20 ${compact ? "" : "h-full"}`}>
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className={`relative overflow-hidden ${compact ? "h-48" : "h-60"}`}>
          {post.featuredImage ? (
            <Image
              src={post.featuredImage}
              alt={post.imageAlt || post.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes={compact ? "(max-width: 1024px) 100vw, 40vw" : "(max-width: 1024px) 100vw, 33vw"}
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.9),_rgba(59,130,246,0.15)_48%,_rgba(17,24,39,0.95)_100%)]" />
          )}
        </div>

        <div className="space-y-4 p-6">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.28em] text-white/45">
            <span>{post.category || "Editorial"}</span>
            <span>{formatDate(post.publishedAt)}</span>
            <span>{post.readingTime}</span>
          </div>

          <h3 className={`font-semibold text-white transition group-hover:text-fuchsia-200 ${compact ? "text-xl leading-8" : "text-2xl leading-9"}`}>
            {post.title}
          </h3>

          <p className="text-sm leading-7 text-white/65">{post.excerpt}</p>

          <div className="flex items-center justify-end text-sm text-white/55">
            <span className="font-medium text-white">Read article</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
