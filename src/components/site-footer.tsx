import Link from "next/link";

import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-10 text-sm text-white/60 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="space-y-2">
          <p className="text-base font-semibold text-white">{siteConfig.name}</p>
          <p className="max-w-xl">{siteConfig.description}</p>
        </div>

        <div className="flex items-center gap-5">
          <Link href="/blog" className="transition hover:text-white">
            All posts
          </Link>
        </div>
      </div>
    </footer>
  );
}
