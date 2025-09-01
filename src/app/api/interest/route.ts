// src/app/api/interest/route.ts
import { NextResponse } from "next/server";
import { RESEND_API_KEY, EMAIL_FROM, EMAIL_TO } from "@/lib/env";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name = "", email = "", phone = "", product = "", message = "" } = body ?? {};

    // Basic validation
    if (!email) {
      return NextResponse.json({ ok: false, error: "Email is required" }, { status: 400 });
    }

    // If Resend is configured, send an email notification
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
      console.warn("[/api/interest] RESEND_API_KEY not set. Printing submission:", {
        name, email, phone, product, message,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("[/api/interest] error", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
