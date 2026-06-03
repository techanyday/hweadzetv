import { notFound } from "next/navigation";

import {
  deletePostAction,
} from "@/app/admin/actions";
import { PostForm } from "@/app/admin/(dashboard)/posts/post-form";
import { SubmitButton } from "@/components/ui/submit-button";
import { getAdminPostById } from "@/lib/posts";

export default async function EditPostPage(
  props: PageProps<"/admin/posts/[id]/edit">
) {
  const [{ id }, searchParams] = await Promise.all([
    props.params,
    props.searchParams,
  ]);
  const post = await getAdminPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {searchParams.success === "1" ? (
        <p className="rounded-[24px] border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-700">
          Post saved successfully.
        </p>
      ) : null}

      {searchParams.error === "1" ? (
        <p className="rounded-[24px] border border-rose-200 bg-rose-50 px-5 py-4 text-sm font-medium text-rose-700">
          Please fill in the required fields before saving the post.
        </p>
      ) : null}

      <PostForm post={post} />

      <section className="rounded-[32px] bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-zinc-400">
              Danger zone
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-950">Delete post</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-zinc-500">
              This permanently removes the post from the admin studio and the public site.
            </p>
          </div>
          <form action={deletePostAction}>
            <input type="hidden" name="id" value={post.id} />
            <SubmitButton
              label="Delete post"
              pendingLabel="Deleting..."
              className="bg-rose-600 hover:bg-rose-500"
            />
          </form>
        </div>
      </section>
    </div>
  );
}
