import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `About | ${siteConfig.name}`,
  description: `Learn more about ${siteConfig.name}, our editorial focus, and the standards behind our coverage.`,
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.12),_transparent_24%),linear-gradient(180deg,_#09090f_0%,_#0f172a_100%)] text-white">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-[96rem] flex-1 flex-col gap-10 px-5 py-8 sm:px-6 md:py-9 lg:px-8 xl:px-10 2xl:max-w-[104rem]">
        <section className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/45">
            About the publication
          </p>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-white md:text-5xl">
            {siteConfig.name} is a modern digital publication focused on Ghanaian stories, culture, entertainment, sports, and timely public-interest reporting.
          </h1>
          <p className="max-w-3xl text-base leading-8 text-white/65">
            We publish stories designed to be easy to read, visually engaging, and helpful for audiences who want quick access to developing headlines and broader cultural context.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_24px_90px_rgba(0,0,0,0.25)]">
            <h2 className="text-2xl font-semibold text-white">What we cover</h2>
            <p className="mt-4 text-sm leading-7 text-white/65">
              Our coverage includes Ghana news, entertainment, sports, popular culture, personalities, trends, and other stories relevant to readers interested in current conversations across the country and beyond.
            </p>
          </article>
          <article className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_24px_90px_rgba(0,0,0,0.25)]">
            <h2 className="text-2xl font-semibold text-white">Editorial approach</h2>
            <p className="mt-4 text-sm leading-7 text-white/65">
              We aim to publish clear, readable reporting and features with an emphasis on accuracy, relevance, and timely updates. When necessary, articles may be revised to reflect new information, clarify facts, or improve context for readers.
            </p>
          </article>
          <article className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_24px_90px_rgba(0,0,0,0.25)]">
            <h2 className="text-2xl font-semibold text-white">How the site operates</h2>
            <p className="mt-4 text-sm leading-7 text-white/65">
              {siteConfig.name} is structured as an online-first publication. Stories, site organization, and supporting informational pages may be updated from time to time to improve clarity, user experience, and compliance with publishing or advertising requirements.
            </p>
          </article>
          <article className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_24px_90px_rgba(0,0,0,0.25)]">
            <h2 className="text-2xl font-semibold text-white">Related information</h2>
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-white/70">
              <Link href="/contact" className="rounded-full border border-white/10 px-4 py-2 transition hover:border-white/20 hover:text-white">
                Contact
              </Link>
              <Link href="/privacy" className="rounded-full border border-white/10 px-4 py-2 transition hover:border-white/20 hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="rounded-full border border-white/10 px-4 py-2 transition hover:border-white/20 hover:text-white">
                Terms & Conditions
              </Link>
            </div>
          </article>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
