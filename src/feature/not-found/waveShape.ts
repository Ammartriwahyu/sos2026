export function wavePath(p: number): string {
  const t = 0.36;
  const b = (p - t).toFixed(3);
  const c1 = (p - 0.02).toFixed(3);
  const c2 = (p + 0.04).toFixed(3);
  const P = p.toFixed(3);
  return `M -0.6 -0.05 L ${b} -0.05 C ${c1} 0.12 ${c2} 0.34 ${P} 0.5 C ${c2} 0.66 ${c1} 0.88 ${b} 1.05 L -0.6 1.05 Z`;
}
