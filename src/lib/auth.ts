import { createHash, timingSafeEqual } from "node:crypto";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ADMIN_COOKIE_NAME = "hweadzetv-admin-session";
const DEFAULT_ADMIN_PASSWORD = "admin12345";
const DEFAULT_SESSION_SECRET = "local-development-session-secret";

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD?.trim() || DEFAULT_ADMIN_PASSWORD;
}

function getSessionSecret() {
  return process.env.AUTH_SESSION_SECRET?.trim() || DEFAULT_SESSION_SECRET;
}

function getSessionValue() {
  return createHash("sha256")
    .update(`${getAdminPassword()}::${getSessionSecret()}`)
    .digest("hex");
}

function safeCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function getAdminAuthHints() {
  return {
    usingDefaultPassword: !process.env.ADMIN_PASSWORD,
    usingDefaultSecret: !process.env.AUTH_SESSION_SECRET,
    defaultPassword: DEFAULT_ADMIN_PASSWORD,
  };
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!session) {
    return false;
  }

  return safeCompare(session, getSessionValue());
}

export async function requireAdminSession() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }
}

export async function createAdminSession() {
  const cookieStore = await cookies();

  cookieStore.set(ADMIN_COOKIE_NAME, getSessionValue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function destroyAdminSession() {
  const cookieStore = await cookies();

  cookieStore.delete(ADMIN_COOKIE_NAME);
}

export function isValidAdminPassword(password: string) {
  return safeCompare(password, getAdminPassword());
}
