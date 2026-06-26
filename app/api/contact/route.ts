import { NextResponse } from "next/server";

const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "kauri@herosjourneycreative.co.nz";
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  lane?: unknown;
  note?: unknown;
  website?: unknown;
  pkg?: unknown;
};

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const website = asString(payload.website);
  if (website) {
    return NextResponse.json({ message: "Thanks, your enquiry has been received." });
  }

  const name = asString(payload.name);
  const email = asString(payload.email);
  const lane = asString(payload.lane);
  const note = asString(payload.note);
  const pkg = lane === "Website Refresh" ? asString(payload.pkg) : "";

  if (!name || !email || !lane) {
    return NextResponse.json({ message: "Please include your name, email, and enquiry lane." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
  }

  if (!RESEND_API_KEY || !CONTACT_FROM_EMAIL) {
    return NextResponse.json(
      {
        message: `Email delivery is not configured yet. Please email ${CONTACT_TO_EMAIL} directly.`,
      },
      { status: 503 },
    );
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      reply_to: email,
      subject: `New Hero's Journey Creative enquiry: ${lane}${pkg ? ` — ${pkg}` : ""}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Lane: ${lane}`,
        ...(pkg ? [`Package: ${pkg}`] : []),
        "",
        "Message:",
        note || "(No message supplied.)",
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { message: `Email delivery failed. Please email ${CONTACT_TO_EMAIL} directly.` },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: "Thanks, your enquiry has been received." });
}
