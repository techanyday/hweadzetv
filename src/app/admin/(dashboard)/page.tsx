import Link from "next/link";

import { saveHomepageSettingsAction } from "@/app/admin/actions";
import { SubmitButton } from "@/components/ui/submit-button";
import { getHomepageSettings } from "@/lib/homepage";
import { getAdminPosts, type PostRecord } from "@/lib/posts";

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

export default async function AdminDashboardPage(
  props: PageProps<"/admin">
) {
  const searchParams = await props.searchParams;
  const homepageSettings = await getHomepageSettings();
  const posts: PostRecord[] = await getAdminPosts();

  const totalViews = posts.reduce(
    (sum: number, post: PostRecord) => sum + post.views,
    0
  );
  const featuredCount = posts.filter((post: PostRecord) => post.isFeatured).length;
  const publishedCount = posts.filter((post: PostRecord) => post.isPublished).length;

  return (
    <div className="space-y-8">
      {searchParams.settings === "1" ? (
        <p className="rounded-[24px] border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-700">
          Homepage hero updated successfully.
        </p>
      ) : null}
      {searchParams.settingsError === "1" ? (
        <p className="rounded-[24px] border border-rose-200 bg-rose-50 px-5 py-4 text-sm font-medium text-rose-700">
          Please complete all homepage text fields before saving.
        </p>
      ) : null}
      {searchParams.deleted === "1" ? (
        <p className="rounded-[24px] border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-700">
          Post deleted successfully.
        </p>
      ) : null}

      <section className="rounded-[32px] bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 border-b border-zinc-100 pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-zinc-400">
              Front page
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-950">Homepage hero</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-zinc-500">
              Edit the large highlighted text block shown at the top of your public homepage.
            </p>
          </div>
        </div>

        <form action={saveHomepageSettingsAction} className="mt-6 grid gap-5">
          <div className="space-y-2">
            <label htmlFor="heroEyebrow" className="text-sm font-medium text-zinc-700">
              Small label
            </label>
            <input
              id="heroEyebrow"
              name="heroEyebrow"
              defaultValue={homepageSettings.heroEyebrow}
              className="w-full rounded-[22px] border border-zinc-200 px-4 py-3 outline-none transition focus:border-zinc-400"
              placeholder="Premium publishing platform"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="heroTitle" className="text-sm font-medium text-zinc-700">
              Main heading
            </label>
            <textarea
              id="heroTitle"
              name="heroTitle"
              defaultValue={homepageSettings.heroTitle}
              rows={3}
              className="w-full rounded-[22px] border border-zinc-200 px-4 py-3 outline-none transition focus:border-zinc-400"
              placeholder="A world-class blog website with a modern editorial experience."
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="heroDescription" className="text-sm font-medium text-zinc-700">
              Supporting text
            </label>
            <textarea
              id="heroDescription"
              name="heroDescription"
              defaultValue={homepageSettings.heroDescription}
              rows={4}
              className="w-full rounded-[22px] border border-zinc-200 px-4 py-3 outline-none transition focus:border-zinc-400"
              placeholder="Describe what visitors should understand immediately when they land on the homepage."
            />
          </div>

          <div className="pt-2">
            <SubmitButton label="Save homepage text" pendingLabel="Saving homepage text..." />
          </div>
        </form>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[28px] bg-white p-6 shadow-sm">
          <p className="text-sm text-zinc-500">Total stories</p>
          <p className="mt-4 text-4xl font-semibold text-zinc-950">{posts.length}</p>
        </div>
        <div className="rounded-[28px] bg-white p-6 shadow-sm">
          <p className="text-sm text-zinc-500">Published</p>
          <p className="mt-4 text-4xl font-semibold text-zinc-950">{publishedCount}</p>
        </div>
        <div className="rounded-[28px] bg-white p-6 shadow-sm">
          <p className="text-sm text-zinc-500">Featured / views</p>
          <p className="mt-4 text-4xl font-semibold text-zinc-950">
            {featuredCount} / {totalViews.toLocaleString()}
          </p>
        </div>
      </section>

      <section className="rounded-[32px] bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 border-b border-zinc-100 pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-zinc-400">
              Content library
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-950">All posts</h2>
          </div>
          <Link
            href="/admin/posts/new"
            className="inline-flex rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
          >
            Create a new post
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="flex min-h-[260px] flex-col items-center justify-center gap-4 text-center">
            <h3 className="text-2xl font-semibold text-zinc-950">No posts yet</h3>
            <p className="max-w-xl text-sm leading-7 text-zinc-500">
              Start with your first article and the homepage will automatically populate featured, latest, and popular sections.
            </p>
            <Link
              href="/admin/posts/new"
              className="rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              Write your first post
            </Link>
          </div>
        ) : (
          <div className="mt-6 overflow-hidden rounded-[24px] border border-zinc-100">
            <div className="grid grid-cols-[1.5fr_0.8fr_0.7fr_0.6fr_0.6fr] gap-4 bg-zinc-50 px-5 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
              <span>Title</span>
              <span>Category</span>
              <span>Status</span>
              <span>Views</span>
              <span></span>
            </div>
            <div className="divide-y divide-zinc-100">
              {posts.map((post: PostRecord) => (
                <div
                  key={post.id}
                  className="grid grid-cols-[1.5fr_0.8fr_0.7fr_0.6fr_0.6fr] gap-4 px-5 py-5 text-sm"
                >
                  <div>
                    <p className="font-semibold text-zinc-950">{post.title}</p>
                    <p className="mt-2 text-zinc-500">
                      {formatDate(post.publishedAt)} · {post.readingTime}
                    </p>
                  </div>
                  <span className="text-zinc-600">{post.category || "Editorial"}</span>
                  <div className="flex flex-wrap gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${post.isPublished ? "bg-emerald-100 text-emerald-700" : "bg-zinc-100 text-zinc-600"}`}>
                      {post.isPublished ? "Published" : "Draft"}
                    </span>
                    {post.isFeatured ? (
                      <span className="rounded-full bg-fuchsia-100 px-3 py-1 text-xs font-semibold text-fuchsia-700">
                        Featured
                      </span>
                    ) : null}
                  </div>
                  <span className="text-zinc-600">{post.views.toLocaleString()}</span>
                  <div className="flex justify-end">
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="font-semibold text-zinc-950 transition hover:text-fuchsia-600"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
