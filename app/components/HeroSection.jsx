import Image from "next/image";
import Link from "next/link";
import { Smartphone, Monitor, Globe, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative flex flex-1 items-stretch overflow-hidden bg-white">

      {/* ── LEFT IMAGE — hidden on mobile/tablet, visible lg+ ── */}
      <div className="relative hidden shrink-0 basis-[26%] lg:block xl:basis-[28%]">
        <div className="absolute inset-0 z-10 bg-linear-to-r from-transparent via-white/20 to-white" />
        <Image
          src="/left.jpeg"
          alt="People connecting on VibeChat"
          fill priority sizes="28vw"
          className="object-cover object-center"
        />
      </div>

      {/* ── CENTRE CONTENT ── */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 py-10 text-center sm:px-8 sm:py-14 md:py-16">

        <h1 className="mb-4 max-w-xs text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:max-w-lg sm:text-4xl md:text-5xl lg:text-6xl">
          Chat{" "}
          <span className="bg-linear-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
            Smarter.
          </span>
          <br />
          Connect{" "}
          <span className="bg-linear-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
            Better.
          </span>
        </h1>

        <p className="mb-7 max-w-xs text-sm leading-relaxed text-gray-500 sm:mb-8 sm:max-w-sm sm:text-base md:text-lg">
          Seamless, secure, and instant communication with friends, family, and teams — all in one beautiful place.
        </p>

        {/* CTA button */}
        <Link
          href="/login"
          className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-orange-500 to-orange-400 px-8 py-3.5 text-sm font-bold text-white shadow-[0_4px_18px_rgba(249,115,22,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(249,115,22,0.55)] sm:px-9 sm:py-4 sm:text-base"
        >
          Start Chatting Free <ArrowRight size={16} />
        </Link>

        {/* Platform row */}
        <div className="mt-8 flex items-center justify-center gap-6 sm:gap-8 md:mt-10">
          {[
            { icon: Smartphone, label: "iOS" },
            { icon: Globe,      label: "Web" },
            { icon: Monitor,    label: "Desktop" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <Icon className="h-6 w-6 text-gray-300 sm:h-7 sm:w-7" strokeWidth={1.5} />
              <span className="text-[0.65rem] font-medium text-gray-400 sm:text-[0.7rem]">{label}</span>
            </div>
          ))}
        </div>

        {/* Mobile social proof */}
        <div className="mt-6 flex items-center justify-center gap-2 lg:hidden">
          <div className="flex -space-x-1.5">
            {["#22c55e","#f97316","#3b82f6","#a855f7"].map((c, i) => (
              <div key={i} className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-[9px] font-bold text-white" style={{ background: c }}>
                {["A","B","C","D"][i]}
              </div>
            ))}
          </div>
          <span className="text-xs text-gray-500"><span className="font-semibold text-gray-700">12K+</span> members joined</span>
        </div>
      </div>

      {/* ── RIGHT IMAGE — hidden on mobile/tablet, visible lg+ ── */}
      <div className="relative hidden shrink-0 basis-[26%] lg:block xl:basis-[28%]">
        <div className="absolute inset-0 z-10 bg-linear-to-l from-transparent via-white/20 to-white" />
        <Image
          src="/right.jpeg"
          alt="VibeChat — stay connected everywhere"
          fill priority sizes="28vw"
          className="object-cover object-center"
        />
      </div>

    </section>
  );
}
