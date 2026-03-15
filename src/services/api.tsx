import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const analyzeReviews = async (appId: string, limit: number) => {
    const response = await axios.post(`${API_BASE_URL}/steam/analyze`, {
        appId: appId,
        limit,
        language: "english",
    });

    return response.data;
};
