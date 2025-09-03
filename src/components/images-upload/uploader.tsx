"use client";

import { Button } from "@/components/ui/button";
import { useParamStore } from "@/store/params.store";
import { PaperClipIcon } from "@heroicons/react/16/solid";
import { useRef } from "react";

const MAX_FILE_SIZE = 1024 * 1024; // 1MB
const MAX_FILES = 3;

export const ImagesUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { images, addImages, setUploadImageError } = useParamStore();

  const validateFiles = (files: FileList | File[]): File[] => {
    const fileArray = Array.from(files);
    const validFiles: File[] = [];
    let errorMessage = "";

    for (const file of fileArray) {
      // Check file type
      if (!file.type.startsWith("image/")) {
        errorMessage = "Only image files are allowed";
        break;
      }

      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        errorMessage = "Each image must be less than 1MB";
        break;
      }

      validFiles.push(file);
    }

    // Check total count
    const totalFiles = images.length + validFiles.length;
    if (totalFiles > MAX_FILES) {
      errorMessage = `Maximum ${MAX_FILES} images allowed`;
    }

    if (errorMessage) {
      setUploadImageError(errorMessage);
      return [];
    }

    setUploadImageError(null);
    return validFiles.slice(0, MAX_FILES - images.length);
  };

  const handleFileSelect = (files: FileList | File[]) => {
    const validFiles = validateFiles(files);
    if (validFiles.length > 0) {
      addImages(validFiles);
    }
  };

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      handleFileSelect(files);
    }
    // Clear the input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex justify-center items-center">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileInput}
        className="absolute hidden cursor-pointer border"
      />

      <Button
        type="button"
        size="icon"
        variant="outline"
        onClick={handleButtonClick}
      >
        <PaperClipIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};
