import { TAROT, SUIT_VALENCE } from "@/lib/tam/frozen";

export async function GET() {
  const lines: string[] = ["card,upright,reversed"];
  for (const [card, v] of Object.entries(TAROT)) {
    lines.push(`"${card}",${v.upright},${v.reversed}`);
  }
  lines.push("", "suit,valence");
  for (const [suit, v] of Object.entries(SUIT_VALENCE)) {
    lines.push(`"${suit}",${v}`);
  }

  return new Response(lines.join("\r\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="tam-scoring-table.csv"',
    },
  });
}
