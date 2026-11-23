import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import {
  Phone, Mail, MapPin, Menu, X, ChevronDown, HeartHandshake, Users, Star, Activity,
  Dumbbell, Droplets, Crosshair, Baby, Clock, Facebook, MessageCircle, Plus,
} from "lucide-react";
import logo from "@/assets/kinepeer-logo.png.asset.json";

const HERO = "https://images.unsplash.com/photo-1645005513713-9e2b92a687d3?auto=format&fit=crop&w=1400&q=80";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ontwerpvoorstel KinePeer | Atelier Smits" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Ontwerpvoorstel door Atelier Smits. Geen officiële website van KinePeer." },
      { property: "og:title", content: "Ontwerpvoorstel KinePeer | Atelier Smits" },
      { property: "og:description", content: "Ontwerpvoorstel door Atelier Smits. Geen officiële website van KinePeer." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: HERO },
      { name: "twitter:image", content: HERO },
    ],
  }),
  component: Index,
});

const TEL = "+32475917306";
const SPECS = [
  { id: "kinesitherapie", icon: Activity, title: "Kinesitherapie & manuele therapie", text: "Gerichte behandeling van rug-, nek- en gewrichtsklachten met oefentherapie en manuele technieken. We zoeken de oorzaak, niet enkel het symptoom.", who: "Voor iedereen met pijn of stijfheid, en voor revalidatie na een operatie.", more: "Na een grondig onderzoek stellen we samen een behandelplan op. Je krijgt oefeningen mee voor thuis, zodat je zelf actief bijdraagt aan je herstel." },
  { id: "sportkine", icon: Dumbbell, title: "Sportkine", text: "Van een verstuikte enkel tot een hardnekkige knieblessure: we begeleiden je stap voor stap terug naar je sport.", who: "Recreatieve en competitiesporters, jong en oud.", more: "We werken aan kracht, stabiliteit en belastbaarheid, met aandacht voor blessurepreventie. Zo keer je veilig én sterker terug." },
  { id: "lymfedrainage", icon: Droplets, title: "Lymfedrainage", text: "Een zachte massagetechniek die vochtophoping vermindert en het lymfesysteem ondersteunt.", who: "Mensen met oedeem, na operaties of na kankerbehandelingen.", more: "Lymfedrainage wordt vaak gecombineerd met compressie en oefeningen. We stemmen de behandeling af op jouw situatie en volgen ze nauw op." },
  { id: "dry-needling", icon: Crosshair, title: "Dry needling", text: "Met een fijne naald behandelen we triggerpoints in gespannen spieren. Dat geeft vaak snel verlichting.", who: "Wie last heeft van hardnekkige spierpijn, spanning of hoofdpijn.", more: "Dry needling is een aanvulling op je behandeling, nooit een losstaande oplossing. We combineren het steeds met oefentherapie." },
  { id: "prenataal", icon: Baby, title: "Pre- en postnatale kine", text: "Begeleiding tijdens de zwangerschap en na de bevalling, met bijzondere aandacht voor de bekkenbodem.", who: "Aanstaande en jonge mama's.", more: "We helpen bij bekkenpijn, rugklachten en incontinentie, en werken aan een veilig herstel van buikspieren en bekkenbodem na de bevalling." },
];
const TEAM: { name: string; initials: string; role: string; tags: string[] }[] = [
  { name: "Frank Luijs", initials: "FL", role: "Kinesitherapeut, zaakvoerder", tags: [] },
  { name: "Silke Vranken", initials: "SV", role: "Team KinePeer", tags: [] },
  { name: "Jelle Van der Have", initials: "JV", role: "Team KinePeer", tags: [] },
];
const FAQ = [
  ["Hoe maak ik een afspraak?", "Bel ons op 0475 91 73 06. Krijg je ons niet meteen te pakken? Of vraag online een afspraak aan via het formulier onderaan, of stuur een WhatsApp. Tijdens behandelingen nemen we niet altijd op, maar we bellen je zo snel mogelijk terug."],
  ["Heb ik een voorschrift nodig?", "Voor terugbetaling heb je een voorschrift van je huisarts of specialist nodig. Zonder voorschrift kan je ook terecht, maar dan krijg je geen tussenkomst van de mutualiteit."],
  ["Hoe zit het met terugbetaling via de mutualiteit?", "Met een voorschrift betaalt de mutualiteit een groot deel van je behandeling terug. Je betaalt bij ons en krijgt een getuigschrift dat je bij je mutualiteit indient. Sommige aanvullende verzekeringen komen ook tussen in bijvoorbeeld dry needling."],
  ["Wat breng ik mee naar mijn eerste afspraak?", "Je identiteitskaart, je voorschrift, een handdoek en makkelijke kleding waarin je vlot kan bewegen. Heb je verslagen of beelden van onderzoeken? Breng die zeker ook mee."],
  ["Wat als ik moet annuleren?", "Laat het ons minstens 24 uur op voorhand weten. Zo kunnen we iemand anders helpen. Niet-verwittigde afspraken kunnen we aanrekenen."],
  ["Is er parking?", "Ja, je kan gratis parkeren vlak bij de praktijk."],
];
const NAV = [["Home", "#home"], ["Team", "#team"], ["Specialisaties", "#specialisaties"], ["Praktisch", "#praktisch"], ["Contact", "#contact"]];

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <div className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}
function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-accent">{children}</p>;
}
const btn = "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all";
const btnAccent = `${btn} bg-accent text-accent-foreground shadow-soft hover:-translate-y-0.5 hover:shadow-lift`;
const btnOutline = `${btn} border border-primary/25 text-primary hover:bg-primary hover:text-primary-foreground`;

