export interface PhotoLocation {
  latitude: number;
  longitude: number;
}

const blobToDataUrl = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Gagal membaca foto."));
    reader.readAsDataURL(blob);
  });

const dataUrlToBlob = (dataUrl: string): Blob => {
  const base64 = dataUrl.slice(dataUrl.indexOf(",") + 1);
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return new Blob([bytes], { type: "image/jpeg" });
};

const pad = (value: number) => value.toString().padStart(2, "0");

const toExifDateTime = (date: Date) =>
  `${date.getFullYear()}:${pad(date.getMonth() + 1)}:${pad(date.getDate())} ` +
  `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;

const toGpsDateStamp = (date: Date) =>
  `${date.getUTCFullYear()}:${pad(date.getUTCMonth() + 1)}:${pad(date.getUTCDate())}`;

export const embedLocationExif = async (
  photo: Blob,
  location: PhotoLocation,
  capturedAt: Date,
): Promise<Blob> => {
  const piexif = (await import("piexifjs")).default;
  const dataUrl = await blobToDataUrl(photo);
  const exifDateTime = toExifDateTime(capturedAt);

  const gps: Record<number, unknown> = {
    [piexif.GPSIFD.GPSLatitudeRef]: location.latitude < 0 ? "S" : "N",
    [piexif.GPSIFD.GPSLatitude]: piexif.GPSHelper.degToDmsRational(
      Math.abs(location.latitude),
    ),
    [piexif.GPSIFD.GPSLongitudeRef]: location.longitude < 0 ? "W" : "E",
    [piexif.GPSIFD.GPSLongitude]: piexif.GPSHelper.degToDmsRational(
      Math.abs(location.longitude),
    ),
    [piexif.GPSIFD.GPSMapDatum]: "WGS-84",
    [piexif.GPSIFD.GPSDateStamp]: toGpsDateStamp(capturedAt),
    [piexif.GPSIFD.GPSTimeStamp]: [
      [capturedAt.getUTCHours(), 1],
      [capturedAt.getUTCMinutes(), 1],
      [capturedAt.getUTCSeconds(), 1],
    ],
  };

  const exifBytes = piexif.dump({
    "0th": { [piexif.ImageIFD.DateTime]: exifDateTime },
    Exif: { [piexif.ExifIFD.DateTimeOriginal]: exifDateTime },
    GPS: gps,
  });

  return dataUrlToBlob(piexif.insert(exifBytes, dataUrl));
};
