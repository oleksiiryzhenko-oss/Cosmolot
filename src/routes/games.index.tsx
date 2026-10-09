import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { categories, games } from "@/lib/data";

export const Route = createFileRoute("/games/")({
  head: () => ({
    meta: [
      { title: "Board Games Library — Cosmolot" },
      {
        name: "description",
        content:
          "Browse the Cosmolot club library: strategy, family, party, card, cooperative, puzzle and adventure board games.",
      },
      { property: "og:title", content: "Board Games Library — Cosmolot" },
      {
        property: "og:description",
        content: "Strategy, family, party, card, co-op, puzzle and adventure games at the club.",
      },
    ],
  }),
  component: GamesPage,
});

function GamesPage() {
  const [active, setActive] = useState<string>("All");
  const list = active === "All" ? games : games.filter((g) => g.category === active);

  return (
    <div>
      <PageHeader
        title="Board games"
        subtitle="Everything here lives on the club shelves and can be borrowed on any club night."
      />
      <div className="-mx-0 flex gap-2 overflow-x-auto px-5 py-4">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={
              c === active
                ? "gradient-primary shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold text-primary-foreground"
                : "shrink-0 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground"
            }
          >
            {c}
          </button>
        ))}
      </div>

      <ul className="space-y-3 px-5 pb-4">
        {list.map((game) => (
          <li key={game.id}>
            <Link
              to="/games/$gameId"
              params={{ gameId: game.id }}
              className="surface flex gap-3 overflow-hidden p-3"
            >
              <img
                src={game.cover}
                alt={game.name}
                loading="lazy"
                width={816}
                height={816}
                className="h-24 w-24 shrink-0 rounded-xl object-cover"
              />
              <div className="min-w-0">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-accent">
                  {game.category}
                </p>
                <p className="mt-0.5 text-sm font-semibold">{game.name}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{game.short}</p>
                <p className="mt-1.5 text-[0.7rem] text-muted-foreground">
                  {game.players} · {game.time} · {game.difficulty}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
