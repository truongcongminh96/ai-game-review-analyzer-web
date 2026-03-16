import axios from 'axios';
import {env} from '../config/env';
import {getMockAnalyzeApiResponse} from '../data/mock/mockAnalyzeResult';
import type {AnalyzeApiResponse} from '../types/analyze';

export const analyzeReviews = async (appId: string, limit: number) => {
    if (env.mockMode) {
        return Promise.resolve<AnalyzeApiResponse>(getMockAnalyzeApiResponse(appId));
    }

    const response = await axios.post<AnalyzeApiResponse>(`${env.apiBaseUrl}/steam/analyze`, {
        appId,
        limit,
        language: env.defaultReviewLanguage,
    });

    return response.data;
};
