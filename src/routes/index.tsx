import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Clock, Users } from "lucide-react";
import heroImage from "@/assets/hero.jpg";
import { games, sessions, events } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cosmolot — Board Games Club in England" },
      {
        name: "description",
        content:
          "Discover tabletop games, join club sessions and enter tournaments at Cosmolot, a friendly board games club in Manchester, England.",
      },
      { property: "og:title", content: "Cosmolot — Board Games Club in England" },
      {
        property: "og:description",
        content: "Games, weekly sessions and tournaments at the Cosmolot board games club.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = games.slice(0, 4);
  const nextSessions = sessions.slice(0, 3);
  const nextEvents = events.slice(0, 2);

  return (
    <div>
      <section className="gradient-hero relative overflow-hidden px-5 pb-8 pt-10">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-accent">
          Manchester · England
        </p>
        <h1 className="mt-2 text-[2rem] font-semibold leading-tight">
          Cosmolot
          <span className="block text-lavender">Board Games Club</span>
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Over 300 games on the shelves, a table for every mood, and someone always happy to teach
          the rules. No membership or account needed — just turn up.
        </p>
        <div className="mt-5 flex gap-2.5">
          <Link
            to="/schedule"
            className="gradient-primary glow inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            See the schedule <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center rounded-full border border-border bg-card/70 px-4 py-2.5 text-sm font-medium"
          >
            Reserve a seat
          </Link>
        </div>
        <img
          src={heroImage}
          alt="Board game table with dice, meeples and hex tiles"
          width={1024}
          height={768}
          className="mt-7 w-full rounded-2xl border border-border object-cover"
        />
      </section>

      <Section
        title="Featured games"
        action={{ to: "/games", label: "All games" }}
        subtitle="Pulled from the club library this month."
      >
        <div className="-mx-5 flex snap-x gap-3 overflow-x-auto px-5 pb-2">
          {featured.map((game) => (
            <Link
              key={game.id}
              to="/games/$gameId"
              params={{ gameId: game.id }}
              className="surface w-40 shrink-0 snap-start overflow-hidden"
            >
              <img
                src={game.cover}
                alt={game.name}
                loading="lazy"
                width={816}
                height={816}
                className="h-40 w-full object-cover"
              />
              <div className="p-3">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-accent">
                  {game.category}
                </p>
                <p className="mt-1 text-sm font-semibold leading-snug">{game.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{game.players}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section
        title="Upcoming sessions"
        action={{ to: "/schedule", label: "Full schedule" }}
        subtitle="Open tables you can join this week."
      >
        <ul className="space-y-3">
          {nextSessions.map((s) => (
            <li key={s.id} className="surface p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">{s.game}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CalendarDays className="h-3.5 w-3.5" /> {s.date}
                    <Clock className="ml-1.5 h-3.5 w-3.5" /> {s.time}
                  </p>
                </div>
                <span className="flex shrink-0 items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-[0.7rem] font-medium">
                  <Users className="h-3.5 w-3.5" /> {s.spaces}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        title="Tournaments & events"
        action={{ to: "/events", label: "All events" }}
        subtitle="Bigger nights worth booking ahead for."
      >
        <ul className="space-y-3">
          {nextEvents.map((e) => (
            <li key={e.id} className="surface p-4">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-accent">
                {e.date}
              </p>
              <p className="mt-1 text-base font-semibold">{e.title}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                {e.description}
              </p>
              <Link
                to="/register"
                search={{ event: e.id }}
                className="gradient-primary mt-3 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-primary-foreground"
              >
                Register <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}

function Section({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle?: string;
  action?: { to: "/games" | "/schedule" | "/events"; label: string };
  children: React.ReactNode;
}) {
  return (
    <section className="px-5 pt-8">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        {action && (
          <Link to={action.to} className="shrink-0 text-xs font-semibold text-accent">
            {action.label}
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
