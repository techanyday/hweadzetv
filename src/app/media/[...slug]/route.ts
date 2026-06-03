import { readFile } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

import { uploadRootDir } from "@/lib/storage";

export const runtime = "nodejs";

const contentTypes = new Map([
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".png", "image/png"],
  [".webp", "image/webp"],
  [".gif", "image/gif"],
]);

export async function GET(
  _request: Request,
  context: RouteContext<"/media/[...slug]">
) {
  const { slug } = await context.params;

  if (
    slug.length === 0 ||
    slug.some((segment: string) => !segment || segment === "." || segment === "..")
  ) {
    return new NextResponse("Not found", { status: 404 });
  }

  const target = path.join(uploadRootDir, ...slug);

  try {
    const file = await readFile(target);
    const extension = path.extname(target).toLowerCase();
    const contentType = contentTypes.get(extension) ?? "application/octet-stream";

    return new NextResponse(file, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
