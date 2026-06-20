"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle, Loader2 } from "lucide-react";

/**
 * Wrap any page/component with <AuthGuard> to require login.
 * Frontend-only — checks localStorage for the vibechat_auth flag.
 */
export default function AuthGuard({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("vibechat_auth");
      const auth = raw ? JSON.parse(raw) : null;
      if (!auth?.loggedIn) {
        router.replace("/login");
      } else {
        setChecking(false);
      }
    } catch {
      router.replace("/login");
    }
  }, [router]);

  if (checking) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#0f0f14]">
        <div className="flex items-center gap-2.5">
          <MessageCircle size={30} strokeWidth={1.8} className="text-violet-400" />
          <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-[1.4rem] font-extrabold tracking-tight text-transparent">
            VibeChat
          </span>
        </div>
        <Loader2 size={28} className="animate-spin text-violet-400" />
      </div>
    );
  }

  return <>{children}</>;
}
