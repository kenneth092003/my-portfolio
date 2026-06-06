const projects = [
  {
    title: "DuriaScan",
    description:
      "An AI-assisted mobile app for identifying plant health issues with clean flows and structured results.",
    tech: ["Kotlin", "TensorFlow Lite", "Firebase"],
    link: "#contact",
    summary:
      "Mobile-first interface with quick scan actions, readable result states, and helpful feedback.",
  },
  {
    title: "Portfolio System",
    description:
      "A refined personal site template built to showcase work, services, and contact details clearly.",
    tech: ["Next.js", "Tailwind CSS", "TypeScript"],
    link: "#contact",
    summary:
      "A modular site structure with flexible sections that can scale from personal brand to client work.",
  },
  {
    title: "Product Landing",
    description:
      "A conversion-focused landing page concept with premium spacing, bold typography, and strong CTA hierarchy.",
    tech: ["React", "Motion", "Design Systems"],
    link: "#contact",
    summary:
      "Focused on message clarity, stronger CTA rhythm, and a smoother path from curiosity to action.",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative px-6 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 md:grid md:grid-cols-[0.92fr_1.08fr] md:items-end">
          <div className="max-w-lg">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-amber-400">
              Featured work
            </p>
            <h2 className="mt-2 text-balance text-3xl font-semibold tracking-[-0.06em] text-[color:var(--foreground)] sm:text-4xl">
              Selected projects with a focus on clarity, polish, and user flow.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[color:var(--muted)] md:justify-self-end md:text-right">
            These are sample highlights you can keep, replace, or expand once you want the
            portfolio to showcase your latest real client or school work.
          </p>
        </div>

        <div className="mt-10 grid gap-5">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="depth-panel overflow-hidden rounded-[2rem] transition duration-300 hover:-translate-y-1"
            >
              <div className="h-2 bg-gradient-to-r from-amber-400 via-orange-300 to-amber-200" />
              <div className="grid gap-6 p-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
                <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/5 p-5 shadow-[0_18px_35px_rgba(0,0,0,0.18)]">
                  <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-amber-400/15 blur-2xl" />
                  <div className="flex items-center justify-between text-sm text-white/50">
                    <span>0{index + 1}</span>
                    <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/80">
                      Case study
                    </span>
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/65">{project.description}</p>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5 shadow-[0_16px_30px_rgba(0,0,0,0.16)]">
                    <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/45">
                      What it does
                    </p>
                    <p className="mt-2 text-sm leading-7 text-white/78">{project.summary}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/78 shadow-[0_10px_20px_rgba(0,0,0,0.14)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.link}
                    className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-300 transition hover:bg-amber-400/15"
                  >
                    Explore details
                    <span aria-hidden="true">-&gt;</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
