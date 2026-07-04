import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import AutoplayPlugin from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import {
  Dumbbell, Flame, HeartPulse, Users, Apple, Sparkles, Shield, Clock, Star,
  Trophy, Activity, Target, Zap, ArrowRight, ChevronDown, Instagram, Facebook,
  Twitter, Youtube, MapPin, Phone, Mail, Menu, X, Play, Check, MessageCircle,
} from "lucide-react";

import hero from "@/assets/hero.jpg";
import facWeights from "@/assets/facility-weights.jpg";
import facCardio from "@/assets/facility-cardio.jpg";
import facFunctional from "@/assets/facility-functional.jpg";
import facLocker from "@/assets/facility-locker.jpg";
import facRecovery from "@/assets/facility-recovery.jpg";
import facBar from "@/assets/facility-bar.jpg";
import coach1 from "@/assets/coach-1.jpg";
import coach2 from "@/assets/coach-2.jpg";
import coach3 from "@/assets/coach-3.jpg";
import coach4 from "@/assets/coach-4.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Benefits />
      <Services />
      <Facilities />
      <Pricing />
      <Coaches />
      <Transformations />
      <Testimonials />
      <Schedule />
      <WhyUs />
      <BmiCalculator />
      <Faq />
      <FinalCta />
      <Footer />
      <FloatingActions />
    </div>
  );
}

/* ----------------------------- NAV ----------------------------- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    ["About", "#about"], ["Services", "#services"], ["Pricing", "#pricing"],
    ["Coaches", "#coaches"], ["Schedule", "#schedule"], ["Contact", "#contact"],
  ] as const;
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/70 backdrop-blur-xl border-b border-white/5" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-display font-bold tracking-tight text-xl">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg btn-gradient">
            <Dumbbell className="w-5 h-5 text-white" />
          </span>
          APEX<span className="text-muted-foreground font-light">·</span>PERFORMANCE
        </a>
        <nav className="hidden lg:flex items-center gap-8 text-sm text-muted-foreground">
          {links.map(([l, h]) => (
            <a key={l} href={h} className="hover:text-foreground transition-colors relative group">
              {l}
              <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-px bg-gradient-to-r from-primary to-secondary transition-all duration-300" />
            </a>
          ))}
        </nav>
        <div className="hidden lg:block">
          <a href="#pricing" className="btn-gradient text-white text-sm font-semibold px-5 py-2.5 rounded-full inline-flex items-center gap-2 hover:scale-[1.03] transition-transform">
            Join Now <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="lg:hidden p-2" aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-white/5 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {links.map(([l, h]) => (
                <a key={l} href={h} onClick={() => setOpen(false)} className="text-lg py-2 border-b border-white/5">{l}</a>
              ))}
              <a href="#pricing" onClick={() => setOpen(false)} className="btn-gradient text-white font-semibold px-5 py-3 rounded-full text-center">Join Now</a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ----------------------------- HERO ----------------------------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const floatingStats = [
    { icon: Star, label: "5.0 Rating", tone: "secondary" as const, pos: "top-24 left-6 md:left-16" },
    { icon: Clock, label: "24/7 Access", tone: "primary" as const, pos: "top-40 right-6 md:right-24" },
    { icon: Trophy, label: "Elite Trainers", tone: "secondary" as const, pos: "bottom-40 left-4 md:left-24" },
    { icon: Sparkles, label: "Premium Equipment", tone: "primary" as const, pos: "bottom-56 right-6 md:right-16" },
  ];

  return (
    <section ref={ref} className="relative min-h-screen w-full overflow-hidden isolate flex items-center">
      <motion.div style={{ scale, y }} className="absolute inset-0 -z-10">
        <img src={hero} alt="Athlete training in luxury gym" width={1920} height={1280} className="w-full h-full object-cover" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        <div className="absolute inset-0 grid-bg opacity-40" />
      </motion.div>

      {/* animated gradient orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/30 blur-3xl animate-float-slow -z-10" />
      <div className="absolute -bottom-40 -right-24 w-[500px] h-[500px] rounded-full bg-secondary/20 blur-3xl animate-float-slow -z-10" style={{ animationDelay: "3s" }} />

      <motion.div style={{ opacity }} className="max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs uppercase tracking-widest mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          Now Open in Bangalore
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] max-w-5xl"
        >
          Train Hard. <br />
          <span className="text-gradient">Live Strong.</span> <br />
          Become Your Best.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.25 }}
          className="mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed"
        >
          World-class equipment, elite trainers, personalized coaching and a premium
          fitness experience designed for every goal.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a href="#pricing" className="btn-gradient text-white font-semibold px-8 py-4 rounded-full inline-flex items-center gap-2 shadow-[0_10px_40px_-10px_rgba(37,99,235,0.6)] hover:scale-[1.03] transition-transform">
            Start Membership <ArrowRight className="w-5 h-5" />
          </a>
          <a href="#contact" className="glass text-white font-semibold px-8 py-4 rounded-full inline-flex items-center gap-2 hover:bg-white/10 transition-colors">
            <Play className="w-4 h-4" /> Book Free Trial
          </a>
        </motion.div>
      </motion.div>

      {/* floating stats */}
      {floatingStats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 + i * 0.15, duration: 0.6 }}
          className={`absolute ${s.pos} hidden md:flex glass px-4 py-3 rounded-2xl items-center gap-3 animate-float-slow`}
          style={{ animationDelay: `${i * 1.5}s` }}
        >
          <span className={`w-9 h-9 rounded-xl flex items-center justify-center ${s.tone === "primary" ? "bg-primary/20 text-primary" : "bg-secondary/20 text-secondary"}`}>
            <s.icon className="w-4 h-4" />
          </span>
          <span className="text-sm font-semibold">{s.label}</span>
        </motion.div>
      ))}

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground text-xs uppercase tracking-widest flex flex-col items-center gap-2">
        Scroll <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
}

