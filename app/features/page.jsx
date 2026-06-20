import Link from "next/link";
import {
  Zap, Shield, Users, Bell, Smartphone, Globe,
  Search, Paperclip, Video, Lock, RefreshCw, Heart,
} from "lucide-react";
import Header from "../components/Header";
import PageTransition from "../components/PageTransition";

const FEATURES = [
  { icon: Zap,        color: "bg-orange-50 text-orange-500",  title: "Lightning Fast",       desc: "Messages delivered in under 100ms. Real-time typing indicators so you always know what's coming next." },
  { icon: Shield,     color: "bg-green-50 text-green-600",    title: "End-to-End Encrypted", desc: "Every message, photo, and file is secured with AES-256 encryption. Your conversations stay private." },
  { icon: Users,      color: "bg-blue-50 text-blue-500",      title: "Group Chats",          desc: "Create groups of up to 1,000 members. Assign admins, pin messages, and keep the conversation organized." },
  { icon: Video,      color: "bg-purple-50 text-purple-500",  title: "HD Video & Voice",     desc: "Crystal-clear video calls with up to 50 participants. No downloads, no plugins — works in the browser." },
  { icon: Paperclip,  color: "bg-rose-50 text-rose-500",      title: "File Sharing",         desc: "Share files up to 2 GB instantly. Preview documents, images, and videos without leaving the chat." },
  { icon: Bell,       color: "bg-amber-50 text-amber-500",    title: "Smart Notifications",  desc: "AI-powered notification filtering. Only get pinged when it actually matters to you." },
  { icon: Search,     color: "bg-teal-50 text-teal-600",      title: "Powerful Search",      desc: "Find any message, file, or link across all your conversations in seconds with full-text search." },
  { icon: Smartphone, color: "bg-indigo-50 text-indigo-500",  title: "Works Everywhere",     desc: "iOS, Android, Web, and Desktop. Your chats stay perfectly synced across every device you own." },
  { icon: Lock,       color: "bg-gray-50 text-gray-600",      title: "Disappearing Messages",desc: "Set messages to auto-delete after 24 hours, 7 days, or a custom period. You stay in control." },
  { icon: RefreshCw,  color: "bg-cyan-50 text-cyan-600",      title: "Offline Mode",         desc: "Read and reply even without internet. Messages queue up and send automatically when you reconnect." },
  { icon: Globe,      color: "bg-emerald-50 text-emerald-600",title: "100+ Languages",       desc: "Built-in auto-translation so you can chat with anyone in the world in your own language." },
  { icon: Heart,      color: "bg-pink-50 text-pink-500",      title: "Reactions & Stickers", desc: "Express yourself with 1,000+ stickers, GIFs, and custom emoji reactions. Chat should be fun." },
];

export default function FeaturesPage() {
  return (
    <PageTransition>
      <div className="flex min-h-screen flex-col bg-white">
        <Header />

        {/* Hero */}
        <section className="border-b border-gray-100 bg-linear-to-br from-green-50 via-white to-orange-50 px-6 py-16 text-center sm:py-20">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Chat smarter with<br />
            <span className="bg-linear-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
              powerful features
            </span>
          </h1>
          <p className="mx-auto max-w-xl text-base text-gray-500 sm:text-lg">
            Everything you need to stay connected — built for speed, privacy, and joy.
          </p>
        </section>

        {/* Feature grid */}
        <section className="mx-auto w-full max-w-6xl px-6 py-14 sm:py-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, color, title, desc }) => (
              <div
                key={title}
                className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${color}`}>
                  <Icon size={22} strokeWidth={1.8} />
                </div>
                <h3 className="mb-1.5 text-[0.95rem] font-bold text-gray-800">{title}</h3>
                <p className="text-[0.83rem] leading-relaxed text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-gray-100 bg-gray-50 px-6 py-14 text-center">
          <h2 className="mb-3 text-2xl font-extrabold text-gray-900 sm:text-3xl">Ready to experience it?</h2>
          <p className="mb-7 text-sm text-gray-500">Free to start. No credit card required.</p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-orange-500 to-orange-400 px-8 py-3.5 text-sm font-bold text-white shadow-[0_4px_18px_rgba(249,115,22,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(249,115,22,0.5)]"
          >
            Start Chatting Free →
          </Link>
        </section>
      </div>
    </PageTransition>
  );
}
