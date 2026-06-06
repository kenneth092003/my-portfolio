"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "hero-theme";

const socials = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Email", href: "mailto:your@email.com" },
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

export default function Contact() {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, () => "light");
  const isDark = theme === "dark";
  const sectionClass = isDark ? "bg-[#07111f] text-white" : "bg-white text-slate-950";
  const panelClass = isDark
    ? "border-white/10 bg-white/5 shadow-[0_24px_60px_rgba(7,17,31,0.18)]"
    : "border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)]";
  const innerPanelClass = isDark
    ? "border-white/10 bg-white/5 shadow-[0_16px_35px_rgba(7,17,31,0.16)]"
    : "border-slate-200 bg-slate-50 shadow-[0_16px_35px_rgba(15,23,42,0.08)]";
  const mutedTextClass = isDark ? "text-white/72" : "text-slate-600";
  const subTextClass = isDark ? "text-white/60" : "text-slate-500";
  const innerHeadingClass = isDark ? "text-white/70" : "text-slate-400";

  return (
    <section id="contact" className={`relative px-6 py-24 sm:px-8 lg:px-10 ${sectionClass}`}>
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 md:grid md:grid-cols-[0.92fr_1.08fr] md:items-end">
          <div className="max-w-2xl">
            <p className={`text-sm font-semibold uppercase tracking-[0.3em] ${isDark ? "text-white/50" : "text-slate-400"}`}>
              Contact
            </p>
            <h2 className={`mt-2 text-balance text-3xl font-semibold tracking-[-0.06em] sm:text-4xl ${isDark ? "text-white" : "text-slate-950"}`}>
              Let&apos;s build something clean, responsive, and easy to maintain.
            </h2>
            <p className={`mt-5 max-w-2xl text-base leading-8 ${mutedTextClass}`}>
              Open for freelance work, collaborations, and small web projects. If you have a concept in mind,
              I can help turn it into a polished portfolio, landing page, or web system.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className={`rounded-[1.4rem] border p-4 ${panelClass}`}>
                <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${isDark ? "text-white/55" : "text-slate-400"}`}>
                  Best for
                </p>
                <p className={`mt-2 text-sm leading-6 ${subTextClass}`}>
                  Portfolios, landing pages, product showcases, and simple client websites.
                </p>
              </div>
              <div className={`rounded-[1.4rem] border p-4 ${panelClass}`}>
                <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${isDark ? "text-white/55" : "text-slate-400"}`}>
                  Typical pace
                </p>
                <p className={`mt-2 text-sm leading-6 ${subTextClass}`}>
                  Fast communication, clear scope, and a process that stays lightweight.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className={`rounded-[1.85rem] border p-5 backdrop-blur-md ${panelClass}`}>
              <div className={`rounded-[1.5rem] border p-5 ${innerPanelClass}`}>
                <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${innerHeadingClass}`}>
                  Let&apos;s talk
                </p>
                <p className={`mt-2 text-sm leading-6 ${subTextClass}`}>
                  If your site needs better flow, stronger visuals, or a fresher direction, I&apos;m open.
                </p>
              </div>

              <a
                href="mailto:your@email.com"
                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-blue-600 px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-blue-700"
              >
                your@email.com
              </a>

              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.label === "Email" ? undefined : "_blank"}
                    rel={social.label === "Email" ? undefined : "noreferrer"}
                    className="flex items-center justify-between rounded-[1.25rem] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50"
                  >
                    <span>{social.label}</span>
                    <span aria-hidden="true">-&gt;</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <footer className="flex flex-col gap-3 px-2 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Built with Next.js, Tailwind CSS, and a little taste.</p>
          <p>(c) 2026 Kenneth Pasaje</p>
        </footer>
      </div>
    </section>
  );
}
