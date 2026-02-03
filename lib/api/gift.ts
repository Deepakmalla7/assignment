// GIFT RECOMMENDATION API CALLS
import { API } from "./endpoints";
import axios from "./axios";

export const getGiftRecommendations = async (age: number, event: string, gender: string) => {
    try {
        const response = await axios.get(API.GIFTS.GET_RECOMMENDATIONS, {
            params: {
                age,
                event,
                gender
            }
        });
        return response.data;
    } catch (err: Error | any) {
        throw new Error(err.response?.data.message || err.message || "Failed to fetch gift recommendations");
    }
};

export const updateUserPreferences = async (age: number, event: string, gender: string) => {
    try {
        const response = await axios.post(API.GIFTS.UPDATE_PREFERENCES, {
            age,
            event,
            gender
        });
        return response.data;
    } catch (err: Error | any) {
        throw new Error(err.response?.data.message || err.message || "Failed to update preferences");
    }
};
