import Link from "next/link";

import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950">
      <div className="mx-auto flex w-full max-w-[96rem] flex-col gap-6 px-5 py-10 text-sm text-white/60 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 xl:px-10 2xl:max-w-[104rem]">
        <div className="space-y-2">
          <p className="text-base font-semibold text-white">{siteConfig.name}</p>
          <p className="max-w-xl">{siteConfig.description}</p>
        </div>

        <div className="flex flex-wrap items-center gap-5">
          <Link href="/about" className="transition hover:text-white">
            About
          </Link>
          <Link href="/contact" className="transition hover:text-white">
            Contact
          </Link>
          <Link href="/privacy" className="transition hover:text-white">
            Privacy Policy
          </Link>
          <Link href="/terms" className="transition hover:text-white">
            Terms & Conditions
          </Link>
          <Link href="/blog" className="transition hover:text-white">
            All posts
          </Link>
        </div>
      </div>
    </footer>
  );
}
