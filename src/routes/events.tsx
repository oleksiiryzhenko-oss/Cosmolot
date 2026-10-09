import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Clock, Dices, Users } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { events } from "@/lib/data";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Tournaments & Events — Cosmolot" },
      {
        name: "description",
        content:
          "Cosmolot tournaments and community events: dates, games, entry details and registration.",
      },
      { property: "og:title", content: "Tournaments & Events — Cosmolot" },
      {
        property: "og:description",
        content: "Championships, leagues, family afternoons and campaign nights at the club.",
      },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  return (
    <div>
      <PageHeader
        title="Tournaments & events"
        subtitle="Our bigger club nights. Places are limited, so registration is recommended."
      />

      <ul className="space-y-4 px-5 py-5">
        {events.map((e) => (
          <li key={e.id} className="surface overflow-hidden">
            <div className="gradient-primary px-4 py-2.5 text-primary-foreground">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em]">{e.date}</p>
            </div>
            <div className="p-4">
              <h2 className="text-base font-semibold">{e.title}</h2>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" /> {e.time}
                </span>
                <span className="flex items-center gap-1.5">
                  <Dices className="h-3.5 w-3.5" /> {e.game}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" /> {e.spaces} places left
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{e.description}</p>
              <p className="mt-3 flex items-start gap-1.5 rounded-xl bg-secondary px-3 py-2.5 text-xs">
                <CalendarDays className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                {e.participation}
              </p>
              <Link
                to="/register"
                search={{ event: e.id }}
                className="gradient-primary glow mt-4 flex items-center justify-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                Register for this event <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
