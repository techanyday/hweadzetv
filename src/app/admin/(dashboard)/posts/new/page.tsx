import { PostForm } from "@/app/admin/(dashboard)/posts/post-form";

export default async function NewPostPage(
  props: PageProps<"/admin/posts/new">
) {
  const searchParams = await props.searchParams;

  return (
    <div className="space-y-6">
      {searchParams.error === "1" ? (
        <p className="rounded-[24px] border border-rose-200 bg-rose-50 px-5 py-4 text-sm font-medium text-rose-700">
          Please fill in the required fields before saving the post.
        </p>
      ) : null}

      <PostForm />
    </div>
  );
}
