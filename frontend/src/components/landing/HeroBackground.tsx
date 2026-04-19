export default function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-accent-500/20 blur-[120px] animate-pulse-soft" />
      <div className="absolute right-[-10%] top-10 h-[340px] w-[340px] rounded-full bg-brand-500/20 blur-[110px] animate-float-slower" />
      <div className="absolute left-[-10%] top-40 h-[300px] w-[300px] rounded-full bg-signal-pink/10 blur-[110px] animate-float-slow" />
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent"
      />
    </div>
  );
}
