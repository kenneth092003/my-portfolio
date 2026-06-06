"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";

const STORAGE_KEY = "hero-theme";

const certificates = [
  {
    kind: "certificate",
    title: "Java EE, Web Development: HTTP, Server, Servlet, HTML/CSS, JSP",
    issuer: "Udemy",
    year: "2026",
    date: "April 21, 2026",
    certCode: "0004",
    description:
      "Certificate of Completion for successfully completing the online course Java EE, Web Development: HTTP, Server, Servlet, HTML/CSS, JSP.",
    image: "/cert7.png",
  },
  {
    kind: "certificate",
    title: "Python And Flask Framework Complete Course",
    issuer: "Udemy",
    year: "2026",
    date: "8th April 2026",
    certCode: "0004",
    description:
      "Certificate of Completion for successfully completing the online course Python And Flask Framework Complete Course.",
    image: "/certudemy.png",
  },
  {
    kind: "certificate",
    title: "Real Estate Virtual Assistant Course",
    issuer: "Freelance Academy",
    year: "2026",
    date: "17th January 2026",
    description:
      "Certificate of Completion for successfully completing the 9-hour Real Estate Virtual Assistant Course covering administrative tasks, social media marketing, listing management, transaction coordination, CRM, apps, and real estate processes.",
    image: "/cert8.png",
  },
  {
    kind: "certificate",
    title: "Virtual Assistant Social Media Marketing Course",
    issuer: "Freelance Academy",
    year: "2026",
    date: "17th January 2026",
    description:
      "Certificate of Completion for successfully completing the 15-hour Virtual Assistant Social Media Marketing Course covering social media marketing, algorithm, content creation, basic video editing, lead generation, SEO, WordPress, and Facebook Ads.",
    image: "/cert9.png",
  },
  {
    kind: "certificate",
    title: "Introduction to SQL",
    issuer: "Simplilearn SkillUp",
    year: "2024",
    date: "23rd Sep 2024",
    certCode: "7396935",
    description:
      "Certificate of Completion for successfully completing the online course Introduction to SQL.",
    image: "/cert1.jpg",
  },
  {
    kind: "award",
    title: "Certificate of Recognition",
    issuer: "Holy Cross of Davao College",
    year: "2026",
    date: "March 18, 2026",
    certCode: "Award Recognition",
    description:
      "Recognition awarded to DuriaScan, an AI-assisted mobile machine learning app for durian leaf disease detection with environmental monitoring, diagnostic insights, and progression tracking.",
    image: "/award1.jpg",
  },
  {
    kind: "award",
    title: "2nd Best Research Paper",
    issuer: "Holy Cross of Davao College",
    year: "2026",
    date: "May 13, 2026",
    certCode: "Award Recognition 2",
    description:
      "Recognition awarded to DuriaScan for earning 2nd Best Research Paper at the 2026 CET Research Conference.",
    image: "/award2.jpg",
  },
  {
    kind: "certificate",
    title: "Python for Beginners",
    issuer: "Simplilearn SkillUp",
    year: "2026",
    date: "26th March 2026",
    certCode: "10008016",
    description:
      "Certificate of Completion for successfully completing the online course Python for Beginners.",
    image: "/cert4.png",
  },
  {
    kind: "certificate",
    title: "Networking Basics",
    issuer: "Cisco Networking Academy",
    year: "2026",
    date: "26th Mar 2026",
    certCode: "NET-01",
    description:
      "This certificate is awarded for successfully completing Networking Basics offered by Networking Academy through the Cisco Networking Academy program.",
    image: "/net1.png",
  },
  {
    kind: "certificate",
    title: "Getting Started with Full Stack Java Development",
    issuer: "Simplilearn SkillUp",
    year: "2026",
    date: "28th March 2026",
    certCode: "10019758",
    description:
      "Certificate of Completion for successfully completing the online course Getting Started with Full Stack Java Development.",
    image: "/cert5.png",
  },
  {
    kind: "certificate",
    title: "Introduction to Front End Development",
    issuer: "Simplilearn SkillUp",
    year: "2026",
    date: "25th March 2026",
    certCode: "9998138",
    description:
      "Certificate of Completion for successfully completing the online course Introduction to Front End Development.",
    image: "/cert6.png",
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

function getCertificateSortValue(certificate) {
  const yearValue = Number.parseInt(certificate.year, 10) || 0;
  const dateValue = certificate.date ? parseCertificateDate(certificate.date) : 0;

  return { yearValue, dateValue };
}

function parseCertificateDate(dateText) {
  const normalized = dateText
    .replace(/(\d+)(st|nd|rd|th)/g, "$1")
    .replace(/,/g, "")
    .trim();

  const monthMap = {
    january: 0,
    february: 1,
    march: 2,
    april: 3,
    may: 4,
    june: 5,
    july: 6,
    august: 7,
    september: 8,
    sept: 8,
    sep: 8,
    october: 9,
    november: 10,
    december: 11,
    dec: 11,
  };

  const parts = normalized.split(/\s+/);
  let day = 1;
  let month = 0;
  let year = 0;

  if (parts.length === 3) {
    if (/^\d+$/.test(parts[0])) {
      day = Number.parseInt(parts[0], 10);
      month = monthMap[parts[1].toLowerCase()] ?? 0;
      year = Number.parseInt(parts[2], 10) || 0;
    } else {
      month = monthMap[parts[0].toLowerCase()] ?? 0;
      day = Number.parseInt(parts[1], 10) || 1;
      year = Number.parseInt(parts[2], 10) || 0;
    }
  }

  return new Date(year, month, day).getTime();
}

export default function Certificate() {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, () => "light");
  const isDark = theme === "dark";
  const [activeImage, setActiveImage] = useState(null);
  const [activeTab, setActiveTab] = useState("certificate");
  const [pageStart, setPageStart] = useState(0);
  const [pageDirection, setPageDirection] = useState(1);
  const visibleCertificates = certificates
    .filter((certificate) => certificate.kind === activeTab)
    .sort((left, right) => {
      const leftSort = getCertificateSortValue(left);
      const rightSort = getCertificateSortValue(right);

      if (rightSort.yearValue !== leftSort.yearValue) {
        return rightSort.yearValue - leftSort.yearValue;
      }

      return rightSort.dateValue - leftSort.dateValue;
    });
  const pageSize = 3;
  const pageCertificates = visibleCertificates.slice(pageStart, pageStart + pageSize);
  const canGoLeft = pageStart > 0;
  const canGoRight = pageStart + pageSize < visibleCertificates.length;
  const pageMotionClass = pageDirection === 1 ? "certificate-page-in-from-right" : "certificate-page-in-from-left";

  useEffect(() => {
    if (!activeImage) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveImage(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.document.body.style.overflow = "";
    };
  }, [activeImage]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setPageStart(0);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [activeTab]);

  return (
    <section
      id="certificate"
      className={`px-6 py-24 sm:px-8 lg:px-10 ${isDark ? "bg-[#07111f] text-white" : "bg-white text-slate-950"}`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 md:grid md:grid-cols-[0.92fr_1.08fr] md:items-end">
          <div className="max-w-lg">
            <p className={`text-sm font-semibold uppercase tracking-[0.3em] ${isDark ? "text-white/50" : "text-slate-400"}`}>
              Certificates
            </p>
            <h2 className={`mt-2 text-balance text-3xl font-semibold tracking-[-0.06em] sm:text-4xl ${isDark ? "text-white" : "text-slate-950"}`}>
              A simple collection of certificates and achievements.
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setActiveTab("certificate")}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                  activeTab === "certificate"
                    ? isDark
                      ? "border-blue-400 bg-blue-400 text-[#07111f]"
                      : "border-slate-950 bg-slate-950 text-white"
                    : isDark
                      ? "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                Certificates
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("award")}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                  activeTab === "award"
                    ? isDark
                      ? "border-blue-400 bg-blue-400 text-[#07111f]"
                      : "border-slate-950 bg-slate-950 text-white"
                    : isDark
                      ? "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                Awards
              </button>
            </div>
          </div>
        </div>

        <div className="relative mt-10">
          {canGoLeft || canGoRight ? (
              <button
                type="button"
                onClick={() => {
                  setPageDirection(canGoRight ? 1 : -1);
                  setPageStart((current) => (canGoRight ? current + pageSize : 0));
                }}
                className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 text-white transition hover:scale-105"
                aria-label={canGoRight ? "Show next certificates" : "Reset certificates"}
            >
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full ${
                  isDark ? "bg-blue-500/90" : "bg-blue-600"
                }`}
                aria-hidden="true"
              >
                {canGoRight ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9.5 5.5 6.5 6.5-6.5 6.5" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.5 5.5 8 12l6.5 6.5" />
                  </svg>
                )}
              </span>
            </button>
          ) : null}

          <div
            key={`${activeTab}-${pageStart}-${pageDirection}`}
            className={`grid gap-5 md:grid-cols-2 xl:grid-cols-3 ${pageMotionClass}`}
          >
            {pageCertificates.map((certificate, index) => {
              const boardNumber = pageStart + index + 1;

              return (
              <article
                key={`${certificate.title}-${index}`}
                className={`overflow-hidden rounded-[1.75rem] border shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.1)] ${
                  isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white"
                }`}
              >
                <div className={`h-2 ${isDark ? "bg-blue-400" : "bg-slate-950"}`} />
                {"image" in certificate ? (
                  <button
                    type="button"
                    onClick={() => setActiveImage(certificate)}
                    className="relative block aspect-[16/10] w-full overflow-hidden border-b border-slate-200/80 bg-slate-100"
                    aria-label={`View ${certificate.title}`}
                  >
                    <Image
                      src={certificate.image}
                      alt={certificate.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition duration-300 hover:scale-[1.03]"
                    />
                  </button>
                ) : null}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className={`text-xs font-medium uppercase tracking-[0.24em] ${isDark ? "text-white/45" : "text-slate-400"}`}>
                        {certificate.kind === "award" ? "Award" : "Certificate"} {boardNumber}
                      </p>
                      <h3 className={`mt-3 text-xl font-semibold tracking-[-0.04em] ${isDark ? "text-white" : "text-slate-950"}`}>
                        {certificate.title}
                      </h3>
                    </div>
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${
                        isDark ? "border-white/10 bg-white/10 text-white/75" : "border-slate-200 bg-slate-50 text-slate-600"
                      }`}
                    >
                      {certificate.year}
                    </span>
                  </div>

                  <p className={`mt-4 text-sm font-medium uppercase tracking-[0.14em] ${isDark ? "text-white/60" : "text-slate-500"}`}>
                    {certificate.issuer}
                  </p>
                  <p className={`mt-3 text-sm leading-7 ${isDark ? "text-white/70" : "text-slate-600"}`}>
                    {certificate.description}
                  </p>
                  {"date" in certificate || "certCode" in certificate ? (
                    <div className={`mt-5 grid gap-2 text-xs ${isDark ? "text-white/55" : "text-slate-500"}`}>
                      {"date" in certificate ? <p>Issued: {certificate.date}</p> : null}
                      {"certCode" in certificate ? <p>Certificate Code: {certificate.certCode}</p> : null}
                    </div>
                  ) : null}
                </div>
              </article>
              );
            })}
          </div>
        </div>
      </div>

      {activeImage ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.title}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4 py-6 backdrop-blur-sm"
          onClick={() => setActiveImage(null)}
        >
          <div
            className={`relative w-full max-w-6xl overflow-hidden rounded-[1.5rem] border ${
              isDark ? "border-white/10 bg-[#07111f]" : "border-white/20 bg-white"
            }`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveImage(null)}
              className={`absolute right-4 top-4 z-10 rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] ${
                isDark ? "border-white/10 bg-white/10 text-white" : "border-slate-200 bg-white text-slate-700"
              }`}
            >
              Close
            </button>

            <div className="relative aspect-[16/10] w-full">
              <Image
                src={activeImage.image}
                alt={activeImage.title}
                fill
                sizes="100vw"
                className="object-contain bg-black"
                priority
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
