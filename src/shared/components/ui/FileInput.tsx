"use client";

import React, { useState, InputHTMLAttributes } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/shared/utils/cn";

export interface FileInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> {
  onChange: (file: File | null) => void;
  containerClassName?: string;
  variant?: "default" | "admin";
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  (
    { className, onChange, containerClassName, variant = "default", ...props },
    ref,
  ) => {
    const [fileName, setFileName] = useState("Tidak ada file yang dipilih");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || null;
      if (file) {
        setFileName(file.name);
      } else {
        setFileName("Tidak ada file yang dipilih");
      }
      onChange(file);
    };

    const variantClasses =
      variant === "admin" ? "text-primary-normal" : "text-primary-600";
    const focusClasses =
      variant === "admin"
        ? "focus-within:border-primary-normal focus-within:ring-primary-normal"
        : "focus-within:border-black focus-within:ring-black";

    return (
      <div className={cn("w-full", containerClassName)}>
        <label
          htmlFor={props.id}
          className={cn(
            "flex items-center w-full rounded-xl border-1 border-black-50 cursor-pointer bg-default-light",
            "transition-all duration-200 focus:ring-[0.5px] overflow-hidden",
            focusClasses,
            className,
          )}
        >
          <div
            className={cn(
              "flex items-center gap-2 px-4 py-3 bg-default-light border-r-2 border-secondary-600 truncate",
              variantClasses,
            )}
          >
            <Upload size={20} />
            <span>Pilih file</span>
          </div>

          <span className="px-4 text-default-dark/50 truncate">{fileName}</span>
        </label>

        <input
          id={props.id}
          type="file"
          className="hidden"
          ref={ref}
          onChange={handleFileChange}
          {...props}
        />
      </div>
    );
  },
);

FileInput.displayName = "FileInput";

export { FileInput };
