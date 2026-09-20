import React, { useState, useCallback } from "react";
// @ts-expect-error react-easy-crop type definition does not match exports
import Cropper from "react-easy-crop";
// @ts-expect-error react-easy-crop type definition does not match exports
import { Point, Area } from "react-easy-crop";
import { Modal } from "./Modal";
import { Button } from "./Button";
import getCroppedImg from "@/shared/utils/cropImage";

interface ImageCropperModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  onCropComplete: (croppedBlob: Blob) => void;
  aspect?: number;
}

export const ImageCropperModal = ({
  isOpen,
  onClose,
  imageSrc,
  onCropComplete,
  aspect = 3 / 4,
}: ImageCropperModalProps) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const handleSave = async () => {
    if (!croppedAreaPixels) return;

    try {
      setIsProcessing(true);
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels, 0);
      if (croppedBlob) {
        onCropComplete(croppedBlob);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Sesuaikan Foto Kandidat"
      containerClassName="max-w-2xl"
    >
      <div className="relative w-full h-[60vh] bg-neutral-900 mt-4 rounded-xl overflow-hidden">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={setCrop}
          onCropComplete={handleCropComplete}
          onZoomChange={setZoom}
          classes={{ containerClassName: "w-full h-full" }}
        />
      </div>

      <div className="mt-4 px-4 flex items-center gap-4">
        <span className="text-sm text-neutral-600 font-medium whitespace-nowrap">
          Zoom
        </span>
        <input
          type="range"
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={(e) => setZoom(Number(e.target.value))}
          className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div className="flex gap-4 mt-6 justify-end">
        <Button variant="outline" onClick={onClose} disabled={isProcessing}>
          Batal
        </Button>
        <Button variant="admin" onClick={handleSave} disabled={isProcessing}>
          {isProcessing ? "Menyimpan..." : "Simpan Foto"}
        </Button>
      </div>
    </Modal>
  );
};
