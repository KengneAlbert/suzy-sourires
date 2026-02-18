"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useSessionTimeout } from "@/hooks/useSessionTimeout";
import { SessionWarningModal } from "@/components/SessionWarningModal";
import { ToastProvider } from "@/components/Toast";
import { createClient } from "@/lib/supabase-browser";
import { Loader2, LogOut, Shield } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading: authLoading, signOut } = useAuth();
  const router = useRouter();
  const supabase = createClient();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  // Session timeout
  const { showWarning, timeLeft, extendSession } = useSessionTimeout();

  // Check admin status
  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace("/admin/login");
      return;
    }

    const checkAdmin = async () => {
      try {
        const { data } = await supabase
          .from("admin_users")
          .select("id")
          .eq("email", user.email)
          .single();

        setIsAdmin(!!data);
      } catch {
        setIsAdmin(false);
      }
    };

    checkAdmin();
  }, [user, authLoading, router, supabase]);

  // Auth still loading
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-brand-rose animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Vérification des accès…</p>
        </div>
      </div>
    );
  }

  // Not authenticated — redirect is handled by useEffect, show brief loading
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-brand-rose animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Redirection…</p>
        </div>
      </div>
    );
  }

  // Authenticated but checking admin status
  if (isAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-brand-rose animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Vérification des accès…</p>
        </div>
      </div>
    );
  }

  // Not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-red-400" />
          </div>
          <h1 className="text-2xl font-light text-brand-dark mb-4">
            Accès refusé
          </h1>
          <p className="text-gray-500 mb-8">
            Votre compte n&apos;a pas les permissions d&apos;administration
            requises.
          </p>
          <button
            onClick={() => signOut()}
            className="inline-flex items-center gap-2 bg-brand-dark text-white px-6 py-3 rounded-xl hover:bg-brand-dark-light transition-colors"
          >
            <LogOut className="w-4 h-4" /> Se déconnecter
          </button>
        </div>
      </div>
    );
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-brand-rose" />
              <span className="font-semibold text-brand-dark">
                Administration
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500 hidden sm:block">
                {user?.email}
              </span>
              <button
                onClick={() => signOut()}
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" /> Déconnexion
              </button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-6 py-8">{children}</div>

        {/* Session warning */}
        {showWarning && (
          <SessionWarningModal
            remainingSeconds={timeLeft}
            onExtend={extendSession}
            onLogout={() => signOut()}
          />
        )}
      </div>
    </ToastProvider>
  );
}
