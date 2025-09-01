// src/app/api/interest/route.ts
import { NextResponse } from "next/server";
import { RESEND_API_KEY, EMAIL_FROM, EMAIL_TO } from "@/lib/env";

type InterestPayload = {
  name?: string;
  email?: string;
  phone?: string;
  product?: string;
  message?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<InterestPayload> | null;
    const { name = "", email = "", phone = "", product = "", message = "" } = body ?? {};

    if (!email) {
      return NextResponse.json({ ok: false, error: "Email is required" }, { status: 400 });
    }

    if (RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(RESEND_API_KEY);

      const subject = `New Order Interest: ${product || "General"} — ${name || email}`;
      const html = `
        <h2>New Order Interest</h2>
        <p><strong>Name:</strong> ${name || "-"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "-"}</p>
        <p><strong>Product:</strong> ${product || "-"}</p>
        <p><strong>Message:</strong></p>
        <p>${(message || "-").replace(/\n/g, "<br/>")}</p>
      `;

      await resend.emails.send({
        from: EMAIL_FROM,
        to: EMAIL_TO,
        subject,
        html,
      });
    } else {
      // eslint-disable-next-line no-console
      console.warn("[/api/interest] RESEND_API_KEY not set. Submission:", {
        name, email, phone, product, message,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    // eslint-disable-next-line no-console
    console.error("[/api/interest] error", err instanceof Error ? err.message : err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
