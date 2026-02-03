"use client";

import { useState } from "react";
import { uploadImageAction } from "@/lib/actions/upload-action";

type UploadResponse = {
  message: string;
  file: {
    originalName: string;
    mimeType: string;
    size: number;
    filename: string;
    path: string;
    url: string;
  };
};

export default function ImageUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");
  const [result, setResult] = useState<UploadResponse | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult(null);

    if (!file) {
      setStatus("Please choose an image.");
      return;
    }

    setStatus("Uploading...");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const actionResult = await uploadImageAction(formData);

      if (!actionResult.success) {
        setStatus(actionResult.message || "Upload failed.");
        return;
      }

      setResult(actionResult.data || null);
      setStatus(actionResult.message || "Upload complete.");
      setFile(null);
    } catch (error) {
      setStatus("Network error while uploading.");
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <h2 className="mb-3 text-lg font-semibold">Upload an Image</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button
          type="submit"
          className="rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
        >
          Upload
        </button>
      </form>

      {status && <p className="mt-3 text-sm text-gray-700">{status}</p>}

      {result?.file?.url && (
        <div className="mt-4">
          <p className="text-sm text-gray-700">Uploaded file:</p>
          <img
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"}${result.file.url}`}
            alt="Uploaded"
            className="mt-2 h-32 w-32 rounded object-cover"
          />
        </div>
      )}
    </div>
  );
}
