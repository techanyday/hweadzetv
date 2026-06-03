"use client";

import Link from "next/link";
import { useState } from "react";
import slugify from "slugify";

import { savePostAction } from "@/app/admin/actions";
import { FeaturedImageUpload } from "@/components/admin/featured-image-upload";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { SubmitButton } from "@/components/ui/submit-button";
import type { PostRecord } from "@/lib/posts";

type PostFormProps = {
  post?: PostRecord | null;
};

function buildSlug(value: string) {
  return slugify(value, {
    lower: true,
    strict: true,
    trim: true,
  });
}

export function PostForm({ post }: PostFormProps) {
  const [title, setTitle] = useState(post?.title || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(Boolean(post?.slug));
  const slugValue = slugManuallyEdited ? slug : buildSlug(title);

  return (
    <form action={savePostAction} className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-6">
        <input type="hidden" name="id" value={post?.id || ""} />

        <section className="space-y-6 rounded-[32px] bg-white p-6 shadow-sm">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-zinc-400">
              Story identity
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-950">
              {post ? "Refine your story" : "Create a new story"}
            </h2>
          </div>

          <div className="grid gap-5">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium text-zinc-700">
                Title
              </label>
              <input
                id="title"
                name="title"
                required
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="w-full rounded-[22px] border border-zinc-200 px-4 py-3 outline-none transition focus:border-zinc-400"
                placeholder="Enter your headline"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="slug" className="text-sm font-medium text-zinc-700">
                Slug
              </label>
              <input
                id="slug"
                name="slug"
                value={slugValue}
                onChange={(event) => {
                  setSlugManuallyEdited(true);
                  setSlug(buildSlug(event.target.value));
                }}
                className="w-full rounded-[22px] border border-zinc-200 px-4 py-3 outline-none transition focus:border-zinc-400"
                placeholder="story-slug"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="excerpt" className="text-sm font-medium text-zinc-700">
                Excerpt
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                required
                defaultValue={post?.excerpt || ""}
                rows={4}
                className="w-full rounded-[22px] border border-zinc-200 px-4 py-3 outline-none transition focus:border-zinc-400"
                placeholder="Write a short summary that sells the article."
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium text-zinc-700">
                  Category
                </label>
                <input
                  id="category"
                  name="category"
                  defaultValue={post?.category || ""}
                  className="w-full rounded-[22px] border border-zinc-200 px-4 py-3 outline-none transition focus:border-zinc-400"
                  placeholder="Editorial"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="tags" className="text-sm font-medium text-zinc-700">
                  Tags
                </label>
                <input
                  id="tags"
                  name="tags"
                  defaultValue={post?.tags.join(", ") || ""}
                  className="w-full rounded-[22px] border border-zinc-200 px-4 py-3 outline-none transition focus:border-zinc-400"
                  placeholder="culture, stories, insight"
                />
              </div>
            </div>
          </div>
        </section>

        <RichTextEditor initialContent={post?.content} />
      </div>

      <div className="space-y-6">
        <FeaturedImageUpload initialValue={post?.featuredImage} />

        <section className="space-y-5 rounded-[32px] bg-white p-6 shadow-sm">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-zinc-400">
              Presentation
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-950">Layout settings</h2>
          </div>

          <div className="space-y-2">
            <label htmlFor="imageAlt" className="text-sm font-medium text-zinc-700">
              Image alt text
            </label>
            <input
              id="imageAlt"
              name="imageAlt"
              defaultValue={post?.imageAlt || ""}
              className="w-full rounded-[22px] border border-zinc-200 px-4 py-3 outline-none transition focus:border-zinc-400"
              placeholder="Describe the featured image"
            />
          </div>

          <label className="flex items-start gap-3 rounded-[22px] border border-zinc-200 p-4">
            <input
              type="checkbox"
              name="isFeatured"
              defaultChecked={post?.isFeatured}
              className="mt-1 h-4 w-4 rounded border-zinc-300"
            />
            <span>
              <span className="block text-sm font-semibold text-zinc-950">Feature this story</span>
              <span className="block text-sm leading-6 text-zinc-500">
                Featured stories surface in the hero section and premium placements.
              </span>
            </span>
          </label>

          <label className="flex items-start gap-3 rounded-[22px] border border-zinc-200 p-4">
            <input
              type="checkbox"
              name="isPublished"
              defaultChecked={post?.isPublished}
              className="mt-1 h-4 w-4 rounded border-zinc-300"
            />
            <span>
              <span className="block text-sm font-semibold text-zinc-950">Publish immediately</span>
              <span className="block text-sm leading-6 text-zinc-500">
                Unchecked posts stay in draft mode and remain hidden from the public site.
              </span>
            </span>
          </label>

          <div className="flex flex-wrap gap-3 pt-2">
            <SubmitButton
              label={post ? "Save changes" : "Create post"}
              pendingLabel={post ? "Saving..." : "Creating..."}
            />
            <Link
              href="/admin"
              className="inline-flex items-center justify-center rounded-full border border-zinc-200 px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:border-zinc-300 hover:text-zinc-950"
            >
              Back to dashboard
            </Link>
          </div>
        </section>
      </div>
    </form>
  );
}
