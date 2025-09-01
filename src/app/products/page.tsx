// src/app/products/page.tsx
"use client";

import { useState } from "react";

export default function ProductsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 space-y-12">
      <header>
        <h1 className="text-4xl font-bold">Our Products</h1>
        <p className="mt-6 text-lg text-muted">
          Ranger Cattle Co offers premium Angus beef, available direct to families
          in south-central Wisconsin. From individual cuts to whole or half beef
          shares, we provide options to suit your needs.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        <Card title="Individual Cuts" text="Perfect for trying our beef. Steaks, roasts, and ground beef options." />
        <Card title="Quarter / Half Beef" text="A cost-effective way to stock your freezer. Custom butcher options available." />
        <Card title="Bulk Orders" text="Ideal for families, events, or restaurants looking for premium local beef." />
      </section>

      <OrderInterestForm />

      {/* Anchor target for top nav link */}
      <NewsletterForm />
    </div>
  );
}

function Card({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
      <h2 className="font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-muted">{text}</p>
    </div>
  );
}

function OrderInterestForm() {
  const [state, setState] = useState<{ status: "idle" | "submitting" | "success" | "error"; message?: string }>({ status: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setState({ status: "submitting" });
    try {
      const res = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setState({ status: "success" });
      form.reset();
    } catch {
      setState({ status: "error", message: "Something went wrong. Please try again." });
    }
  }

  return (
    <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
      <h3 className="text-2xl font-semibold">Order Interest</h3>
      <p className="mt-2 text-sm text-muted">
        Tell us what you’re looking for and we’ll get in touch with availability and next steps.
      </p>

      <form onSubmit={onSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Name</label>
          <input name="name" type="text" className="w-full rounded-xl border border-border px-3 py-2" placeholder="Jane Doe" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">Email *</label>
          <input name="email" type="email" required className="w-full rounded-xl border border-border px-3 py-2" placeholder="you@example.com" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">Phone</label>
          <input name="phone" type="tel" className="w-full rounded-xl border border-border px-3 py-2" placeholder="(555) 555-5555" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">Product</label>
          <select name="product" className="w-full rounded-xl border border-border px-3 py-2">
            <option value="">Select…</option>
            <option value="cuts">Individual Cuts</option>
            <option value="quarter">Quarter Beef</option>
            <option value="half">Half Beef</option>
            <option value="bulk">Bulk Order</option>
          </select>
        </div>
        <div className="grid gap-2 md:col-span-2">
          <label className="text-sm font-medium">Message</label>
          <textarea name="message" rows={4} className="w-full rounded-xl border border-border px-3 py-2" placeholder="Tell us what you’re looking for…" />
        </div>
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={state.status === "submitting"}
            className="inline-flex items-center rounded-xl bg-brand px-5 py-3 text-white font-medium hover:opacity-90 disabled:opacity-50"
          >
            {state.status === "submitting" ? "Sending…" : "Send Request"}
          </button>
          {state.status === "success" && (
            <span className="ml-3 text-sm text-green-700">Thanks! We’ll be in touch.</span>
          )}
          {state.status === "error" && (
            <span className="ml-3 text-sm text-red-700">{state.message}</span>
          )}
        </div>
      </form>
    </section>
  );
}

function NewsletterForm() {
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (new FormData(form).get("email") as string) || "";
    setState("submitting");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Failed");
      setState("success");
      form.reset();
    } catch {
      setState("error");
    }
  }

  return (
    <section id="newsletter" className="rounded-2xl border border-border bg-white p-6 shadow-sm">
      <h3 className="text-2xl font-semibold">Newsletter</h3>
      <p className="mt-2 text-sm text-muted">
        Be the first to hear about inventory, drop dates, and specials.
      </p>
      <form onSubmit={onSubmit} className="mt-4 flex flex-col sm:flex-row gap-3">
        <input
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="flex-1 rounded-xl border border-border px-3 py-2"
        />
        <button
          type="submit"
          disabled={state === "submitting"}
          className="inline-flex items-center rounded-xl bg-accent px-5 py-3 font-medium hover:opacity-90 disabled:opacity-50"
        >
          {state === "submitting" ? "Joining…" : "Join"}
        </button>
        {state === "success" && (
          <span className="text-sm text-green-700 self-center">Thanks for subscribing!</span>
        )}
        {state === "error" && (
          <span className="text-sm text-red-700 self-center">Please try again.</span>
        )}
      </form>
    </section>
  );
}


