import { deleteUserPhoto, uploadUserPhoto } from "../api/user";

type UserPhotoActionResult = {
  success: boolean;
  message: string;
  data?: any;
};

export const uploadUserPhotoAction = async (
  formData: FormData
): Promise<UserPhotoActionResult> => {
  try {
    const result = await uploadUserPhoto(formData);
    return {
      success: true,
      message: result.message || "Photo uploaded successfully",
      data: result
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || "Upload failed"
    };
  }
};

export const deleteUserPhotoAction = async (
  payload: { photoPath: string; userId: string }
): Promise<UserPhotoActionResult> => {
  try {
    const result = await deleteUserPhoto(payload);
    return {
      success: true,
      message: result.message || "Photo deleted successfully",
      data: result
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || "Delete failed"
    };
  }
};
