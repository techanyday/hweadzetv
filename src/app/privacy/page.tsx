import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.name}`,
  description: `Read the privacy policy for ${siteConfig.name}, including how information may be collected and used on the site.`,
};

const contactEmail = "contact@hweadzetv.com";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.12),_transparent_24%),linear-gradient(180deg,_#09090f_0%,_#0f172a_100%)] text-white">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-[96rem] flex-1 flex-col gap-10 px-5 py-8 sm:px-6 md:py-9 lg:px-8 xl:px-10 2xl:max-w-[104rem]">
        <section className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/45">
            Privacy Policy
          </p>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-white md:text-5xl">
            Our privacy policy explains how information may be collected, used, and protected when you visit {siteConfig.name}.
          </h1>
          <p className="max-w-3xl text-base leading-8 text-white/65">
            By using this website, you acknowledge that certain technical information may be processed to operate the site, improve performance, understand readership, and support future advertising or analytics integrations.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_24px_90px_rgba(0,0,0,0.25)]">
            <h2 className="text-2xl font-semibold text-white">Information we may collect</h2>
            <p className="mt-4 text-sm leading-7 text-white/65">
              We may collect information such as basic device and browser data, approximate location based on IP address, referring pages, on-site activity, and information voluntarily provided through any future forms, submissions, or business correspondence.
            </p>
          </article>
          <article className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_24px_90px_rgba(0,0,0,0.25)]">
            <h2 className="text-2xl font-semibold text-white">How information may be used</h2>
            <p className="mt-4 text-sm leading-7 text-white/65">
              Information may be used to operate the website, improve content presentation, understand audience interest, maintain security, respond to legitimate requests, comply with legal obligations, and support website monetization tools such as analytics or advertising services.
            </p>
          </article>
          <article className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_24px_90px_rgba(0,0,0,0.25)]">
            <h2 className="text-2xl font-semibold text-white">Cookies and third-party services</h2>
            <p className="mt-4 text-sm leading-7 text-white/65">
              The site may use cookies, local storage, or similar technologies directly or through third-party tools to improve functionality, measure usage, remember preferences, and deliver advertising or related services where applicable.
            </p>
          </article>
          <article className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_24px_90px_rgba(0,0,0,0.25)]">
            <h2 className="text-2xl font-semibold text-white">Data handling and updates</h2>
            <p className="mt-4 text-sm leading-7 text-white/65">
              We take reasonable steps to protect information handled through the site, but no online service can guarantee absolute security. This policy may be updated from time to time as the site evolves, adds new services, or changes compliance requirements.
            </p>
          </article>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_24px_90px_rgba(0,0,0,0.25)]">
          <h2 className="text-2xl font-semibold text-white">Questions about privacy</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/65">
            If you have questions about this privacy policy or believe a privacy-related issue requires review, please email{" "}
            <a
              href={`mailto:${contactEmail}`}
              className="text-white underline underline-offset-4"
            >
              {contactEmail}
            </a>{" "}
            or use the contact process described on our <Link href="/contact" className="text-white underline underline-offset-4">Contact</Link> page.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
