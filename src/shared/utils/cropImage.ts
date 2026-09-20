export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

export function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180;
}

export default async function getCroppedImg(
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number },
  rotation = 0,
): Promise<Blob | null> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return null;
  }

  // Set proper canvas dimensions before transform
  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  canvas.width = safeArea;
  canvas.height = safeArea;

  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.rotate(getRadianAngle(rotation));
  ctx.translate(-safeArea / 2, -safeArea / 2);

  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5,
  );

  const data = ctx.getImageData(0, 0, safeArea, safeArea);

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.putImageData(
    data,
    Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
    Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y),
  );

  // Scale down if image is too large (optimization)
  const MAX_DIMENSION = 800;
  let finalCanvas = canvas;

  if (pixelCrop.width > MAX_DIMENSION || pixelCrop.height > MAX_DIMENSION) {
    const ratio = Math.min(
      MAX_DIMENSION / pixelCrop.width,
      MAX_DIMENSION / pixelCrop.height,
    );
    const scaledWidth = Math.round(pixelCrop.width * ratio);
    const scaledHeight = Math.round(pixelCrop.height * ratio);

    finalCanvas = document.createElement("canvas");
    finalCanvas.width = scaledWidth;
    finalCanvas.height = scaledHeight;
    const finalCtx = finalCanvas.getContext("2d");
    if (finalCtx) {
      // smooth scaling
      finalCtx.imageSmoothingEnabled = true;
      finalCtx.imageSmoothingQuality = "high";
      finalCtx.drawImage(canvas, 0, 0, scaledWidth, scaledHeight);
    }
  }

  return new Promise((resolve) => {
    finalCanvas.toBlob(
      (file) => {
        resolve(file);
      },
      "image/webp",
      0.9,
    ); // Use webp for better compression
  });
}
