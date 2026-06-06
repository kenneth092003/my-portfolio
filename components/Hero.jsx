"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";

const STORAGE_KEY = "hero-theme";
const SPLASH_FINISHED_EVENT = "splash-finished";
const DARK_SHADER_URL =
  "https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1&cAzimuthAngle=180&cDistance=2.8&cPolarAngle=80&cameraZoom=9.1&color1=%23606080&color2=%238d7dca&color3=%23212121&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&gizmoHelper=hide&grain=on&lightType=3d&pixelDensity=1&positionX=0&positionY=0&positionZ=0&range=disabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=50&rotationY=0&rotationZ=-60&shader=defaults&type=waterPlane&uAmplitude=0&uDensity=1.5&uFrequency=0&uSpeed=0.3&uStrength=1.5&uTime=8&wireframe=false";
const LIGHT_SHADER_URL =
  "https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1.2&cAzimuthAngle=180&cDistance=2.9&cPolarAngle=120&cameraZoom=1&color1=%23ebedff&color2=%23f3f2f8&color3=%23dbf8ff&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&gizmoHelper=hide&grain=off&lightType=3d&pixelDensity=1&positionX=0&positionY=1.8&positionZ=0&range=disabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=-90&shader=defaults&type=waterPlane&uAmplitude=0&uDensity=1&uFrequency=5.5&uSpeed=0.3&uStrength=3&uTime=0.2&wireframe=false";

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

