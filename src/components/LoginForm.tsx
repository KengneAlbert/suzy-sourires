"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import {
  Eye,
  EyeOff,
  Loader2,
  LogIn,
  UserPlus,
  AlertCircle,
} from "lucide-react";

export function LoginForm() {
  const { signIn, signUp, loading: authLoading } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    if (mode === "signup" && password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    try {
      if (mode === "login") {
        await signIn(email, password);
        // Redirection immédiate vers le dashboard admin après connexion
        router.push("/admin");
      } else {
        await signUp(email, password);
        setSuccess(
          "Inscription réussie ! Vérifiez votre boîte email (et les spams) pour confirmer votre compte avant de vous connecter.",
        );
        setMode("login");
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Une erreur inattendue est survenue.";

      // Traductions des erreurs Supabase courantes
      const translations: Record<string, string> = {
        "Invalid login credentials": "Email ou mot de passe incorrect.",
        "Email not confirmed":
          "Votre email n'est pas encore confirmé. Vérifiez votre boîte mail (et les spams).",
        "User already registered":
          "Un compte existe déjà avec cette adresse email.",
        "Signup requires a valid password": "Le mot de passe n'est pas valide.",
        "Email rate limit exceeded":
          "Trop de tentatives. Veuillez réessayer dans quelques minutes.",
        "For security purposes, you can only request this after":
          "Trop de tentatives. Veuillez patienter avant de réessayer.",
      };

      const translated = Object.entries(translations).find(([key]) =>
        message.includes(key),
      );
      setError(translated ? translated[1] : message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-cream px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-light text-brand-dark mb-2">
              {mode === "login" ? "Connexion" : "Inscription"}{" "}
              <span className="italic">Admin</span>
            </h1>
            <p className="text-gray-500">
              {mode === "login"
                ? "Accédez à votre espace d'administration."
                : "Créez votre compte administrateur."}
            </p>
          </div>

          {/* Error / Success */}
          {error && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6">
              <p className="text-sm">{success}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@exemple.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-rose focus:ring-2 focus:ring-brand-rose/20 outline-none transition-all"
                autoComplete="email"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Mot de passe
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-rose focus:ring-2 focus:ring-brand-rose/20 outline-none transition-all pr-12"
                  autoComplete={
                    mode === "login" ? "current-password" : "new-password"
                  }
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {mode === "signup" && (
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Confirmer le mot de passe
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-rose focus:ring-2 focus:ring-brand-rose/20 outline-none transition-all"
                  autoComplete="new-password"
                  required
                  minLength={8}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading || authLoading}
              className="w-full py-3.5 rounded-xl font-medium bg-brand-dark text-white hover:bg-brand-dark-light transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : mode === "login" ? (
                <>
                  <LogIn className="w-5 h-5" />
                  Se connecter
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  S&apos;inscrire
                </>
              )}
            </button>
          </form>

          {/* Toggle mode */}
          <div className="text-center mt-6">
            <button
              onClick={() => {
                setMode(mode === "login" ? "signup" : "login");
                setError(null);
                setSuccess(null);
              }}
              className="text-sm text-gray-500 hover:text-brand-rose transition-colors"
            >
              {mode === "login"
                ? "Pas encore de compte ? S'inscrire"
                : "Déjà un compte ? Se connecter"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
