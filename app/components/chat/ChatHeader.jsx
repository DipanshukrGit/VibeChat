"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Phone, Video, MoreVertical } from "lucide-react";

export default function ChatHeader({ profile, onProfileClick, onBack, showBack, contactName, contactOnline }) {
  /* derive initials */
  const initials = profile.initials ||
    profile.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <header className="flex items-center justify-between border-b border-gray-100 bg-white px-4 py-3 shadow-sm sm:px-5">

      {/* LEFT — logo or back button on mobile */}
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={onBack}
            className="mr-1 flex items-center justify-center rounded-xl p-2 text-gray-500 hover:bg-gray-100 md:hidden"
            aria-label="Back to contacts"
          >
            <ArrowLeft size={20} />
          </button>
        )}

        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="VibeChat" width={32} height={32} className="h-8 w-8 rounded-xl object-contain" />
          <span className="hidden text-lg font-extrabold tracking-tight sm:block">
            <span className="text-green-600">Vibe</span>
            <span className="text-orange-500">Chat</span>
          </span>
        </Link>

        {/* Active contact info on mobile */}
        {showBack && contactName && (
          <div className="ml-1 md:hidden">
            <p className="text-sm font-semibold text-gray-800">{contactName}</p>
            {contactOnline !== undefined && (
              <p className={`text-[0.65rem] font-medium ${contactOnline ? "text-green-500" : "text-gray-400"}`}>
                {contactOnline ? "Online" : "Offline"}
              </p>
            )}
          </div>
        )}
      </div>

      {/* CENTRE — contact info on desktop when chatting */}
      {contactName && (
        <div className="hidden flex-col items-center md:flex">
          <p className="text-sm font-semibold text-gray-800">{contactName}</p>
          {contactOnline !== undefined && (
            <span className={`text-[0.65rem] font-medium ${contactOnline ? "text-green-500" : "text-gray-400"}`}>
              {contactOnline ? "● Online" : "● Offline"}
            </span>
          )}
        </div>
      )}

      {/* RIGHT — action icons + profile */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <button className="hidden items-center justify-center rounded-xl p-2 text-gray-400 hover:bg-green-50 hover:text-green-600 sm:flex" aria-label="Voice call">
          <Phone size={18} />
        </button>
        <button className="hidden items-center justify-center rounded-xl p-2 text-gray-400 hover:bg-green-50 hover:text-green-600 sm:flex" aria-label="Video call">
          <Video size={18} />
        </button>
        <button className="flex items-center justify-center rounded-xl p-2 text-gray-400 hover:bg-gray-100" aria-label="More options">
          <MoreVertical size={18} />
        </button>

        {/* Profile avatar */}
        <button
          onClick={onProfileClick}
          className="ml-1 h-9 w-9 overflow-hidden rounded-full shadow-md ring-2 ring-white transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400"
          aria-label="Open profile settings"
          title="Profile settings"
        >
          {profile.avatar ? (
            <Image src={profile.avatar} alt={profile.name} width={36} height={36} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm font-bold text-white" style={{ background: profile.color || "#22c55e" }}>
              {initials}
            </div>
          )}
        </button>
      </div>
    </header>
  );
}
