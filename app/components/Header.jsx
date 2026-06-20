"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const NAV = [
  { label: "Features", href: "/features" },
  { label: "Pricing",  href: "/pricing" },
  { label: "Support",  href: "/support" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-50 flex items-center justify-between border-b border-gray-100 bg-white px-4 py-3 shadow-sm sm:px-6 md:px-10 md:py-3.5">

      {/* ── Logo ── */}
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.png" alt="VibeChat logo" width={36} height={36} className="h-8 w-8 rounded-xl object-contain sm:h-9 sm:w-9" />
        <span className="text-lg font-extrabold tracking-tight sm:text-xl">
          <span className="text-green-600">Vibe</span>
          <span className="text-orange-500">Chat</span>
        </span>
      </Link>

      {/* ── Desktop Nav ── */}
      <nav className="hidden items-center gap-6 md:flex">
        {NAV.map(({ label, href }) => (
          <Link key={label} href={href}
            className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900">
            {label}
          </Link>
        ))}
      </nav>

      {/* ── Desktop Auth Buttons ── */}
      <div className="hidden items-center md:flex">
        <Link href="/login"
          className="rounded-full bg-linear-to-r from-orange-500 to-orange-400 px-5 py-2 text-sm font-bold text-white shadow-[0_2px_12px_rgba(249,115,22,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_18px_rgba(249,115,22,0.5)]">
          Get Started
        </Link>
      </div>

      {/* ── Mobile: hamburger only ── */}
      <div className="flex items-center gap-2 md:hidden">
        <button className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100"
          onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* ── Mobile Drawer ── */}
      {open && (
        <div className="absolute left-0 right-0 top-full border-t border-gray-100 bg-white shadow-lg md:hidden">
          <nav className="flex flex-col gap-1 px-5 py-3">
            {NAV.map(({ label, href }) => (
              <Link key={label} href={href}
                className="border-b border-gray-100 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900"
                onClick={() => setOpen(false)}>
                {label}
              </Link>
            ))}
            <Link href="/signup" onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-linear-to-r from-orange-500 to-orange-400 py-2.5 text-center text-sm font-bold text-white shadow-sm">
              Get Started — It&apos;s Free
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
