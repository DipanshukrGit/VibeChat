"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, User, Mail, FileText, Save } from "lucide-react";

const AVATARS = [
  "/avatar/user.png",
  "/avatar/man.png",
  "/avatar/astronaut.png",
  "/avatar/hacker.png",
  "/avatar/dog.png",
  "/avatar/bot.png",
];

export default function ProfileModal({ profile, onSave, onClose }) {
  const [form, setForm] = useState({
    name:   profile.name   || "",
    email:  profile.email  || "",
    bio:    profile.bio    || "",
    color:  profile.color  || "#22c55e",
    avatar: profile.avatar || "/avatar/user.png",
  });
  const [saved, setSaved] = useState(false);
  const firstRef = useRef(null);

  useEffect(() => { firstRef.current?.focus(); }, []);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const initials = form.name.trim()
    ? form.name.trim().split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
    : "YO";

  const handleSave = (e) => {
    e.preventDefault();
    onSave({ ...form, initials });
    setSaved(true);
    setTimeout(onClose, 800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Update profile"
    >
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-base font-bold text-gray-800">Update Profile</h2>
          <button onClick={onClose} className="rounded-xl p-1.5 text-gray-400 hover:bg-gray-100" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSave} className="flex flex-col gap-5 px-6 py-5">

          {/* Avatar preview + picker */}
          <div className="flex flex-col items-center gap-3">
            <div className="h-20 w-20 overflow-hidden rounded-full shadow-lg ring-4 ring-green-100">
              <Image
                src={form.avatar}
                alt="Avatar preview"
                width={80}
                height={80}
                className="h-full w-full object-cover"
              />
            </div>

            <p className="text-xs text-gray-400">Choose your avatar</p>

            {/* Avatar grid */}
            <div className="flex items-center gap-2.5" role="group" aria-label="Select avatar">
              {AVATARS.map((src) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setForm(p => ({ ...p, avatar: src }))}
                  className={`h-10 w-10 overflow-hidden rounded-full transition-transform hover:scale-110 focus:outline-none ${
                    form.avatar === src
                      ? "scale-110 ring-2 ring-green-500 ring-offset-2"
                      : "ring-1 ring-gray-200"
                  }`}
                  aria-label={src.split("/").pop()?.replace(".png", "")}
                  aria-pressed={form.avatar === src}
                >
                  <Image src={src} alt={src} width={40} height={40} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="p-name" className="flex items-center gap-1.5 text-[0.78rem] font-semibold text-gray-700">
              <User size={13} className="text-green-500" /> Display Name
            </label>
            <input
              ref={firstRef}
              id="p-name"
              type="text"
              value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              placeholder="Your name"
              required
              className="rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="p-email" className="flex items-center gap-1.5 text-[0.78rem] font-semibold text-gray-700">
              <Mail size={13} className="text-green-500" /> Email
            </label>
            <input
              id="p-email"
              type="email"
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              placeholder="you@example.com"
              className="rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100"
            />
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="p-bio" className="flex items-center gap-1.5 text-[0.78rem] font-semibold text-gray-700">
              <FileText size={13} className="text-green-500" /> Bio
            </label>
            <textarea
              id="p-bio"
              rows={2}
              value={form.bio}
              onChange={e => setForm(p => ({ ...p, bio: e.target.value }))}
              placeholder="A short bio about yourself…"
              className="resize-none rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100"
            />
          </div>

          {/* Save */}
          <button
            type="submit"
            className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white transition-all ${
              saved
                ? "bg-green-500"
                : "bg-linear-to-r from-orange-500 to-orange-400 shadow-[0_4px_14px_rgba(249,115,22,0.35)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(249,115,22,0.5)]"
            }`}
          >
            <Save size={15} />
            {saved ? "Saved!" : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
