import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Label } from "./ui/label";
import { cn } from "../lib/utils";
import { X } from "lucide-react";

const DropImageUpload = ({ multiple = true, onFileSelect }) => {
  const [images, setImages] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const newFiles = multiple ? [...images, ...acceptedFiles] : [acceptedFiles[0]];
      setImages(newFiles);

      // ✅ Notify parent
      if (onFileSelect) {
        onFileSelect(multiple ? newFiles : newFiles[0]);
      }

      console.log(newFiles[0]);
    },
    [images, multiple, onFileSelect]
  );

  const removeImage = (indexToRemove) => {
    const updated = images.filter((_, index) => index !== indexToRemove);
    setImages(updated);

    // ✅ Update parent when image is removed
    if (onFileSelect) {
      onFileSelect(multiple ? updated : null);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple,
  });

  return (
    <div className="space-y-4">
      <Label>Upload {multiple ? "Images" : "Image"}</Label>

      <div
        {...getRootProps()}
        className={cn(
          "flex items-center justify-center border-2 border-dashed rounded-xl p-6 transition-colors cursor-pointer",
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400 bg-gray-50"
        )}
      >
        <input {...getInputProps()} />
        <p className="text-gray-500 text-center">
          {isDragActive
            ? "Drop the image here..."
            : `Drag & drop ${multiple ? "images" : "an image"} here, or click to select`}
        </p>
      </div>

      {images.length > 0 && (
        <div className="flex flex-wrap gap-4 mt-4">
          {images.map((file, index) => (
            <div key={index} className="relative group">
              <img
                src={URL.createObjectURL(file)}
                alt={`preview-${index}`}
                className="w-32 h-32 object-cover rounded-md shadow"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-white rounded-full p-1 text-sm text-red-600 shadow group-hover:opacity-100 opacity-0 transition"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropImageUpload;
