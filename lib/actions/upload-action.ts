import { uploadImage } from "../api/upload";

type UploadResult = {
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

export const uploadImageAction = async (formData: FormData) => {
  try {
    const result = (await uploadImage(formData)) as UploadResult;
    return {
      success: true,
      message: result.message,
      data: result
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || "Upload failed"
    };
  }
};
