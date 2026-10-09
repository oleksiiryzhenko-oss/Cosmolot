import { Link } from "@tanstack/react-router";
import { Home, Dices, Trophy, CalendarDays, Info } from "lucide-react";

const items = [
  { to: "/", label: "Home", Icon: Home },
  { to: "/games", label: "Games", Icon: Dices },
  { to: "/events", label: "Events", Icon: Trophy },
  { to: "/schedule", label: "Schedule", Icon: CalendarDays },
  { to: "/club", label: "Club", Icon: Info },
] as const;

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 backdrop-blur-md">
      <ul className="mx-auto flex max-w-lg items-stretch justify-between px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2">
        {items.map(({ to, label, Icon }) => (
          <li key={to} className="flex-1">
            <Link
              to={to}
              activeOptions={{ exact: to === "/" }}
              className="flex flex-col items-center gap-1 rounded-lg py-1.5 text-[0.68rem] font-medium text-muted-foreground transition-colors"
              activeProps={{ className: "text-accent" }}
            >
              <Icon className="h-5 w-5" strokeWidth={1.9} />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
