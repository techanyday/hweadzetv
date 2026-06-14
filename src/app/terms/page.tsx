import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Terms & Conditions | ${siteConfig.name}`,
  description: `Read the terms and conditions governing the use of ${siteConfig.name}.`,
};

const contactEmail = "contact@hweadzetv.com";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.12),_transparent_24%),linear-gradient(180deg,_#09090f_0%,_#0f172a_100%)] text-white">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-[96rem] flex-1 flex-col gap-10 px-5 py-8 sm:px-6 md:py-9 lg:px-8 xl:px-10 2xl:max-w-[104rem]">
        <section className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/45">
            Terms & Conditions
          </p>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-white md:text-5xl">
            These terms govern your access to and use of {siteConfig.name} and the content published on the site.
          </h1>
          <p className="max-w-3xl text-base leading-8 text-white/65">
            By accessing the site, you agree to use it lawfully, respect its content rights, and understand that content, availability, and features may change over time.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_24px_90px_rgba(0,0,0,0.25)]">
            <h2 className="text-2xl font-semibold text-white">Use of the site</h2>
            <p className="mt-4 text-sm leading-7 text-white/65">
              You agree not to misuse the site, interfere with its operation, attempt unauthorized access, or use the content or infrastructure in any way that violates applicable law or the rights of others.
            </p>
          </article>
          <article className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_24px_90px_rgba(0,0,0,0.25)]">
            <h2 className="text-2xl font-semibold text-white">Content and intellectual property</h2>
            <p className="mt-4 text-sm leading-7 text-white/65">
              Unless otherwise stated, the design of the website, editorial presentation, branding, and published materials belong to {siteConfig.name} or their respective owners. Content may not be copied, republished, or commercially exploited without appropriate permission.
            </p>
          </article>
          <article className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_24px_90px_rgba(0,0,0,0.25)]">
            <h2 className="text-2xl font-semibold text-white">External links and third-party services</h2>
            <p className="mt-4 text-sm leading-7 text-white/65">
              The site may contain links to third-party websites, embedded content, analytics, or advertising services. We are not responsible for the separate policies, availability, or practices of third-party services outside our control.
            </p>
          </article>
          <article className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_24px_90px_rgba(0,0,0,0.25)]">
            <h2 className="text-2xl font-semibold text-white">Disclaimers and changes</h2>
            <p className="mt-4 text-sm leading-7 text-white/65">
              While we aim to provide accurate and useful information, the site and its content are provided on an as-available basis. We may update, revise, suspend, or remove features, articles, or policies at any time without prior notice.
            </p>
          </article>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_24px_90px_rgba(0,0,0,0.25)]">
          <h2 className="text-2xl font-semibold text-white">Questions about these terms</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/65">
            If you have questions about these terms and conditions, please email{" "}
            <a
              href={`mailto:${contactEmail}`}
              className="text-white underline underline-offset-4"
            >
              {contactEmail}
            </a>{" "}
            or review our <Link href="/privacy" className="text-white underline underline-offset-4">Privacy Policy</Link> and <Link href="/contact" className="text-white underline underline-offset-4">Contact</Link> page.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
