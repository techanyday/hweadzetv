"use client";

import Image from "next/image";
import { useState, type ChangeEvent } from "react";

type FeaturedImageUploadProps = {
  initialValue?: string | null;
};

export function FeaturedImageUpload({
  initialValue = "",
}: FeaturedImageUploadProps) {
  const [imageUrl, setImageUrl] = useState(initialValue ?? "");
  const [status, setStatus] = useState<"idle" | "uploading" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setStatus("uploading");
    setMessage("Uploading image...");

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/uploads", {
      method: "POST",
      body: formData,
    });

    const payload = (await response.json().catch(() => null)) as
      | { url?: string; error?: string }
      | null;

    if (!response.ok || !payload?.url) {
      setStatus("error");
      setMessage(payload?.error || "Unable to upload image.");
      return;
    }

    setImageUrl(payload.url);
    setStatus("idle");
    setMessage("Image uploaded successfully.");
  }

  return (
    <div className="space-y-4 rounded-[28px] border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="space-y-1">
        <p className="text-sm font-semibold text-zinc-950">Featured image</p>
        <p className="text-sm text-zinc-500">
          Upload a cover image from your computer.
        </p>
      </div>

      <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-[24px] border border-dashed border-zinc-300 bg-zinc-50 px-6 py-10 text-center transition hover:border-zinc-400 hover:bg-zinc-100">
        <span className="text-sm font-medium text-zinc-700">
          Choose image file
        </span>
        <span className="text-xs text-zinc-500">
          JPG, PNG, WEBP or GIF up to 5MB
        </span>
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      <input type="hidden" name="featuredImage" value={imageUrl} />

      {imageUrl ? (
        <div className="relative aspect-[16/9] overflow-hidden rounded-[22px] border border-zinc-200 bg-zinc-100">
          <Image
            src={imageUrl}
            alt="Featured upload preview"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        </div>
      ) : null}

      {message ? (
        <p
          className={`text-sm ${
            status === "error" ? "text-rose-600" : "text-emerald-600"
          }`}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
