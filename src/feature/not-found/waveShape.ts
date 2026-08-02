/**
 * Bentuk "ombak" ungu dalam koordinat objectBoundingBox (0..1) — responsif.
 * @param p posisi puncak (x). Puncak (titik y=0.5) inilah yang menempel di api roket.
 * Tepi dibuat tinggi & melengkung ke dalam (concave) supaya puncaknya menjulang.
 */
export function wavePath(p: number): string {
  const t = 0.36; // taper: makin besar → puncak makin menjulang
  const b = (p - t).toFixed(3); // pangkal tepi (atas & bawah)
  const c1 = (p - 0.02).toFixed(3); // kontrol dekat puncak → sisi curam/melengkung ke dalam
  const c2 = (p + 0.04).toFixed(3); // kontrol sedikit melewati puncak → ujung sedikit melengkung
  const P = p.toFixed(3);
  return `M -0.6 -0.05 L ${b} -0.05 C ${c1} 0.12 ${c2} 0.34 ${P} 0.5 C ${c2} 0.66 ${c1} 0.88 ${b} 1.05 L -0.6 1.05 Z`;
}
