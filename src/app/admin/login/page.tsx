import { redirect } from "next/navigation";

import { loginAction } from "@/app/admin/actions";
import { SiteFooter } from "@/components/site-footer";
import { SubmitButton } from "@/components/ui/submit-button";
import { getAdminAuthHints, isAdminAuthenticated } from "@/lib/auth";
import { siteConfig } from "@/lib/site";

export default async function AdminLoginPage(
  props: PageProps<"/admin/login">
) {
  const [searchParams, authenticated] = await Promise.all([
    props.searchParams,
    isAdminAuthenticated(),
  ]);

  if (authenticated) {
    redirect("/admin");
  }

  const hints = getAdminAuthHints();
  const hasError = searchParams.error === "1";

  return (
    <div className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.18),_transparent_34%),linear-gradient(180deg,_#09090f_0%,_#09090f_100%)] text-white">
      <main className="mx-auto flex w-full max-w-6xl flex-1 items-center px-6 py-16 lg:px-10">
        <div className="grid w-full gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <section className="space-y-8">
            <div className="inline-flex rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/55">
              {siteConfig.adminLabel}
            </div>
            <div className="space-y-5">
              <h1 className="max-w-3xl text-5xl font-semibold leading-tight text-white md:text-6xl">
                Publish beautifully and manage your entire blog from one studio.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-white/65">
                Create posts, edit stories, upload featured images, and organize the homepage with featured, latest, and popular content.
              </p>
            </div>
          </section>

          <section className="rounded-[36px] border border-white/10 bg-white/[0.05] p-8 shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/45">
                Admin login
              </p>
              <h2 className="text-3xl font-semibold text-white">Enter the studio</h2>
            </div>

            <form action={loginAction} className="mt-8 space-y-6">
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-white/80">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-fuchsia-400/60"
                  placeholder="Enter your admin password"
                />
              </div>

              {hasError ? (
                <p className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                  The password is incorrect. Try again.
                </p>
              ) : null}

              {hints.usingDefaultPassword ? (
                <p className="rounded-2xl border border-amber-400/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
                  Current local admin password: <span className="font-semibold">{hints.defaultPassword}</span>
                </p>
              ) : null}

              <SubmitButton
                label="Open admin studio"
                pendingLabel="Signing in..."
                className="w-full bg-white text-zinc-950 hover:bg-white/85"
              />
            </form>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
