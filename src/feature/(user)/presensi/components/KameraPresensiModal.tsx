"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ArrowLeft, Camera, Loader2, MapPin, SwitchCamera } from "lucide-react";
import { Modal } from "@/shared/components/ui/Modal";
import AktivitasButton from "@/shared/components/ui/ButtonSos26";
import { PRESENSI_PHOTO_MAX_BYTES } from "@/api/services/user/presensi";
import { useCamera } from "../hooks/useCamera";
import { useGeolocation } from "../hooks/useGeolocation";
import { compressCanvasToJpeg } from "../utils/compressPhoto";
import { embedLocationExif } from "../utils/embedLocationExif";

interface KameraPresensiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (photo: Blob) => void;
  isSubmitting: boolean;
}

const KameraPresensiModal = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
}: KameraPresensiModalProps) => {
  const { videoRef, facing, isReady, error, start, stop, flip, capture } =
    useCamera();
  const {
    location,
    error: locationError,
    isLocating,
    requestLocation,
    reset: resetLocation,
  } = useGeolocation();

  const [photo, setPhoto] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    start(facing);
    return () => stop();
  }, [isOpen, facing, start, stop]);

  useEffect(() => {
    if (!isOpen) return;
    requestLocation();
  }, [isOpen, requestLocation]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const discardPhoto = useCallback(() => {
    setPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return null;
    });
    setPhoto(null);
    setPhotoError(null);
  }, []);

  const handleClose = useCallback(() => {
    discardPhoto();
    resetLocation();
    onClose();
  }, [discardPhoto, resetLocation, onClose]);

  const handleCapture = useCallback(async () => {
    if (!location) return;

    setIsProcessing(true);
    setPhotoError(null);

    try {
      const canvas = capture();
      const compressed = await compressCanvasToJpeg(
        canvas,
        PRESENSI_PHOTO_MAX_BYTES,
      );
      const withLocation = await embedLocationExif(
        compressed,
        location,
        new Date(),
      );

      setPhoto(withLocation);
      setPreviewUrl(URL.createObjectURL(withLocation));
    } catch (err) {
      setPhotoError(
        err instanceof Error ? err.message : "Gagal memproses foto.",
      );
    } finally {
      setIsProcessing(false);
    }
  }, [capture, location]);

  const isCaptureDisabled = !isReady || !location || isProcessing;
  const blockingError = error ?? locationError ?? photoError;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      variant="space"
      containerClassName="text-white lg:max-w-3xl"
    >
      <h3 className="text-lg md:text-2xl font-bold text-center text-white pr-10">
        Kalo boong ketauan
      </h3>

      <div className="relative mt-6 w-full aspect-video overflow-hidden rounded-xl bg-black">
        <video
          ref={videoRef}
          playsInline
          muted
          autoPlay
          className={`h-full w-full object-cover ${
            facing === "user" ? "scale-x-[-1]" : ""
          }`}
        />

        {previewUrl && (
          // eslint-disable-next-line @next/next/no-img-element -- blob: URL tidak bisa dioptimasi next/image
          <img
            src={previewUrl}
            alt="Pratinjau foto presensi"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        {!isReady && !previewUrl && (
          <div className="absolute inset-0 flex items-center justify-center gap-2 text-sm text-white/70">
            <Loader2 className="h-4 w-4 animate-spin" />
            Menyiapkan kamera...
          </div>
        )}

        {previewUrl ? (
          <>
            <button
              type="button"
              onClick={discardPhoto}
              disabled={isSubmitting}
              aria-label="Ambil ulang foto"
              className="absolute top-4 left-4 flex h-11 w-11 items-center justify-center rounded-full bg-primary-normal text-white transition-colors hover:bg-primary-normal-hover disabled:opacity-50"
            >
              <ArrowLeft size={20} />
            </button>

            <div className="absolute bottom-4 left-1/2 w-48 -translate-x-1/2">
              <AktivitasButton
                onClick={() => photo && onSubmit(photo)}
                disabled={isSubmitting || !photo}
              >
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {isSubmitting ? "Mengirim..." : "Kirim"}
              </AktivitasButton>
            </div>
          </>
        ) : (
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-4">
            <button
              type="button"
              onClick={flip}
              disabled={!isReady || isProcessing}
              aria-label="Ganti kamera depan atau belakang"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-normal text-white transition-colors hover:bg-primary-normal-hover disabled:opacity-50"
            >
              <SwitchCamera size={22} />
            </button>

            <button
              type="button"
              onClick={handleCapture}
              disabled={isCaptureDisabled}
              aria-label="Ambil foto presensi"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-normal text-white transition-colors hover:bg-primary-normal-hover disabled:opacity-50"
            >
              {isProcessing ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Camera size={22} />
              )}
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 min-h-10 text-center text-sm">
        {blockingError ? (
          <div className="flex flex-col items-center gap-2">
            <p className="text-danger">{blockingError}</p>
            {locationError && (
              <button
                type="button"
                onClick={requestLocation}
                className="font-semibold text-white underline underline-offset-4"
              >
                Coba deteksi lokasi lagi
              </button>
            )}
          </div>
        ) : isLocating ? (
          <p className="flex items-center justify-center gap-2 text-white/70">
            <Loader2 className="h-4 w-4 animate-spin" />
            Mendeteksi lokasi kamu...
          </p>
        ) : location ? (
          <p className="flex items-center justify-center gap-2 text-white/70">
            <MapPin className="h-4 w-4" />
            Lokasi terdeteksi. Ambil fotomu untuk menyelesaikan presensi.
          </p>
        ) : null}
      </div>
    </Modal>
  );
};

export default KameraPresensiModal;
