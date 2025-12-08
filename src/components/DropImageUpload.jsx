import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Label } from "./ui/label";
import { cn } from "../lib/utils";
import { X } from "lucide-react";

// Define the structure for an image object
// file: File object (for new uploads) or null (for default images)
// preview: string (URL for preview)
const DropImageUpload = ({ multiple = true, onFileSelect, defaultImages = [] }) => {
  const [images, setImages] = useState([]);

  // --- 1. Load Default Images ---
  useEffect(() => {
    if (defaultImages?.length > 0) {
      const normalized = defaultImages.map((img) => ({
        preview: img,
        file: null, // existing image from server
      }));
      setImages(normalized);

      // Notify parent: no new files initially
      onFileSelect?.(multiple ? [] : null);
    }
  }, [defaultImages, multiple, onFileSelect]);

  // --- 2. Object URL Cleanup ---
  // This effect runs whenever 'images' changes.
  // It returns a cleanup function that revokes all **local** object URLs (those created via URL.createObjectURL).
  useEffect(() => {
    return () => {
      images.forEach((img) => {
        // Only revoke if 'file' exists, meaning it's a locally created URL
        if (img.file && img.preview.startsWith('blob:')) {
            URL.revokeObjectURL(img.preview);
        }
      });
    };
  }, [images]);
  
  // --- 3. Handle File Drop ---
  const onDrop = useCallback(
    (acceptedFiles) => {
      const mapped = acceptedFiles.map((file) => ({
        preview: URL.createObjectURL(file),
        file,
      }));

      // In single mode, we only take the first new file
      const newImages = multiple ? [...images, ...mapped] : [mapped[0]];

      setImages(newImages); // This triggers the cleanup effect to run first (for old local URLs)

      // Notify parent
      onFileSelect?.(
        multiple
          ? newImages.map((img) => img.file).filter(Boolean)
          : newImages[0]?.file
      );
    },
    [images, multiple, onFileSelect]
  );

  // --- 4. Handle Image Removal ---
  const removeImage = (index) => {
    const imgToRemove = images[index];
    
    // Revoke the object URL of the image being removed immediately
    if (imgToRemove.file && imgToRemove.preview.startsWith('blob:')) {
        URL.revokeObjectURL(imgToRemove.preview);
    }

    const updated = images.filter((_, i) => i !== index);
    setImages(updated);

    // Notify parent
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

  // ... (JSX remains the same)
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
              <img src={img.preview} className="w-32 h-32 object-cover rounded-md" alt="Preview"/>
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