"use client";
import Image from "next/image";

export default function TypingIndicator({ contact }) {
  return (
    <div className="flex items-end gap-2.5 px-4 py-1" aria-label="Bot is typing" role="status">
      {/* Avatar */}
      <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full shadow-sm" aria-hidden="true">
        {contact?.avatar ? (
          <Image
            src={contact.avatar}
            alt={contact.name || "Bot"}
            width={32}
            height={32}
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center text-[0.65rem] font-bold text-white"
            style={{ background: contact?.color || "#22c55e" }}
          >
            {contact?.initials || "VB"}
          </div>
        )}
      </div>

      {/* Bubble */}
      <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-gray-100 px-4 py-3 shadow-sm">
        {[0, 1, 2].map(i => (
          <span
            key={i}
            className="h-2 w-2 rounded-full bg-gray-400"
            style={{ animation: `typingBounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
          />
        ))}
      </div>

      <style>{`
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30%            { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
