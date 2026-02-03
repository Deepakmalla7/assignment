import axios from "./axios";
import { API } from "./endpoints";

export const uploadImage = async (formData: FormData) => {
  try {
    const response = await axios.post(API.UPLOADS.IMAGE, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data;
  } catch (err: any) {
    console.error("Upload error:", err);
    throw new Error(err.response?.data?.message || err.message || "Upload failed");
  }
};
