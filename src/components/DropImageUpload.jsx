import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Label } from "./ui/label";
import { cn } from "../lib/utils";
import { X } from "lucide-react";

const DropImageUpload = ({ multiple = true, onFileSelect, defaultImages = [] }) => {
  const [images, setImages] = useState([]);

  // Load default images (single or multiple)
  useEffect(() => {
    if (defaultImages?.length > 0) {
      const normalized = defaultImages.map((img) => ({
        preview: img,
        file: null, // existing image from server
      }));
      setImages(normalized);

      // For single-image mode → parent expects ONE file (null)
      onFileSelect?.(multiple ? [] : null);
    }
  }, [defaultImages, multiple, onFileSelect]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const mapped = acceptedFiles.map((file) => ({
        preview: URL.createObjectURL(file),
        file,
      }));

      const newImages = multiple ? [...images, ...mapped] : [mapped[0]];

      setImages(newImages);

      // Parent receives:
      //   multiple = array of files
      //   single   = one file
      onFileSelect?.(
        multiple
          ? newImages.map((img) => img.file).filter(Boolean)
          : newImages[0]?.file
      );
    },
    [images, multiple, onFileSelect]
  );

  const removeImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);

    onFileSelect?.(
      multiple
        ? updated.map((img) => img.file).filter(Boolean)
        : updated[0]?.file || null
    );
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
    accept: { "image/*": [] },
  });

  return (
    <div className="space-y-4">
      <Label>Upload {multiple ? "Images" : "Image"}</Label>

      <div
        {...getRootProps()}
        className="border-2 border-gray-300 border-dashed rounded-xl p-6 cursor-pointer hover:border-red-300"
      >
        <input {...getInputProps()} />
        <p>{isDragActive ? "Drop images..." : "Drag & drop or click to upload"}</p>
      </div>

      {images.length > 0 && (
        <div className="flex flex-wrap gap-4 mt-4">
          {images.map((img, idx) => (
            <div key={idx} className="relative">
              <img src={img.preview} className="w-32 h-32 object-cover rounded-md" />
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute top-1 right-1 bg-white text-red-600 rounded-full p-1 shadow"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


export default DropImageUpload;