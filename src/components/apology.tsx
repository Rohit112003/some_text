import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { content as C } from "@/config/content";

function useTyping(text: string, start = true, speed = 70) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    setN(0);
    const id = setInterval(() => setN((v) => (v >= text.length ? (clearInterval(id), v) : v + 1)), speed);
    return () => clearInterval(id);
  }, [text, start, speed]);
  return text.slice(0, n);
}

export function Petals() {
  const [petals, setPetals] = useState<{ l: number; s: number; d: number; dl: number; o: number }[]>([]);
  useEffect(() => {
    setPetals(Array.from({ length: 24 }, () => ({ l: Math.random() * 100, s: 8 + Math.random() * 10, d: 10 + Math.random() * 10, dl: -Math.random() * 20, o: 0.4 + Math.random() * 0.3 })));
  }, []);
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {petals.map((p, i) => (
        <motion.div key={i} className="absolute -top-8 rounded-full bg-pink"
          style={{ left: `${p.l}%`, width: p.s, height: p.s * 1.5, opacity: p.o }}
          animate={{ y: ["0vh", "110vh"], x: [0, 30, -20, 15], rotate: [0, 360] }}
          transition={{ duration: p.d, delay: p.dl, repeat: Infinity, ease: "linear" }} />
      ))}
    </div>
  );
}

function Cat({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.span className={`absolute text-4xl select-none ${className}`} animate={{ y: [0, -6, 0] }} transition={{ duration: 2.2, repeat: Infinity, delay }}>
      {C.catSticker}
    </motion.span>
  );
}

function Section({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <motion.section id={id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }}
      className="relative z-10 mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center px-5 py-16 text-center">
      {children}
    </motion.section>
  );
}

function Heading({ script, title }: { script: string; title: ReactNode }) {
  return (
    <div className="relative mb-8">
      <motion.div className="absolute -left-6 -top-4 h-14 w-14 rounded-full bg-sun/60" animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity }} />
      <motion.div className="absolute -right-4 top-6 h-10 w-10 rounded-full bg-peach/60" animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity }} />
      <p className="relative font-script text-2xl text-primary">{script}</p>
      <h2 className="relative font-display text-4xl font-bold leading-tight text-primary">{title}</h2>
    </div>
  );
}

type To = "/" | "/letter" | "/note" | "/things" | "/songs" | "/final";
function NextLink({ to, children }: { to: To; children: ReactNode }) {
  return (
    <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.92 }} className="mt-8">
      <Link to={to} className="inline-block rounded-full bg-primary px-7 py-3 font-display font-bold text-primary-foreground card-shadow">{children}</Link>
    </motion.div>
  );
}
function Btn({ children, onClick, tone = "coral" }: { children: ReactNode; onClick?: () => void; tone?: "coral" | "sun" }) {
  return (
    <motion.button whileHover={{ y: -3 }} whileTap={{ scale: 0.92 }} onClick={onClick}
      className={`mt-6 rounded-full px-7 py-3 font-display font-bold card-shadow ${tone === "coral" ? "bg-primary text-primary-foreground" : "bg-sun text-ink"}`}>
      {children}
    </motion.button>
  );
}


/* ---------- Loading ---------- */
function PlaneCat() {
  return (
    <svg viewBox="0 0 200 120" className="h-28 w-48">
      <ellipse cx="100" cy="70" rx="70" ry="24" fill="#F7BCD0" />
      <path d="M40 70 Q100 50 170 70" fill="#fff" opacity=".7" />
      <path d="M85 72 L60 105 L95 80Z" fill="#7FB5E6" />
      <path d="M40 60 L28 40 L50 58Z" fill="#7FB5E6" />
      {[110, 125, 140, 155].map((x) => <circle key={x} cx={x} cy="68" r="4" fill="#F6E08A" />)}
      <circle cx="80" cy="96" r="5" fill="#E04B4B" /><circle cx="130" cy="96" r="5" fill="#E04B4B" />
      {/* cat */}
      <circle cx="90" cy="38" r="20" fill="#fff" stroke="#3a2a22" strokeWidth="1.5" />
      <path d="M74 28 L72 12 L84 22Z M106 28 L108 12 L96 22Z" fill="#fff" stroke="#3a2a22" strokeWidth="1.5" />
      <circle cx="83" cy="38" r="2.2" fill="#3a2a22" /><circle cx="97" cy="38" r="2.2" fill="#3a2a22" />
      <ellipse cx="90" cy="43" rx="2" ry="1.4" fill="#F5A64A" />
      <path d="M100 18 l8 -6 l2 8 z M100 18 l10 6 l-8 4z" fill="#E86A9A" /><circle cx="102" cy="19" r="2.5" fill="#E86A9A" />
    </svg>
  );
}

