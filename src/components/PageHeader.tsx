export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="gradient-hero dotted-board px-5 pb-7 pt-10">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-accent">
        Cosmolot
      </p>
      <h1 className="mt-2 text-3xl font-semibold">{title}</h1>
      {subtitle && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{subtitle}</p>}
    </header>
  );
}
