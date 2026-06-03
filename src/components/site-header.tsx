import Link from "next/link";

import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[rgba(7,7,11,0.72)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 via-violet-500 to-sky-400 text-sm font-black text-white shadow-lg shadow-fuchsia-500/20">
            HT
          </span>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/55">
              Editorial
            </p>
            <p className="text-lg font-semibold text-white">{siteConfig.name}</p>
          </div>
        </Link>

        <nav className="flex items-center gap-3 text-sm text-white/75">
          <Link
            href="/"
            className="rounded-full border border-white/10 px-4 py-2 transition hover:border-white/25 hover:text-white"
          >
            Home
          </Link>
          <Link
            href="/blog"
            className="rounded-full border border-white/10 px-4 py-2 transition hover:border-white/25 hover:text-white"
          >
            Stories
          </Link>
        </nav>
      </div>
    </header>
  );
}
