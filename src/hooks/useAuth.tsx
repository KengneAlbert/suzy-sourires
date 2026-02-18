"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { createClient } from "@/lib/supabase-browser";
import type { User } from "@supabase/supabase-js";

interface AuthContextValue {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const checkAdminStatus = useCallback(
    async (email?: string) => {
      if (!email) {
        setIsAdmin(false);
        return;
      }
      try {
        const { data, error: err } = await supabase
          .from("admin_users")
          .select("id")
          .eq("email", email)
          .single();

        setIsAdmin(!err && !!data);
      } catch {
        setIsAdmin(false);
      }
    },
    [supabase],
  );

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) checkAdminStatus(u.email);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        checkAdminStatus(u.email);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => subscription?.unsubscribe();
  }, [supabase, checkAdminStatus]);

  const signIn = async (email: string, password: string) => {
    setError(null);
    const { error: err } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (err) {
      setError(err.message);
      throw err;
    }
  };

  const signUp = async (email: string, password: string) => {
    setError(null);

    // 1. Vérifier que l'email est dans la whitelist
    const { data: allowed, error: checkErr } = await supabase
      .from("allowed_signup_emails")
      .select("id")
      .eq("email", email.toLowerCase())
      .single();

    if (checkErr || !allowed) {
      const msg =
        "Cette adresse email n'est pas autorisée à créer un compte. Contactez un administrateur.";
      setError(msg);
      throw new Error(msg);
    }

    // 2. Créer le compte
    const { data, error: err } = await supabase.auth.signUp({
      email,
      password,
    });
    if (err) {
      setError(err.message);
      throw err;
    }

    // 3. Vérifier si l'email doit être confirmé
    // Si identities est vide, l'utilisateur existait déjà
    if (data.user && data.user.identities?.length === 0) {
      const msg = "Un compte existe déjà avec cette adresse email.";
      setError(msg);
      throw new Error(msg);
    }

    // 4. Enregistrer automatiquement comme admin dans admin_users
    // via une fonction SECURITY DEFINER qui bypasse les RLS
    await supabase.rpc("register_admin_from_signup", {
      user_email: email.toLowerCase(),
    });
  };

  const signOut = async () => {
    setError(null);
    const { error: err } = await supabase.auth.signOut();
    if (err) {
      setError(err.message);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAdmin, loading, error, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth doit être utilisé dans un AuthProvider");
  return ctx;
}
