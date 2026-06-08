"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";

const STORAGE_KEY = "hero-theme";

const SOCIAL_LINKS = [
  { label: "Gmail", href: "mailto:kennethgeverolapasaje@gmail.com", icon: "mail" },
  { label: "Facebook", href: "https://www.facebook.com/kenneth.geverola.pasaje", icon: "facebook" },
  { label: "Instagram", href: "https://www.instagram.com/knnth0315/", icon: "instagram" },
  { label: "GitHub", href: "https://github.com/kenneth092003", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kenneth-pasaje-b87286371/", icon: "linkedin" },
];

const ASSET_LOGOS = {
  HTML: "html-5.svg",
  CSS: "css.svg",
  JAVASCRIPT: "javascript.svg",
  PHP: "php.svg",
  PYTHON: "python.svg",
  JAVA: "java.svg",
  KOTLIN: "kotlin-icon.svg",
  "REACT JS": "react.svg",
  "REACT NATIVE": "react.svg",
  "NEXT.JS": "nextjs-icon.svg",
  LARAVEL: "laravel.svg",
  DJANGO: "django-icon.svg",
  "NODE.JS": "nodejs-icon.svg",
  FLUTTER: "flutter.svg",
  MYSQL: "mysql.svg",
  "C#": "c-sharp.svg",
  "VS CODE": "visual-studio-code.svg",
  "ANDROID STUDIO": "android.svg",
  GITHUB: "github-icon.svg",
  FIGMA: "figma.svg",
  FIREBASE: "firebase-icon.svg",
  VERCEL: "vercel-icon.svg",
  "GIT": "git-icon.svg",
  CODEX: "codex-color.svg",
  "TAILWIND": "tailwind-icon.svg",
  "SUPABASE": "supabase-icon.svg",
  CHATGPT: "openai-icon.svg",
  TENSORFLOW: "tensorflow.svg",
  EXPO: "expo-icon.svg",
  CLAUDE: "claude-code.svg",
};

const CHIP_ACCENTS = {
  HTML: "border-[#E34F26]/35 bg-[#E34F26]/12 shadow-[#E34F26]/15",
  CSS: "border-[#264DE4]/35 bg-[#264DE4]/12 shadow-[#264DE4]/15",
  JAVASCRIPT: "border-[#F7DF1E]/35 bg-[#F7DF1E]/14 shadow-[#F7DF1E]/15",
  PHP: "border-[#777BB4]/35 bg-[#777BB4]/12 shadow-[#777BB4]/15",
  PYTHON: "border-[#3776AB]/35 bg-[#3776AB]/12 shadow-[#3776AB]/15",
  JAVA: "border-[#EA2D2E]/35 bg-[#EA2D2E]/12 shadow-[#EA2D2E]/15",
  KOTLIN: "border-[#7F52FF]/35 bg-[#7F52FF]/12 shadow-[#7F52FF]/15",
  "C#": "border-[#239120]/35 bg-[#239120]/12 shadow-[#239120]/15",
  "REACT JS": "border-[#61DAFB]/35 bg-[#61DAFB]/12 shadow-[#61DAFB]/15",
  "REACT NATIVE": "border-[#61DAFB]/35 bg-[#61DAFB]/12 shadow-[#61DAFB]/15",
  "NEXT.JS": "border-slate-200/35 bg-white/10 shadow-black/10",
  LARAVEL: "border-[#FF2D20]/35 bg-[#FF2D20]/12 shadow-[#FF2D20]/15",
  DJANGO: "border-[#092E20]/35 bg-[#092E20]/12 shadow-[#092E20]/15",
  "NODE.JS": "border-[#68A063]/35 bg-[#68A063]/12 shadow-[#68A063]/15",
  FLUTTER: "border-[#02569B]/35 bg-[#02569B]/12 shadow-[#02569B]/15",
  MYSQL: "border-[#00758F]/35 bg-[#00758F]/12 shadow-[#00758F]/15",
  "ANDROID STUDIO": "border-[#3DDC84]/35 bg-[#3DDC84]/12 shadow-[#3DDC84]/15",
  GITHUB: "border-slate-300/35 bg-slate-100/15 shadow-black/10",
  GIT: "border-[#F05032]/35 bg-[#F05032]/12 shadow-[#F05032]/15",
  FIGMA: "border-[#F24E1E]/35 bg-[#F24E1E]/12 shadow-[#A259FF]/10",
  FIREBASE: "border-[#FFCA28]/35 bg-[#FFCA28]/14 shadow-[#FF9800]/12",
  VERCEL: "border-slate-300/35 bg-white/10 shadow-black/10",
  TAILWIND: "border-[#38BDF8]/35 bg-[#38BDF8]/12 shadow-[#38BDF8]/15",
  SUPABASE: "border-[#3ECF8E]/35 bg-[#3ECF8E]/12 shadow-[#3ECF8E]/15",
  CHATGPT: "border-[#10A37F]/35 bg-[#10A37F]/12 shadow-[#10A37F]/15",
  TENSORFLOW: "border-[#FF6F00]/35 bg-[#FF6F00]/12 shadow-[#FF6F00]/15",
  EXPO: "border-[#000000]/35 bg-white/10 shadow-black/10",
  CLAUDE: "border-[#111111]/35 bg-[#111111]/12 shadow-black/10",
};

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

function SocialIcon({ name }) {
  switch (name) {
    case "mail":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
          <path d="M5.5 7.5 12 12.5l6.5-5" />
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M13.5 21v-7h2.4l.4-2.8h-2.8V9.4c0-.8.2-1.4 1.5-1.4H16.5V5.5c-.6-.1-1.4-.2-2.3-.2-2.3 0-3.9 1.4-3.9 4v1.9H8v2.8h2.3v7h3.2Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="5" />
          <circle cx="12" cy="12" r="3.2" />
          <circle cx="16.7" cy="7.3" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2.5a9.5 9.5 0 0 0-3 18.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.2-3.4-1.2-.5-1.1-1.2-1.4-1.2-1.4-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.4-.6 1.4-.6.2-.8.6-1.2 1-1.4-2.2-.2-4.5-1.1-4.5-5a4 4 0 0 1 1-2.8 3.7 3.7 0 0 1 .1-2.7s.8-.2 2.8 1a9.8 9.8 0 0 1 5 0c2-1.2 2.8-1 2.8-1a3.7 3.7 0 0 1 .1 2.7 4 4 0 0 1 1 2.8c0 3.9-2.3 4.8-4.5 5 .6.4 1.2 1.2 1.2 2.5v3.7c0 .3.2.6.7.5A9.5 9.5 0 0 0 12 2.5Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M6.5 8.5H3.7V20h2.8V8.5ZM5.1 3.5a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm6.1 5h-2.7V20h2.8v-6.1c0-1.6.3-3.2 2.3-3.2s2 1.9 2 3.3V20h2.8v-6.8c0-3.4-.7-6-4.3-6-1.7 0-3 .9-3.4 1.8h-.1V8.5Z" />
        </svg>
      );
    case "wordpress":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M8.2 7.8 10.4 16l1.6-4.7 1.8 4.7 2.2-8.2" />
          <path d="M8.7 7.8h2.2M13.1 7.8h2.2" />
        </svg>
      );
    case "viber":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M7.7 4.8h8.6A2.7 2.7 0 0 1 19 7.5v5.2a2.7 2.7 0 0 1-2.7 2.7h-2.5l-2.6 2.4c-.4.4-1.1.1-1.1-.5v-1.9H7.7A2.7 2.7 0 0 1 5 13.4V7.5a2.7 2.7 0 0 1 2.7-2.7Z" />
          <path d="M9.1 8.9c.7 1.9 1.8 3 3.6 3.7" />
          <path d="M11.3 8.5c.5.3.9.7 1.1 1.3" />
        </svg>
      );
    default:
      return null;
  }
}

