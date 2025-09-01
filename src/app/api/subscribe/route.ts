// src/app/api/subscribe/route.ts
import { NextResponse } from "next/server";
import { RESEND_API_KEY, EMAIL_FROM, EMAIL_TO } from "@/lib/env";

type SubscribePayload = {
  email: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<SubscribePayload> | null;
    const email = (body?.email ?? "").trim();
    if (!email) {
      return NextResponse.json({ ok: false, error: "Email is required" }, { status: 400 });
    }

    if (RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(RESEND_API_KEY);

      await resend.emails.send({
        from: EMAIL_FROM,
        to: EMAIL_TO,
        subject: "New Newsletter Signup",
        html: `<p><strong>Email:</strong> ${email}</p>`,
      });
    } else {
      // eslint-disable-next-line no-console
      console.warn("[/api/subscribe] RESEND_API_KEY not set. New subscriber:", { email });
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    // eslint-disable-next-line no-console
    console.error("[/api/subscribe] error", err instanceof Error ? err.message : err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}