export default function Hero() {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, () => "light");
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, theme);
    window.document.documentElement.style.colorScheme = theme;
    window.document.documentElement.dataset.theme = theme;
    window.dispatchEvent(new Event("hero-theme-change"));
  }, [theme]);

  useEffect(() => {
    let frameId = 0;

    const startWelcomeAnimation = () => {
      frameId = window.requestAnimationFrame(() => {
        setIsLoaded(true);
      });
    };

    if (window.document.documentElement.dataset.splashFinished === "true") {
      startWelcomeAnimation();
      return () => {
        window.cancelAnimationFrame(frameId);
      };
    }

    const handleSplashFinished = () => {
      window.document.documentElement.dataset.splashFinished = "true";
      startWelcomeAnimation();
    };

    window.addEventListener(SPLASH_FINISHED_EVENT, handleSplashFinished);

    return () => {
      window.removeEventListener(SPLASH_FINISHED_EVENT, handleSplashFinished);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    const aboutSection = window.document.getElementById("about");

    if (!aboutSection) {
      return undefined;
    }

    const updateAboutState = () => {
      const rect = aboutSection.getBoundingClientRect();
      const triggerLine = 96;
      const isVisible = rect.top <= triggerLine && rect.bottom > triggerLine;
      setIsAboutVisible(isVisible);
    };

    updateAboutState();
    window.addEventListener("scroll", updateAboutState, { passive: true });
    window.addEventListener("resize", updateAboutState);

    return () => {
      window.removeEventListener("scroll", updateAboutState);
      window.removeEventListener("resize", updateAboutState);
    };
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateNavVisibility = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 24) {
        setIsNavVisible(true);
        lastScrollY = currentScrollY;
        return;
      }

      if (currentScrollY > lastScrollY + 8) {
        setIsNavVisible(false);
      } else if (currentScrollY < lastScrollY - 8) {
        setIsNavVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    updateNavVisibility();
    window.addEventListener("scroll", updateNavVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateNavVisibility);
    };
  }, []);

  const isDark = theme === "dark";
  const headerTextClass = isAboutVisible ? "text-white" : isDark ? "text-white" : "text-slate-950";
  const navPrimaryClass = isDark ? "text-white" : "text-slate-950";
  const navSecondaryClass = isDark ? "text-white/70" : "text-slate-600";
  const navVisibleClass = isNavVisible ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0 pointer-events-none";
  const revealClass = isLoaded ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-6 blur-sm";
  const nameRevealClass = `${isLoaded ? "hero-text-reveal" : ""} ${revealClass}`;
  const nameClass = isDark
    ? "hero-text-shimmer ml-3 inline-block text-white"
    : "ml-3 inline-block text-slate-950 drop-shadow-[0_1px_0_rgba(255,255,255,0.55)]";

  return (
    <section
      id="top"
      className={`relative min-h-screen overflow-hidden transition-colors duration-500 scroll-mt-24 ${
        isDark ? "bg-[#0b0f19] text-white" : "bg-white text-slate-950"
      }`}
    >
      <div className={`absolute inset-x-0 top-0 h-3 ${isDark ? "bg-blue-500" : "bg-blue-600"}`} />

      {isDark ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <ShaderGradientCanvas
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            pixelDensity={1}
            fov={45}
            pointerEvents="none"
          >
            <ShaderGradient control="query" urlString={DARK_SHADER_URL} />
          </ShaderGradientCanvas>
          <div className="absolute inset-0 bg-black/25" />
        </div>
      ) : (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <ShaderGradientCanvas
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            pixelDensity={1}
            fov={45}
            pointerEvents="none"
          >
            <ShaderGradient control="query" urlString={LIGHT_SHADER_URL} />
          </ShaderGradientCanvas>
          <div className="absolute inset-0 bg-white/10" />
        </div>
      )}

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-4 py-4 sm:px-8 lg:px-10">
        <header
          className={`fixed left-1/2 top-6 z-50 grid w-[calc(100%-2rem)] max-w-[1440px] -translate-x-1/2 grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 transition-all duration-300 sm:w-[calc(100%-4rem)] sm:px-0 lg:w-[calc(100%-5rem)] ${headerTextClass} ${navVisibleClass}`}
        >
          <a
            href="#top"
            className={`justify-self-start text-sm font-black tracking-[0.08em] uppercase ${headerTextClass}`}
          >
            Kenneth Pasaje
          </a>

          <nav
            className={`hidden items-center gap-4 rounded-full px-4 py-2 shadow-[0_8px_20px_rgba(15,23,42,0.06)] md:flex ${
              isDark ? "border border-white/10 bg-white/5" : "border border-white/40 bg-white/65 backdrop-blur-xl"
            }`}
          >
            <a
              href="#top"
              className={`text-[11px] font-semibold uppercase tracking-[0.18em] transition hover:text-blue-600 ${navPrimaryClass}`}
            >
              Home
            </a>
            <a
              href="#about"
              className={`text-[11px] font-semibold uppercase tracking-[0.18em] transition hover:text-blue-600 ${navSecondaryClass}`}
            >
              About me
            </a>
            <a
              href="#certificate"
              className={`text-[11px] font-semibold uppercase tracking-[0.18em] transition hover:text-blue-600 ${navSecondaryClass}`}
            >
              Certificates
            </a>
            <a
              href="#projects"
              className={`text-[11px] font-semibold uppercase tracking-[0.18em] transition hover:text-blue-600 ${navSecondaryClass}`}
            >
              Projects
            </a>
            <a
              href="#contact"
              className={`text-[11px] font-semibold uppercase tracking-[0.18em] transition hover:text-blue-600 ${navSecondaryClass}`}
            >
              Contact
            </a>
          </nav>

          <button
            type="button"
            onClick={() => {
              const nextTheme = isDark ? "light" : "dark";
              window.localStorage.setItem(STORAGE_KEY, nextTheme);
              window.dispatchEvent(new Event("hero-theme-change"));
            }}
            className={`justify-self-end inline-flex h-9 w-9 items-center justify-center rounded-full shadow-[0_8px_18px_rgba(15,23,42,0.06)] transition ${
              isDark ? "border border-white/10 bg-white/5 text-white" : "border border-white/40 bg-white/70 text-slate-700 backdrop-blur-xl"
            }`}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
          >
            <span className="h-4 w-4" aria-hidden="true">
              {isDark ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="4.5" />
                  <path d="M12 2.75v2.25M12 19v2.25M4.75 12H7M17 12h2.25M5.8 5.8l1.6 1.6M16.6 16.6l1.6 1.6M18.2 5.8l-1.6 1.6M7.4 16.6l-1.6 1.6" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.6 3.5a8.5 8.5 0 1 0 4.9 15.5 7.7 7.7 0 0 1-4.9-15.5Z" />
                </svg>
              )}
            </span>
          </button>
        </header>

        <nav
          className={`fixed left-1/2 top-[4.25rem] z-50 mt-0 flex w-[calc(100%-1rem)] -translate-x-1/2 items-center justify-start gap-3 overflow-x-auto whitespace-nowrap rounded-full px-3 py-2 shadow-[0_8px_20px_rgba(15,23,42,0.06)] transition-all duration-300 md:hidden sm:top-[4.75rem] sm:w-[calc(100%-4rem)] sm:justify-center ${navVisibleClass} ${
            isDark ? "border border-white/10 bg-white/5" : "border border-white/40 bg-white/65 backdrop-blur-xl"
          }`}
        >
          <a
            href="#top"
            className={`text-[11px] font-semibold uppercase tracking-[0.18em] transition hover:text-blue-600 ${navPrimaryClass}`}
          >
            Home
          </a>
          <a
            href="#about"
            className={`text-[11px] font-semibold uppercase tracking-[0.18em] transition hover:text-blue-600 ${navSecondaryClass}`}
          >
            About me
          </a>
          <a
            href="#certificate"
            className={`text-[11px] font-semibold uppercase tracking-[0.18em] transition hover:text-blue-600 ${navSecondaryClass}`}
          >
            Certificates
          </a>
          <a
            href="#projects"
            className={`text-[11px] font-semibold uppercase tracking-[0.18em] transition hover:text-blue-600 ${navSecondaryClass}`}
          >
            Projects
          </a>
          <a
            href="#contact"
            className={`text-[11px] font-semibold uppercase tracking-[0.18em] transition hover:text-blue-600 ${navSecondaryClass}`}
          >
            Contact
          </a>
        </nav>

        <div className="relative flex flex-1 items-center justify-center py-8 pt-28">
          <div className="relative w-full max-w-[1200px]">
            <div
              className={`absolute left-1/2 top-[62%] z-20 w-[min(66vw,360px)] -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-out sm:top-[65%] sm:w-[min(44vw,520px)] lg:w-[min(40vw,560px)] ${
                isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              style={{ transitionDelay: "120ms" }}
            >
              <div className={`relative ${isLoaded ? "hero-portrait-reveal" : ""}`}>
                <div className="absolute inset-x-8 bottom-2 top-8 -z-10 rounded-full bg-blue-500/15 blur-3xl" />
                <Image
                  src="/kennethpasaje2.png"
                  alt="Kenneth Pasaje portrait"
                  width={900}
                  height={1200}
                  priority
                  sizes="(max-width: 640px) 82vw, (max-width: 1024px) 44vw, 560px"
                  className={`h-auto w-full object-contain contrast-110 brightness-[1.03] drop-shadow-[0_28px_30px_rgba(15,23,42,0.18)] ${
                    isLoaded ? "image-reveal" : ""
                  }`}
                />
              </div>
            </div>

            <p
              className={`relative z-10 -mt-4 text-center font-serif italic text-[clamp(2.7rem,12vw,7.25rem)] leading-none tracking-[-0.08em] transition-all duration-700 sm:-mt-5 sm:text-[clamp(3.75rem,8vw,7.25rem)] ${nameRevealClass} ${
                isDark ? "text-white" : "text-slate-950"
              }`}
              style={{ transitionDelay: "220ms" }}
            >
              I&apos;m{" "}
              <span
                className={nameClass}
                style={
                  isDark
                    ? {
                        "--hero-shimmer":
                          "linear-gradient(90deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,1) 45%, rgba(191,219,254,1) 72%, rgba(255,255,255,0.8) 100%)",
                      }
                    : undefined
                }
              >
                Kenneth Pasaje
              </span>
            </p>

            <h1
              className={`${isLoaded ? "hero-text-reveal" : ""} relative z-0 -mt-2 text-center text-[clamp(3rem,14vw,120px)] font-black uppercase leading-[0.86] tracking-[-0.08em] transition-all duration-700 sm:-mt-3 sm:text-[120px] ${revealClass} ${
                isDark ? "text-blue-400" : "text-blue-600"
              }`}
              style={{ transitionDelay: "320ms" }}
            >
              FULLSTACK{"\u00A0"}DEVELOPER
            </h1>
          </div>

          <div className="absolute bottom-6 left-10 right-10 hidden gap-4 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-end">
            <p className={`max-w-[220px] text-[11px] leading-5 ${isDark ? "text-white/55" : "text-slate-500"}`}>
              SPECIALIZED IN FULL-STACK DEVELOPMENT, WEB APPS, AND MODERN FRONT-END BUILDING.
            </p>
            <div className={`hidden h-px w-24 sm:block ${isDark ? "bg-white/20" : "bg-slate-300"}`} />
            <p
              className={`max-w-[250px] justify-self-end text-right text-[11px] leading-5 ${
                isDark ? "text-white/55" : "text-slate-500"
              }`}
            >
              Build a website, a web app, or a custom concept? Let&apos;s chat.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
