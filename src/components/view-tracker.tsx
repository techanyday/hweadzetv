"use client";

import { useEffect } from "react";

type ViewTrackerProps = {
  slug: string;
};

export function ViewTracker({ slug }: ViewTrackerProps) {
  useEffect(() => {
    void fetch(`/api/posts/${slug}/view`, {
      method: "POST",
      keepalive: true,
    });
  }, [slug]);

  return null;
}
