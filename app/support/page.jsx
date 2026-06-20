"use client";
import { useState } from "react";
import Link from "next/link";
import { MessageCircle, Mail, BookOpen, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import Header from "../components/Header";
import PageTransition from "../components/PageTransition";

const FAQS = [
  {
    q: "Is VibeChat really free?",
    a: "Yes! The Free plan is free forever with no credit card required. You can upgrade to Pro or Team at any time.",
  },
  {
    q: "How secure are my messages?",
    a: "All messages are end-to-end encrypted using AES-256. Not even we can read your conversations. Your privacy is our top priority.",
  },
  {
    q: "Can I use VibeChat on multiple devices?",
    a: "Absolutely. VibeChat works on iOS, Android, Web, and Desktop. Your messages sync instantly across all devices.",
  },
  {
    q: "How do I delete my account?",
    a: "Go to Settings → Account → Delete Account. This permanently removes all your data from our servers within 30 days.",
  },
  {
    q: "What file types can I share?",
    a: "You can share any file type — images, videos, PDFs, ZIPs, and more. Free users get 500 MB storage; Pro users get 50 GB.",
  },
  {
    q: "How do I report someone?",
    a: "Tap and hold any message → Report. Our team reviews all reports within 24 hours and takes action on violations of our community guidelines.",
  },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="text-[0.9rem] font-semibold text-gray-800">{q}</span>
        {open ? (
          <ChevronUp size={18} className="shrink-0 text-green-500" />
        ) : (
          <ChevronDown size={18} className="shrink-0 text-gray-400" />
        )}
      </button>
      {open && (
        <p className="pb-4 pr-6 text-[0.83rem] leading-relaxed text-gray-500">{a}</p>
      )}
    </div>
  );
}

const CHANNELS = [
  {
    icon: MessageCircle,
    color: "bg-green-50 text-green-600",
    title: "Live Chat",
    desc: "Chat with our support team in real time. Usually responds in under 2 minutes.",
    action: "Start Chat",
    href: "/chat",
  },
  {
    icon: Mail,
    color: "bg-orange-50 text-orange-500",
    title: "Email Support",
    desc: "Prefer email? Send us a message and we'll get back within 24 hours.",
    action: "Send Email",
    href: "mailto:support@vibechat.app",
  },
  {
    icon: BookOpen,
    color: "bg-blue-50 text-blue-500",
    title: "Help Center",
    desc: "Browse hundreds of step-by-step guides, tutorials, and troubleshooting articles.",
    action: "Browse Docs",
    href: "#",
  },
];

export default function SupportPage() {
  return (
    <PageTransition>
      <div className="flex min-h-screen flex-col bg-white">
        <Header />

        {/* Hero */}
        <section className="border-b border-gray-100 bg-linear-to-br from-blue-50 via-white to-green-50 px-6 py-16 text-center sm:py-20">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            How can we help?
          </h1>
          <p className="mx-auto max-w-lg text-base text-gray-500 sm:text-lg">
            Find answers fast, or reach out to our friendly support team — however works best for you.
          </p>
        </section>

        {/* Support channels */}
        <section className="mx-auto w-full max-w-4xl px-6 py-14">
          <div className="grid gap-5 sm:grid-cols-3">
            {CHANNELS.map(({ icon: Icon, color, title, desc, action, href }) => (
              <div
                key={title}
                className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${color}`}>
                  <Icon size={22} strokeWidth={1.8} />
                </div>
                <h3 className="mb-1.5 text-[0.95rem] font-bold text-gray-800">{title}</h3>
                <p className="mb-5 flex-1 text-[0.82rem] leading-relaxed text-gray-500">{desc}</p>
                <Link
                  href={href}
                  className="flex items-center gap-1.5 text-[0.82rem] font-semibold text-green-600 hover:text-green-700 hover:underline"
                >
                  {action} <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto w-full max-w-2xl px-6 pb-16">
          <h2 className="mb-6 text-center text-2xl font-extrabold text-gray-900">
            Frequently asked questions
          </h2>
          <div className="rounded-2xl border border-gray-100 bg-white px-6 shadow-sm">
            {FAQS.map((item) => (
              <FaqItem key={item.q} {...item} />
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="border-t border-gray-100 bg-gray-50 px-6 py-12 text-center">
          <p className="mb-1 text-sm font-semibold text-gray-700">Still can&apos;t find what you need?</p>
          <p className="mb-6 text-xs text-gray-400">Our average response time is under 2 hours.</p>
          <Link
            href="mailto:support@vibechat.app"
            className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-green-500 to-emerald-600 px-7 py-3 text-sm font-bold text-white shadow-[0_4px_18px_rgba(34,197,94,0.35)] transition-all hover:-translate-y-0.5"
          >
            <Mail size={15} /> Email Us
          </Link>
        </section>
      </div>
    </PageTransition>
  );
}
