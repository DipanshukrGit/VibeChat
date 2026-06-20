"use client";
import { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";

function Avatar({ contact }) {
  return (
    <div className="relative h-11 w-11 shrink-0">
      <div className="h-11 w-11 overflow-hidden rounded-full shadow-sm">
        {contact.avatar ? (
          <Image
            src={contact.avatar}
            alt={contact.name}
            width={44}
            height={44}
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center text-sm font-bold text-white"
            style={{ background: contact.color }}
          >
            {contact.initials}
          </div>
        )}
      </div>
      {contact.online && (
        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
      )}
    </div>
  );
}

function formatTime(ts) {
  if (!ts) return "";
  const d = new Date(ts);
  const now = new Date();
  const diffMs = now - d;
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1)  return "now";
  if (diffMins < 60) return `${diffMins}m`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h`;
  return d.toLocaleDateString("en-US", { month:"short", day:"numeric" });
}

export default function ContactList({ contacts, selectedId, onSelect }) {
  const [query, setQuery] = useState("");

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.lastMsg.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex h-full flex-col bg-gray-50/60">

      {/* Header */}
      <div className="border-b border-gray-100 bg-white px-4 py-3.5">
        <h2 className="mb-3 text-base font-bold text-gray-800">Messages</h2>
        {/* Search */}
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 focus-within:border-green-400 focus-within:ring-2 focus-within:ring-green-100">
          <Search size={15} className="shrink-0 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
            aria-label="Search contacts"
          />
        </div>
      </div>

      {/* Contact list */}
      <ul className="flex-1 overflow-y-auto" role="listbox" aria-label="Contacts">
        {filtered.length === 0 ? (
          <li className="px-4 py-8 text-center text-sm text-gray-400">No conversations found</li>
        ) : (
          filtered.map(contact => {
            const isActive = contact.id === selectedId;
            const hasUnread = !isActive && contact.unread > 0;
            return (
              <li key={contact.id} role="option" aria-selected={isActive}>
                <button
                  onClick={() => onSelect(contact.id)}
                  className={`flex w-full items-center gap-3 px-4 py-3.5 text-left transition-all duration-150 ${
                    isActive
                      ? "border-r-[3px] border-green-500 bg-gradient-to-r from-green-50 to-emerald-50"
                      : "border-r-[3px] border-transparent hover:bg-gray-100"
                  }`}
                >
                  <Avatar contact={contact} />

                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    {/* Name row */}
                    <div className="flex items-center justify-between gap-2">
                      <span className={`truncate text-[0.88rem] ${
                        isActive ? "font-semibold text-green-700"
                        : hasUnread ? "font-bold text-gray-900"
                        : "font-semibold text-gray-800"
                      }`}>
                        {contact.name}
                      </span>
                      <span className={`shrink-0 text-[0.68rem] ${hasUnread ? "font-semibold text-green-600" : "text-gray-400"}`}>
                        {contact.time}
                      </span>
                    </div>

                    {/* Last message + unread badge */}
                    <div className="flex items-center justify-between gap-2">
                      <span className={`truncate text-[0.78rem] ${hasUnread ? "font-medium text-gray-700" : "text-gray-500"}`}>
                        {contact.lastMsg}
                      </span>
                      {hasUnread && (
                        <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-green-500 px-1.5 text-[0.62rem] font-bold text-white">
                          {contact.unread > 99 ? "99+" : contact.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              </li>
            );
          })
        )}
      </ul>

      {/* Footer */}
      <div className="border-t border-gray-100 bg-white px-4 py-3 text-center">
        <span className="text-[0.68rem] text-gray-400">{contacts.length} conversations</span>
      </div>
    </div>
  );
}