/* ----------------------------- SECTION HEADING ----------------------------- */
function SectionHead({ eyebrow, title, sub, center }: { eyebrow: string; title: React.ReactNode; sub?: string; center?: boolean }) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""} mb-14`}>
      <div className={`inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs uppercase tracking-widest mb-5 ${center ? "" : ""}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-secondary" /> {eyebrow}
      </div>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05]">{title}</h2>
      {sub && <p className="mt-5 text-muted-foreground text-lg leading-relaxed">{sub}</p>}
    </div>
  );
}

/* ----------------------------- COUNTER ----------------------------- */
function Counter({ to, suffix = "", duration = 1.6 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      setN(Math.floor(p * to));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return <span ref={ref}>{n}{suffix}</span>;
}

/* ----------------------------- ABOUT ----------------------------- */
function About() {
  const stats = [
    { v: 10, s: "+", label: "Professional Coaches" },
    { v: 500, s: "+", label: "Happy Members" },
    { v: 24, s: "/7", label: "Gym Access" },
    { v: 100, s: "+", label: "Modern Machines" },
  ];
  return (
    <section id="about" className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <SectionHead
            eyebrow="About Apex"
            title={<>Fitness <span className="text-gradient">without limits.</span></>}
            sub="Apex Performance Club delivers a complete fitness experience combining strength training, functional workouts, cardio, recovery and expert coaching in a luxury environment built for performance."
          />
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="glass rounded-2xl p-6"
              >
                <div className="text-4xl font-bold text-gradient">
                  <Counter to={s.v} suffix={s.s} />
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -inset-6 bg-gradient-to-tr from-primary/30 to-secondary/30 blur-3xl -z-10 rounded-3xl" />
          <div className="rounded-3xl overflow-hidden border border-white/10 aspect-[4/5]">
            <img src={facFunctional} alt="Functional training area" loading="lazy" width={1024} height={1024} className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-8 -left-8 glass rounded-2xl p-5 max-w-xs hidden md:block">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl btn-gradient flex items-center justify-center"><Trophy className="w-5 h-5 text-white" /></div>
              <div>
                <div className="font-semibold">Award-winning club</div>
                <div className="text-xs text-muted-foreground">Bangalore's #1 luxury fitness</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ----------------------------- BENEFITS ----------------------------- */
function Benefits() {
  const items = [
    { i: Clock, t: "Unlimited Gym Access" },
    { i: Users, t: "Certified Personal Trainers" },
    { i: Apple, t: "Nutrition Coaching" },
    { i: HeartPulse, t: "Recovery & Wellness" },
    { i: Target, t: "Private Coaching Sessions" },
    { i: Shield, t: "Premium Locker Rooms" },
    { i: Activity, t: "Body Composition Analysis" },
    { i: Zap, t: "Personal Fitness Plans" },
  ];
  return (
    <section className="relative py-28 px-6 bg-[color:var(--color-surface)]">
      <div className="max-w-7xl mx-auto">
        <SectionHead center eyebrow="Membership Benefits" title={<>Everything you need to <span className="text-gradient">win the day.</span></>} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((it, i) => (
            <motion.div key={it.t}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-6 hover:bg-white/10 transition-all hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center mb-4 group-hover:btn-gradient transition-all">
                <it.i className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
              </div>
              <div className="font-semibold text-lg">{it.t}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- SERVICES ----------------------------- */
function Services() {
  const items = [
    { i: Dumbbell, t: "Strength Training", d: "Free weights, racks and Olympic platforms for serious lifters." },
    { i: HeartPulse, t: "Cardio Zone", d: "Latest treadmills, bikes and rowers with built-in coaching." },
    { i: Flame, t: "Functional Fitness", d: "Turf lanes, sleds and rigs for total-body performance." },
    { i: Users, t: "Personal Training", d: "1-on-1 sessions with certified elite coaches." },
    { i: Apple, t: "Nutrition Consulting", d: "Personalized meal plans built for your goals." },
    { i: Target, t: "Private Coaching", d: "Members-only studio for focused, high-intensity sessions." },
    { i: Sparkles, t: "Wellness Programs", d: "Sauna, ice bath and mobility recovery therapies." },
    { i: Activity, t: "Group Classes", d: "HIIT, spin, yoga and strength — daily on the schedule." },
    { i: Zap, t: "Mobility Training", d: "Move better, feel better — bulletproof your joints." },
    { i: Trophy, t: "Weight Loss Programs", d: "Data-driven fat-loss protocols with weekly reviews." },
    { i: Shield, t: "Muscle Building", d: "Structured hypertrophy plans and progressive overload." },
    { i: Star, t: "Performance Training", d: "Athlete-grade programming for competitive results." },
  ];
  const autoplay = useRef(
    AutoplayPlugin({ delay: 3200, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  return (
    <section id="services" className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHead center eyebrow="Services" title={<>Programs engineered <span className="text-gradient">for results.</span></>} sub="Twelve specialized tracks, one unified system designed to make you unstoppable." />
        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[autoplay.current]}
          className="w-full"
        >
          <CarouselContent className="-ml-5">
            {items.map((s) => (
              <CarouselItem key={s.t} className="pl-5 sm:basis-1/2 lg:basis-1/3">
                <div className="group relative rounded-3xl p-8 glass overflow-hidden hover:-translate-y-1 transition-all h-full">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-primary/10 to-secondary/10" />
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-5 group-hover:btn-gradient transition-all">
                      <s.i className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{s.t}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{s.d}</p>
                    <a href="#pricing" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:text-secondary transition-colors">
                      Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4" />
          <CarouselNext className="hidden md:flex -right-4" />
        </Carousel>
      </div>
    </section>
  );
}

/* ----------------------------- FACILITIES ----------------------------- */
function Facilities() {
  const imgs = [
    { src: facWeights, t: "Free Weights" },
    { src: facCardio, t: "Cardio Equipment" },
    { src: facFunctional, t: "Functional Training" },
    { src: facLocker, t: "Locker Rooms" },
    { src: facRecovery, t: "Recovery Area" },
    { src: facBar, t: "Protein Bar" },
  ];
  const [lightbox, setLightbox] = useState<string | null>(null);
  return (
    <section className="py-28 px-6 bg-[color:var(--color-surface)]">
      <div className="max-w-7xl mx-auto">
        <SectionHead center eyebrow="Facilities" title={<>Step inside the <span className="text-gradient">Apex experience.</span></>} />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {imgs.map((im, i) => (
            <motion.button key={im.t}
              onClick={() => setLightbox(im.src)}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`group relative rounded-3xl overflow-hidden border border-white/10 ${i === 0 ? "lg:col-span-2 lg:row-span-2 aspect-square lg:aspect-auto" : "aspect-square"}`}
            >
              <img src={im.src} alt={im.t} loading="lazy" width={1024} height={1024} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-70" />
              <div className="absolute bottom-5 left-5 right-5 text-left">
                <div className="text-xs uppercase tracking-widest text-secondary mb-1">Facility</div>
                <div className="text-xl font-semibold">{im.t}</div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              src={lightbox} alt="Facility" className="max-w-6xl max-h-[85vh] rounded-2xl object-contain"
            />
            <button className="absolute top-6 right-6 glass p-3 rounded-full" onClick={() => setLightbox(null)}><X /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ----------------------------- PRICING ----------------------------- */
function Pricing() {
  const plans = [
    { name: "Starter", price: "1,999", tag: "Perfect to begin", features: ["Gym Access", "Fitness Assessment", "Custom Workout Plan", "App Access"], featured: false },
    { name: "Performance", price: "3,499", tag: "Most popular", features: ["Everything in Starter", "Nutrition Guidance", "All Group Classes", "Monthly Progress Review", "Body Composition Analysis"], featured: true },
    { name: "Elite", price: "5,999", tag: "Full transformation", features: ["Unlimited Access", "Dedicated Personal Trainer", "Custom Nutrition Plan", "Priority Class Booking", "Private Coaching Sessions", "Premium Recovery Access"], featured: false },
  ];
  return (
    <section id="pricing" className="py-28 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHead center eyebrow="Training Programs" title={<>Pick the plan that <span className="text-gradient">matches your ambition.</span></>} sub="Monthly memberships. Cancel or freeze anytime. All prices in INR." />
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <motion.div key={p.name}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-3xl p-8 ${p.featured ? "bg-gradient-to-b from-primary/20 to-secondary/10 border border-primary/40" : "glass"}`}
            >
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 btn-gradient text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">Most Popular</div>
              )}
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{p.tag}</div>
              <h3 className="mt-2 text-3xl font-bold">{p.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-5xl font-bold">₹{p.price}</span>
                <span className="text-muted-foreground">/mo</span>
              </div>
              <ul className="mt-6 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm">
                    <Check className={`w-5 h-5 flex-shrink-0 ${p.featured ? "text-secondary" : "text-primary"}`} /> {f}
                  </li>
                ))}
              </ul>
              <a href="#contact" className={`mt-8 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold transition-transform hover:scale-[1.02] ${p.featured ? "btn-gradient text-white" : "glass hover:bg-white/10"}`}>
                Join Today <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- COACHES ----------------------------- */
function Coaches() {
  const coaches = [
    { img: coach1, name: "Arjun Rao", spec: "Strength & Powerlifting", exp: "10 yrs" },
    { img: coach2, name: "Priya Kapoor", spec: "HIIT & Fat Loss", exp: "7 yrs" },
    { img: coach3, name: "Vikram Shah", spec: "Bodybuilding", exp: "12 yrs" },
    { img: coach4, name: "Meera Iyer", spec: "Yoga & Mobility", exp: "8 yrs" },
  ];
  return (
    <section id="coaches" className="py-28 px-6 bg-[color:var(--color-surface)]">
      <div className="max-w-7xl mx-auto">
        <SectionHead center eyebrow="Elite Coaches" title={<>Meet the team behind <span className="text-gradient">your results.</span></>} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coaches.map((c, i) => (
            <motion.div key={c.name}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative rounded-3xl overflow-hidden border border-white/10 aspect-[3/4]"
            >
              <img src={c.img} alt={c.name} loading="lazy" width={768} height={1024} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-5">
                <div className="text-xs uppercase tracking-widest text-secondary">{c.spec}</div>
                <div className="mt-1 text-xl font-semibold">{c.name}</div>
                <div className="text-xs text-muted-foreground">{c.exp} experience</div>
                <div className="mt-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex gap-2">
                    <a href="#" className="w-8 h-8 rounded-full glass flex items-center justify-center"><Instagram className="w-4 h-4" /></a>
                    <a href="#" className="w-8 h-8 rounded-full glass flex items-center justify-center"><Twitter className="w-4 h-4" /></a>
                  </div>
                  <a href="#contact" className="btn-gradient text-white text-xs px-3 py-1.5 rounded-full font-semibold">Book Session</a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- TRANSFORMATIONS ----------------------------- */
function Transformations() {
  const [cat, setCat] = useState("Weight Loss");
  const cats = ["Weight Loss", "Muscle Gain", "Athletic Performance", "Lifestyle"];
  const [pos, setPos] = useState(50);
  return (
    <section className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHead center eyebrow="Transformations" title={<>Real members. <span className="text-gradient">Real results.</span></>} />
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${cat === c ? "btn-gradient text-white" : "glass hover:bg-white/10"}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden border border-white/10 aspect-[16/10] select-none cursor-ew-resize"
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            setPos(Math.max(2, Math.min(98, ((e.clientX - r.left) / r.width) * 100)));
          }}
          onTouchMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            const x = e.touches[0].clientX;
            setPos(Math.max(2, Math.min(98, ((x - r.left) / r.width) * 100)));
          }}
        >
          <img src={coach3} alt="Before" className="absolute inset-0 w-full h-full object-cover" loading="lazy" width={1024} height={640} style={{ filter: "grayscale(0.7) brightness(0.7)" }} />
          <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
            <img src={coach1} alt="After" className="w-full h-full object-cover" loading="lazy" width={1024} height={640} />
          </div>
          <div className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-secondary" style={{ left: `${pos}%` }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full btn-gradient text-white flex items-center justify-center font-bold shadow-2xl">
              ⇄
            </div>
          </div>
          <div className="absolute top-5 left-5 glass px-3 py-1 rounded-full text-xs uppercase tracking-widest">Before</div>
          <div className="absolute top-5 right-5 glass px-3 py-1 rounded-full text-xs uppercase tracking-widest">After — {cat}</div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- TESTIMONIALS ----------------------------- */
function Testimonials() {
  const items = [
    { q: "The best gym I've ever trained in. Incredible atmosphere and professional coaching.", n: "Rohan M.", r: "Member since 2023" },
    { q: "Modern equipment, excellent trainers and amazing results. Down 14 kg in six months.", n: "Anita S.", r: "Weight Loss Program" },
    { q: "Luxury experience from start to finish. Feels like a five-star hotel with iron.", n: "Karan D.", r: "Elite Member" },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % items.length), 6000);
    return () => clearInterval(id);
  }, [items.length]);
  return (
    <section className="py-28 px-6 bg-[color:var(--color-surface)] relative overflow-hidden">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-primary/10 blur-3xl" />
      <div className="max-w-4xl mx-auto text-center relative">
        <SectionHead center eyebrow="Testimonials" title={<>Loved by members <span className="text-gradient">across Bangalore.</span></>} />
        <div className="relative min-h-[240px]">
          <AnimatePresence mode="wait">
            <motion.blockquote key={i}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="glass rounded-3xl p-10"
            >
              <div className="flex justify-center gap-1 text-secondary mb-5">
                {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="w-5 h-5 fill-current" />)}
              </div>
              <p className="text-2xl md:text-3xl font-medium leading-snug">"{items[i].q}"</p>
              <div className="mt-6 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{items[i].n}</span> · {items[i].r}
              </div>
            </motion.blockquote>
          </AnimatePresence>
        </div>
        <div className="mt-6 flex justify-center gap-2">
          {items.map((_, k) => (
            <button key={k} onClick={() => setI(k)}
              className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 btn-gradient" : "w-4 bg-white/20"}`} aria-label={`Testimonial ${k + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- SCHEDULE ----------------------------- */
function Schedule() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [day, setDay] = useState("Mon");
  const schedule: Record<string, { t: string; c: string; coach: string }[]> = {
    Mon: [{ t: "06:00", c: "Strength Class", coach: "Arjun" }, { t: "09:00", c: "HIIT", coach: "Priya" }, { t: "18:00", c: "Functional Training", coach: "Vikram" }, { t: "20:00", c: "Yoga", coach: "Meera" }],
    Tue: [{ t: "07:00", c: "Cardio Blast", coach: "Priya" }, { t: "10:00", c: "Personal Coaching", coach: "Arjun" }, { t: "19:00", c: "Strength Class", coach: "Vikram" }],
    Wed: [{ t: "06:00", c: "HIIT", coach: "Priya" }, { t: "12:00", c: "Yoga", coach: "Meera" }, { t: "18:30", c: "Functional Training", coach: "Arjun" }],
    Thu: [{ t: "07:00", c: "Strength Class", coach: "Vikram" }, { t: "18:00", c: "Cardio Blast", coach: "Priya" }, { t: "20:00", c: "Yoga", coach: "Meera" }],
    Fri: [{ t: "06:00", c: "Functional Training", coach: "Arjun" }, { t: "10:00", c: "HIIT", coach: "Priya" }, { t: "19:00", c: "Strength Class", coach: "Vikram" }],
    Sat: [{ t: "08:00", c: "Group Strength", coach: "All Coaches" }, { t: "11:00", c: "Yoga & Mobility", coach: "Meera" }],
    Sun: [{ t: "09:00", c: "Recovery Session", coach: "Meera" }, { t: "11:00", c: "Personal Coaching", coach: "Arjun" }],
  };
  return (
    <section id="schedule" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHead center eyebrow="Weekly Schedule" title={<>Plan your week, <span className="text-gradient">crush your goals.</span></>} />
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {days.map((d) => (
            <button key={d} onClick={() => setDay(d)}
              className={`w-14 h-14 rounded-2xl font-semibold transition-all ${d === day ? "btn-gradient text-white" : "glass hover:bg-white/10"}`}>
              {d}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {schedule[day].map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-5 hover:bg-white/10 transition-all"
            >
              <div className="text-xs uppercase tracking-widest text-secondary">{s.t}</div>
              <div className="mt-1 text-lg font-semibold">{s.c}</div>
              <div className="text-sm text-muted-foreground">Coach {s.coach}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- WHY US ----------------------------- */
function WhyUs() {
  const items = [
    { i: Clock, t: "24/7 Gym Access", d: "Train on your schedule — day or night." },
    { i: Sparkles, t: "Latest Equipment", d: "Technogym-grade machines and premium free weights." },
    { i: Users, t: "Certified Coaches", d: "Every trainer is internationally certified." },
    { i: Target, t: "Personalized Programs", d: "Every plan is built around your body and goals." },
    { i: HeartPulse, t: "Recovery Support", d: "Sauna, ice bath and physiotherapy on-site." },
    { i: Trophy, t: "Premium Community", d: "Train alongside driven, like-minded members." },
  ];
  return (
    <section className="py-28 px-6 bg-[color:var(--color-surface)]">
      <div className="max-w-7xl mx-auto">
        <SectionHead center eyebrow="Why Apex" title={<>Six reasons members <span className="text-gradient">stay for life.</span></>} />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <motion.div key={it.t}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-3xl p-8 flex gap-5 hover:bg-white/10 transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl btn-gradient flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <it.i className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-lg font-semibold">{it.t}</div>
                <div className="text-sm text-muted-foreground mt-1">{it.d}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- BMI CALCULATOR ----------------------------- */
function BmiCalculator() {
  const [h, setH] = useState(170);
  const [w, setW] = useState(70);
  const bmi = useMemo(() => +(w / ((h / 100) ** 2)).toFixed(1), [h, w]);
  const cat = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Healthy" : bmi < 30 ? "Overweight" : "Obese";
  const color = bmi < 18.5 ? "text-primary" : bmi < 25 ? "text-secondary" : "text-primary";
  return (
    <section className="py-28 px-6">
      <div className="max-w-6xl mx-auto glass rounded-[2rem] p-8 md:p-14 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <SectionHead eyebrow="Interactive Tool" title={<>Quick <span className="text-gradient">BMI check.</span></>} sub="A starting point — your dedicated coach will design the plan around your full body composition." />
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2"><span>Height</span><span className="font-semibold">{h} cm</span></div>
              <input type="range" min={140} max={210} value={h} onChange={(e) => setH(+e.target.value)}
                className="w-full accent-[color:var(--color-primary)]" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2"><span>Weight</span><span className="font-semibold">{w} kg</span></div>
              <input type="range" min={40} max={150} value={w} onChange={(e) => setW(+e.target.value)}
                className="w-full accent-[color:var(--color-secondary)]" />
            </div>
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm uppercase tracking-widest text-muted-foreground">Your BMI</div>
          <div className={`mt-3 text-8xl font-bold ${color}`}>{bmi}</div>
          <div className="mt-2 text-2xl font-semibold">{cat}</div>
          <a href="#pricing" className="mt-8 inline-flex btn-gradient text-white font-semibold px-8 py-3.5 rounded-full items-center gap-2">
            Get My Plan <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- FAQ ----------------------------- */
function Faq() {
  const items = [
    { q: "Can beginners join?", a: "Absolutely. Every new member starts with a fitness assessment and a coach-designed plan tailored to their level." },
    { q: "Do you provide trainers?", a: "Yes — certified personal trainers are available on all plans. Elite members get a dedicated coach." },
    { q: "Are nutrition plans included?", a: "Performance and Elite plans include personalized nutrition guidance built by our sports nutritionists." },
    { q: "Can I freeze my membership?", a: "Yes, you can pause your membership for up to 60 days per year at no cost." },
    { q: "Do you offer trial sessions?", a: "Yes, book a complimentary trial with a coach to experience the club before joining." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-28 px-6 bg-[color:var(--color-surface)]">
      <div className="max-w-3xl mx-auto">
        <SectionHead center eyebrow="FAQ" title={<>Everything you <span className="text-gradient">wanted to ask.</span></>} />
        <div className="space-y-3">
          {items.map((it, i) => (
            <div key={i} className="glass rounded-2xl overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left">
                <span className="font-semibold text-lg">{it.q}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="px-6 pb-6 text-muted-foreground leading-relaxed">{it.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- FINAL CTA ----------------------------- */
function FinalCta() {
  return (
    <section id="contact" className="py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 grid-bg opacity-40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="max-w-5xl mx-auto text-center relative">
        <motion.h2
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-5xl md:text-7xl font-bold leading-[1.05]"
        >
          Ready to transform your <br />
          <span className="text-gradient">fitness journey?</span>
        </motion.h2>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          Join a community dedicated to strength, discipline and results.
        </p>
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <a href="#pricing" className="btn-gradient text-white font-semibold px-8 py-4 rounded-full inline-flex items-center gap-2 shadow-[0_10px_40px_-10px_rgba(37,99,235,0.6)] hover:scale-[1.03] transition-transform">
            Join Now <ArrowRight className="w-5 h-5" />
          </a>
          <a href="#contact" className="glass text-white font-semibold px-8 py-4 rounded-full inline-flex items-center gap-2 hover:bg-white/10 transition-colors">
            Book Free Trial
          </a>
        </div>
        <div className="mt-10 inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs uppercase tracking-widest text-muted-foreground">
          <Sparkles className="w-3.5 h-3.5 text-secondary" />
          This is associated with Mavros Tech Private Limited
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- FOOTER ----------------------------- */
function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[color:var(--color-surface)] pt-20 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 font-display font-bold tracking-tight text-xl">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg btn-gradient">
              <Dumbbell className="w-5 h-5 text-white" />
            </span>
            APEX·PERFORMANCE
          </div>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            Bangalore's premium fitness club. Elite trainers, world-class equipment,
            luxury experience — engineered for results.
          </p>
          <form className="mt-5 flex glass rounded-full overflow-hidden p-1">
            <input type="email" placeholder="Email for newsletter" className="flex-1 bg-transparent px-4 text-sm outline-none" />
            <button className="btn-gradient text-white text-sm font-semibold px-4 py-2 rounded-full">Join</button>
          </form>
        </div>
        <div>
          <div className="text-sm font-semibold mb-4 uppercase tracking-widest">Quick Links</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {["Programs", "Membership", "Trainers", "Gallery", "Contact"].map((l) => (
              <li key={l}><a href="#" className="hover:text-foreground transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold mb-4 uppercase tracking-widest">Location & Hours</div>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3"><MapPin className="w-4 h-4 text-secondary mt-0.5" /> Bangalore, Karnataka</li>
            <li className="flex gap-3"><Phone className="w-4 h-4 text-secondary mt-0.5" /> <a href="tel:6361492452" className="hover:text-foreground">6361492452</a></li>
            <li className="flex gap-3"><Mail className="w-4 h-4 text-secondary mt-0.5" /> <a href="mailto:official@mavrostech.in" className="hover:text-foreground">official@mavrostech.in</a></li>
            <li className="flex gap-3"><Clock className="w-4 h-4 text-secondary mt-0.5" /> Open 24/7</li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold mb-4 uppercase tracking-widest">Follow</div>
          <div className="flex gap-3">
            {[Instagram, Facebook, Twitter, Youtube].map((I, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:btn-gradient hover:text-white transition-all">
                <I className="w-4 h-4" />
              </a>
            ))}
          </div>
          <div className="mt-6 rounded-2xl overflow-hidden border border-white/10">
            <iframe
              title="Apex Bangalore map"
              src="https://www.google.com/maps?q=Bangalore,Karnataka&output=embed"
              className="w-full h-40" loading="lazy"
            />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-14 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between gap-3 text-xs text-muted-foreground">
        <div>© {new Date().getFullYear()} Apex Performance Club. All rights reserved.</div>
        <div>Associated with <span className="text-foreground font-semibold">Mavros Tech Private Limited</span></div>
      </div>
    </footer>
  );
}

/* ----------------------------- FLOATING ACTIONS ----------------------------- */
function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <a
        href="https://wa.me/916361492452"
        target="_blank" rel="noreferrer"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
      <a
        href="#pricing"
        className="btn-gradient text-white font-semibold px-5 py-3 rounded-full shadow-[0_10px_40px_-10px_rgba(37,99,235,0.6)] inline-flex items-center gap-2 hover:scale-105 transition-transform"
      >
        <Zap className="w-4 h-4" /> Join Now
      </a>
    </div>
  );
}
