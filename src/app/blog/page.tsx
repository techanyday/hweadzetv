import type { Metadata } from "next";

import { PostCard } from "@/components/post-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPublishedPosts, type PostRecord } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `All Stories | ${siteConfig.name}`,
  description: `Explore the latest published stories from ${siteConfig.name}.`,
};

export const dynamic = "force-dynamic";

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.12),_transparent_24%),linear-gradient(180deg,_#09090f_0%,_#0f172a_100%)] text-white">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-14 px-6 py-14 lg:px-10">
        <section className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/45">
            Archive
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-tight text-white md:text-6xl">
            Every published story in one beautifully curated archive.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-white/65">
            Browse the newest posts, revisit standout features, and discover the editorial voice behind {siteConfig.name}.
          </p>
        </section>

        {posts.length === 0 ? (
          <section className="rounded-[36px] border border-white/10 bg-white/[0.04] p-10 text-center shadow-[0_24px_90px_rgba(0,0,0,0.25)]">
            <h2 className="text-3xl font-semibold text-white">No published stories yet</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-white/65">
              Publish your first post from the admin studio and it will appear here automatically.
            </p>
          </section>
        ) : (
          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post: PostRecord) => (
              <PostCard key={post.id} post={post} />
            ))}
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
