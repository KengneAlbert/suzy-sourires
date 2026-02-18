"use client";

import { Clock, LogOut, RefreshCw } from "lucide-react";
import { useModal } from "@/hooks/useModal";

interface SessionWarningModalProps {
  remainingSeconds: number;
  onExtend: () => void;
  onLogout: () => void;
}

export function SessionWarningModal({
  remainingSeconds,
  onExtend,
  onLogout,
}: SessionWarningModalProps) {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const { modalRef, handleKeyDown } = useModal(true, onLogout);

  return (
    <div
      ref={modalRef}
      role="alertdialog"
      aria-modal="true"
      aria-label="Session expirante"
      onKeyDown={handleKeyDown}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[120] flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl p-8 text-center">
        <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Clock className="w-8 h-8 text-amber-500" />
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Session expirante
        </h3>
        <p className="text-gray-600 mb-6">
          Votre session expire dans{" "}
          <span className="font-mono font-bold text-amber-600">
            {minutes}:{String(seconds).padStart(2, "0")}
          </span>
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={onExtend}
            className="w-full inline-flex items-center justify-center gap-2 bg-brand-dark text-white px-6 py-3 rounded-xl hover:bg-brand-dark-light transition-colors font-medium"
          >
            <RefreshCw className="w-4 h-4" />
            Prolonger la session
          </button>
          <button
            onClick={onLogout}
            className="w-full inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors font-medium"
          >
            <LogOut className="w-4 h-4" />
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
}
