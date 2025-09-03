import { useParamStore } from "@/store/params.store";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { useCallback } from "react";
import { Button } from "../ui/button";

export const ImagesUploadPreviews = () => {
  const { images, removeImage, setUploadImageError, uploadImageError } =
    useParamStore();

  const handleRemoveImage = useCallback(
    (index: number) => {
      removeImage(index);
      setUploadImageError(null);
    },
    [removeImage, setUploadImageError]
  );

  return (
    <div className="flex gap-2 h-12 pl-5 items-center">
      <div className="flex gap-2">
        {images.length > 0 && (
          <div className="flex gap-2">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative group w-14 h-10 animate-in fade-in duration-500 ease-out"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded ${index + 1}`}
                  className="w-14 h-9 object-cover rounded-sm transition-all duration-200 hover:scale-105 border-2 border-indigo-500"
                />
                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 opacity-0 group-hover:opacity-100 transition-all duration-200"
                  onClick={() => handleRemoveImage(index)}
                >
                  <XMarkIcon className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center">
        {uploadImageError && (
          <p className="text-sm text-destructive animate-in slide-in-from-left-2 duration-300">
            {uploadImageError}
          </p>
        )}
      </div>
    </div>
  );
};
