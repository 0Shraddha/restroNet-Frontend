import React, { useState, useCallback, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { Label } from "./ui/label";
import { X } from "lucide-react";

const DropImageUpload = ({ multiple = true, onFileSelect, defaultImages = [] }) => {
  const [images, setImages] = useState([]);

  /** ------------------------------------------------
   *  Load existing server images on mount
   * ------------------------------------------------*/
const hasInit = useRef(false);

useEffect(() => {
  if (hasInit.current) return;
  if (defaultImages?.length > 0) {
    hasInit.current = true;

    const formatted = defaultImages.map(url => ({
      preview: url,
      file: null,
    }));

    setImages(formatted);

    onFileSelect?.({
      files: [],
      existing: defaultImages,
    });
  }
}, [defaultImages]);



  /** ------------------------------------------------
   *  Send updated images to parent
   * ------------------------------------------------*/
  const sendToParent = (updatedImages) => {
  const newFiles = updatedImages.filter(img => img.file).map(img => img.file);
  const existingURLs = updatedImages.filter(img => !img.file).map(img => img.preview);
const lastSingleRef = useRef(null);

if (!multiple) {
  const single = updatedImages.find(img => img.file) || null;
  onFileSelect(single ? single.file : null); 

  if (lastSingleRef.current !== single?.file) {
    lastSingleRef.current = single?.file;
    onFileSelect(single?.file || null);
  }

  return;
}

};



  /** ------------------------------------------------
   *  Dropzone handler — Add new images
   * ------------------------------------------------*/
  const onDrop = useCallback(
    (acceptedFiles) => {
      const formattedNew = acceptedFiles.map((file) => ({
        preview: URL.createObjectURL(file),
        file,
      }));

      const updated = multiple ? [...images, ...formattedNew] : [formattedNew[0]];

      setImages(updated);
      sendToParent(updated);
    },
    [images, multiple]
  );


  /** ------------------------------------------------
   *  Remove an image
   * ------------------------------------------------*/
  const removeImage = (index) => {
    const img = images[index];

    // cleanup blob memory
    if (img.file && img.preview.startsWith("blob:")) {
      URL.revokeObjectURL(img.preview);
    }

    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    sendToParent(updated);
  };


  /** ------------------------------------------------
   *  Dropzone bindings
   * ------------------------------------------------*/
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
        className="border-2 border-gray-300 border-dashed rounded-xl p-6 cursor-pointer hover:border-red-400 transition"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-red-500 font-medium">Drop your images…</p>
        ) : (
          <p className="text-gray-600">Drag & drop or click to upload</p>
        )}
      </div>

      {images.length > 0 && (
        <div className="flex flex-wrap gap-4 mt-3">
          {images.map((img, idx) => (
            <div key={idx} className="relative group">
              <img
                src={img.preview}
                className="w-32 h-32 object-cover rounded-lg shadow"
                alt="Preview"
              />

              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute top-1 right-1 bg-white p-1 rounded-full shadow text-red-600 hover:bg-red-100"
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
