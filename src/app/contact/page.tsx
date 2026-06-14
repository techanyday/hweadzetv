import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Contact | ${siteConfig.name}`,
  description: `Contact ${siteConfig.name} regarding editorial questions, corrections, privacy, or business matters.`,
};

const contactEmail = "contact@hweadzetv.com";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.12),_transparent_24%),linear-gradient(180deg,_#09090f_0%,_#0f172a_100%)] text-white">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-[96rem] flex-1 flex-col gap-10 px-5 py-8 sm:px-6 md:py-9 lg:px-8 xl:px-10 2xl:max-w-[104rem]">
        <section className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/45">
            Contact
          </p>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-white md:text-5xl">
            Contact the {siteConfig.name} team about editorial matters, corrections, business inquiries, or policy-related requests.
          </h1>
          <p className="max-w-3xl text-base leading-8 text-white/65">
            This page is provided so visitors, partners, rights holders, and platform reviewers can identify the appropriate channel for communicating with the publication at{" "}
            <a
              href={`mailto:${contactEmail}`}
              className="text-white underline underline-offset-4"
            >
              {contactEmail}
            </a>
            .
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_24px_90px_rgba(0,0,0,0.25)]">
            <h2 className="text-2xl font-semibold text-white">Editorial inquiries and corrections</h2>
            <p className="mt-4 text-sm leading-7 text-white/65">
              If you are contacting us about story accuracy, requests for updates, or editorial clarifications, please email{" "}
              <a
                href={`mailto:${contactEmail}`}
                className="text-white underline underline-offset-4"
              >
                {contactEmail}
              </a>{" "}
              and include enough context for us to identify the relevant article or claim.
            </p>
          </article>
          <article className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_24px_90px_rgba(0,0,0,0.25)]">
            <h2 className="text-2xl font-semibold text-white">Business, advertising, and partnerships</h2>
            <p className="mt-4 text-sm leading-7 text-white/65">
              For advertising, partnership, licensing, or commercial requests related to {siteConfig.name}, please email{" "}
              <a
                href={`mailto:${contactEmail}`}
                className="text-white underline underline-offset-4"
              >
                {contactEmail}
              </a>{" "}
              and include the nature of your request, timeline, and the best way to reach you.
            </p>
          </article>
          <article className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_24px_90px_rgba(0,0,0,0.25)]">
            <h2 className="text-2xl font-semibold text-white">Privacy and legal requests</h2>
            <p className="mt-4 text-sm leading-7 text-white/65">
              Questions about privacy, personal data, content ownership, or legal concerns should clearly identify the request and the material involved and be sent to{" "}
              <a
                href={`mailto:${contactEmail}`}
                className="text-white underline underline-offset-4"
              >
                {contactEmail}
              </a>
              .
            </p>
          </article>
          <article className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_24px_90px_rgba(0,0,0,0.25)]">
            <h2 className="text-2xl font-semibold text-white">Primary email</h2>
            <div className="mt-4 space-y-4 text-sm text-white/70">
              <a
                href={`mailto:${contactEmail}`}
                className="inline-flex rounded-full border border-white/10 px-4 py-2 text-white transition hover:border-white/20 hover:bg-white/[0.04]"
              >
                {contactEmail}
              </a>
              <div className="flex flex-wrap gap-3">
                <Link href="/about" className="rounded-full border border-white/10 px-4 py-2 transition hover:border-white/20 hover:text-white">
                  About
                </Link>
                <Link href="/privacy" className="rounded-full border border-white/10 px-4 py-2 transition hover:border-white/20 hover:text-white">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="rounded-full border border-white/10 px-4 py-2 transition hover:border-white/20 hover:text-white">
                  Terms & Conditions
                </Link>
              </div>
            </div>
          </article>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
