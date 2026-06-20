"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import TypingIndicator from "./TypingIndicator";

function formatTime(isoStr) {
  const d = new Date(isoStr);
  return d.toLocaleTimeString("en-US", { hour:"2-digit", minute:"2-digit", hour12:true });
}
function formatFull(isoStr) {
  return new Date(isoStr).toLocaleString("en-US", {
    weekday:"short", month:"short", day:"numeric",
    hour:"2-digit", minute:"2-digit", hour12:true
  });
}

/* ── Single message bubble ── */
function MessageBubble({ msg, contact, profile }) {
  const isUser = msg.sender === "user";
  const [hovered, setHovered] = useState(false);

  const avatarSrc   = isUser ? profile.avatar : contact?.avatar;
  const avatarColor = isUser ? (profile.color || "#22c55e") : (contact?.color || "#22c55e");
  const avatarLabel = isUser
    ? (profile.initials || profile.name.slice(0,2).toUpperCase())
    : (contact?.initials || "VB");

  return (
    <div className={`group flex items-end gap-2.5 px-4 py-1 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar */}
      <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full shadow-sm" aria-hidden="true">
        {avatarSrc ? (
          <Image src={avatarSrc} alt={isUser ? "You" : contact?.name || "Bot"} width={32} height={32} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[0.62rem] font-bold text-white" style={{ background: avatarColor }}>
            {avatarLabel}
          </div>
        )}
      </div>

      {/* Bubble + timestamp */}
      <div className={`flex max-w-[72%] flex-col gap-1 ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`relative rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm transition-shadow hover:shadow-md ${
            isUser
              ? "rounded-br-sm bg-linear-to-br from-green-500 to-emerald-600 text-white"
              : "rounded-bl-sm bg-gray-100 text-gray-800"
          }`}
          role="article"
          aria-label={`${isUser ? "Your message" : `${contact?.name || "Bot"}'s message`}: ${msg.text}`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {msg.text}
        </div>

        {/* Timestamp — always visible, full detail on hover */}
        <span
          className="px-1 text-[0.62rem] text-gray-400 transition-opacity"
          title={formatFull(msg.ts)}
        >
          {hovered ? formatFull(msg.ts) : formatTime(msg.ts)}
        </span>
      </div>
    </div>
  );
}

/* ── Date divider ── */
function DateDivider({ date }) {
  const label = (() => {
    const d = new Date(date);
    const today = new Date();
    const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1);
    if (d.toDateString() === today.toDateString()) return "Today";
    if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
    return d.toLocaleDateString("en-US", { weekday:"long", month:"long", day:"numeric" });
  })();
  return (
    <div className="my-3 flex items-center gap-3 px-4">
      <div className="h-px flex-1 bg-gray-200" />
      <span className="rounded-full bg-gray-100 px-3 py-1 text-[0.65rem] font-medium text-gray-500">{label}</span>
      <div className="h-px flex-1 bg-gray-200" />
    </div>
  );
}

/* ── Scroll-to-bottom button ── */
function ScrollDownBtn({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600"
      aria-label="Scroll to latest message"
    >
      ↓
    </button>
  );
}

const PAGE_SIZE = 20;

export default function ChatWindow({ messages, isTyping, contact, profile }) {
  const bottomRef    = useRef(null);
  const containerRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const isAtBottom = useRef(true);

  /* Group messages by date */
  const allVisible = messages.slice(-visibleCount);

  /* Auto-scroll to bottom when new message arrives */
  useEffect(() => {
    if (isAtBottom.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  /* Track if user has scrolled up */
  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const distFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    isAtBottom.current = distFromBottom < 80;
    setShowScrollBtn(distFromBottom > 200);

    /* Infinite scroll — load older messages when scrolled to top */
    if (el.scrollTop < 60 && visibleCount < messages.length) {
      const prevHeight = el.scrollHeight;
      setVisibleCount(c => Math.min(c + PAGE_SIZE, messages.length));
      /* Maintain scroll position after prepend */
      requestAnimationFrame(() => {
        el.scrollTop = el.scrollHeight - prevHeight;
      });
    }
  }, [messages.length, visibleCount]);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    isAtBottom.current = true;
    setShowScrollBtn(false);
  };

  /* Group consecutive messages by date */
  const grouped = [];
  let lastDate = null;
  for (const msg of allVisible) {
    const msgDate = new Date(msg.ts).toDateString();
    if (msgDate !== lastDate) {
      grouped.push({ type:"divider", date: msg.ts, key:`div-${msg.ts}` });
      lastDate = msgDate;
    }
    grouped.push({ type:"msg", msg, key: msg.id });
  }

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-white">
      {/* Load older hint */}
      {visibleCount < messages.length && (
        <div className="flex justify-center py-2">
          <button
            onClick={() => setVisibleCount(c => Math.min(c + PAGE_SIZE, messages.length))}
            className="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-medium text-gray-500 shadow-sm hover:bg-gray-50"
          >
            Load older messages
          </button>
        </div>
      )}

      {/* Messages */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto py-3"
        role="log"
        aria-live="polite"
        aria-label="Chat messages"
      >
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
            <div className="h-16 w-16 overflow-hidden rounded-full shadow-md">
              {contact?.avatar ? (
                <Image src={contact.avatar} alt={contact.name || "Contact"} width={64} height={64} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-white" style={{ background: contact?.color || "#22c55e" }}>
                  {contact?.initials || "VB"}
                </div>
              )}
            </div>
            <p className="text-sm font-medium text-gray-600">{contact?.name || "Chat"}</p>
            <p className="text-xs text-gray-400">Say hello to start the conversation!</p>
          </div>
        )}

        {grouped.map(item =>
          item.type === "divider"
            ? <DateDivider key={item.key} date={item.date} />
            : <MessageBubble key={item.key} msg={item.msg} contact={contact} profile={profile} />
        )}

        {/* Typing indicator */}
        {isTyping && <TypingIndicator contact={contact} />}

        <div ref={bottomRef} aria-hidden="true" />
      </div>

      {/* Scroll-to-bottom */}
      {showScrollBtn && <ScrollDownBtn onClick={scrollToBottom} />}
    </div>
  );
}
