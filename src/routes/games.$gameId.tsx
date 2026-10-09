import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Users, Clock, Gauge, Baby } from "lucide-react";
import { games } from "@/lib/data";

export const Route = createFileRoute("/games/$gameId")({
  loader: ({ params }) => {
    const game = games.find((g) => g.id === params.gameId);
    if (!game) throw notFound();
    return { game };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Game unavailable — Cosmolot" }, { name: "robots", content: "noindex" }] };
    }
    const { game } = loaderData;
    return {
      meta: [
        { title: `${game.name} — Cosmolot` },
        { name: "description", content: game.short },
        { property: "og:title", content: `${game.name} — Cosmolot` },
        { property: "og:description", content: game.short },
      ],
    };
  },
  component: GameDetail,
});

function GameDetail() {
  const { game } = Route.useLoaderData();

  const facts = [
    { Icon: Users, label: "Players", value: game.players },
    { Icon: Clock, label: "Play time", value: game.time },
    { Icon: Gauge, label: "Difficulty", value: game.difficulty },
    { Icon: Baby, label: "Age", value: game.age },
  ];

  return (
    <div>
      <div className="relative">
        <img
          src={game.cover}
          alt={game.name}
          width={816}
          height={816}
          className="h-72 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <Link
          to="/games"
          className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-card/80 px-3 py-1.5 text-xs font-medium backdrop-blur"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Games
        </Link>
      </div>

      <div className="-mt-8 px-5">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-accent">
          {game.category}
        </p>
        <h1 className="mt-1 text-2xl font-semibold">{game.name}</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{game.description}</p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {facts.map(({ Icon, label, value }) => (
            <div key={label} className="surface p-3">
              <Icon className="h-4 w-4 text-accent" />
              <p className="mt-2 text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground">
                {label}
              </p>
              <p className="text-sm font-semibold">{value}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-7 text-lg font-semibold">How it plays</h2>
        <ol className="mt-3 space-y-2.5">
          {game.rules.map((rule, i) => (
            <li key={rule} className="surface flex gap-3 p-3.5 text-sm leading-relaxed">
              <span className="gradient-primary flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-primary-foreground">
                {i + 1}
              </span>
              {rule}
            </li>
          ))}
        </ol>

        <Link
          to="/schedule"
          className="gradient-primary glow mt-6 flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold text-primary-foreground"
        >
          Find a session for this game
        </Link>
      </div>
    </div>
  );
}