export function Loading() {
  const text = useTyping(C.loadingText, true, 80);
  return (
    <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-cream">
      {[10, 25, 45, 65, 80].map((t, i) => (
        <motion.div key={i} className="absolute h-10 w-28 rounded-full bg-paper card-shadow text-peach" style={{ top: `${t}%` }}
          initial={{ x: "-20vw" }} animate={{ x: "110vw" }} transition={{ duration: 18 + i * 3, delay: -i * 4, repeat: Infinity, ease: "linear" }} />
      ))}
      <motion.div className="relative" initial={{ x: "-70vw" }} animate={{ x: "70vw", y: [0, -10, 0, 10, 0] }}
        transition={{ x: { duration: 3.4, ease: "easeInOut" }, y: { duration: 1.2, repeat: Infinity } }}>
        <div className="absolute right-[85%] top-1/2 h-4 w-60 -translate-y-1/2 rounded-full opacity-70 blur-[2px]"
          style={{ background: "linear-gradient(90deg, transparent, #c7b8f5, #bdeccf, #fff3a8, #ffc9a8, #f7bcd0)" }} />
        {["💗", "✨", "💕", "✨"].map((e, i) => (
          <motion.span key={i} className="absolute top-1/2 text-sm" style={{ right: `${100 + i * 25}%` }} animate={{ y: [0, -20], opacity: [1, 0] }} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }}>{e}</motion.span>
        ))}
        <div className="drop-shadow-[0_0_18px_rgba(247,188,208,0.9)]"><PlaneCat /></div>
      </motion.div>
      <p className="mt-10 font-script text-3xl text-primary">{text}<span className="animate-pulse">|</span></p>
    </motion.div>
  );
}

/* ---------- Sections ---------- */
export function Hey() {
  const tap = useTyping(C.hey.tap, true, 90);
  return (
    <Section>
      <p className="font-script text-2xl text-primary">{C.hey.script}</p>
      <h1 className="mb-8 font-display text-5xl font-bold text-primary">{C.hey.heading} <motion.span className="inline-block" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>💕</motion.span></h1>
      <div className="relative w-full -rotate-1 rounded-3xl bg-sage p-6 text-left card-shadow">
        <div className="mb-4 flex gap-1.5"><span className="h-3 w-3 rounded-full bg-[#ff5f57]" /><span className="h-3 w-3 rounded-full bg-[#febc2e]" /><span className="h-3 w-3 rounded-full bg-[#28c840]" /></div>
        <p className="text-lg text-ink">{C.hey.body}</p>
        <p className="mt-4 font-script text-2xl text-primary">{tap}</p>
        <Cat className="-right-3 -top-6" /><Cat className="-bottom-5 -left-3" delay={0.6} />
      </div>
      <NextLink to="/letter">{C.hey.button} →</NextLink>
      <p className="mt-10 font-script text-xl text-muted-foreground">{C.hey.footer}</p>
    </Section>
  );
}

export function Letter() {
  return (
    <Section id="letter">
      <div className="relative w-full rotate-1 rounded-3xl bg-butter p-4 card-shadow text-tan">
        <div className="rounded-2xl bg-paper p-5 text-left">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xl">💝</span>
            <h3 className="font-display text-lg font-bold text-primary">{C.letter.title}</h3>
          </div>
          <div className="lined-paper font-script text-2xl leading-8 text-ink">
            <p>{C.letter.greeting}</p><p>{C.letter.body}</p>
            <p className="mt-2 text-right text-primary">{C.letter.signature}</p>
          </div>
        </div>
        <Cat className="-right-4 -top-6" />
      </div>
      <NextLink to="/note">{C.letter.button} →</NextLink>
    </Section>
  );
}