function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dd, setDd] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  const submit = (e: FormEvent) => { e.preventDefault(); setSent(true); (e.target as HTMLFormElement).reset(); };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* CONCEPT BANNER */}
      <div role="note" className="fixed inset-x-0 top-0 z-[60] flex h-9 items-center justify-center bg-foreground px-4 text-center text-xs font-medium text-background sm:text-sm">
        <span className="sm:hidden">Ontwerpvoorstel Atelier Smits – geen officiële website</span>
        <span className="hidden sm:inline">Ontwerpvoorstel door Atelier Smits – geen officiële website van KinePeer</span>
      </div>

      {/* HEADER */}
      <header className={`fixed inset-x-0 top-9 z-40 transition-all duration-300 ${scrolled ? "bg-background/90 shadow-soft backdrop-blur-md" : ""}`}>
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5">
          <a href="#home" className="shrink-0"><img src={logo.url} alt="KinePeer – Groepspraktijk Frank Luijs" className="h-14 w-auto sm:h-16" /></a>
          <nav className="hidden items-center gap-8 text-sm font-medium lg:flex">
            {NAV.map(([l, h]) => l === "Specialisaties" ? (
              <div key={l} className="relative" onMouseEnter={() => setDd(true)} onMouseLeave={() => setDd(false)}>
                <a href={h} className="flex items-center gap-1 hover:text-accent">{l} <ChevronDown className="h-4 w-4" /></a>
                <div className={`absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3 transition-all ${dd ? "visible opacity-100" : "invisible opacity-0"}`}>
                  <div className="rounded-2xl border border-border bg-card p-2 shadow-lift">
                    {SPECS.map((s) => <a key={s.id} href={`#${s.id}`} onClick={() => setDd(false)} className="block rounded-xl px-4 py-2.5 hover:bg-secondary">{s.title}</a>)}
                  </div>
                </div>
              </div>
            ) : <a key={l} href={h} className="hover:text-accent">{l}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <div className="hidden lg:block"><a href={`tel:${TEL}`} className={btnAccent}><Phone className="h-4 w-4" />Bel voor een afspraak</a></div>
            <a href={`tel:${TEL}`} aria-label="Bel voor een afspraak" className="grid h-11 w-11 place-items-center rounded-full bg-accent text-accent-foreground lg:hidden"><Phone className="h-4 w-4" /></a>
            <button aria-label="Menu openen" onClick={() => setOpen(true)} className="grid h-11 w-11 place-items-center rounded-full border border-border lg:hidden"><Menu className="h-5 w-5" /></button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div className={`fixed inset-x-0 bottom-0 top-9 z-50 flex flex-col bg-primary text-primary-foreground transition-all duration-300 lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}>
        <div className="flex h-20 items-center justify-end px-5">
          <button aria-label="Menu sluiten" onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center rounded-full border border-primary-foreground/30"><X className="h-5 w-5" /></button>
        </div>
        <nav className="flex flex-1 flex-col gap-2 overflow-y-auto px-8 pb-10">
          {NAV.map(([l, h]) => (
            <div key={l}>
              <a href={h} onClick={() => setOpen(false)} className="block py-2 font-serif text-4xl">{l}</a>
              {l === "Specialisaties" && <div className="mb-2 ml-1 flex flex-col gap-1 border-l border-primary-foreground/20 pl-4">
                {SPECS.map((s) => <a key={s.id} href={`#${s.id}`} onClick={() => setOpen(false)} className="py-1 text-primary-foreground/75">{s.title}</a>)}
              </div>}
            </div>
          ))}
          <a href={`tel:${TEL}`} className={`${btnAccent} mt-auto`}><Phone className="h-4 w-4" />Bel 0475 91 73 06</a>
        </nav>
      </div>

      {/* WHATSAPP */}
      <a href="https://wa.me/32475917306" target="_blank" rel="noreferrer" aria-label="Stuur ons een WhatsApp" className="fixed bottom-5 right-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-primary-foreground shadow-lift transition-transform hover:scale-110">
        <MessageCircle className="h-7 w-7" />
      </a>

      <main>
        {/* HERO */}
        <section id="home" className="mx-auto max-w-7xl px-5 pb-20 pt-36 lg:pt-44">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
            <Reveal>
              <Eyebrow>Kinesitherapie in Peer</Eyebrow>
              <h1 className="text-4xl leading-[1.08] text-primary sm:text-5xl lg:text-6xl">Alle expertise voor jouw herstel, samen onder één dak in Peer.</h1>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">Groepspraktijk voor kinesitherapie, manuele therapie en sportrevalidatie. Persoonlijke begeleiding, van eerste klacht tot volledig herstel.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={`tel:${TEL}`} className={btnAccent}><Phone className="h-4 w-4" />Bel voor een afspraak</a>
                <a href="#afspraak" className={btnOutline}>Online afspraak aanvragen</a>
              </div>
            </Reveal>
            <Reveal delay={150} className="relative">
              <div className="absolute -inset-4 -z-10 rounded-[3rem] bg-secondary sm:-inset-6" />
              <img src={HERO} alt="Kinesitherapeut begeleidt een patiënt bij oefeningen met gewichtjes" className="aspect-[4/5] w-full rounded-[2.5rem] rounded-tr-[8rem] object-cover shadow-lift sm:aspect-[5/5]" />
            </Reveal>
          </div>
          <div className="mt-20 grid gap-4 sm:grid-cols-3">
            {[[HeartHandshake, "Persoonlijke aanpak", "Een behandeling op maat, met tijd voor jouw verhaal."], [Users, "Jong, dynamisch team", "Elk met een eigen specialisatie en interesse."], [Star, "Warm aanbevolen door patiënten", "Een vertrouwd adres in Peer."]].map(([I, t, d], i) => {
              const Icon = I as typeof Star;
              return <Reveal key={t as string} delay={i * 100} className="flex gap-4 rounded-3xl bg-card p-6 shadow-soft">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-secondary text-primary"><Icon className="h-5 w-5" /></div>
                <div><h3 className="font-sans text-base font-semibold">{t as string}</h3><p className="mt-1 text-sm text-muted-foreground">{d as string}</p></div>
              </Reveal>;
            })}
          </div>
        </section>

        {/* OVER */}
        <section id="over" className="bg-secondary/60 py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2">
            <Reveal><img src="https://images.unsplash.com/photo-1600881333168-2ef49b341f30?auto=format&fit=crop&w=1200&q=80" alt="Lichte, moderne behandelruimte" className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-soft" /></Reveal>
            <Reveal delay={120}>
              <Eyebrow>Over de praktijk</Eyebrow>
              <h2 className="text-3xl text-primary sm:text-4xl lg:text-5xl">Een vertrouwd adres in Peer.</h2>
              <div className="mt-6 space-y-4 text-muted-foreground">
                <p>Bij groepspraktijk Frank Luijs sta jij centraal. We nemen de tijd om naar je te luisteren, je klacht grondig te onderzoeken en samen met jou een plan op te stellen dat bij je leven past.</p>
                <p>We geloven in actieve therapie: je herstelt niet op de behandeltafel, maar door zelf in beweging te komen. Wij begeleiden je daarbij, stap voor stap.</p>
                <p>Omdat goede zorg teamwerk is, werken we nauw samen met huisartsen en specialisten uit de regio. Zo krijg je de juiste zorg, op het juiste moment.</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* TEAM */}
        <section id="team" className="mx-auto max-w-7xl px-5 py-24">
          <Reveal className="max-w-2xl"><Eyebrow>Ons team</Eyebrow><h2 className="text-3xl text-primary sm:text-4xl lg:text-5xl">Gezichten die je herstel begeleiden.</h2></Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((m, i) => (
              <Reveal key={i} delay={i * 90} className="group overflow-hidden rounded-3xl bg-card shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-lift">
                <div className="grid aspect-[16/9] w-full place-items-center bg-secondary sm:aspect-[4/5]"><span className="grid h-20 w-20 sm:h-28 sm:w-28 place-items-center rounded-full bg-primary font-serif text-4xl text-primary-foreground transition-transform duration-500 group-hover:scale-105" aria-hidden="true">{m.initials}</span></div>
                <div className="p-6">
                  <h3 className="text-xl text-primary">{m.name}</h3>
                  <p className="text-sm text-muted-foreground">{m.role}</p>
                  <div className="mt-4 flex flex-wrap gap-2">{m.tags.length > 0 && m.tags.map((t) => <span key={t} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">{t}</span>)}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* SPECIALISATIES */}
        <section id="specialisaties" className="bg-primary py-24 text-primary-foreground">
          <div className="mx-auto max-w-7xl px-5">
            <Reveal className="max-w-2xl"><Eyebrow>Specialisaties</Eyebrow><h2 className="text-3xl sm:text-4xl lg:text-5xl">Zorg op maat, voor elke klacht.</h2></Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {SPECS.map((s, i) => <SpecCard key={s.id} s={s} delay={i * 80} />)}
            </div>
          </div>
        </section>

        {/* PRAKTISCH */}
        <section id="praktisch" className="mx-auto max-w-7xl px-5 py-24">
          <Reveal className="max-w-2xl"><Eyebrow>Praktisch</Eyebrow><h2 className="text-3xl text-primary sm:text-4xl lg:text-5xl">Goed om te weten.</h2></Reveal>
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
            <Reveal className="space-y-3">
              {FAQ.map(([q, a]) => (
                <details key={q} className="group rounded-2xl bg-card shadow-soft">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 font-medium">
                    {q}<Plus className="h-5 w-5 shrink-0 text-accent transition-transform group-open:rotate-45" />
                  </summary>
                  <p className="px-6 pb-6 text-muted-foreground">{a}</p>
                </details>
              ))}
            </Reveal>
            <Reveal delay={120}>
              <div className="sticky top-36 rounded-3xl bg-secondary p-8">
                <Clock className="h-6 w-6 text-accent" />
                <h3 className="mt-4 text-2xl text-primary">Openingsuren</h3>
                <dl className="mt-6 divide-y divide-border">
                  {[["Maandag – vrijdag", "8u – 20u"], ["Zaterdag", "Op afspraak"], ["Zondag", "Gesloten"]].map(([d, h]) => (
                    <div key={d} className="flex justify-between py-3"><dt>{d}</dt><dd className="font-semibold">{h}</dd></div>
                  ))}
                </dl>
                <a href={`tel:${TEL}`} className={`${btnAccent} mt-6 w-full`}><Phone className="h-4 w-4" />0475 91 73 06</a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="bg-secondary/60 py-24">
          <div className="mx-auto max-w-7xl px-5">
            <Reveal className="max-w-2xl"><Eyebrow>Contact</Eyebrow><h2 className="text-3xl text-primary sm:text-4xl lg:text-5xl">Kom langs of vraag een afspraak aan.</h2></Reveal>
            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              <Reveal className="overflow-hidden rounded-3xl bg-card shadow-soft">
                <div className="space-y-5 p-8">
                  <a href="https://maps.google.com/?q=Burkel+43,3990+Peer" target="_blank" rel="noreferrer" className="flex items-center gap-4 hover:text-accent"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary text-primary"><MapPin className="h-5 w-5" /></span>Burkel 43, 3990 Peer</a>
                  <a href={`tel:${TEL}`} className="flex items-center gap-4 hover:text-accent"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary text-primary"><Phone className="h-5 w-5" /></span>+32 475 91 73 06</a>
                  <a href="mailto:info@kinepeer.be" className="flex items-center gap-4 hover:text-accent"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary text-primary"><Mail className="h-5 w-5" /></span>info@kinepeer.be</a>
                </div>
                <iframe title="Kaart KinePeer, Burkel 43 Peer" src="https://maps.google.com/maps?q=Burkel%2043%2C%203990%20Peer&z=15&output=embed" className="h-80 w-full border-0" loading="lazy" />
              </Reveal>
              <Reveal delay={120} className="scroll-mt-36 rounded-3xl bg-card p-8 shadow-soft">
                <div id="afspraak" className="scroll-mt-36" />
                <h3 className="text-2xl text-primary">Online afspraak aanvragen</h3>
                <p className="mt-2 text-sm text-muted-foreground">Laat je gegevens en voorkeur achter. We bellen je binnen één werkdag terug om je afspraak te bevestigen.</p>
                <form onSubmit={submit} className="mt-6 grid gap-4">
                  {[["naam", "Naam", "text"], ["email", "E-mail", "email"], ["telefoon", "Telefoon", "tel"]].map(([n, l, t]) => (
                    <label key={n} className="grid gap-1.5 text-sm font-medium">{l}
                      <input name={n} type={t} required={n !== "email"} className="rounded-xl border border-input bg-background px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-ring" />
                    </label>
                  ))}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-1.5 text-sm font-medium">Behandeling
                      <select name="behandeling" className="rounded-xl border border-input bg-background px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-ring" defaultValue="">
                        <option value="" disabled>Kies een behandeling</option>
                        {SPECS.map((s) => <option key={s.id}>{s.title}</option>)}
                        <option>Weet ik nog niet</option>
                      </select>
                    </label>
                    <label className="grid gap-1.5 text-sm font-medium">Voorkeursmoment
                      <select name="moment" className="rounded-xl border border-input bg-background px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-ring" defaultValue="">
                        <option value="" disabled>Kies een moment</option>
                        <option>Voormiddag</option><option>Namiddag</option><option>Avond (na 17u)</option><option>Geen voorkeur</option>
                      </select>
                    </label>
                  </div>
                  <label className="grid gap-1.5 text-sm font-medium">Je klacht of vraag (optioneel)
                    <textarea name="bericht" rows={3} className="rounded-xl border border-input bg-background px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-ring" />
                  </label>
                  <button type="submit" className={btnAccent}>Afspraak aanvragen</button>
                  {sent && <p className="text-sm text-primary">Bedankt! We bellen je binnen één werkdag terug om je afspraak te bevestigen.</p>}
                </form>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-3">
          <div>
            <p className="font-serif text-2xl">KinePeer</p>
            <p className="text-primary-foreground/70">Groepspraktijk Frank Luijs</p>
            <a href="https://www.facebook.com/profile.php?id=100067908440374" target="_blank" rel="noreferrer" aria-label="Facebook" className="mt-6 inline-grid h-11 w-11 place-items-center rounded-full border border-primary-foreground/30 hover:bg-accent"><Facebook className="h-5 w-5" /></a>
          </div>
          <div className="space-y-2 text-primary-foreground/80">
            <p>Burkel 43, 3990 Peer</p>
            <a href={`tel:${TEL}`} className="block hover:text-accent">+32 475 91 73 06</a>
            <a href="mailto:info@kinepeer.be" className="block hover:text-accent">info@kinepeer.be</a>
          </div>
          <nav className="flex flex-col gap-2 text-primary-foreground/80">{NAV.map(([l, h]) => <a key={l} href={h} className="hover:text-accent">{l}</a>)}</nav>
        </div>
        <div className="border-t border-primary-foreground/15">
          <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-2 px-5 py-6 text-sm text-primary-foreground/60">
            <p>© 2026 KinePeer</p><p className="text-xs">Ontwerpvoorstel door Atelier Smits</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SpecCard({ s, delay }: { s: (typeof SPECS)[number]; delay: number }) {
  const [more, setMore] = useState(false);
  const Icon = s.icon;
  return (
    <Reveal delay={delay} className="h-full">
      <article id={s.id} className="flex h-full flex-col rounded-3xl bg-card p-7 text-card-foreground transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-accent"><Icon className="h-6 w-6" /></div>
        <h3 className="mt-5 text-2xl text-primary">{s.title}</h3>
        <p className="mt-3 text-muted-foreground">{s.text}</p>
        <p className="mt-4 text-sm"><span className="font-semibold text-primary">Voor wie? </span>{s.who}</p>
        <div className={`grid transition-all duration-500 ${more ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
          <p className="overflow-hidden text-sm text-muted-foreground">{s.more}</p>
        </div>
        <button onClick={() => setMore(!more)} aria-expanded={more} className="mt-auto flex items-center gap-1 pt-5 text-sm font-semibold text-accent">
          {more ? "Minder info" : "Meer info"}<ChevronDown className={`h-4 w-4 transition-transform ${more ? "rotate-180" : ""}`} />
        </button>
      </article>
    </Reveal>
  );
}
