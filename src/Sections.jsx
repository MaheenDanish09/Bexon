import { useEffect, useRef } from "react";
import gsap from "gsap";

/* Shared bits */

export const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M7 17L17 7M8 7h9v9" /></svg>
);

const H2 = ({ children, className = "" }) => (
  <h2 className={`text-4xl font-semibold leading-tight text-[#0a2723] ${className}`}>{children}</h2>
);

function useScroller() {
  const ref = useRef(null);
  const by = (d) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: d * ((el.firstChild?.offsetWidth || 300) + 20), behavior: "smooth" });
  };
  return [ref, by];
}

const Arrows = ({ by, dark }) => (
  <div className="flex gap-2">
    {["‹", "›"].map((c, i) => (
      <button key={c} onClick={() => by(i ? 1 : -1)} aria-label={i ? "Next" : "Previous"}
        className={`grid h-11 w-11 place-items-center rounded-full border text-xl ${dark ? "border-white/30 text-white hover:bg-white/10" : "border-[#0a2723]/20 text-[#0a2723] hover:bg-white"}`}>{c}</button>
    ))}
  </div>
);

/* Client logos: endless GSAP loop */
export function Marquee() {
  const r = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = gsap.to(r.current, { xPercent: -50, repeat: -1, duration: 28, ease: "none" });
    return () => t.kill();
  }, []);
  return (
    <section className="overflow-hidden py-14" aria-label="Our clients">
      <div ref={r} className="flex w-max">
        {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((n, i) => (
          <img key={i} src={`/brand-${n}.webp`} alt="" className="mr-5 h-20 w-60 shrink-0 rounded-xl object-cover" />
        ))}
      </div>
    </section>
  );
}

export function About() {
  return (
    <section className="mx-auto grid max-w-6xl gap-5 px-4 py-24 lg:grid-cols-[1fr_1.1fr]">
      <div className="relative">
        <img src="/about-1.webp" alt="Bexon leadership team" className="h-full min-h-[460px] w-full rounded-3xl object-cover" />
        <div className="absolute bottom-0 left-0 rounded-tr-3xl bg-[#e8f0ed] p-6">
          <p className="text-5xl font-semibold text-[#0a2723]">13+</p>
          <p className="text-sm text-[#0a2723]/65">Years of experience</p>
        </div>
      </div>
      <div className="grid gap-5">
        <div className="rounded-3xl bg-white p-8">
          <H2>We turn plans into results people can see.</H2>
          <a href="#" className="mt-6 inline-flex items-center gap-3 font-semibold text-[#0a2723]">
            Learn more <span className="grid h-9 w-9 place-items-center rounded-full bg-[#0a2723] text-white"><Arrow /></span>
          </a>
        </div>
        <div className="grid gap-5 sm:grid-cols-[1.4fr_1fr]">
          <figure className="rounded-3xl bg-[#0e8f86] p-6 text-white">
            <blockquote>We build lasting relationships with clients through trust, fresh ideas and steady service.</blockquote>
            <figcaption className="mt-8 font-semibold">Name Surname<span className="block text-sm font-normal text-white/75">Co-founder</span></figcaption>
          </figure>
          <img src="/about-2.webp" alt="Bexon consultant" className="min-h-[220px] h-full w-full rounded-3xl object-cover" />
        </div>
      </div>
    </section>
  );
}

const svc = [
  ["Business strategy", "Roadmaps and growth plans built around your goals.", "/service-5.webp"],
  ["Customer experience", "Journeys that keep clients coming back.", "/service-6.webp"],
  ["Sustainability consulting", "ESG reporting, targets and tracking.", "/service-7.webp"],
  ["Training programs", "Workshops that build skills inside your team.", "/about-2.webp"],
  ["IT support", "Maintenance and monitoring that keeps you running.", "/project-4.webp"],
  ["Marketing campaigns", "Plan, launch and measure with clear results.", "/project-3.webp"],
];

