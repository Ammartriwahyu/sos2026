const MAX_DIMENSION = 1600;
const QUALITY_STEPS = [0.92, 0.85, 0.78, 0.7, 0.62, 0.55, 0.45, 0.35];
const MAX_DOWNSCALE_ATTEMPT = 4;

const canvasToJpeg = (
  canvas: HTMLCanvasElement,
  quality: number,
): Promise<Blob> =>
  new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) =>
        blob
          ? resolve(blob)
          : reject(new Error("Gagal mengubah foto menjadi JPEG.")),
      "image/jpeg",
      quality,
    );
  });

const drawScaled = (source: HTMLCanvasElement, scale: number) => {
  const target = document.createElement("canvas");
  target.width = Math.max(1, Math.round(source.width * scale));
  target.height = Math.max(1, Math.round(source.height * scale));

  const context = target.getContext("2d");
  if (!context) {
    throw new Error("Browser tidak mendukung pemrosesan foto.");
  }

  context.drawImage(source, 0, 0, target.width, target.height);
  return target;
};

export const compressCanvasToJpeg = async (
  canvas: HTMLCanvasElement,
  maxBytes: number,
): Promise<Blob> => {
  const largestSide = Math.max(canvas.width, canvas.height);
  let scale = largestSide > MAX_DIMENSION ? MAX_DIMENSION / largestSide : 1;

  for (let attempt = 0; attempt < MAX_DOWNSCALE_ATTEMPT; attempt++) {
    const scaled = scale === 1 ? canvas : drawScaled(canvas, scale);

    for (const quality of QUALITY_STEPS) {
      const blob = await canvasToJpeg(scaled, quality);
      if (blob.size <= maxBytes) {
        return blob;
      }
    }

    scale *= 0.75;
  }

  throw new Error("Foto terlalu besar untuk dikirim. Silakan ambil ulang.");
};
