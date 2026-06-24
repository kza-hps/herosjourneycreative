import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

const COOKIE = "tam_op";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function POST(request: NextRequest) {
  const { token } = (await request.json()) as { token?: string };
  const expected = process.env.OPERATOR_TOKEN;

  if (!expected || !token || token !== expected) {
    return Response.json({ error: "Invalid token." }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });

  return Response.json({ ok: true });
}