export function ServicesSlider() {
  const [ref, by] = useScroller();
  return (
    <section className="mx-3 rounded-3xl bg-[#0a2723] py-20">
      <div className="mx-auto flex max-w-6xl items-end justify-between gap-6 px-4">
        <H2 className="max-w-md !text-white">Solutions built around your business</H2>
        <Arrows by={by} dark />
      </div>
      <div ref={ref} className="mx-auto mt-12 flex max-w-6xl snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 [scrollbar-width:none]">
        {svc.map(([t, d, image]) => (
          <article key={t} className="w-[85%] shrink-0 snap-start rounded-2xl bg-white/5 p-8 sm:w-[calc(33.333%-14px)]">
            <img src={image} alt="" className="h-36 w-full rounded-xl object-cover" />
            <h3 className="mt-6 text-xl font-semibold text-white">{t}</h3>
            <p className="mt-3 text-sm text-white/65">{d}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const proj = [
  ["Connect", "Event management platform", "lg:col-span-2", "/project-1.webp"],
  ["Empower", "Digital marketing campaign", "", "/project-3.webp"],
  ["Support", "Interactive learning platform", "", "/project-4.webp"],
  ["Business", "Environmental impact dashboard", "lg:col-span-2", "/cta-bg.webp"],
];

export function Projects() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <H2 className="max-w-md">Work we're proud of</H2>
        <p className="max-w-xs text-[#0a2723]/65">We work closely with clients to understand their needs and shape solutions around them.</p>
      </div>
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {proj.map(([tag, t, span, image]) => (
          <a key={t} href="#" className={`relative block min-h-[300px] overflow-hidden rounded-2xl ${span}`}>
            <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0a2723]/85 to-transparent p-6 text-white">
              <span className="rounded bg-white/20 px-2 py-1 text-xs">{tag}</span>
              <h3 className="mt-3 text-xl font-semibold">{t}</h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

const quotes = [
  ["Devon Lane", "They delivered outstanding results year after year, and the team is always proactive and responsive."],
  ["Guy Hawkins", "A game-changer for our operations. We reached our goals faster than we had planned."],
  ["Ralph Edwards", "They understood our vision and brought ideas that took the business to the next level."],
];

export function Testimonials() {
  const [ref, by] = useScroller();
  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      <div className="flex items-end justify-between gap-6">
        <H2 className="max-w-md">Clients say it best</H2>
        <Arrows by={by} />
      </div>
      <div ref={ref} className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none]">
        {quotes.map(([n, q], i) => (
          <figure key={n} className={`w-[90%] shrink-0 snap-start rounded-2xl bg-white p-8 sm:w-[calc(33.333%-14px)] ${i === 1 ? "ring-2 ring-[#0e8f86]" : ""}`}>
            <blockquote className="text-[#0a2723]/70">{q}</blockquote>
            <figcaption className="mt-8 flex items-center gap-3 border-t border-dashed border-[#0a2723]/20 pt-5">
              <img src={`/client-${i + 1}.webp`} alt="" className="h-12 w-12 rounded-full object-cover" />
              <span className="font-semibold text-[#0a2723]">{n}<span className="block text-sm font-normal text-[#0a2723]/60">Co-founder</span></span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

const field = "mt-1 w-full border-0 border-b border-white/30 bg-transparent px-0 py-2 text-white focus:border-[#3fc5ba] focus:ring-0";

export function Contact() {
  return (
    <section id="contact" className="mx-3 grid overflow-hidden rounded-3xl bg-[#0a2723] lg:grid-cols-2">
      <div className="relative min-h-[300px] overflow-hidden">
        <img src="/cta-bg.webp" alt="Bexon team ready to help" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[#0a2723]/55" />
        <div className="absolute bottom-8 left-8 rounded-2xl border border-white/20 bg-[#0a2723]/70 p-5 text-white backdrop-blur-sm">
          <p className="text-sm text-white/70">Global support</p>
          <p className="mt-1 text-xl font-semibold">Available worldwide</p>
        </div>
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="m-4 grid gap-6 rounded-2xl bg-white/5 p-8 sm:grid-cols-2">
        <h2 className="text-4xl font-semibold text-white sm:col-span-2">Drop us a line</h2>
        {[["Full name", "text"], ["Email address", "email"], ["Phone number", "tel"]].map(([l, t]) => (
          <label key={l} className="text-sm text-white/70">{l}<input type={t} required className={field} /></label>
        ))}
        <label className="text-sm text-white/70">Topic
          <select className={field}>{["Strategy", "Training", "IT support", "Marketing"].map((o) => <option key={o} className="text-black">{o}</option>)}</select>
        </label>
        <label className="text-sm text-white/70 sm:col-span-2">Message<textarea rows="4" required className={field} /></label>
        <button className="flex w-fit items-center gap-3 rounded-full bg-[#0e8f86] py-1.5 pl-6 pr-1.5 font-semibold text-white">
          Send message <span className="grid h-9 w-9 place-items-center rounded-full bg-[#0a2723]"><Arrow /></span>
        </button>
      </form>
    </section>
  );
}

const posts = [
  ["Innovative solutions for every business", "28 Feb", "/blog-1.webp"],
  ["Harnessing digital change into a roadmap", "28 Feb", "/blog-2.webp"],
  ["Mastering change management", "28 Feb", "/blog-3.webp"],
];

export function Blog() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      <H2 className="text-center">The latest from our team</H2>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {posts.map(([t, d, image]) => (
          <article key={t} className="overflow-hidden rounded-2xl bg-white">
            <div className="relative">
              <img src={image} alt="" className="h-60 w-full object-cover" />
              <time className="absolute left-4 top-4 rounded-lg bg-white/90 px-3 py-2 text-sm font-semibold text-[#0a2723]">{d}</time>
            </div>
            <div className="p-6">
              <p className="text-sm text-[#0a2723]/60"><span className="rounded border border-[#0a2723]/20 px-2 py-0.5 text-[#0a2723]">Business</span> By Author Name</p>
              <h3 className="mt-4 text-xl font-semibold text-[#0a2723]">{t}</h3>
              <a href="#" className="mt-4 inline-flex items-center gap-2 font-semibold text-[#0a2723]">Read more <span className="grid h-8 w-8 place-items-center rounded-full bg-[#0a2723] text-white"><Arrow /></span></a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
