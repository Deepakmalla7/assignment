// Upload API Layer
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface UploadResponse {
  success: boolean;
  message: string;
  data?: {
    filename: string;
    url: string;
    size: number;
  };
}

/**
 * Upload API calls
 */
export const uploadApi = {
  /**
   * Upload a single file
   */
  uploadFile: async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${API_URL}/uploads`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    return response.data;
  },

  /**
   * Upload multiple files
   */
  uploadFiles: async (files: File[]): Promise<UploadResponse> => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    const response = await axios.post(`${API_URL}/uploads/multiple`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    return response.data;
  },

  /**
   * Delete uploaded file
   */
  deleteFile: async (filename: string): Promise<UploadResponse> => {
    const response = await axios.delete(`${API_URL}/uploads/${filename}`, {
      withCredentials: true,
    });

    return response.data;
  },
};

export default uploadApi;