export function Envelope() {
  const [open, setOpen] = useState(false);
  return (
    <Section id="note">
      <Heading script={C.note.script} title={C.note.heading} />
      <div className="relative w-full -rotate-1 rounded-3xl bg-butter px-6 pb-8 pt-28 card-shadow text-tan">
        {["left-3 top-3", "right-3 top-3", "left-3 bottom-3", "right-3 bottom-3"].map((p) => <span key={p} className={`absolute ${p} text-pink`}>♥</span>)}
        <div className="relative mx-auto h-40 w-64" style={{ perspective: 800 }}>
          <motion.div className="absolute inset-x-3 bottom-2 z-10 rounded-xl bg-paper p-4 font-script text-xl leading-6 text-ink card-shadow"
            initial={false} animate={{ y: open ? -120 : 0, zIndex: open ? 30 : 10 }} transition={{ delay: open ? 0.4 : 0, duration: 0.7 }}>
            {C.note.message}
          </motion.div>
          <div className="absolute inset-0 z-20 rounded-xl bg-cream card-shadow" style={{ clipPath: "polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)" }} />
          <motion.div className="absolute inset-x-0 top-0 z-30 h-24 origin-top bg-tan" style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
            animate={{ rotateX: open ? 180 : 0, zIndex: open ? 5 : 30 }} transition={{ duration: 0.5 }} />
          {!open && <span className="absolute left-1/2 top-[70px] z-40 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-primary">💌</span>}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">{C.note.hint}</p>
        <Btn tone="sun" onClick={() => setOpen((o) => !o)}>{C.note.button}</Btn>
      </div>
      <NextLink to="/things">Next ✨ →</NextLink>
    </Section>
  );
}

const noteBg = { pink: "bg-pink", yellow: "bg-butter", green: "bg-sage" } as const;
function Sticky({ n, i }: { n: (typeof C.stickies.notes)[number]; i: number }) {
  const [f, setF] = useState(false);
  const rot = [-3, 2, -1][i % 3];
  return (
    <div className="relative h-72 w-64 cursor-pointer" style={{ perspective: 1000, rotate: `${rot}deg` }} onClick={() => setF(!f)}>
      <div className="absolute -top-3 left-1/2 z-10 h-6 w-20 -translate-x-1/2 rotate-2 bg-paper/70" />
      <motion.div className="relative h-full w-full preserve-3d" animate={{ rotateY: f ? 180 : 0 }} transition={{ duration: 0.6 }}>
        <div className={`absolute inset-0 flex items-center justify-center rounded-xl p-6 backface-hidden card-shadow text-tan ${noteBg[n.color as keyof typeof noteBg]}`}>
          <p className="font-script text-3xl text-ink">{n.front}</p>
        </div>
        <div className="absolute inset-0 flex flex-col rounded-md bg-paper p-3 backface-hidden card-shadow text-tan" style={{ transform: "rotateY(180deg)" }}>
          <div className={`flex aspect-[4/3] items-center justify-center rounded text-6xl ${noteBg[n.color as keyof typeof noteBg]}`}>{n.image}</div>
          <p className="mt-2 font-display font-bold text-primary">{n.title}</p>
          <p className="text-sm text-ink">{n.text}</p>
          <p className="mt-auto text-2xl">{n.emoji}</p>
        </div>
      </motion.div>
    </div>
  );
}
export function Stickies() {
  return (
    <Section>
      <Heading script={C.stickies.script} title={C.stickies.heading} />
      <p className="-mt-4 mb-8 text-muted-foreground">{C.stickies.hint}</p>
      <div className="flex flex-col items-center gap-10">{C.stickies.notes.map((n, i) => <Sticky key={i} n={n} i={i} />)}</div>
      <NextLink to="/songs">Next ✨ →</NextLink>
    </Section>
  );
}