function SkillIcon({ name }) {
  const iconMap = {
    "HTML": (
      <svg viewBox="0 0 24 24" fill="currentColor"><rect fill="#E34C26" width="24" height="24"/><rect fill="#FF6D00" x="1" y="1" width="22" height="22"/><path d="M6 6h12v2H6V6zm0 4h12v2H6v-2zm0 4h12v2H6v-2z" fill="white"/></svg>
    ),
    "CSS": (
      <svg viewBox="0 0 24 24" fill="#563D7C"><rect fill="#563D7C" width="24" height="24"/><path d="M12 18L6 16l1-6h10l1 6L12 18z" fill="white" opacity="0.8"/></svg>
    ),
    "JAVASCRIPT": (
      <svg viewBox="0 0 24 24"><rect fill="#F7DF1E" width="24" height="24"/><text x="6" y="17" fontSize="14" fontWeight="bold" fill="#000">JS</text></svg>
    ),
    "PHP": (
      <svg viewBox="0 0 24 24"><circle fill="#777BB4" cx="12" cy="12" r="11"/><text x="12" y="15" textAnchor="middle" fontSize="10" fontWeight="bold" fill="white">PHP</text></svg>
    ),
    "PYTHON": (
      <svg viewBox="0 0 24 24"><circle fill="#3776AB" cx="8" cy="12" r="6"/><circle fill="#FFD43B" cx="16" cy="12" r="6"/></svg>
    ),
    "JAVA": (
      <svg viewBox="0 0 24 24" fill="#007396"><path d="M8 14c-1 0-2 .5-2 1.5s1 1.5 2 1.5 2-.5 2-1.5-1-1.5-2-1.5zm8 0c-1 0-2 .5-2 1.5s1 1.5 2 1.5 2-.5 2-1.5-1-1.5-2-1.5zM12 2c-1.5 0-3 1-3 3v3c.3-.1.6-.2 1-.2.8 0 1.5.5 2 1.2.5-.7 1.2-1.2 2-1.2.3 0 .7.1 1 .2V5c0-2-1.5-3-3-3z"/></svg>
    ),
    "KOTLIN": (
      <svg viewBox="0 0 24 24" fill="#7F52FF"><polygon points="12,2 3.5,21 20.5,21"/></svg>
    ),
    "C#": (
      <svg viewBox="0 0 24 24" fill="#239120"><circle cx="12" cy="12" r="10" fill="#239120"/><text x="12" y="15" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white">C#</text></svg>
    ),
    "REACT JS": (
      <svg viewBox="0 0 24 24"><circle fill="none" stroke="#61DAFB" strokeWidth="1.5" cx="12" cy="12" r="5"/><circle fill="#61DAFB" cx="12" cy="12" r="1.5"/><circle fill="none" stroke="#61DAFB" strokeWidth="1.5" cx="12" cy="12" r="8" opacity="0.5" transform="rotate(0 12 12)"/><circle fill="none" stroke="#61DAFB" strokeWidth="1.5" cx="12" cy="12" r="8" opacity="0.5" transform="rotate(60 12 12)"/><circle fill="none" stroke="#61DAFB" strokeWidth="1.5" cx="12" cy="12" r="8" opacity="0.5" transform="rotate(120 12 12)"/></svg>
    ),
    "REACT NATIVE": (
      <svg viewBox="0 0 24 24"><circle fill="none" stroke="#61DAFB" strokeWidth="1.5" cx="12" cy="12" r="5"/><circle fill="#61DAFB" cx="12" cy="12" r="1.5"/><circle fill="none" stroke="#61DAFB" strokeWidth="1.5" cx="12" cy="12" r="8" opacity="0.5" transform="rotate(0 12 12)"/><circle fill="none" stroke="#61DAFB" strokeWidth="1.5" cx="12" cy="12" r="8" opacity="0.5" transform="rotate(60 12 12)"/><circle fill="none" stroke="#61DAFB" strokeWidth="1.5" cx="12" cy="12" r="8" opacity="0.5" transform="rotate(120 12 12)"/></svg>
    ),
    "NEXT.JS": (
      <svg viewBox="0 0 24 24" fill="#000000"><path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.172.032l-.194.023a141.277 141.277 0 0 1-.11.006h-.577a4.6 4.6 0 0 0-.898.056 2.341 2.341 0 0 0-.5.106 1.779 1.779 0 0 0-.655.39 1.905 1.905 0 0 0-.5.693 2.017 2.017 0 0 0-.174.868v4.718h2.54V5.07c0-.316.21-.49.593-.49h.47a.745.745 0 0 1 .595.295.75.75 0 0 1 .195.643v1.398h2.54V4.75a1.512 1.512 0 0 0-.404-1.067 2.505 2.505 0 0 0-1.97-.727c-.992 0-1.679.328-2.063.983M.11 20.746h2.154v-5.141c0-1.092-.356-1.852-1.066-2.280-.71-.428-1.612-.64-2.708-.64-.351 0-.773.056-1.266.170-.493.113-.905.281-1.236.506l.258 2.005c.23-.166.548-.29.954-.274.406.017.776.16 1.11.428.333.268.5.668.5 1.199v3.982h2.154zM10.968 20.746h2.154V5.92h-2.154v14.826z"/></svg>
    ),
    "LARAVEL": (
      <svg viewBox="0 0 24 24" fill="#FF2D20"><path d="M23.642 5.43a.845.845 0 0 1 .358 1.187 8.116 8.116 0 0 1-1.573 2.127c.521 1.066.956 2.287 1.174 3.64.107.631.181 1.305.181 2.018 0 2.185-.545 4.262-1.506 6.065-.96 1.804-2.313 3.328-3.896 4.406-1.583 1.078-3.368 1.708-5.232 1.708-1.864 0-3.648-.63-5.232-1.708-1.583-1.078-2.936-2.602-3.896-4.406-.96-1.804-1.506-3.88-1.506-6.065 0-.713.074-1.387.182-2.018.218-1.353.653-2.574 1.174-3.64A8.116 8.116 0 0 1 .864 6.617a.845.845 0 0 1 .358-1.187.865.865 0 0 1 1.203.308 9.802 9.802 0 0 0 1.625 2.237c.928-.703 2.05-1.258 3.285-1.6v-.066a4.264 4.264 0 0 1 4.582-4.216 4.264 4.264 0 0 1 4.582 4.216v.066c1.235.342 2.357.897 3.285 1.6a9.8 9.8 0 0 0 1.625-2.237.866.866 0 0 1 1.203-.308z"/></svg>
    ),
    "DJANGO": (
      <svg viewBox="0 0 24 24" fill="#092E20"><path d="M11.146 0h2.932v13.664c-1.491.427-2.585.6-3.73.6-2.96 0-4.573-1.784-4.573-5.167 0-3.25 1.784-5.371 4.573-5.371 1.058 0 1.887.2 2.798.803V2.404C11.734 1.615 10.918 0 8.438 0 3.935 0 1.125 3.25 1.125 8.724c0 5.629 3.246 8.793 8.438 8.793 2.201 0 3.866-.35 5.303-1.092V0h2.933v15.22h-2.933V13.938c-1.3.953-3.18 1.512-5.199 1.512-5.647 0-9.253-3.765-9.253-9.49 0-5.336 3.453-9.185 8.923-9.185 2.824 0 4.538 1.092 5.494 2.43V0z"/></svg>
    ),
    "NODE.JS": (
      <svg viewBox="0 0 24 24" fill="#68A063"><path d="M12 21.985c-.275 0-.549-.073-.789-.213l-2.5-1.482c-.375-.213-.193-.288-.073-.331.53-.182.636-.223 1.198-.538.061-.036.137-.023.198.015l1.922 1.141c.074.043.18.043.248 0l7.504-4.33c.073-.042.122-.127.122-.216V7.95c0-.089-.049-.174-.121-.217l-7.505-4.33c-.073-.043-.179-.043-.249 0L4.351 7.733c-.073.043-.121.128-.121.217v8.66c0 .088.048.173.121.215l2.058 1.188c1.117.559 1.801-.099 1.801-.755V8.707c0-.126.103-.23.23-.23h1.002c.127 0 .23.104.23.23v8.599c0 1.48-.807 2.329-2.213 2.329-.432 0-.773 0-1.722-.469l-1.974-1.134c-.485-.281-.789-.817-.789-1.388V7.95c0-.571.304-1.107.789-1.388l7.505-4.33c.475-.276 1.103-.276 1.577 0l7.505 4.33c.485.281.789.817.789 1.388v8.66c0 .571-.304 1.107-.789 1.388l-7.505 4.33c-.24.14-.514.213-.789.213z"/></svg>
    ),
    "FLUTTER": (
      <svg viewBox="0 0 24 24" fill="#02569B"><path d="M14.314 0L2.87 11.458 6.584 15.17 21.316 0M0 14.227l5.074 5.073c.622.623 1.632.623 2.255 0l12.855-12.852L14.314 0 0 14.227z"/></svg>
    ),
    "MYSQL": (
      <svg viewBox="0 0 24 24" fill="#00758F"><path d="M3.89 15.672L6.255.461A.5.5 0 0 1 7.279.289l2.752 5.739 5.5 11.861.792 1.711a.5.5 0 0 1-.903.407l-.863-1.862a.5.5 0 0 0-.903.407l.863 1.862a.5.5 0 0 1-.408.703.5.5 0 0 1-.498-.592l.592-2.766-5.5-11.861L5.279 7.74l.816 4.4a.5.5 0 0 1-.903.407l-1.303-7.875z" fill="white"/></svg>
    ),
    "VS CODE": (
      <svg viewBox="0 0 24 24" fill="#007ACC"><path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.123-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .786 8.766l3.821 2.915-3.821 2.917a1 1 0 0 0 .459 1.505l1.748 1.267 4.123-3.128 9.46 8.63a1.494 1.494 0 0 0 1.705.29l4.939-2.38a1.5 1.5 0 0 0 .923-1.379V3.966a1.5 1.5 0 0 0-.923-1.379z"/></svg>
    ),
    "GITHUB": (
      <svg viewBox="0 0 24 24" fill="#181717"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
    ),
    "FIGMA": (
      <svg viewBox="0 0 24 24"><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" fill="#F24E1E"/><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" fill="#0ACF83"/><path d="M12 12h3.5a3.5 3.5 0 1 1 0 7H12v-7z" fill="#A259FF"/><path d="M5 16.5A3.5 3.5 0 0 1 8.5 13H12v7H8.5A3.5 3.5 0 0 1 5 16.5z" fill="#FF61F6"/><path d="M5 10.5A3.5 3.5 0 0 1 8.5 7H12v7H8.5A3.5 3.5 0 0 1 5 10.5z" fill="#1ABCFE"/></svg>
    ),
    "FIREBASE": (
      <svg viewBox="0 0 24 24" fill="#FFA500"><path d="M3.89 15.672L6.255.461A.5.5 0 0 1 7.279.289l2.752 5.739 5.5 11.861.792 1.711a.5.5 0 0 1-.903.407l-.863-1.862a.5.5 0 0 0-.903.407l.863 1.862a.5.5 0 0 1-.408.703.5.5 0 0 1-.498-.592l.592-2.766-5.5-11.861L5.279 7.74l.816 4.4a.5.5 0 0 1-.903.407l-1.303-7.875z"/></svg>
    ),
    "VERCEL": (
      <svg viewBox="0 0 24 24" fill="#000000"><path d="M24 22.525H0l12-21.05 12 21.05z"/></svg>
    ),
    "PREMIERE PRO": (
      <svg viewBox="0 0 24 24"><rect width="24" height="24" fill="#EA77FF"/><text x="50%" y="50%" textAnchor="middle" dy=".3em" fill="white" fontSize="14" fontWeight="bold">Pr</text></svg>
    ),
    "CANVA": (
      <svg viewBox="0 0 24 24" fill="#00C4CC"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
    ),
    "ANDROID STUDIO": (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="5" y="6" width="10" height="12" rx="2.2" fill="#3DDC84" />
        <path d="M15 8.5 19 5" stroke="#3DDC84" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M15 15.5 19 19" stroke="#3DDC84" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="9.2" cy="11" r="0.7" fill="white" />
        <circle cx="11.8" cy="11" r="0.7" fill="white" />
      </svg>
    ),
    "CODEX": (
      <svg viewBox="0 0 24 24" fill="#FF9900"><path d="M9.4 16.6L4.8 12l4.6-4.6L6.6 6 0 12l6.6 6 2.8-2.4zm5.2 0l4.6-4.6-4.6-4.6 2.8-2.8L24 12l-6.6 6 2.8 2.4z"/></svg>
    ),
    "CLAUDE": (
      <svg viewBox="0 0 24 24" fill="#1a1a1a"><circle cx="12" cy="12" r="10" fill="#1a1a1a"/></svg>
    ),
    "CHATGPT": (
      <svg viewBox="0 0 24 24" fill="#10A37F"><path d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0z"/></svg>
    ),
    "COPILOT": (
      <svg viewBox="0 0 24 24" fill="#0078D4"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"/></svg>
    ),
  };
  
  return iconMap[name] || "•";
}

