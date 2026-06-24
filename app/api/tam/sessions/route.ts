import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { getDb } from "@/lib/tam/neon";
import {
  TAROT,
  SUIT_VALENCE,
  dirHit,
  parseYoutubeId,
  type TamSession,
} from "@/lib/tam/frozen";
import { getSessions } from "@/lib/tam/db";

function generateId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  return "TAM-" + Array.from(bytes, (b) => chars[b % chars.length]).join("");
}

async function isOperator(): Promise<boolean> {
  const expected = process.env.OPERATOR_TOKEN;
  if (!expected) return false;
  const store = await cookies();
  return store.get("tam_op")?.value === expected;
}

export async function GET() {
  try {
    const sessions = await getSessions();
    return Response.json(sessions);
  } catch {
    return Response.json({ error: "Failed to fetch sessions." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isOperator())) {
    return Response.json({ error: "Unauthorised." }, { status: 401 });
  }

  let body: {
    condition?: string;
    state_valence?: number;
    tarot_card?: string;
    tarot_reversed?: boolean;
    pc_rank?: string;
    pc_suit?: string;
    youtube_url?: string;
    note?: string;
  };

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { condition, state_valence, tarot_card, tarot_reversed, pc_rank, pc_suit, youtube_url, note } = body;

  if (condition !== "up" && condition !== "down") {
    return Response.json({ error: "condition must be 'up' or 'down'." }, { status: 400 });
  }
  if (typeof state_valence !== "number" || state_valence < -5 || state_valence > 5) {
    return Response.json({ error: "state_valence must be −5..+5." }, { status: 400 });
  }
  if (!tarot_card || !(tarot_card in TAROT)) {
    return Response.json({ error: "Unknown tarot card." }, { status: 400 });
  }
  if (typeof tarot_reversed !== "boolean") {
    return Response.json({ error: "tarot_reversed must be true or false." }, { status: 400 });
  }
  if (!pc_rank || !pc_suit || !(pc_suit in SUIT_VALENCE)) {
    return Response.json({ error: "Invalid playing card." }, { status: 400 });
  }

  const tarot_valence = tarot_reversed ? TAROT[tarot_card].reversed : TAROT[tarot_card].upright;
  const playing_valence = SUIT_VALENCE[pc_suit];
  const playing_card = `${pc_rank} ${pc_suit}`;

  let youtube_id: string | null = null;
  const trimmed_url = youtube_url?.trim() || null;
  if (trimmed_url) {
    youtube_id = parseYoutubeId(trimmed_url);
    if (!youtube_id) {
      return Response.json(
        { error: "That doesn't look like a YouTube link — paste the video URL." },
        { status: 400 }
      );
    }
  }

  const session: TamSession = {
    id: generateId(),
    created_at: new Date().toISOString(),
    condition,
    state_valence,
    tarot_card,
    tarot_reversed,
    tarot_valence,
    tarot_dir_hit: dirHit(tarot_valence, state_valence),
    playing_card,
    playing_valence,
    playing_dir_hit: dirHit(playing_valence, state_valence),
    youtube_url: trimmed_url,
    youtube_id,
    note: note?.trim() || null,
  };

  try {
    const sql = getDb();
    await sql`
      INSERT INTO tam_sessions
        (id, created_at, condition, state_valence, tarot_card, tarot_reversed, tarot_valence, tarot_dir_hit,
         playing_card, playing_valence, playing_dir_hit, youtube_url, youtube_id, note)
      VALUES
        (${session.id}, ${session.created_at}, ${session.condition}, ${session.state_valence},
         ${session.tarot_card}, ${session.tarot_reversed}, ${session.tarot_valence}, ${session.tarot_dir_hit},
         ${session.playing_card}, ${session.playing_valence}, ${session.playing_dir_hit},
         ${session.youtube_url}, ${session.youtube_id}, ${session.note})
    `;
  } catch {
    return Response.json({ error: "Failed to save session." }, { status: 500 });
  }

  return Response.json(session, { status: 201 });
}
