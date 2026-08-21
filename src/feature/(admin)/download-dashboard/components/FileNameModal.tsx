"use client";
import React, { useState, useEffect } from "react";
import { Download, Loader2, X } from "lucide-react";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";

interface FileNameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (filename: string) => void;
  defaultFileName: string;
  isLoading: boolean;
  title: string;
}

const FileNameModal: React.FC<FileNameModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  defaultFileName = "",
  isLoading,
  title,
}) => {
  const [filename, setFilename] = useState(defaultFileName);

  useEffect(() => {
    if (isOpen) {
      setFilename(defaultFileName.replace(".xlsx", ""));
    }
  }, [isOpen, defaultFileName]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filename.trim()) {
      onSubmit(filename);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 transition-opacity">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md m-4 transform transition-all">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold font-poppins text-default-dark">
            Download {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <p className="text-sm text-default-dark-50 mb-2 font-poppins">
            Masukkan nama file yang Anda inginkan (tanpa .xlsx).
          </p>
          <div className="relative">
            <Input
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="Data_Pengumpulan"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              .xlsx
            </span>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <Button
              type="button"
              variant="none"
              onClick={onClose}
              disabled={isLoading}
              className="px-6 py-2 border border-primary-normal text-primary-normal rounded-lg hover:bg-primary-light transition-colors font-semibold"
            >
              Batal
            </Button>
            <Button
              variant="none"
              className="space-x-2 flex items-center px-6 py-2 bg-primary-normal text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold"
              type="submit"
              disabled={isLoading || !filename.trim()}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Downloading...</span>
                </>
              ) : (
                <>
                  <Download size={20} />
                  <span>Download</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FileNameModal;
