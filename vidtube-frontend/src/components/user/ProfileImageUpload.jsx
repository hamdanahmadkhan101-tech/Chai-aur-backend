import { useState, useRef } from "react";
import { Camera, Upload, X, Loader2 } from "lucide-react";
import Button from "../ui/Button.jsx";

export default function ProfileImageUpload({
  currentImage,
  onUpload,
  type = "avatar", // 'avatar' or 'cover'
  loading = false,
}) {
  const [preview, setPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const isAvatar = type === "avatar";
  const acceptedTypes = "image/jpeg,image/png,image/webp,image/gif";
  const maxSize = 5 * 1024 * 1024; // 5MB

  const handleFileSelect = (file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size
    if (file.size > maxSize) {
      alert("Image must be less than 5MB");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.readAsDataURL(file);

    // Upload the file
    onUpload(file);
  };

  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    handleFileSelect(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    handleFileSelect(file);
  };

  const clearPreview = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const displayImage = preview || currentImage;

  if (isAvatar) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div
          className={`relative group cursor-pointer ${
            dragActive
              ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
              : ""
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          {displayImage ? (
            <img
              src={displayImage}
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover border-4 border-surface-light"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-surface-light flex items-center justify-center border-4 border-border">
              <Camera className="w-10 h-10 text-textSecondary" />
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            {loading ? (
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            ) : (
              <Camera className="w-8 h-8 text-white" />
            )}
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes}
          onChange={handleInputChange}
          className="hidden"
        />

        <div className="text-center">
          <p className="text-sm text-textSecondary">
            Click or drag to upload avatar
          </p>
          <p className="text-xs text-textSecondary mt-1">
            PNG, JPG, WebP or GIF (max 5MB)
          </p>
        </div>

        {preview && (
          <Button variant="ghost" size="sm" onClick={clearPreview}>
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>
    );
  }

  // Cover image upload
  return (
    <div className="w-full">
      <div
        className={`relative group cursor-pointer rounded-lg overflow-hidden ${
          dragActive ? "ring-2 ring-primary" : ""
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        {displayImage ? (
          <img
            src={displayImage}
            alt="Cover"
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-linear-to-br from-surface to-surface-light flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg">
            <Upload className="w-10 h-10 text-textSecondary mb-2" />
            <p className="text-sm text-textSecondary">Upload cover image</p>
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          {loading ? (
            <Loader2 className="w-10 h-10 text-white animate-spin" />
          ) : (
            <div className="flex flex-col items-center text-white">
              <Camera className="w-10 h-10 mb-2" />
              <span>Change cover image</span>
            </div>
          )}
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes}
        onChange={handleInputChange}
        className="hidden"
      />

      <p className="text-xs text-textSecondary mt-2 text-center">
        Recommended: 1200 x 300 pixels (4:1 ratio)
      </p>

      {preview && (
        <div className="flex justify-center mt-2">
          <Button variant="ghost" size="sm" onClick={clearPreview}>
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        </div>
      )}
    </div>
  );
}
