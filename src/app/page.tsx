// src/app/page.tsx
export default function HomePage() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Ranger Cattle Co
            </h1>
            <p className="mt-5 text-lg text-muted">
              Premium beef from south-central Wisconsin, raised with care and delivered with an unmatched customer experience.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/products"
                className="inline-flex items-center rounded-xl bg-brand px-5 py-3 text-white font-medium hover:opacity-90"
              >
                View products
              </a>
              <a
                href="/about"
                className="inline-flex items-center rounded-xl border border-border px-5 py-3 font-medium hover:bg-white"
              >
                Our story
              </a>
            </div>
            <p className="mt-4 text-sm text-muted">
              Formerly Black Oak Farms — we’ve moved to a new brand and home.
            </p>
          </div>
          <div className="aspect-[4/3] w-full rounded-2xl border border-border bg-[url('/hero.jpg')] bg-cover bg-center shadow-sm" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="grid gap-6 md:grid-cols-3">
          <Feature
            title="Quality First"
            text="Angus-focused genetics, careful grazing, and transparent processing."
          />
          <Feature
            title="Local & Direct"
            text="We sell direct to families and neighbors across Dane County."
          />
          <Feature
            title="Experience"
            text="Premium food + experience — we aim to earn your trust and loyalty."
          />
        </div>
      </section>
    </div>
  );
}

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
      <div className="h-9 w-9 rounded-lg bg-accent mb-3" />
      <div className="font-semibold">{title}</div>
      <p className="mt-2 text-sm text-muted">{text}</p>
    </div>
  );
}
