import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Users } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { sessions, openingHours } from "@/lib/data";

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: "Club Schedule — Cosmolot" },
      {
        name: "description",
        content:
          "Upcoming board game sessions at Cosmolot with dates, times, games and available spaces.",
      },
      { property: "og:title", content: "Club Schedule — Cosmolot" },
      {
        property: "og:description",
        content: "See which games are on each night and how many seats are left.",
      },
    ],
  }),
  component: SchedulePage,
});

function SchedulePage() {
  return (
    <div>
      <PageHeader
        title="Club schedule"
        subtitle="Sessions run at The Old Print Works. Seats can be reserved, or just turn up."
      />

      <ul className="space-y-3 px-5 py-5">
        {sessions.map((s) => (
          <li key={s.id} className="surface p-4">
            <div className="flex items-start gap-3">
              <div className="gradient-primary flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl text-primary-foreground">
                <span className="text-[0.62rem] uppercase tracking-wider">
                  {s.date.split(" ")[0]}
                </span>
                <span className="text-lg font-semibold leading-none">{s.date.split(" ")[1]}</span>
                <span className="text-[0.6rem]">{s.date.split(" ")[2]}</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{s.game}</p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" /> {s.time}
                  <span className="ml-1.5 flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" /> {s.spaces} spaces left
                  </span>
                </p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
                <Link
                  to="/register"
                  search={{ event: s.id }}
                  className="mt-3 inline-flex rounded-full border border-border bg-secondary px-3.5 py-1.5 text-xs font-semibold"
                >
                  Reserve a seat
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <section className="px-5 pb-6">
        <h2 className="text-lg font-semibold">Opening hours</h2>
        <ul className="surface mt-3 divide-y divide-border">
          {openingHours.map((o) => (
            <li key={o.day} className="flex justify-between px-4 py-2.5 text-sm">
              <span className="text-muted-foreground">{o.day}</span>
              <span className="font-medium">{o.hours}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
