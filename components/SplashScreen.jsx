"use client";

import { useEffect, useState } from "react";

const LINES = [
  { text: "PS C:\\Users\\Kenneth> cd .\\KennethPortfolio", delay: 0 },
  { text: "PS C:\\Users\\Kenneth\\KennethPortfolio> npm run dev", delay: 700 },
  { text: "Launching portfolio animation...", delay: 1400 },
  { text: "Kenneth Pasaje | blue and white motion-led", delay: 2100 },
];

const SPLASH_DURATION_MS = 3200;
const EXIT_DELAY_MS = 320;
const SPLASH_FINISHED_EVENT = "splash-finished";

export default function SplashScreen() {
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const timers = LINES.map((line, index) =>
      window.setTimeout(() => {
        setVisibleCount(index + 1);
      }, line.delay),
    );

    const closeTimeoutId = window.setTimeout(() => {
      setIsClosing(true);

      window.setTimeout(() => {
        window.document.documentElement.dataset.splashFinished = "true";
        window.dispatchEvent(new Event(SPLASH_FINISHED_EVENT));
        setIsMounted(false);
      }, EXIT_DELAY_MS);
    }, SPLASH_DURATION_MS);

    return () => {
      timers.forEach((timerId) => window.clearTimeout(timerId));
      window.clearTimeout(closeTimeoutId);
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className={`splash-screen pointer-events-auto fixed inset-0 z-[9999] overflow-hidden ${
        isClosing ? "is-closing" : ""
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(96,165,250,0.24),transparent_30%),linear-gradient(180deg,#eff6ff_0%,#dbeafe_45%,#ffffff_100%)]" />
      <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(255,255,255,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.55)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="absolute inset-0 splash-blue-noise" />

      <div className="relative flex h-full w-full items-center justify-center px-4 py-10 sm:px-8 lg:px-10">
        <div className="splash-terminal-light relative w-[min(94vw,880px)] overflow-hidden rounded-[30px] border border-blue-100 bg-white/92 shadow-[0_30px_100px_rgba(37,99,235,0.16)] backdrop-blur-2xl">
          <div className="flex items-center justify-between border-b border-blue-100 bg-gradient-to-r from-blue-50 to-white px-4 py-3 sm:px-6">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-slate-500">
              KennethPortfolio
            </div>
          </div>

          <div className="grid gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-5">
              <div className="space-y-3 font-mono text-[0.82rem] leading-6 text-slate-800 sm:text-[0.95rem]">
                {LINES.map((line, index) => (
                  <p
                    key={line.text}
                    className={`terminal-line terminal-line-light ${
                      index < visibleCount ? "terminal-line-visible" : "terminal-line-hidden"
                    }`}
                  >
                    <span className="text-blue-700">{"PS "}</span>
                    {line.text.replace(/^PS\s/, "")}
                    {index === visibleCount - 1 ? (
                      <span className="terminal-cursor ml-1 inline-block align-middle text-blue-600">
                        _
                      </span>
                    ) : null}
                  </p>
                ))}
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="splash-terminal-orb absolute inset-6 rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(59,130,246,0.18),rgba(255,255,255,0.9)_36%,rgba(191,219,254,0.9)_60%,rgba(255,255,255,0.18)_74%,transparent_80%)] blur-[1px]" />
              <div className="splash-terminal-ring absolute inset-0 rounded-full border border-blue-100" />
              <div className="splash-terminal-ring splash-terminal-ring-two absolute inset-8 rounded-full border border-cyan-200/70" />
              <div className="splash-terminal-ring splash-terminal-ring-three absolute inset-16 rounded-full border border-white" />

              <div className="relative z-10 flex flex-col items-center text-center">
                <h1 className="text-[clamp(2.9rem,9vw,6.5rem)] font-black uppercase leading-[0.9] tracking-[-0.09em] text-slate-950">
                  Kenneth
                  <span className="block text-blue-600">Pasaje</span>
                </h1>
                <p className="mt-4 max-w-xs text-sm leading-6 text-slate-600">
                  Clean blue-and-white terminal intro with a subtle motion loop.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
