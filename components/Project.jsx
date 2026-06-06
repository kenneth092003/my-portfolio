"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";

const STORAGE_KEY = "hero-theme";

const PROJECTS = [
  {
    title: "Purchase Request Tracking System",
    kind: "Web System",
    category: "Desktop",
    year: "2026",
    logo: "/dswdlogo.png",
    githubPrivate: true,
    gallery: [
      "/dswd/1.png",
      "/dswd/2.png",
      "/dswd/3.png",
      "/dswd/4.png",
      "/dswd/5.png",
      "/dswd/6.png",
    ],
    description:
      "A Pantawid Pamilyang Pilipino Program and Holy Cross of Davao College initiative.",
    stack: ["Laravel", "MySQL", "Vite"],
    accent: "from-emerald-300 via-teal-400 to-cyan-500",
    details: [
      "Built to streamline purchase request tracking for the DSWD workflow.",
      "Uses Laravel, MySQL, and Vite for a clean and maintainable web system.",
      "Designed to support organized records, monitoring, and smoother processing.",
    ],
  },
  {
    title: "DSWD",
    kind: "Figma Prototype",
    category: "Figma",
    year: "2026",
    logo: "/dswdlogo.png",
    figma:
      "https://www.figma.com/proto/zLOLy6KWwJlFvq3HddIsje/DSWD?node-id=17-2&p=f&t=5ipF4tjPPzrQlNFn-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=17%3A2&show-proto-sidebar=1",
    gallery: [
      "/dswd/1.png",
      "/dswd/2.png",
      "/dswd/3.png",
      "/dswd/4.png",
      "/dswd/5.png",
      "/dswd/6.png",
    ],
    description:
      "A Pantawid Pamilyang Pilipino Program and Holy Cross of Davao College initiative.",
    stack: ["Laravel", "MySQL", "Vite"],
    accent: "from-emerald-300 via-teal-400 to-cyan-500",
    details: [
      "Built to streamline purchase request tracking for the DSWD workflow.",
      "Uses Laravel, MySQL, and Vite for a clean and maintainable web system.",
      "Designed to support organized records, monitoring, and smoother processing.",
    ],
  },
  {
    title: "Helmsman Helmet",
    kind: "POS Admin",
    category: "Desktop",
    year: "2026",
    logo: "/Logo1Helms.png",
    github: "https://github.com/kenneth092003/POS-admin-with-monitoring-inventory.git",
    gallery: [
      "/helmsmandescription/helms1.jpg",
      "/helmsmandescription/helms2.jpg",
      "/helmsmandescription/helms3.jpg",
      "/helmsmandescription/helms4.jpg",
      "/helmsmandescription/helms5.jpg",
    ],
    description:
      "A POS admin system with monitoring and inventory management for streamlined sales operations and stock control.",
    stack: ["C#", "MySQL", "Desktop App"],
    accent: "from-blue-400 via-cyan-400 to-sky-500",
    details: [
      "Built as a desktop POS admin for monitoring sales, inventory, and item records in one place.",
      "Designed to support faster day-to-day operations with clear stock visibility and organized admin workflows.",
      "Uses C# for the application layer and MySQL for data storage and management.",
      "Focused on practical admin functions like inventory tracking, product handling, and reporting views.",
    ],
  },
  {
    title: "CarRent",
    kind: "Rental System",
    category: "Desktop",
    year: "2026",
    logo: "/logorent.png",
    github: "https://github.com/kenneth092003/CarRent.git",
    gallery: [
      "/rentease/rent1.png",
      "/rentease/rent2.png",
      "/rentease/rent3.png",
      "/rentease/rent4.png",
      "/rentease/rent5.png",
      "/rentease/rent6.png",
      "/rentease/rent7.png",
      "/rentease/rent8.png",
      "/rentease/rent9.png",
    ],
    description:
      "A rental management system with booking, inventory, and transaction tracking for smoother day-to-day operations.",
    stack: ["HTML", "CSS", "JavaScript"],
    accent: "from-amber-300 via-orange-400 to-rose-400",
    details: [
      "Built as a desktop rental system for bookings, item records, and transaction monitoring.",
      "Designed to keep rental operations organized with clearer status tracking and easier management.",
      "Uses HTML, CSS, and JavaScript for the interface and user interactions.",
      "Focused on practical admin workflows like availability tracking, records, and reporting views.",
    ],
  },
  {
    title: "DuriaScan",
    kind: "Mobile App",
    category: "Mobile",
    year: "2026",
    logo: "/Duria.png",
    github:
      "https://github.com/kenneth092003/DuriaScan-A-Mobile-Machine-Learning-App-for-Durian-Leaf-Disease-Detection.git",
    gallery: [
      "/DuriaScan/1.png",
      "/DuriaScan/2.png",
      "/DuriaScan/3.png",
    ],
    description:
      "An AI-assisted mobile app for identifying plant health issues with a clean scan flow, structured results, and quick feedback.",
    stack: ["Kotlin", "TensorFlow Lite", "Firebase"],
    accent: "from-cyan-400 via-blue-500 to-sky-600",
    details: [
      "An AI-assisted mobile app for identifying plant health issues.",
      "Includes a clean scan flow, readable results, and quick feedback states.",
      "Built for mobile-first interaction and fast user decision-making.",
    ],
  },
  {
    title: "Hair Suggestion App",
    kind: "Mobile App",
    category: "Mobile",
    year: "2026",
    logo: "/hair.png",
    github: "https://github.com/kenneth092003/HairStyleSuggestionApp.git",
    gallery: ["/hairapp/hair1.png"],
    description:
      "A hair suggestion app that uses Python machine learning and Java to help recommend suitable hair-related guidance in a simple mobile flow.",
    stack: ["Python", "Machine Learning", "Java"],
    accent: "from-fuchsia-400 via-pink-400 to-rose-500",
    details: [
      "Built as a mobile app for hair suggestion and guidance use cases.",
      "Uses Python machine learning to support smart recommendations.",
      "Paired with Java for the app flow and mobile experience.",
    ],
  },
  {
    title: "ChitChat Messenger Clone",
    kind: "Mobile App",
    category: "Mobile",
    year: "2026",
    logo: "/chit.png",
    github: "https://github.com/kenneth092003/Messenger-Clone.git",
    gallery: [
      "/mesclone/mes1.png",
      "/mesclone/mes2.png",
      "/mesclone/mes3.png",
      "/mesclone/mes4.png",
      "/mesclone/mes5.png",
    ],
    description:
      "A Messenger Clone mobile project with ChitChat branding, built around sign-up, login, and a clean chat-focused flow.",
    stack: ["Mobile UI", "Auth Flow", "Prototype"],
    accent: "from-sky-400 via-cyan-400 to-blue-500",
    details: [
      "Shows the ChitChat branding with the logo and matching mobile screenshots.",
      "Includes sign-up and login screens designed for a simple messaging flow.",
      "Built to present a clean, chat-first mobile app experience.",
    ],
  },
  {
    title: "KickStore",
    kind: "Web Store",
    category: "Figma",
    year: "2026",
    logo: "/kicksStore.png",
    figma: "https://www.figma.com/proto/zrGy1nYO4djSdbBGWbIcO1/Team-3?node-id=0-1",
    description:
      "A web store concept for selling clothes and shoes, designed as a clean Figma prototype with a focused shopping flow.",
    stack: ["Web Store", "Figma", "UI Design"],
    accent: "from-emerald-300 via-cyan-400 to-blue-500",
    details: [
      "A web store concept for clothes and shoes.",
      "Built as a Figma prototype with a cleaner shopping flow.",
      "Designed to present products with a simple and polished storefront feel.",
    ],
  },
  {
    title: "Riane's Violet Studio Cafe",
    kind: "Coffee UI",
    category: "Figma",
    year: "2026",
    logo: "/CoffeUI.png",
    figma: "https://www.figma.com/proto/yyrrErEHxUAMhpwdkkyg0D/EXAM?node-id=1-2&starting-point-node-id=1%3A2",
    description:
      "A coffee-themed UI concept for a violet studio cafe, designed as a clean Figma prototype with a cozy and modern vibe.",
    stack: ["Cafe UI", "Figma", "Prototype"],
    accent: "from-violet-300 via-fuchsia-400 to-pink-500",
    details: [
      "A coffee UI concept with a soft violet studio cafe aesthetic.",
      "Built as a Figma prototype focused on mood and presentation.",
      "Designed to feel cozy, modern, and easy to browse.",
    ],
  },
  {
    title: "SMM Campaign Set",
    kind: "Product Design",
    category: "Product Design",
    year: "2026",
    logo: "/SMM/smm1.png",
    gallery: [
      "/SMM/smm1.png",
      "/SMM/smm2.png",
      "/SMM/smm3.png",
      "/SMM/smm4.png",
      "/SMM/smm5.png",
    ],
    description:
      "A product-focused design set built for social media marketing visuals, with bold promotional layouts and branded presentation.",
    stack: ["SMM", "Product Design", "Promo Design"],
    accent: "from-sky-300 via-cyan-400 to-blue-500",
    details: [
      "A social media marketing design set with multiple promotional creatives.",
      "Built to highlight products with bold, clear, and engaging layouts.",
      "Designed for branded promotion across social platforms.",
    ],
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

export default function Project() {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, () => "light");
  const isDark = theme === "dark";
  const filterOptions = ["Desktop", "Mobile", "Figma", "Product Design"];
  const sectionClass = isDark ? "bg-[#07111f] text-white" : "bg-blue-600 text-white";
  const [activeFilter, setActiveFilter] = useState("Desktop");
  const [selectedProject, setSelectedProject] = useState(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [viewingImage, setViewingImage] = useState(null);
  const filteredProjects = PROJECTS.filter((project) => project.category === activeFilter);

  const selectedGallery = selectedProject?.gallery ?? [];

  useEffect(() => {
    if (!selectedGallery.length || viewingImage) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setGalleryIndex((current) => (current + 1) % selectedGallery.length);
    }, 2500);

    return () => window.clearInterval(interval);
  }, [selectedGallery.length, selectedProject, viewingImage]);

  return (
    <section
      id="projects"
      className={`relative min-h-[100svh] overflow-hidden px-6 py-20 sm:px-8 lg:px-10 scroll-mt-0 ${sectionClass}`}
    >
      <div className="mx-auto flex min-h-[calc(100svh-10rem)] max-w-7xl flex-col justify-center">
        <div className="flex flex-col gap-4 md:grid md:grid-cols-[0.92fr_1.08fr] md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
              Projects
            </p>
            <h2 className="mt-2 text-balance text-3xl font-semibold tracking-[-0.06em] text-white sm:text-4xl">
              Featured builds with a cleaner flow and a stronger visual story.
            </h2>
            <div className="mt-6 flex flex-nowrap gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {filterOptions.map((option) => {
                const isActive = activeFilter === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setActiveFilter(option)}
                    className={`shrink-0 rounded-full border px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition ${
                      isActive
                        ? isDark
                          ? "border-cyan-300 bg-cyan-300 text-[#07111f]"
                          : "border-cyan-500 bg-cyan-500 text-white"
                        : isDark
                          ? "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                          : "border-white/20 bg-white/10 text-white/80 hover:bg-white/15"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <article
              key={project.title}
              className={`group relative overflow-hidden rounded-[2rem] border shadow-[0_24px_70px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(15,23,42,0.12)] ${
                isDark
                  ? "border-white/10 bg-white/[0.06] backdrop-blur-md"
                  : "border-white/10 bg-white/[0.65] backdrop-blur-lg"
              }`}
            >
              <div className={`h-2 bg-gradient-to-r ${project.accent}`} />

              <div
                className={`flex items-center justify-between px-6 pt-6 text-xs font-semibold uppercase tracking-[0.2em] ${
                  isDark ? "text-white/45" : "text-slate-400"
                }`}
              >
                <span>0{index + 1}</span>
                <span className={`rounded-full border px-3 py-1 ${isDark ? "border-white/10 bg-white/10" : "border-slate-200 bg-slate-50 text-slate-600"}`}>
                  {project.year}
                </span>
              </div>

              <div className="px-6 pb-6 pt-5">
                {project.logo ? (
                  <div className="mb-6">
                    <div
                      className={`relative mx-auto aspect-square w-full max-w-[18rem] overflow-hidden rounded-[2rem] border p-3 shadow-[0_18px_40px_rgba(15,23,42,0.12)] ${
                        isDark ? "border-white/10 bg-white/10" : "border-slate-900/10 bg-white/55"
                      }`}
                    >
                      <Image
                        src={project.logo}
                        alt={`${project.title} logo`}
                        fill
                        sizes="(max-width: 768px) 100vw, 288px"
                        className="object-contain p-5"
                      />
                    </div>
                  </div>
                ) : null}

                <p className={`text-xs font-semibold uppercase tracking-[0.26em] ${isDark ? "text-white/45" : "text-slate-400"}`}>
                  {project.kind}
                </p>
                <h3 className={`mt-3 text-2xl font-semibold tracking-[-0.04em] ${isDark ? "text-white" : "text-slate-950"}`}>
                  {project.title}
                </h3>
                <p className={`mt-4 text-sm leading-7 ${isDark ? "text-white/70" : "text-slate-600"}`}>
                  {project.description}
                </p>

                {project.category === "Figma" ? null : (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${
                          isDark ? "border-white/10 bg-white/10 text-white/78" : "border-slate-900/10 bg-white/60 text-slate-700"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {project.figma ? (
                  <a
                    href={project.figma}
                    target="_blank"
                    rel="noreferrer"
                    className={`mt-6 inline-flex items-center gap-2 text-sm font-medium transition hover:gap-3 ${
                      isDark ? "text-blue-300 hover:text-blue-200" : "text-blue-700 hover:text-blue-800"
                    }`}
                  >
                    View Figma
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <path d="M5 12h14" />
                      <path d="m13 5 7 7-7 7" />
                    </svg>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setGalleryIndex(0);
                      setViewingImage(null);
                      setSelectedProject(project);
                    }}
                    className={`mt-6 inline-flex items-center gap-2 text-sm font-medium transition hover:gap-3 ${
                      isDark ? "text-blue-300 hover:text-blue-200" : "text-blue-700 hover:text-blue-800"
                    }`}
                  >
                    View Details
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <path d="M5 12h14" />
                      <path d="m13 5 7 7-7 7" />
                    </svg>
                  </button>
                )}

              </div>
            </article>
          ))}
        </div>
      </div>

      {selectedProject ? (
        <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto px-4 py-4 sm:items-center sm:py-6">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
            aria-label="Close project details"
            onClick={() => setSelectedProject(null)}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-details-title"
            className={`relative w-full max-w-4xl max-h-[90svh] overflow-y-auto rounded-[2rem] border shadow-[0_30px_90px_rgba(15,23,42,0.22)] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
              isDark ? "border-white/10 bg-[#07111f] text-white" : "border-white bg-white text-slate-950"
            }`}
          >
            <div className={`h-2 bg-gradient-to-r ${selectedProject.accent}`} />
            <div className="p-6 sm:p-8">
              {selectedGallery.length > 0 ? (
                <div
                  className={`relative mb-6 overflow-hidden rounded-[2rem] border shadow-[0_18px_40px_rgba(15,23,42,0.12)] ${
                    isDark ? "border-white/10 bg-white/10" : "border-slate-200 bg-slate-50"
                  }`}
                >
                  <div className="relative aspect-[21/9] w-full overflow-hidden">
                    <div
                      className="flex h-full w-full transition-transform duration-700 ease-out"
                      style={{ transform: `translateX(-${galleryIndex * 100}%)` }}
                    >
                      {selectedGallery.map((image, index) => (
                        <div key={image} className="relative h-full w-full shrink-0">
                          <button
                            type="button"
                            onClick={() =>
                              setViewingImage({
                                src: image,
                                alt: `${selectedProject.title} preview ${index + 1}`,
                              })
                            }
                            className="relative h-full w-full cursor-zoom-in"
                            aria-label={`Open ${selectedProject.title} image ${index + 1}`}
                          >
                            <Image
                              src={image}
                              alt={`${selectedProject.title} preview ${index + 1}`}
                              fill
                              sizes="(max-width: 768px) 100vw, 896px"
                              className="object-cover object-center"
                              priority={index === 0}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-black/45 to-transparent px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/85">
                      {selectedProject.title}
                    </p>
                    <div className="flex items-center gap-2">
                      {selectedGallery.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setGalleryIndex(index)}
                          className={`h-2.5 rounded-full transition-all ${
                            galleryIndex === index ? "w-7 bg-white" : "w-2.5 bg-white/50"
                          }`}
                          aria-label={`Show slide ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="grid gap-6 md:grid-cols-[1fr_1.1fr]">
                <div>
                  <p className={`text-xs font-semibold uppercase tracking-[0.26em] ${isDark ? "text-white/45" : "text-slate-400"}`}>
                    Full Details
                  </p>
                  <h3 id="project-details-title" className="mt-3 text-3xl font-semibold tracking-[-0.05em]">
                    {selectedProject.title}
                  </h3>
                  <p className={`mt-3 text-sm leading-7 ${isDark ? "text-white/70" : "text-slate-600"}`}>
                    {selectedProject.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {selectedProject.stack.map((tech) => (
                      <span
                        key={tech}
                        className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${
                          isDark ? "border-white/10 bg-white/10 text-white/78" : "border-slate-200 bg-slate-50 text-slate-600"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {selectedProject.figma ? (
                    <a
                      href={selectedProject.figma}
                      target="_blank"
                      rel="noreferrer"
                      className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold transition hover:gap-3 ${
                        isDark ? "text-cyan-300 hover:text-cyan-200" : "text-blue-700 hover:text-blue-800"
                      }`}
                    >
                      View Figma
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="M5 12h14" />
                        <path d="m13 5 7 7-7 7" />
                      </svg>
                    </a>
                  ) : selectedProject.githubPrivate ? (
                    <div className="mt-6 text-sm font-medium italic text-red-500">
                      Private repository
                    </div>
                  ) : selectedProject.github ? (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noreferrer"
                      className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold transition hover:gap-3 ${
                        isDark ? "text-cyan-300 hover:text-cyan-200" : "text-blue-700 hover:text-blue-800"
                      }`}
                    >
                      View Github
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="M5 12h14" />
                        <path d="m13 5 7 7-7 7" />
                      </svg>
                    </a>
                  ) : null}
                </div>

                <div className={`rounded-[1.5rem] border p-5 ${isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-slate-50"}`}>
                  <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${isDark ? "text-white/45" : "text-slate-400"}`}>
                    What it includes
                  </p>
                  <ul className={`mt-4 space-y-3 text-sm leading-7 ${isDark ? "text-white/75" : "text-slate-600"}`}>
                    {selectedProject.details?.map((detail) => (
                      <li key={detail} className="flex gap-3">
                        <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${isDark ? "bg-blue-300" : "bg-blue-600"}`} />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {viewingImage ? (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-4 py-6">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            aria-label="Close image preview"
            onClick={() => setViewingImage(null)}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label={viewingImage.alt}
            className="relative z-10 w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-[0_30px_90px_rgba(15,23,42,0.35)]"
          >
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={viewingImage.src}
                alt={viewingImage.alt}
                fill
                sizes="100vw"
                className="object-contain bg-black"
                priority
              />
            </div>

            <button
              type="button"
              onClick={() => setViewingImage(null)}
              className="absolute right-4 top-4 z-20 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
