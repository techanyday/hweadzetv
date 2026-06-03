import { NextResponse } from "next/server";

import { incrementPostViews } from "@/lib/posts";

export async function POST(
  _request: Request,
  context: RouteContext<"/api/posts/[slug]/view">
) {
  const { slug } = await context.params;

  await incrementPostViews(slug);

  return NextResponse.json({ ok: true });
}
