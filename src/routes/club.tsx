import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Train } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { clubRules, contact, faqs, openingHours } from "@/lib/data";

export const Route = createFileRoute("/club")({
  head: () => ({
    meta: [
      { title: "About the Club — Cosmolot" },
      {
        name: "description",
        content:
          "About Cosmolot board games club: club rules, opening hours, location in Manchester, contact details and FAQ.",
      },
      { property: "og:title", content: "About the Club — Cosmolot" },
      {
        property: "og:description",
        content: "Club rules, opening hours, location and answers to common questions.",
      },
    ],
  }),
  component: ClubPage,
});

function ClubPage() {
  return (
    <div>
      <PageHeader
        title="Club information"
        subtitle="Everything you need before your first visit to Cosmolot."
      />

      <section className="px-5 py-5">
        <h2 className="text-lg font-semibold">About Cosmolot</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Cosmolot started in 2016 as six friends and a crate of games in a Manchester pub back
          room. Today we are a volunteer-run club of around 200 regulars with a library of more than
          300 games, meeting five nights a week at The Old Print Works. There is no membership
          application and no profile to set up — pay on the door, pick a table, and someone will
          teach you a game.
        </p>
      </section>

      <section className="px-5 pb-5">
        <h2 className="text-lg font-semibold">Club rules</h2>
        <ul className="mt-3 space-y-2">
          {clubRules.map((rule) => (
            <li key={rule} className="surface flex gap-2.5 p-3.5 text-sm leading-relaxed">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
              {rule}
            </li>
          ))}
        </ul>
      </section>

      <section className="px-5 pb-5">
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

      <section className="px-5 pb-5">
        <h2 className="text-lg font-semibold">Find us & get in touch</h2>
        <ul className="surface mt-3 space-y-3 p-4 text-sm">
          <li className="flex gap-2.5">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span className="leading-relaxed">{contact.address}</span>
          </li>
          <li className="flex gap-2.5">
            <Train className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span className="leading-relaxed">{contact.travel}</span>
          </li>
          <li className="flex gap-2.5">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <a href={`mailto:${contact.email}`} className="underline-offset-4 hover:underline">
              {contact.email}
            </a>
          </li>
          <li className="flex gap-2.5">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <a href={`tel:${contact.phone}`} className="underline-offset-4 hover:underline">
              {contact.phone}
            </a>
          </li>
        </ul>
      </section>

      <section className="px-5 pb-6">
        <h2 className="text-lg font-semibold">FAQ</h2>
        <ul className="mt-3 space-y-2.5">
          {faqs.map((f) => (
            <li key={f.q} className="surface p-4">
              <p className="text-sm font-semibold">{f.q}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
