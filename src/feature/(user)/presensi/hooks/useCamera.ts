"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type CameraFacing = "user" | "environment";

const messageFor = (error: unknown) => {
  const name = error instanceof DOMException ? error.name : "";

  switch (name) {
    case "NotAllowedError":
    case "SecurityError":
      return "Izin kamera ditolak. Aktifkan izin kamera untuk situs ini, lalu coba lagi.";
    case "NotFoundError":
    case "OverconstrainedError":
      return "Kamera tidak ditemukan pada perangkat ini.";
    case "NotReadableError":
      return "Kamera sedang dipakai aplikasi lain. Tutup aplikasi tersebut lalu coba lagi.";
    default:
      return "Gagal membuka kamera. Silakan coba lagi.";
  }
};

export const useCamera = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [facing, setFacing] = useState<CameraFacing>("user");
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsReady(false);
  }, []);

  const start = useCallback(
    async (mode: CameraFacing) => {
      if (typeof window === "undefined") return;

      if (!window.isSecureContext) {
        setError(
          "Kamera hanya bisa diakses lewat HTTPS. Buka situs ini dengan alamat https://.",
        );
        return;
      }

      if (!navigator.mediaDevices?.getUserMedia) {
        setError("Browser ini tidak mendukung akses kamera.");
        return;
      }

      stop();
      setError(null);

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: mode,
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }

        setIsReady(true);
      } catch (err) {
        stop();
        setError(messageFor(err));
      }
    },
    [stop],
  );

  const flip = useCallback(() => {
    setFacing((previous) => (previous === "user" ? "environment" : "user"));
  }, []);

  const capture = useCallback(() => {
    const video = videoRef.current;

    if (!video || !video.videoWidth || !video.videoHeight) {
      throw new Error("Kamera belum siap. Tunggu sebentar lalu coba lagi.");
    }

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Browser tidak mendukung pemrosesan foto.");
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas;
  }, []);

  useEffect(() => stop, [stop]);

  return { videoRef, facing, isReady, error, start, stop, flip, capture };
};
