import { getDb } from "./neon";
import type { TamSession } from "./frozen";

export async function getSessions(): Promise<TamSession[]> {
  const sql = getDb();
  const rows = await sql`
    SELECT * FROM tam_sessions ORDER BY created_at DESC
  `;
  return rows as TamSession[];
}
