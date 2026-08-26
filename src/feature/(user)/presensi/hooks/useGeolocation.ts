"use client";

import { useCallback, useState } from "react";
import type { PhotoLocation } from "../utils/embedLocationExif";

const GEOLOCATION_TIMEOUT = 20000;

const messageFor = (error: GeolocationPositionError) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return "Izin lokasi ditolak. Aktifkan izin lokasi untuk situs ini, lalu coba lagi.";
    case error.POSITION_UNAVAILABLE:
      return "Lokasi tidak terdeteksi. Pastikan GPS perangkat aktif.";
    case error.TIMEOUT:
      return "Pencarian lokasi terlalu lama. Coba lagi di area yang lebih terbuka.";
    default:
      return "Gagal mendapatkan lokasi. Silakan coba lagi.";
  }
};

export const useGeolocation = () => {
  const [location, setLocation] = useState<PhotoLocation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  const requestLocation = useCallback(async () => {
    if (typeof window === "undefined") return;

    if (!window.isSecureContext) {
      setError(
        "Lokasi hanya bisa diakses lewat HTTPS. Buka situs ini dengan alamat https://.",
      );
      return;
    }

    if (!navigator.geolocation) {
      setError("Perangkat atau browser ini tidak mendukung deteksi lokasi.");
      return;
    }

    setIsLocating(true);
    setError(null);

    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: GEOLOCATION_TIMEOUT,
            maximumAge: 0,
          });
        },
      );

      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    } catch (err) {
      setLocation(null);
      setError(messageFor(err as GeolocationPositionError));
    } finally {
      setIsLocating(false);
    }
  }, []);

  const reset = useCallback(() => {
    setLocation(null);
    setError(null);
    setIsLocating(false);
  }, []);

  return { location, error, isLocating, requestLocation, reset };
};
