import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/auth";
import { mediaBasePath, uploadRootDir } from "@/lib/storage";

export const runtime = "nodejs";

const allowedTypes = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/gif", "gif"],
]);

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Image file is required." }, { status: 400 });
  }

  const extension = allowedTypes.get(file.type);

  if (!extension) {
    return NextResponse.json({ error: "Unsupported file type." }, { status: 400 });
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "File must be 5MB or smaller." }, { status: 400 });
  }

  const now = new Date();
  const folder = path.join(
    uploadRootDir,
    String(now.getFullYear()),
    String(now.getMonth() + 1).padStart(2, "0")
  );

  await mkdir(folder, { recursive: true });

  const filename = `${Date.now()}-${randomUUID()}.${extension}`;
  const target = path.join(folder, filename);
  const bytes = await file.arrayBuffer();

  await writeFile(target, Buffer.from(bytes));

  const publicPath = `${mediaBasePath}/${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, "0")}/${filename}`;

  return NextResponse.json({ url: publicPath });
}
