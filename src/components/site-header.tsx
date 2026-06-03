import Link from "next/link";

import Image from "next/image";

import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[rgba(7,7,11,0.72)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" aria-label={siteConfig.name} className="flex items-center">
          <Image
            src="/hweadzetv-logo.svg"
            alt={siteConfig.name}
            width={205}
            height={55}
            priority
            className="h-auto w-[190px] sm:w-[205px]"
          />
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
