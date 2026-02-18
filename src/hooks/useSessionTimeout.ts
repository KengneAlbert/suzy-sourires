"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase-browser";
import { SESSION_INACTIVITY_MS, SESSION_WARNING_MS } from "@/lib/constants";

interface UseSessionTimeoutProps {
  inactivityTimeout?: number;
  warningTimeout?: number;
  onWarning?: () => void;
  onSessionExpired?: () => void;
}

export function useSessionTimeout({
  inactivityTimeout = SESSION_INACTIVITY_MS,
  warningTimeout = SESSION_WARNING_MS,
  onWarning,
  onSessionExpired,
}: UseSessionTimeoutProps = {}) {
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const warningTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const countdownRef = useRef<ReturnType<typeof setInterval>>();
  const [showWarning, setShowWarning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(Math.round(warningTimeout / 1000));
  const showWarningRef = useRef(false);

  const resetInactivityTimer = useCallback(() => {
    clearTimeout(inactivityTimerRef.current);
    clearTimeout(warningTimerRef.current);
    clearInterval(countdownRef.current);

    setShowWarning(false);
    showWarningRef.current = false;
    setTimeLeft(Math.round(warningTimeout / 1000));

    const warningDelay = inactivityTimeout - warningTimeout;

    warningTimerRef.current = setTimeout(() => {
      setShowWarning(true);
      showWarningRef.current = true;
      onWarning?.();

      countdownRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(countdownRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      inactivityTimerRef.current = setTimeout(async () => {
        clearInterval(countdownRef.current);
        const supabase = createClient();
        await supabase.auth.signOut();
        setShowWarning(false);
        showWarningRef.current = false;
        onSessionExpired?.();
      }, warningTimeout);
    }, warningDelay);
  }, [inactivityTimeout, warningTimeout, onWarning, onSessionExpired]);

  useEffect(() => {
    resetInactivityTimer();

    const ACTIVITY_EVENTS = [
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
      "click",
      "mousemove",
    ];

    const handleActivity = () => {
      if (showWarningRef.current) return;
      resetInactivityTimer();
    };

    ACTIVITY_EVENTS.forEach((event) => {
      document.addEventListener(event, handleActivity, true);
    });

    return () => {
      ACTIVITY_EVENTS.forEach((event) => {
        document.removeEventListener(event, handleActivity, true);
      });
      clearTimeout(inactivityTimerRef.current);
      clearTimeout(warningTimerRef.current);
      clearInterval(countdownRef.current);
    };
  }, [resetInactivityTimer]);

  const extendSession = () => {
    resetInactivityTimer();
  };

  const logout = async () => {
    clearTimeout(inactivityTimerRef.current);
    clearTimeout(warningTimerRef.current);
    clearInterval(countdownRef.current);
    const supabase = createClient();
    await supabase.auth.signOut();
    setShowWarning(false);
    showWarningRef.current = false;
  };

  return { showWarning, timeLeft, extendSession, logout };
}
