import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Arrow, Marquee, About, ServicesSlider, Projects, Testimonials, Contact, Blog } from "./Sections";

gsap.registerPlugin(ScrollTrigger);

/* Palette: ink #0a2723 · teal #0e8f86 · mist #e8f0ed · white
   Font: Plus Jakarta Sans (add the Google Fonts link in index.html) */

const FONT = { fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" };

function Logo({ light }) {
  return (
    <a href="#top" className={`flex items-center gap-2 text-2xl font-bold tracking-tight ${light ? "text-white" : "text-[#0a2723]"}`}>
      <svg width="30" height="30" viewBox="0 0 32 32">
        <circle cx="12" cy="16" r="9" fill="#0e8f86" />
        <circle cx="20" cy="16" r="9" fill="#0e8f86" fillOpacity=".55" />
      </svg>
      Bexon
    </a>
  );
}

/* ---------- Navbar with three different hover dropdowns ---------- */
const services = [
  ["Business strategy", "Roadmaps and growth plans"],
  ["Customer experience", "Journeys that keep clients"],
  ["Sustainability consulting", "ESG reporting and targets"],
  ["Training programs", "Workshops for your team"],
  ["IT support", "Maintenance and monitoring"],
  ["Marketing campaigns", "Plan, launch, measure"],
];
const portfolio = ["All projects", "Project details"];
const pages = {
  "Company": ["About us", "Our history", "Team", "Team details", "Careers", "Pricing", "FAQ", "Contact"],
  "Content": ["Services", "Service details", "Portfolio", "Blog grid", "Blog list", "Blog details", "Gallery", "Error 404"],
  "Shop": ["Shop", "Product details", "Cart", "Checkout", "Wishlist", "My account", "Login", "Register"],
};

function Navbar() {
  const [open, setOpen] = useState(null);
  const [mob, setMob] = useState(false);
  const link = "flex items-center gap-1 rounded-lg px-3 py-2 text-[15px] font-medium text-[#0a2723] transition hover:text-[#0e8f86]";
  const chev = (k) => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
      className={`transition-transform ${open === k ? "rotate-180" : ""}`}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
  const panel = (k) =>
    `absolute top-full z-50 pt-3 transition duration-200 ${open === k ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0"}`;

  return (
    <header className="fixed inset-x-3 top-3 z-50" onMouseLeave={() => setOpen(null)}>
      <div className="relative mx-auto max-w-[1400px]">
        <div className="flex items-center justify-between rounded-2xl bg-white px-6 py-3 shadow-sm">
          <Logo />
          <nav className="hidden items-center lg:flex">
            <div onMouseEnter={() => setOpen("home")}><a href="#top" className={link}>Home</a></div>

            {/* Pages: wide mega menu */}
            <div onMouseEnter={() => setOpen("pages")}>
              <button className={link}>Pages {chev("pages")}</button>
              <div className={`${panel("pages")} left-0 right-0`}>
                <div className="grid grid-cols-4 gap-6 rounded-2xl bg-white p-8 shadow-xl">
                  {Object.entries(pages).map(([title, items]) => (
                    <div key={title}>
                      <h4 className="mb-4 border-b border-[#0e8f86]/30 pb-2 text-sm font-bold text-[#0a2723]">{title}</h4>
                      <ul className="space-y-2.5">
                        {items.map((i) => (
                          <li key={i}><a href="#" className="text-sm text-[#0a2723]/70 hover:text-[#0e8f86]">{i}</a></li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="flex flex-col justify-between rounded-xl bg-[#0a2723] p-5 text-white">
                    <div>
                      <p className="text-2xl font-bold leading-tight">Plan your next move</p>
                      <p className="mt-2 text-sm text-white/70">Book a free 30-minute call.</p>
                    </div>
                    <img src="/cta-bg.webp" alt="Bexon consultation" className="mt-4 h-28 w-full rounded-lg object-cover" />
                  </div>
                </div>
              </div>
            </div>

            {/* Services: icon + title + description list */}
            <div className="relative" onMouseEnter={() => setOpen("services")}>
              <button className={link}>Services {chev("services")}</button>
              <div className={`${panel("services")} left-0 w-[340px]`}>
                <ul className="rounded-2xl bg-white p-3 shadow-xl">
                  {services.map(([t, d]) => (
                    <li key={t}>
                      <a href="#services" className="flex items-center gap-3 rounded-xl p-3 hover:bg-[#e8f0ed]">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0e8f86]/15 text-sm font-bold text-[#0e8f86]">{t[0]}</span>
                        <span><span className="block text-sm font-semibold text-[#0a2723]">{t}</span><span className="block text-xs text-[#0a2723]/60">{d}</span></span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Portfolio: short plain list */}
            <div className="relative" onMouseEnter={() => setOpen("portfolio")}>
              <button className={link}>Portfolio {chev("portfolio")}</button>
              <div className={`${panel("portfolio")} left-0 w-52`}>
                <ul className="rounded-2xl bg-white p-2 shadow-xl">
                  {portfolio.map((i) => (
                    <li key={i}><a href="#" className="block rounded-lg px-4 py-2.5 text-sm font-medium text-[#0a2723] hover:bg-[#e8f0ed] hover:text-[#0e8f86]">{i}</a></li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative" onMouseEnter={() => setOpen("blog")}>
              <button className={link}>Blog {chev("blog")}</button>
              <div className={`${panel("blog")} left-0 w-48`}>
                <ul className="rounded-2xl bg-white p-2 shadow-xl">
                  {["Blog grid", "Blog list", "Blog details"].map((i) => (
                    <li key={i}><a href="#" className="block rounded-lg px-4 py-2.5 text-sm font-medium text-[#0a2723] hover:bg-[#e8f0ed] hover:text-[#0e8f86]">{i}</a></li>
                  ))}
                </ul>
              </div>
            </div>

            <div onMouseEnter={() => setOpen("contact")}><a href="#contact" className={link}>Contact</a></div>
          </nav>
          <button onClick={() => setMob(!mob)} aria-label="Menu" aria-expanded={mob} className="grid h-10 w-10 place-items-center rounded-full bg-[#e8f0ed] lg:hidden">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0a2723" strokeWidth="2.2"><path d={mob ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"} /></svg>
          </button>
          <a href="#contact" className="flex items-center gap-3 rounded-full bg-[#0e8f86] py-1.5 pl-5 pr-1.5 text-sm font-semibold text-white transition hover:bg-[#0b7a72]">
            Let's talk
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#0a2723]"><Arrow /></span>
          </a>
        </div>
        {mob && (
          <nav className="mt-2 rounded-2xl bg-white p-4 shadow-xl lg:hidden">
            {["Home", "Pages", "Services", "Portfolio", "Blog", "Contact"].map((l) => (
              <a key={l} href={l === "Contact" ? "#contact" : "#top"} onClick={() => setMob(false)} className="block rounded-lg px-3 py-3 font-medium text-[#0a2723] hover:bg-[#e8f0ed]">{l}</a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

/* ---------- Sections ---------- */
function Hero() {
  return (
    <section id="top" className="grid gap-3 p-3 pt-24 lg:grid-cols-[1.1fr_1fr]">
      <div className="flex min-h-[560px] flex-col justify-center rounded-3xl bg-[#0a2723] p-8 text-white lg:p-16">
        <p className="hero-in mb-6 w-fit rounded-md border border-dashed border-white/30 px-3 py-1.5 text-sm text-white/80">Trusted by 1,000+ companies</p>
        <h1 className="hero-in text-4xl font-semibold leading-[1.1] sm:text-6xl">
          Strategy that keeps <span className="text-[#3fc5ba]">growing</span> with you.
        </h1>
        <p className="hero-in mt-6 max-w-md text-white/70">
          We help growing teams plan, launch and measure the work that moves their business forward.
        </p>
        <a href="#services" className="hero-in mt-8 flex w-fit items-center gap-3 rounded-full bg-white py-1.5 pl-6 pr-1.5 font-semibold text-[#0a2723]">
          See our work <span className="grid h-9 w-9 place-items-center rounded-full bg-[#0e8f86] text-white"><Arrow /></span>
        </a>
      </div>
      <img src="/hero-img.webp" alt="Bexon business consultant working" className="hero-in min-h-[420px] h-full w-full rounded-3xl object-cover" />
    </section>
  );
}

const features = [
  ["Fresh thinking", "We test new ideas early so your plan stays ahead of the market."],
  ["Proven results", "Our team has delivered measurable growth across hundreds of projects."],
  ["Always reachable", "A named contact answers questions quickly, every step of the way."],
];

function Features() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-24">
      <h2 className="reveal mx-auto max-w-xl text-center text-4xl font-semibold text-[#0a2723]">Why teams choose to work with us</h2>
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {features.map(([t, d]) => (
          <article key={t} className="reveal rounded-2xl bg-white p-8">
            <span className="mb-12 grid h-14 w-14 place-items-center rounded-xl bg-[#0e8f86]/15 text-xl font-bold text-[#0e8f86]">{t[0]}</span>
            <h3 className="text-xl font-semibold text-[#0a2723]">{t}</h3>
            <p className="mt-3 text-[#0a2723]/65">{d}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const stats = [[93, "%", "Projects completed"], [20, "M", "Reach worldwide"], [8, "x", "Faster growth"], [100, "+", "Awards won"]];

function Stats() {
  return (
    <section className="mx-auto max-w-6xl px-4">
      <div className="grid grid-cols-2 gap-y-8 rounded-3xl bg-[#0e8f86] p-10 text-center text-white lg:grid-cols-4">
        {stats.map(([n, s, l]) => (
          <div key={l} className="lg:border-r lg:border-dashed lg:border-white/30 lg:last:border-0">
            <div className="text-5xl font-semibold"><span className="count" data-end={n} data-suffix={s}>0{s}</span></div>
            <p className="mt-2 text-sm text-white/85">{l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const faqs = [
  ["What services do you offer?", "Strategy, customer experience, training, IT support and marketing — scoped to what your team needs."],
  ["How do I get started?", "Send us a message or book a call. We schedule a short consultation and share a proposal within a few days."],
  ["How long does a project take?", "Most engagements run four to twelve weeks, depending on scope."],
  ["Can I track progress?", "Yes. You get a shared dashboard and a weekly summary from your named contact."],
];

function Faq() {
  const [i, setI] = useState(0);
  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-4 py-24 lg:grid-cols-2">
      <div className="relative">
        <img src="/about-2.webp" alt="Bexon consultant providing support" className="h-full min-h-[420px] w-full rounded-3xl object-cover" />
        <div className="absolute bottom-4 right-4 w-56 rounded-2xl bg-[#0e8f86] p-5 text-white">
          <p className="text-lg font-semibold">Free call</p>
          <p className="mt-1 text-sm underline">+1 (000) 000-0000</p>
        </div>
      </div>
      <div className="space-y-3">
        {faqs.map(([q, a], k) => (
          <div key={q} className="rounded-2xl bg-white px-6">
            <button onClick={() => setI(i === k ? -1 : k)} className="flex w-full items-center justify-between py-5 text-left font-semibold text-[#0a2723]" aria-expanded={i === k}>
              {q}
              <span className="grid h-8 w-8 place-items-center rounded-full border border-[#0e8f86] text-[#0e8f86]">{i === k ? "–" : "+"}</span>
            </button>
            <div className={`grid transition-all duration-300 ${i === k ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}>
              <p className="overflow-hidden text-[#0a2723]/65">{a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="footer" className="p-3">
      <div className="mx-auto grid max-w-6xl items-center gap-6 rounded-3xl bg-[#0e8f86] p-10 text-white md:grid-cols-2">
        <div>
          <h2 className="text-4xl font-semibold leading-tight">Ready to plan what's next?</h2>
          <a href="#" className="mt-6 flex w-fit items-center gap-3 rounded-full bg-[#0a2723] py-1.5 pl-6 pr-1.5 font-semibold">
            Get started <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-[#0a2723]"><Arrow /></span>
          </a>
        </div>
        <img src="/cta-bg.webp" alt="Bexon team" className="h-48 w-full rounded-2xl object-cover" />
      </div>
      <div className="mx-auto mt-10 grid max-w-6xl gap-8 px-4 pb-8 text-[#0a2723] md:grid-cols-4">
        <div><Logo /><p className="mt-4 text-sm text-[#0a2723]/65">Clear plans and steady support for growing teams.</p></div>
        {[["Services", ["Strategy", "Customer experience", "Training", "IT support"]], ["Resources", ["Contact", "Team", "Careers", "News"]]].map(([t, l]) => (
          <div key={t}><h4 className="font-semibold">{t}</h4><ul className="mt-3 space-y-2 text-sm text-[#0a2723]/65">{l.map((x) => <li key={x}><a href="#" className="hover:text-[#0e8f86]">{x}</a></li>)}</ul></div>
        ))}
        <div>
          <h4 className="font-semibold">Newsletter</h4>
          <input type="email" placeholder="Your email" className="mt-3 w-full rounded-xl border-0 bg-white px-4 py-3 text-sm focus:ring-2 focus:ring-[#0e8f86]" />
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      // One orchestrated entrance for the hero
      gsap.from(".hero-in", { y: 28, opacity: 0, stagger: 0.12, duration: 0.9, ease: "power3.out" });
      // Quiet scroll reveals
      gsap.utils.toArray(".reveal").forEach((el) =>
        gsap.from(el, { y: 32, opacity: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } })
      );
      // Counters
      gsap.utils.toArray(".count").forEach((el) => {
        const o = { v: 0 };
        gsap.to(o, {
          v: +el.dataset.end, duration: 1.6, ease: "power1.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
          onUpdate: () => (el.textContent = Math.round(o.v) + el.dataset.suffix),
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div style={FONT} className="min-h-screen bg-[#e8f0ed] antialiased">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Features />
        <About />
        <ServicesSlider />
        <Projects />
        <Stats />
        <Testimonials />
        <Faq />
        <Contact />
        <Blog />
      </main>
      <Footer />
    </div>
  );
}
