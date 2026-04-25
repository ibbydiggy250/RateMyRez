"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/data";
import { sanitizePlainText } from "@/lib/security";
import { isSbuEmail } from "@/lib/utils";

export type LoginState = {
  error: string | null;
  success: string | null;
};

export async function requestMagicLink(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = sanitizePlainText(formData.get("email")?.toString() ?? "").toLowerCase();
  const next = sanitizePlainText(formData.get("next")?.toString() ?? "") || "/review";

  if (!hasSupabaseEnv()) {
    return {
      error: "Supabase environment variables are missing. Add them before using auth.",
      success: null
    };
  }

  if (!isSbuEmail(email)) {
    return {
      error: "Use a valid @stonybrook.edu email address.",
      success: null
    };
  }

  const headerStore = await headers();
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    headerStore.get("origin") ??
    "http://localhost:3000";
  const redirectTo = `${origin}/auth/callback?next=${encodeURIComponent(next)}`;

  console.info("[auth] Magic link requested", {
    origin: new URL(origin).origin,
    next
  });

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectTo
    }
  });

  if (error) {
    console.error("[auth] Magic link request failed", {
      status: error.status,
      name: error.name,
      message: error.message
    });

    return {
      error: "Magic link could not be sent. Please try again.",
      success: null
    };
  }

  return {
    error: null,
    success: `Magic link sent to ${email}. Open it on this device to finish signing in.`
  };
}

export async function signOut() {
  if (!hasSupabaseEnv()) {
    return;
  }

  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
