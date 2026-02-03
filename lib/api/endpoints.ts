// ALL API Endpoints

export const API = {
    AUTH:{
        LOGIN: '/api/users/login',
        REGISTER: '/api/users/register',
        LOGOUT: '/api/users/logout',
        GET_PROFILE: '/api/users/profile'
    },
    GIFTS:{
        GET_RECOMMENDATIONS: '/api/gifts/recommendations',
        UPDATE_PREFERENCES: '/api/gifts/preferences',
    },
    USER: {
        UPLOAD_PHOTO: '/api/users/upload-photo',
        DELETE_PHOTO: '/api/users/delete-photo'
    },
    UPLOADS: {
        IMAGE: '/api/uploads/image'
    }
}