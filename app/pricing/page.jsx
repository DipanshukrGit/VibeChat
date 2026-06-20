import Link from "next/link";
import { Check, Zap } from "lucide-react";
import Header from "../components/Header";
import PageTransition from "../components/PageTransition";

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Perfect for personal use and small groups.",
    color: "border-gray-200",
    badge: null,
    cta: { label: "Get Started Free", href: "/login", style: "border border-gray-300 text-gray-700 hover:bg-gray-50" },
    features: [
      "Up to 5 active chats",
      "500 MB file storage",
      "Messages up to 10 MB",
      "iOS, Web & Desktop apps",
      "Standard encryption",
      "Community support",
    ],
  },
  {
    name: "Pro",
    price: "$8",
    period: "per month",
    desc: "For power users who want more storage and control.",
    color: "border-green-500 ring-2 ring-green-200",
    badge: "Most Popular",
    cta: { label: "Start Pro Free", href: "/login", style: "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-[0_4px_18px_rgba(34,197,94,0.35)] hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(34,197,94,0.5)]" },
    features: [
      "Unlimited active chats",
      "50 GB file storage",
      "Messages up to 2 GB",
      "HD video calls (1-on-1)",
      "End-to-end encryption",
      "Disappearing messages",
      "Priority email support",
      "Custom emoji & stickers",
    ],
  },
  {
    name: "Team",
    price: "$20",
    period: "per month",
    desc: "Built for teams that need collaboration at scale.",
    color: "border-orange-300",
    badge: null,
    cta: { label: "Start Team Trial", href: "/login", style: "bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-[0_4px_18px_rgba(249,115,22,0.35)] hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(249,115,22,0.5)]" },
    features: [
      "Everything in Pro",
      "Unlimited storage",
      "Groups up to 1,000 members",
      "HD video calls (50 participants)",
      "Admin dashboard",
      "Message search history",
      "Custom branding",
      "24/7 priority support",
      "API & webhook access",
    ],
  },
];

export default function PricingPage() {
  return (
    <PageTransition>
      <div className="flex min-h-screen flex-col bg-white">
        <Header />

        {/* Hero */}
        <section className="border-b border-gray-100 bg-linear-to-br from-orange-50 via-white to-green-50 px-6 py-16 text-center sm:py-20">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Plans for every need
          </h1>
          <p className="mx-auto max-w-lg text-base text-gray-500 sm:text-lg">
            Start free. Upgrade when you&apos;re ready. Cancel any time — no questions asked.
          </p>
        </section>

        {/* Plans */}
        <section className="mx-auto w-full max-w-5xl px-6 py-14 sm:py-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${plan.color}`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-green-500 px-4 py-1 text-[0.7rem] font-bold text-white shadow-sm">
                    {plan.badge}
                  </span>
                )}

                <div className="mb-5">
                  <h2 className="mb-1 text-lg font-extrabold text-gray-900">{plan.name}</h2>
                  <p className="text-[0.82rem] text-gray-500">{plan.desc}</p>
                </div>

                <div className="mb-6 flex items-end gap-1">
                  <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                  <span className="mb-1 text-sm text-gray-400">/{plan.period}</span>
                </div>

                <Link
                  href={plan.cta.href}
                  className={`mb-7 flex items-center justify-center rounded-full py-2.5 text-sm font-bold transition-all ${plan.cta.style}`}
                >
                  {plan.cta.label}
                </Link>

                <ul className="flex flex-col gap-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[0.83rem] text-gray-600">
                      <Check size={15} className="mt-0.5 shrink-0 text-green-500" strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-xs text-gray-400">
            All plans include a 14-day free trial. No credit card required to start.
          </p>
        </section>

        {/* FAQ strip */}
        <section className="border-t border-gray-100 bg-gray-50 px-6 py-12 text-center">
          <p className="text-sm text-gray-500">
            Have questions?{" "}
            <Link href="/support" className="font-semibold text-green-600 hover:underline">
              Visit our Support page →
            </Link>
          </p>
        </section>
      </div>
    </PageTransition>
  );
}
