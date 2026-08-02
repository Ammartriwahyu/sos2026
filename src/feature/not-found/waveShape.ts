/**
 * Bentuk "ombak" ungu yang ditarik roket, dalam koordinat objectBoundingBox (0..1).
 * @param p posisi puncak (x) — menempel di api roket.
 * @param t fase waktu (detik) untuk membuat tepi ombak BERIAK/MENGALIR organik.
 *
 * Tepi tetap kurva Bézier halus dengan puncak menjulang di y=0.5, tetapi titik
 * pangkal & kontrolnya bergoyang halus mengikuti `t` sehingga ombak terlihat
 * mengalir hidup (bukan bentuk statis) saat ditarik.
 */
export function wavePath(p: number, t = 0): string {
  const taper = 0.36; // makin besar → puncak makin menjulang
  const amp = 0.03; // amplitudo riak tepi
  const s = (ph: number) => amp * Math.sin(t * 2.4 + ph);

  const b = p - taper; // pangkal tepi (atas & bawah)
  const c1 = p - 0.02; // kontrol dekat puncak (sisi melengkung ke dalam)
  const c2 = p + 0.04; // kontrol sedikit melewati puncak

  // pangkal & kontrol digoyang beda fase (atas vs bawah) → tepi mengalir
  const bt = (b + s(0)).toFixed(3);
  const bb = (b + s(2.1)).toFixed(3);
  const c1t = (c1 + s(0.8)).toFixed(3);
  const c2t = (c2 + s(1.4)).toFixed(3);
  const c2b = (c2 + s(3.0)).toFixed(3);
  const c1b = (c1 + s(3.6)).toFixed(3);
  const P = p.toFixed(3);

  return `M -0.6 -0.05 L ${bt} -0.05 C ${c1t} 0.12 ${c2t} 0.34 ${P} 0.5 C ${c2b} 0.66 ${c1b} 0.88 ${bb} 1.05 L -0.6 1.05 Z`;
}
