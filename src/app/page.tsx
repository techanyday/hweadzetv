import Link from "next/link";

import { PostCard } from "@/components/post-card";
import { PostHero } from "@/components/post-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getHomepageSettings } from "@/lib/homepage";
import { getHomepageContent, type PostRecord } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [homepageSettings, { featured, latest, popular }] = await Promise.all([
    getHomepageSettings(),
    getHomepageContent(),
  ]);
  const hero = featured[0];
  const featuredRail = featured.slice(1);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.18),_transparent_24%),linear-gradient(180deg,_#09090f_0%,_#0f172a_100%)] text-white">
      <SiteHeader />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-12 px-6 py-10 md:py-12 lg:px-10">
        <section className="space-y-4">
          <div className="inline-flex rounded-full border border-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.35em] text-white/50">
            {homepageSettings.heroEyebrow}
          </div>
          <div className="space-y-4">
            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] text-white md:text-5xl xl:text-6xl">
              {homepageSettings.heroTitle}
            </h1>
            <p className="max-w-2xl text-base leading-7 text-white/65 md:text-lg">
              {homepageSettings.heroDescription}
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/blog"
              className="rounded-full border border-white/10 px-6 py-2.5 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/5"
            >
              Explore stories
            </Link>
          </div>
        </section>

        {hero ? (
          <section className="space-y-8">
            <PostHero post={hero} />

            {featuredRail.length > 0 ? (
              <div className="grid gap-6 lg:grid-cols-2">
                {featuredRail.map((post: PostRecord) => (
                  <PostCard key={post.id} post={post} compact />
                ))}
              </div>
            ) : null}
          </section>
        ) : (
          <section className="rounded-[36px] border border-white/10 bg-white/[0.04] p-10 shadow-[0_24px_90px_rgba(0,0,0,0.25)]">
            <h2 className="text-3xl font-semibold text-white">Your publication is ready</h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/65">
              Start publishing from the admin studio. Once you create and publish posts, this homepage will automatically arrange featured, latest, and popular sections.
            </p>
          </section>
        )}

        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/45">
                  Latest posts
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-white">New stories</h2>
              </div>
              <Link href="/blog" className="text-sm font-medium text-white/70 transition hover:text-white">
                View all
              </Link>
            </div>

            {latest.length === 0 ? (
              <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8 text-white/60">
                No published posts yet.
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
                {latest.slice(0, 4).map((post: PostRecord) => (
                  <PostCard key={post.id} post={post} compact />
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6 rounded-[36px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_24px_90px_rgba(0,0,0,0.25)]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/45">
                Popular now
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Top reads</h2>
            </div>

            {popular.length === 0 ? (
              <p className="text-white/60">Popular stories will appear here as readers open your posts.</p>
            ) : (
              <div className="space-y-4">
                {popular.map((post: PostRecord, index: number) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="flex gap-4 rounded-[24px] border border-white/8 px-5 py-5 transition hover:border-white/15 hover:bg-white/[0.04]"
                  >
                    <span className="text-sm font-semibold text-fuchsia-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="space-y-2">
                      <p className="text-base font-semibold text-white">{post.title}</p>
                      <p className="text-sm leading-6 text-white/60">{post.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
