"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "hero-theme";

const CONTACT_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/kenneth092003",
    description: "Browse my projects and code.",
    icon: "github",
  },
  {
    label: "Gmail",
    href: "mailto:kennethgeverolapasaje@gmail.com",
    description: "Send me a message directly.",
    icon: "mail",
  },
];

function getThemeSnapshot() {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = window.localStorage.getItem(STORAGE_KEY);
  return savedTheme === "dark" ? "dark" : "light";
}

function subscribeTheme(callback) {
  window.addEventListener("storage", callback);
  window.addEventListener("hero-theme-change", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("hero-theme-change", callback);
  };
}

function ContactIcon({ name }) {
  switch (name) {
    case "github":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2.5a9.5 9.5 0 0 0-3 18.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.2-3.4-1.2-.5-1.1-1.2-1.4-1.2-1.4-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.4-.6 1.4-.6.2-.8.6-1.2 1-1.4-2.2-.2-4.5-1.1-4.5-5a4 4 0 0 1 1-2.8 3.7 3.7 0 0 1 .1-2.7s.8-.2 2.8 1a9.8 9.8 0 0 1 5 0c2-1.2 2.8-1 2.8-1a3.7 3.7 0 0 1 .1 2.7 4 4 0 0 1 1 2.8c0 3.9-2.3 4.8-4.5 5 .6.4 1.2 1.2 1.2 2.5v3.7c0 .3.2.6.7.5A9.5 9.5 0 0 0 12 2.5Z" />
        </svg>
      );
    case "mail":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
          <path d="M5.5 7.5 12 12.5l6.5-5" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Contact() {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, () => "light");
  const isDark = theme === "dark";
  const sectionClass = isDark ? "bg-[#07111f] text-white" : "bg-slate-50 text-slate-950";
  const cardClass = isDark
    ? "border-white/10 bg-white/5 shadow-[0_30px_80px_rgba(7,17,31,0.28)]"
    : "border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.08)]";
  const softCardClass = isDark
    ? "border-white/10 bg-white/5"
    : "border-slate-200 bg-slate-50";
  const mutedTextClass = isDark ? "text-white/72" : "text-slate-600";
  const subTextClass = isDark ? "text-white/60" : "text-slate-500";
  const labelClass = isDark ? "text-white/55" : "text-slate-400";

  return (
    <section id="contact" className={`relative overflow-hidden px-6 py-24 sm:px-8 lg:px-10 ${sectionClass}`}>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className={`absolute -top-24 left-[-5rem] h-72 w-72 rounded-full blur-3xl ${isDark ? "bg-cyan-500/10" : "bg-cyan-400/20"}`} />
        <div className={`absolute bottom-[-6rem] right-[-4rem] h-80 w-80 rounded-full blur-3xl ${isDark ? "bg-blue-500/10" : "bg-indigo-200/70"}`} />
      </div>

      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="flex flex-col justify-center">
            <p className={`text-xs font-semibold uppercase tracking-[0.32em] ${labelClass}`}>Contact</p>
            <h2 className={`mt-4 max-w-2xl text-balance text-4xl font-semibold tracking-[-0.07em] sm:text-5xl ${isDark ? "text-white" : "text-slate-950"}`}>
              Let&apos;s make your next idea look sharp and feel easy to use.
            </h2>
            <p className={`mt-6 max-w-2xl text-base leading-8 ${mutedTextClass}`}>
              If you want to reach me fast, use Gmail. If you want to check my work first, GitHub is ready.
              I&apos;m open for collaboration, freelance builds, and portfolio improvements.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className={`rounded-[1.6rem] border p-5 backdrop-blur-sm ${softCardClass}`}>
                <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${labelClass}`}>Best for</p>
                <p className={`mt-3 text-sm leading-6 ${subTextClass}`}>
                  Portfolios, landing pages, and clean personal websites.
                </p>
              </div>
              <div className={`rounded-[1.6rem] border p-5 backdrop-blur-sm ${softCardClass}`}>
                <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${labelClass}`}>Response style</p>
                <p className={`mt-3 text-sm leading-6 ${subTextClass}`}>
                  Clear, direct, and focused on getting the work done smoothly.
                </p>
              </div>
            </div>
          </div>

          <div className={`relative rounded-[2rem] border p-5 backdrop-blur-md sm:p-6 ${cardClass}`}>
            <div className={`rounded-[1.6rem] border border-dashed p-5 sm:p-6 ${isDark ? "border-white/10" : "border-slate-200"}`}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${labelClass}`}>Quick links</p>
                  <p className={`mt-2 text-sm leading-6 ${subTextClass}`}>
                    Choose the channel that fits your message best.
                  </p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-full border ${isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-slate-50"}`}>
                  <span className={`text-lg font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>KP</span>
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                {CONTACT_LINKS.map((item) => {
                  const isEmail = item.href.startsWith("mailto:");
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={isEmail ? undefined : "_blank"}
                      rel={isEmail ? undefined : "noreferrer"}
                      className={`group flex items-center gap-4 rounded-[1.35rem] border px-4 py-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
                        isDark
                          ? "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${isDark ? "bg-white/10 text-white" : "bg-slate-100 text-slate-900"}`}>
                        <span className="h-5 w-5">
                          <ContactIcon name={item.icon} />
                        </span>
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className={`block text-sm font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{item.label}</span>
                        <span className={`mt-1 block text-sm ${subTextClass}`}>{item.description}</span>
                      </span>

                      <span className={`text-lg transition-transform duration-300 group-hover:translate-x-0.5 ${isDark ? "text-white/70" : "text-slate-400"}`} aria-hidden="true">
                        -&gt;
                      </span>
                    </a>
                  );
                })}
              </div>

              <div className={`mt-5 rounded-[1.2rem] border px-4 py-4 text-sm leading-6 ${isDark ? "border-white/10 bg-black/10 text-white/72" : "border-slate-200 bg-slate-50 text-slate-600"}`}>
                Want a quick reply? Email me at{" "}
                <a className="font-semibold underline decoration-current underline-offset-4" href="mailto:kennethgeverolapasaje@gmail.com">
                  kennethgeverolapasaje@gmail.com
                </a>
                .
              </div>
            </div>
          </div>
        </div>

        <footer className={`mt-8 flex flex-col gap-3 px-2 py-2 text-sm sm:flex-row sm:items-center sm:justify-between ${isDark ? "text-white/50" : "text-slate-500"}`}>
          <p>Built with Next.js, Tailwind CSS, and a little taste.</p>
          <p>(c) 2026 Kenneth Pasaje</p>
        </footer>
      </div>
    </section>
  );
}
