"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import PageTransition from "../../components/PageTransition";

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 814 1000" fill="currentColor">
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.3-164-39.3c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.8 135.4-317.7 268.5-317.7 99.8 0 184 65.6 245.9 65.6 59.2 0 152.4-70.6 270.1-70.6 40.3 0 177.1 4.5 272.4 148.8zm-185.4-95.5c53.7-62.3 90.5-148.4 90.5-234.4 0-11.9-.6-24.3-3.2-33.8-84.1 3.2-183.4 56.2-244.6 127.4-47.1 53.7-90.5 139.8-90.5 227.4 0 12.5 1.9 24.9 2.5 29.2 5.1.6 13.3 1.9 21.5 1.9 75.2 0 167.6-50.4 223.8-117.7z"/>
    </svg>
  );
}

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const update = (field) => (e) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "At least 6 characters";
    if (!form.confirm) e.confirm = "Please confirm your password";
    else if (form.confirm !== form.password) e.confirm = "Passwords don't match";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      setShake(true);
      setTimeout(() => setShake(false), 600);
      return;
    }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1300));
    localStorage.setItem("vibechat_auth", JSON.stringify({ email: form.email, loggedIn: true }));
    router.push("/chat");
  };

  const border = (field) => {
    if (errors[field]) return "border-red-400 ring-4 ring-red-50";
    if (form[field]) return "border-green-400 ring-4 ring-green-50";
    return "border-gray-200 focus-within:border-orange-400 focus-within:ring-4 focus-within:ring-orange-50";
  };

  const strength = (() => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "bg-red-400", "bg-amber-400", "bg-blue-400", "bg-green-500"][strength];
  const strengthText  = ["", "text-red-500", "text-amber-500", "text-blue-500", "text-green-600"][strength];

  return (
    /*
      Mobile  : single column — image banner on top, form below
      md+     : two columns — image left | form right
    */
    <PageTransition className="flex min-h-screen w-full flex-col bg-white md:flex-row">

      {/* ── IMAGE — top banner on mobile, left 50% on md+ ── */}
      <div className="relative h-44 w-full shrink-0 overflow-hidden sm:h-56 md:h-auto md:w-1/2">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-black/5 to-black/65" />
        <Image src="/signup.jpeg" alt="Join VibeChat" fill priority sizes="(max-width:768px) 100vw, 50vw"
          className="object-cover object-center" />
        <div className="absolute bottom-5 left-5 right-5 z-20 md:bottom-8 md:left-8 md:right-8">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm md:mb-3 md:px-3.5 md:py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
            <span className="text-[0.65rem] font-semibold text-white md:text-xs">12,000+ joined this week</span>
          </div>
          <h2 className="mb-1 text-xl font-extrabold leading-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] md:mb-2 md:text-[1.9rem]">
            Your vibe starts here.
          </h2>
          <p className="hidden text-[0.88rem] text-white/80 md:block">Create your account and join the conversation today.</p>
          {/* Social proof — desktop only */}
          <div className="mt-3 hidden items-center gap-2.5 md:flex">
            <div className="flex -space-x-1.5">
              {["#22c55e","#f97316","#3b82f6","#a855f7"].map((c, i) => (
                <div key={i} className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-[10px] font-bold text-white" style={{ background: c }}>
                  {["A","B","C","D"][i]}
                </div>
              ))}
            </div>
            <span className="text-xs text-white/70"><span className="font-bold text-white">12K+</span> members</span>
          </div>
        </div>
      </div>

      {/* ── FORM — full width mobile, right 50% on md+ ── */}
      <div className="flex flex-1 items-start justify-center overflow-y-auto px-5 py-8 sm:px-8 sm:py-10 md:items-center md:py-8">
        <div className="flex w-full max-w-sm flex-col sm:max-w-[400px]">

          {/* Logo */}
          <Link href="/" className="mb-4 flex items-center gap-2">
            <Image src="/logo.png" alt="VibeChat" width={32} height={32} className="h-8 w-8 rounded-xl object-contain" />
            <span className="text-lg font-extrabold tracking-tight">
              <span className="text-green-600">Vibe</span>
              <span className="text-orange-500">Chat</span>
            </span>
          </Link>

          {/* Heading */}
          <div className="mb-4">
            <h1 className="mb-0.5 text-[1.45rem] font-extrabold leading-tight tracking-tight text-gray-900 sm:text-[1.6rem]">
              Create your account 🚀
            </h1>
            <p className="text-[0.78rem] text-gray-500 sm:text-[0.82rem]">Free forever. No credit card needed.</p>
          </div>

          {/* Social buttons */}
          <div className="mb-3 flex gap-2">
            <button type="button"
              className="flex h-[42px] flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 text-[0.78rem] font-semibold text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-100 active:scale-[0.98] sm:h-[44px] sm:text-[0.82rem]">
              <GoogleIcon />Google
            </button>
            <button type="button"
              className="flex h-[42px] flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 text-[0.78rem] font-semibold text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-100 active:scale-[0.98] sm:h-[44px] sm:text-[0.82rem]">
              <AppleIcon />Apple
            </button>
          </div>

          {/* Divider */}
          <div className="mb-3 flex items-center gap-2.5">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-[0.65rem] font-medium text-gray-400 sm:text-[0.68rem]">or sign up with email</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-2.5"
            style={shake ? { animation: "shakeAnim 0.5s cubic-bezier(0.36,0.07,0.19,0.97)" } : {}}
          >
            {/* Name */}
            <div className="flex flex-col gap-0.5">
              <label htmlFor="su-name" className="text-[0.73rem] font-semibold text-gray-700 sm:text-[0.76rem]">Full Name</label>
              <div className={`flex h-[44px] items-center gap-2 rounded-xl border bg-gray-50 px-3 transition-all duration-200 ${border("name")}`}>
                <User size={15} className="shrink-0 text-gray-400" />
                <input id="su-name" type="text" placeholder="John Doe" value={form.name} onChange={update("name")} autoComplete="name"
                  className="flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400" />
                {form.name && !errors.name && <CheckCircle2 size={14} className="shrink-0 text-green-500" />}
              </div>
              {errors.name && <span className="pl-0.5 text-[0.68rem] text-red-500">{errors.name}</span>}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-0.5">
              <label htmlFor="su-email" className="text-[0.73rem] font-semibold text-gray-700 sm:text-[0.76rem]">Email Address</label>
              <div className={`flex h-[44px] items-center gap-2 rounded-xl border bg-gray-50 px-3 transition-all duration-200 ${border("email")}`}>
                <Mail size={15} className="shrink-0 text-gray-400" />
                <input id="su-email" type="email" placeholder="you@example.com" value={form.email} onChange={update("email")} autoComplete="email"
                  className="flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400" />
                {form.email && !errors.email && <CheckCircle2 size={14} className="shrink-0 text-green-500" />}
              </div>
              {errors.email && <span className="pl-0.5 text-[0.68rem] text-red-500">{errors.email}</span>}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-0.5">
              <label htmlFor="su-password" className="text-[0.73rem] font-semibold text-gray-700 sm:text-[0.76rem]">Password</label>
              <div className={`flex h-[44px] items-center gap-2 rounded-xl border bg-gray-50 px-3 transition-all duration-200 ${border("password")}`}>
                <Lock size={15} className="shrink-0 text-gray-400" />
                <input id="su-password" type={showPass ? "text" : "password"} placeholder="Min. 6 characters" value={form.password} onChange={update("password")} autoComplete="new-password"
                  className="flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400" />
                <button type="button" onClick={() => setShowPass(v => !v)} className="flex items-center rounded p-0.5 text-gray-400 hover:text-orange-500" aria-label="Toggle password">
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              {form.password && (
                <div className="flex items-center gap-2 pt-0.5">
                  <div className="flex flex-1 gap-1">
                    {[1,2,3,4].map(i => (
                      <div key={i} className={`h-[3px] flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColor : "bg-gray-200"}`} />
                    ))}
                  </div>
                  <span className={`text-[0.62rem] font-semibold ${strengthText}`}>{strengthLabel}</span>
                </div>
              )}
              {errors.password && <span className="pl-0.5 text-[0.68rem] text-red-500">{errors.password}</span>}
            </div>

            {/* Confirm */}
            <div className="flex flex-col gap-0.5">
              <label htmlFor="su-confirm" className="text-[0.73rem] font-semibold text-gray-700 sm:text-[0.76rem]">Confirm Password</label>
              <div className={`flex h-[44px] items-center gap-2 rounded-xl border bg-gray-50 px-3 transition-all duration-200 ${border("confirm")}`}>
                <Lock size={15} className="shrink-0 text-gray-400" />
                <input id="su-confirm" type={showConfirm ? "text" : "password"} placeholder="Re-enter your password" value={form.confirm} onChange={update("confirm")} autoComplete="new-password"
                  className="flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400" />
                <button type="button" onClick={() => setShowConfirm(v => !v)} className="flex items-center rounded p-0.5 text-gray-400 hover:text-orange-500" aria-label="Toggle confirm">
                  {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              {errors.confirm && <span className="pl-0.5 text-[0.68rem] text-red-500">{errors.confirm}</span>}
            </div>

            {/* Submit */}
            <button
              id="signup-submit" type="submit" disabled={loading}
              className="mt-1 flex h-[46px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 text-sm font-bold text-white shadow-[0_4px_16px_rgba(249,115,22,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_22px_rgba(249,115,22,0.5)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 sm:h-[48px] sm:text-[0.93rem]"
            >
              {loading
                ? <><Loader2 size={16} className="animate-spin" /><span>Creating account…</span></>
                : <><span>Create Account</span><ArrowRight size={16} /></>
              }
            </button>
          </form>

          <p className="mt-4 text-center text-[0.76rem] text-gray-500 sm:text-[0.8rem]">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-green-600 hover:text-green-700 hover:underline">Sign in</Link>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes shakeAnim {
          0%,100% { transform:translateX(0); }
          18%      { transform:translateX(-8px); }
          36%      { transform:translateX(8px); }
          54%      { transform:translateX(-5px); }
          72%      { transform:translateX(5px); }
          90%      { transform:translateX(-2px); }
        }
      `}</style>
    </PageTransition>
  );
}