function AssetIcon({ name }) {
  const fileName = ASSET_LOGOS[name];

  if (!fileName) {
    return SkillIcon({ name });
  }

  return (
    <Image
      src={`/svg/${fileName}`}
      alt=""
      width={16}
      height={16}
      className="h-full w-full object-contain"
      style={name === "CHATGPT" ? { filter: "brightness(0) invert(1)" } : undefined}
    />
  );
}

function chipAccent(name) {
  return CHIP_ACCENTS[name] || "border-white/20 bg-white/10 shadow-black/10";
}

export default function About() {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, () => "light");
  const isDark = theme === "dark";
  const sectionClass = isDark ? "bg-[#07111f]" : "bg-blue-600";

  return (
    <section id="about" className={`min-h-screen px-6 py-20 sm:px-8 lg:px-10 scroll-mt-0 ${sectionClass}`}>
      <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="flex flex-col justify-center gap-8 animate-fade-in">
          <p className="font-serif italic text-[clamp(2.6rem,6vw,5rem)] leading-none tracking-[-0.08em] text-white animate-slide-up">
            About me
          </p>

          <div className="mx-auto w-full max-w-[260px] overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 p-2.5 shadow-[0_24px_60px_rgba(7,17,31,0.22)] backdrop-blur-md animate-slide-up" style={{ animationDelay: "60ms" }}>
            <div className="overflow-hidden rounded-[1.4rem] border border-white/15 bg-white/10">
              <Image
                src="/gradpic.JPG"
                alt="Kenneth Pasaje graduation photo"
                width={360}
                height={450}
                priority
                className="h-auto w-full object-cover object-top"
              />
            </div>
          </div>

          <p className="max-w-2xl text-base leading-8 text-white/90 sm:text-lg animate-slide-up" style={{ animationDelay: "100ms" }}>
            Information Technology student and graphic designer with experience in web and mobile development,
            programming, and creative digital design. Skilled in combining technical expertise with visual creativity
            to deliver innovative projects, collaborating across schools and organizations to produce high-quality
            solutions.
          </p>

          <div className="flex flex-wrap gap-3 animate-slide-up" style={{ animationDelay: "200ms" }}>
            {SOCIAL_LINKS.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:-translate-y-0.5 hover:bg-white/20 hover:shadow-lg hover:shadow-blue-500/50 animate-pop"
                style={{ animationDelay: `${index * 50}ms` }}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={item.label}
                title={item.label}
              >
                <span className="h-5 w-5 group-hover:scale-110 transition-transform duration-300">
                  <SocialIcon name={item.icon} />
                </span>
              </a>
            ))}
          </div>

          <a
            href="/Kenneth.pdf"
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex self-start rounded-full border border-white/25 bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-blue-600 transition hover:translate-y-[-1px] hover:bg-blue-50 hover:shadow-xl animate-slide-up"
            style={{ animationDelay: "300ms" }}
          >
            View Resume
          </a>
        </div>

        <div className="flex flex-col gap-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
          <div className="rounded-[28px] border border-white/15 bg-white/10 p-6 shadow-[0_24px_60px_rgba(7,17,31,0.18)] backdrop-blur-md sm:p-8 transition-all duration-500 hover:shadow-[0_24px_80px_rgba(7,17,31,0.35)] hover:border-white/25 animate-slide-up" style={{ animationDelay: "200ms" }}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">Educational Background</p>
            <div className="mt-5 space-y-5 text-white">
              {[
                {
                  title: "ICT - Computer Systems Servicing",
                  year: "2016 - 2020",
                  school: "Sta. Ana National Highschool"
                },
                {
                  title: "ICT - Programming & Animation",
                  year: "2020 - 2022",
                  school: "Holy Child College of Davao"
                },
                {
                  title: "Bachelor of Science in Information Technology",
                  year: "Present",
                  school: "Holy Cross of Davao College"
                }
              ].map((edu, index) => (
                <div key={index} className="group cursor-pointer">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] group-hover:text-blue-300 transition-colors duration-300">{edu.title}</p>
                  <p className="mt-1 text-sm text-white/80">{edu.year}</p>
                  <p className="mt-1 text-sm text-white/90 group-hover:text-white transition-colors duration-300">{edu.school}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/15 bg-white/10 p-6 shadow-[0_24px_60px_rgba(7,17,31,0.18)] backdrop-blur-md sm:p-8 transition-all duration-500 hover:shadow-[0_24px_80px_rgba(7,17,31,0.35)] hover:border-white/25 animate-slide-up" style={{ animationDelay: "300ms" }}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">Technical Skill</p>
            
            <div className="mt-6 space-y-5">
              {/* Languages & Frameworks */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60 mb-3">Languages & Frameworks</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "HTML",
                    "CSS",
                    "JAVASCRIPT",
                    "PHP",
                    "PYTHON",
                    "JAVA",
                    "KOTLIN",
                    "C#",
                    "REACT JS",
                    "REACT NATIVE",
                    "NEXT.JS",
                    "LARAVEL",
                    "DJANGO",
                    "NODE.JS",
                    "FLUTTER",
                    "MYSQL",
                  ].map((skill, index) => (
                    <span
                      key={skill}
                      className={`rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-white/95 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 hover:shadow-lg cursor-pointer animate-pop flex items-center gap-1.5 ${chipAccent(skill)}`}
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      <span className="w-4 h-4 flex-shrink-0 flex items-center justify-center">
                        <AssetIcon name={skill} />
                      </span>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools & Platforms */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60 mb-3">Tools & Platforms</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "VS CODE",
                    "ANDROID STUDIO",
                    "GIT",
                    "GITHUB",
                    "FIGMA",
                    "TAILWIND",
                    "SUPABASE",
                    "FIREBASE",
                    "EXPO",
                    "VERCEL",
                    "PREMIERE PRO",
                    "CANVA",
                  ].map((tool, index) => (
                    <span
                      key={tool}
                      className={`rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-white/95 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 hover:shadow-lg cursor-pointer animate-pop flex items-center gap-1.5 ${chipAccent(tool)}`}
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      <span
                        className={`flex-shrink-0 flex items-center justify-center ${tool === "CHATGPT" ? "h-5 w-5 rounded-full bg-[#10A37F] p-0.5" : "h-4 w-4"}`}
                      >
                        <AssetIcon name={tool} />
                      </span>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI Tools */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60 mb-3">AI Tools</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "CODEX",
                    "CLAUDE",
                    "CHATGPT",
                    "TENSORFLOW",
                  ].map((tool, index) => (
                    <span
                      key={tool}
                      className={`rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-white/95 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 hover:shadow-lg cursor-pointer animate-pop flex items-center gap-1.5 ${chipAccent(tool)}`}
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      <span className="w-4 h-4 flex-shrink-0 flex items-center justify-center">
                        <AssetIcon name={tool} />
                      </span>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