const tapeBg = ["bg-butter", "bg-sage", "bg-pink"];
function Cassette({ s, i }: { s: (typeof C.songs.list)[number]; i: number }) {
  const [play, setPlay] = useState(false);
  const [t, setT] = useState(0);
  const audio = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    if (!play) return;
    const id = setInterval(() => setT((v) => v + 1), 1000);
    return () => clearInterval(id);
  }, [play]);
  const toggle = () => {
    if (s.audioUrl) {
      audio.current ??= new Audio(s.audioUrl);
      play ? audio.current.pause() : audio.current.play();
    }
    setPlay(!play);
  };
  const reel = <motion.div className="h-9 w-9 rounded-full border-4 border-dashed border-paper bg-ink" animate={play ? { rotate: 360 } : {}} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />;
  return (
    <motion.div animate={{ boxShadow: play ? "0 0 30px rgba(217,96,59,.45)" : "6px 8px 0 rgba(0,0,0,.08)" }}
      className={`w-full rounded-2xl p-4 text-left ${tapeBg[i % 3]}`} style={{ rotate: `${i % 2 ? 1.5 : -1.5}deg` }}>
      <p className="text-xs font-bold tracking-widest text-muted-foreground">SIDE A</p>
      <div className="mt-1 rounded-lg bg-pink px-3 py-2"><p className="font-display font-bold text-ink">{s.title}</p><p className="text-xs text-primary">{s.caption}</p></div>
      <div className="mt-3 flex items-center justify-center gap-6 rounded-lg bg-ink/80 py-2">{reel}{reel}</div>
      <div className="mt-3 flex items-center justify-between">
        <span className="font-mono text-sm text-ink">{Math.floor(t / 60)}:{String(t % 60).padStart(2, "0")}</span>
        <span className="text-primary">♥</span>
        <motion.button whileTap={{ scale: 0.9 }} onClick={toggle} className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">{play ? "❚❚" : "▶"}</motion.button>
      </div>
    </motion.div>
  );
}
export function Songs() {
  return (
    <Section>
      <div className="relative">
        {["♪", "♫", "♬", "♪"].map((n, i) => (
          <motion.span key={i} className="absolute text-2xl text-primary/60" style={{ left: `${[-5, 90, 10, 80][i]}%`, top: `${[-10, -5, 80, 90][i]}%` }} animate={{ y: [0, -12, 0] }} transition={{ duration: 3 + i, repeat: Infinity }}>{n}</motion.span>
        ))}
        <Heading script={C.songs.script} title={C.songs.heading} />
      </div>
      <div className="flex w-full flex-col gap-8">{C.songs.list.map((s, i) => <Cassette key={i} s={s} i={i} />)}</div>
      <NextLink to="/final">Next ✨ →</NextLink>
    </Section>
  );
}

export function Final() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const hearts = useMemo(() => Array.from({ length: 30 }, () => ({ x: (Math.random() - 0.5) * 500, y: -Math.random() * 500 - 100, r: Math.random() * 360 })), []);
  return (
    <Section>
      <Heading script={C.final.script} title={C.final.heading} />
      <div ref={ref} className="relative w-full rotate-1 rounded-3xl bg-pink p-4 card-shadow text-primary">
        <div className="mb-3 flex items-center gap-3 px-1">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">✉️</span>
          <h3 className="font-display text-lg font-bold text-ink">{C.final.title}</h3>
        </div>
        <div className="space-y-2 rounded-2xl bg-paper/80 p-5 text-left font-script text-2xl leading-7 text-ink">
          {C.final.lines.map((l, i) => <p key={i}>{l}</p>)}
        </div>
        {inView && hearts.map((h, i) => (
          <motion.span key={i} className="pointer-events-none absolute left-1/2 top-1/2 text-2xl" initial={{ x: 0, y: 0, opacity: 1 }} animate={{ x: h.x, y: h.y, rotate: h.r, opacity: 0 }} transition={{ duration: 2, ease: "easeOut" }}>💖</motion.span>
        ))}
      </div>
      <p className="mt-10 font-script text-2xl text-primary">💕</p>
      <NextLink to="/">Start again 💕</NextLink>
    </Section>
  );
}

export function Page({ children }: { children: ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-cream">
      <Petals />
      {children}
    </main>
  );
}
export { AnimatePresence };
