import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { PageHeader } from "@/components/PageHeader";
import { registrationOptions } from "@/lib/data";

export const Route = createFileRoute("/register")({
  validateSearch: (search: Record<string, unknown>): { event?: string } =>
    typeof search["event"] === "string" ? { event: search["event"] } : {},
  head: () => ({
    meta: [
      { title: "Register for a Session — Cosmolot" },
      {
        name: "description",
        content:
          "Reserve your place at a Cosmolot club session or tournament. No account needed — just your name and contact details.",
      },
      { property: "og:title", content: "Register for a Session — Cosmolot" },
      {
        property: "og:description",
        content: "A short form to reserve a seat at a Cosmolot session or tournament.",
      },
    ],
  }),
  component: RegisterPage,
});

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Please enter your full name" })
    .max(100, { message: "Name must be under 100 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be under 255 characters" }),
  phone: z
    .string()
    .trim()
    .min(7, { message: "Please enter a contact phone number" })
    .max(20, { message: "Phone number must be under 20 characters" })
    .regex(/^[0-9+()\s-]+$/, { message: "Phone number can only contain digits and + ( ) -" }),
  eventId: z.string().min(1, { message: "Please choose a session or event" }),
});

type Confirmed = { name: string; email: string; phone: string; label: string };

function RegisterPage() {
  const { event } = Route.useSearch();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventId: event && registrationOptions.some((o) => o.id === event) ? event : "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmed, setConfirmed] = useState<Confirmed | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    const option = registrationOptions.find((o) => o.id === result.data.eventId);
    setConfirmed({
      name: result.data.name,
      email: result.data.email,
      phone: result.data.phone,
      label: option?.label ?? "",
    });
  }

  if (confirmed) {
    return (
      <div>
        <PageHeader title="You're booked in" subtitle="We've saved your place — see you there." />
        <div className="px-5 py-6">
          <div className="surface p-5 text-center">
            <CheckCircle2 className="mx-auto h-10 w-10 text-accent" />
            <p className="mt-3 text-base font-semibold">Registration confirmed</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Thanks {confirmed.name.split(" ")[0]} — a confirmation has been sent to{" "}
              {confirmed.email}. Please arrive ten minutes early and say hello at the welcome desk.
            </p>
            <dl className="mt-4 space-y-2 border-t border-border pt-4 text-left text-sm">
              <Row label="Booking" value={confirmed.label} />
              <Row label="Name" value={confirmed.name} />
              <Row label="Email" value={confirmed.email} />
              <Row label="Phone" value={confirmed.phone} />
            </dl>
          </div>
          <div className="mt-4 flex gap-2.5">
            <button
              onClick={() => {
                setConfirmed(null);
                setForm({ name: "", email: "", phone: "", eventId: "" });
              }}
              className="flex-1 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-medium"
            >
              Book another
            </button>
            <Link
              to="/"
              className="gradient-primary flex-1 rounded-full px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground"
            >
              Back home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Registration"
        subtitle="No account needed. Fill in four details and your seat is reserved."
      />
      <form onSubmit={submit} className="space-y-4 px-5 py-6">
        <Field label="Full name" error={errors["name"]}>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            maxLength={100}
            placeholder="Alex Morgan"
            className="w-full rounded-xl border border-border bg-input px-3.5 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-accent"
          />
        </Field>
        <Field label="Email address" error={errors["email"]}>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            maxLength={255}
            placeholder="alex@example.co.uk"
            className="w-full rounded-xl border border-border bg-input px-3.5 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-accent"
          />
        </Field>
        <Field label="Phone number" error={errors["phone"]}>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            maxLength={20}
            placeholder="+44 7700 900123"
            className="w-full rounded-xl border border-border bg-input px-3.5 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-accent"
          />
        </Field>
        <Field label="Session or event" error={errors["eventId"]}>
          <select
            value={form.eventId}
            onChange={(e) => setForm({ ...form, eventId: e.target.value })}
            className="w-full rounded-xl border border-border bg-input px-3.5 py-2.5 text-sm outline-none focus:border-accent"
          >
            <option value="">Choose from the schedule…</option>
            {registrationOptions.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
        <button
          type="submit"
          className="gradient-primary glow w-full rounded-full px-5 py-3 text-sm font-semibold text-primary-foreground"
        >
          Confirm registration
        </button>
        <p className="text-center text-xs text-muted-foreground">
          We only use your details to confirm this booking.
        </p>
      </form>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="shrink-0 text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}
