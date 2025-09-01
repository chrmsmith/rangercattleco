// src/app/contact/page.tsx
export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold">Contact Us</h1>
      <p className="mt-6 text-lg text-muted">
        We’d love to hear from you! Whether you’re interested in ordering beef,
        learning more about our farm, or just saying hello, reach out anytime.
      </p>

      <div className="mt-8 space-y-4 text-lg">
        <p>
          📧 <a href="mailto:hello@rangercattleco.com" className="underline">
            hello@rangercattleco.com
          </a>
        </p>
        <p>📍 Blue Mounds, Wisconsin</p>
      </div>
    </div>
  );
}
