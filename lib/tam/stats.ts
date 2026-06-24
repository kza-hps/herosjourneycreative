export type ArmStats = { n: number; hits: number; p: number | null };

export function erfc(x: number): number {
  const t = 1 / (1 + 0.3275911 * Math.abs(x));
  const poly =
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t +
      0.254829592) *
    t *
    Math.exp(-x * x);
  return x >= 0 ? poly : 2 - poly;
}

export function zTest(up: ArmStats, dn: ArmStats): { z: number; p: number } | null {
  if (up.n < 2 || dn.n < 2 || up.p === null || dn.p === null) return null;
  const pp = (up.hits + dn.hits) / (up.n + dn.n);
  const se = Math.sqrt(pp * (1 - pp) * (1 / up.n + 1 / dn.n));
  if (se === 0) return null;
  const z = (up.p - dn.p) / se;
  const p = 0.5 * erfc(z / Math.SQRT2);
  return { z, p };
}

export function pct(n: number | null): string {
  if (n === null) return "n/a";
  return Math.round(n * 100) + "%";
}

export function gapStr(gap: number | null): string {
  if (gap === null) return "n/a";
  const rounded = Math.round(gap * 100) + 0;
  return (rounded > 0 ? "+" : "") + rounded + "%";
}
