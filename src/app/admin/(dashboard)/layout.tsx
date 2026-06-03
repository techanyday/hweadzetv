import Link from "next/link";
import type { ReactNode } from "react";

import { logoutAction } from "@/app/admin/actions";
import { SubmitButton } from "@/components/ui/submit-button";
import { getAdminAuthHints, requireAdminSession } from "@/lib/auth";
import { siteConfig } from "@/lib/site";

export default async function AdminDashboardLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  await requireAdminSession();
  const hints = getAdminAuthHints();

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-950">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8 lg:px-10">
        <header className="flex flex-col gap-6 rounded-[34px] bg-zinc-950 p-6 text-white shadow-[0_30px_120px_rgba(0,0,0,0.24)] lg:flex-row lg:items-center lg:justify-between lg:p-8">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-white/45">
              {siteConfig.adminLabel}
            </p>
            <div>
              <h1 className="text-3xl font-semibold">Manage your publication</h1>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-white/60">
                Publish new stories, manage featured placements, and keep your editorial brand polished.
              </p>
            </div>
            {hints.usingDefaultPassword || hints.usingDefaultSecret ? (
              <p className="rounded-2xl border border-amber-400/15 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
                Update your local admin credentials in the project .env file before deploying.
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="rounded-full border border-white/10 px-4 py-3 text-sm font-medium text-white/75 transition hover:border-white/20 hover:text-white"
            >
              View site
            </Link>
            <Link
              href="/admin"
              className="rounded-full border border-white/10 px-4 py-3 text-sm font-medium text-white/75 transition hover:border-white/20 hover:text-white"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/posts/new"
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-white/85"
            >
              New post
            </Link>
            <form action={logoutAction}>
              <SubmitButton
                label="Logout"
                pendingLabel="Logging out..."
                className="bg-white/8 text-white hover:bg-white/15"
              />
            </form>
          </div>
        </header>

        {children}
      </div>
    </div>
  );
}
