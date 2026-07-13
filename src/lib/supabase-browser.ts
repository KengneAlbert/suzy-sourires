import { createBrowserClient } from "@supabase/ssr";

// @supabase/ssr throws synchronously when passed empty strings — use valid
// placeholder values so static generation completes; all queries simply fail
// at runtime if the real env vars are absent.
const FALLBACK_URL = "https://placeholder.supabase.co";
const FALLBACK_KEY = "placeholder-anon-key";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    if (typeof window !== "undefined") {
      console.warn(
        "[Supabase] NEXT_PUBLIC_SUPABASE_URL ou NEXT_PUBLIC_SUPABASE_ANON_KEY manquant — " +
          "les fonctionnalités Supabase sont désactivées.",
      );
    }
    return createBrowserClient(FALLBACK_URL, FALLBACK_KEY);
  }

  return createBrowserClient(url, key);
}
