import { useEffect, useState } from "react";

export default function ImageUpload({ existingImage, onChange }) {
  const [preview, setPreview] = useState(existingImage || null);
  const [file, setFile] = useState(null);

  // When updating (edit page) and image comes from DB
  useEffect(() => {
    if (existingImage) {
      setPreview(existingImage);
    }
  }, [existingImage]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);

    // send file to parent form
    if (onChange) {
      onChange(selectedFile);
    }
  };

  const removeImage = () => {
    setPreview(null);
    setFile(null);

    if (onChange) {
      onChange(null);
    }
  };

  return (
    <div className="max-w-md">

      <h2 className="mb-2 font-medium">Upload Image</h2>

      <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer">
        <span>Drag & drop or click to upload</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {preview && (
        <div className="relative mt-4 w-32">
          <img
            src={preview}
            alt="preview"
            className="rounded-md object-cover w-full h-32"
          />

          <button
            type="button"
            onClick={removeImage}
            className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
