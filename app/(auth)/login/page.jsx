"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import PageTransition from "../../components/PageTransition";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const validate = () => {
    const e = {};
    if (!email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email address";
    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "Password must be at least 6 characters";
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
    await new Promise((r) => setTimeout(r, 1200));
    localStorage.setItem("vibechat_auth", JSON.stringify({ email, loggedIn: true }));
    router.push("/chat");
  };

  const inputBorder = (field) => {
    if (errors[field]) return "border-red-400 ring-4 ring-red-50";
    if (field === "email" ? email : password) return "border-green-400 ring-4 ring-green-50";
    return "border-gray-200 focus-within:border-green-400 focus-within:ring-4 focus-within:ring-green-50";
  };

  return (
    <PageTransition className="flex min-h-screen w-full flex-col bg-white md:flex-row">

      {/* ── FORM — full width on mobile, 50% on md+ ── */}
      <div className="flex w-full items-center justify-center px-5 py-10 sm:px-8 sm:py-12 md:w-1/2 md:px-10 md:py-16">
        <div className="flex w-full max-w-sm flex-col sm:max-w-[400px]">

          {/* Logo */}
          <Link href="/" className="mb-7 flex items-center gap-2.5 sm:mb-8">
            <Image src="/logo.png" alt="VibeChat" width={36} height={36} className="h-9 w-9 rounded-xl object-contain" />
            <span className="text-xl font-extrabold tracking-tight">
              <span className="text-green-600">Vibe</span>
              <span className="text-orange-500">Chat</span>
            </span>
          </Link>

          {/* Heading */}
          <div className="mb-6">
            <h1 className="mb-1.5 text-[1.7rem] font-extrabold leading-tight tracking-tight text-gray-900 sm:text-[1.9rem]">
              Welcome back 👋
            </h1>
            <p className="text-sm text-gray-500 sm:text-[0.93rem]">
              Sign in to continue your conversations
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="mb-5 flex flex-col gap-4"
            style={shake ? { animation: "shakeAnim 0.5s cubic-bezier(0.36,0.07,0.19,0.97)" } : {}}
          >
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="login-email" className="text-[0.8rem] font-semibold text-gray-700">
                Email Address
              </label>
              <div className={`flex h-[48px] items-center gap-2.5 rounded-xl border bg-gray-50 px-3.5 transition-all duration-200 sm:h-[50px] ${inputBorder("email")}`}>
                <Mail size={16} className="shrink-0 text-gray-400" />
                <input
                  id="login-email" type="email" placeholder="you@example.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors(p => ({ ...p, email: "" })); }}
                  autoComplete="email"
                  className="flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400 sm:text-[0.93rem]"
                />
              </div>
              {errors.email && <span className="pl-0.5 text-[0.73rem] text-red-500">{errors.email}</span>}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="login-password" className="text-[0.8rem] font-semibold text-gray-700">Password</label>
                <a href="#" className="text-[0.75rem] font-medium text-orange-500 hover:text-orange-600">Forgot password?</a>
              </div>
              <div className={`flex h-[48px] items-center gap-2.5 rounded-xl border bg-gray-50 px-3.5 transition-all duration-200 sm:h-[50px] ${inputBorder("password")}`}>
                <Lock size={16} className="shrink-0 text-gray-400" />
                <input
                  id="login-password" type={showPassword ? "text" : "password"} placeholder="Enter your password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors(p => ({ ...p, password: "" })); }}
                  autoComplete="current-password"
                  className="flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400 sm:text-[0.93rem]"
                />
                <button type="button" onClick={() => setShowPassword(v => !v)}
                  className="flex items-center rounded-md p-1 text-gray-400 hover:text-orange-500" aria-label="Toggle password">
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && <span className="pl-0.5 text-[0.73rem] text-red-500">{errors.password}</span>}
            </div>

            {/* Submit */}
            <button
              id="login-submit" type="submit" disabled={loading}
              className="mt-1 flex h-[48px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-sm font-bold text-white shadow-[0_4px_18px_rgba(34,197,94,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(34,197,94,0.5)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 sm:h-[50px] sm:text-[0.97rem]"
            >
              {loading
                ? <><Loader2 size={17} className="animate-spin" /><span>Signing in…</span></>
                : <><span>Sign In</span><ArrowRight size={17} /></>
              }
            </button>
          </form>

          <p className="text-center text-[0.83rem] text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-semibold text-orange-500 hover:text-orange-600 hover:underline">
              Create one free
            </Link>
          </p>
        </div>
      </div>

      {/* ── IMAGE — hidden on mobile, shown md+ ── */}
      <div className="relative hidden flex-1 overflow-hidden md:block">
        {/* Mobile image banner shown on sm, hidden on md+ */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-black/5 to-black/65" />
        <Image
          src="/login.jpeg"
          alt="VibeChat — connect with people around the world"
          fill priority sizes="50vw"
          className="object-cover object-center"
        />
        <div className="absolute bottom-10 left-8 right-8 z-20">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/20 px-3.5 py-1.5 backdrop-blur-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
            <span className="text-xs font-semibold text-white">12,000+ online now</span>
          </div>
          <h2 className="mb-2 text-3xl font-extrabold leading-tight tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)] lg:text-[2rem]">
            Connect. Chat. Vibe.
          </h2>
          <p className="text-sm text-white/80 drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)] lg:text-[0.93rem]">
            Join thousands of people having real conversations every day.
          </p>
        </div>
      </div>

      {/* ── Mobile image banner — shows below form on small screens ── */}
      <div className="relative h-48 w-full overflow-hidden md:hidden sm:h-56">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/10 to-black/60" />
        <Image src="/login.jpeg" alt="VibeChat" fill sizes="100vw" className="object-cover object-center" />
        <div className="absolute bottom-5 left-5 right-5 z-20">
          <h2 className="text-xl font-extrabold text-white drop-shadow">Connect. Chat. Vibe.</h2>
          <p className="text-xs text-white/80">Join thousands having real conversations every day.</p>
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
