"use server";

export const exmpleAction = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return{
        success: true,
        message:'Example action completed successfully',
        data: null

    }
}
    