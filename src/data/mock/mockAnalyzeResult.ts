import type {AnalyzeApiResponse, AnalyzeResult} from '../../types/analyze';
import {
    DEFAULT_COMMON_COMPLAINTS,
    DEFAULT_GAME_QUERY,
    DEFAULT_PRAISED_FEATURES,
    DEFAULT_SENTIMENT,
    DEFAULT_SUMMARY,
} from '../../utils/constants';

export const mockAnalyzeResult: AnalyzeResult = {
    gameTitle: DEFAULT_GAME_QUERY,
    summary: DEFAULT_SUMMARY,
    praisedFeatures: DEFAULT_PRAISED_FEATURES,
    commonComplaints: DEFAULT_COMMON_COMPLAINTS,
    sentiment: DEFAULT_SENTIMENT,
};

export const mockAnalyzeApiResponse: AnalyzeApiResponse = {
    gameTitle: DEFAULT_GAME_QUERY,
    summary: DEFAULT_SUMMARY,
    praisedFeatures: DEFAULT_PRAISED_FEATURES,
    commonComplaints: DEFAULT_COMMON_COMPLAINTS,
    sentiment: DEFAULT_SENTIMENT,
};
