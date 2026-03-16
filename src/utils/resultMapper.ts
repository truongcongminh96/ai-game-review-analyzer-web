import type {AnalyzeApiResponse, AnalyzeResult} from '../types/analyze';
import {
    DEFAULT_COMMON_COMPLAINTS,
    DEFAULT_GAME_QUERY,
    DEFAULT_PRAISED_FEATURES,
    DEFAULT_SENTIMENT,
    DEFAULT_SUMMARY,
} from './constants';

const sanitizeList = (value: string[] | undefined, fallback: string[]) => {
    if (!Array.isArray(value)) {
        return fallback;
    }

    const normalizedItems = value.filter(
        (item): item is string => item.trim().length > 0
    );

    return normalizedItems.length > 0 ? normalizedItems : fallback;
};

export const normalizePercent = (value: number | undefined, fallback: number) => {
    if (typeof value !== 'number' || Number.isNaN(value)) {
        return fallback;
    }

    const scaledValue = value <= 1 ? value * 100 : value;

    return Math.max(0, Math.min(100, Math.round(scaledValue)));
};

export const mapAnalyzeResult = (
    payload: AnalyzeApiResponse | null | undefined,
    fallbackGameTitle = DEFAULT_GAME_QUERY
): AnalyzeResult => ({
    gameTitle: payload?.gameTitle ?? payload?.game_title ?? fallbackGameTitle,
    summary: payload?.summary ?? payload?.aiSummary ?? DEFAULT_SUMMARY,
    praisedFeatures: sanitizeList(
        payload?.praisedFeatures ?? payload?.praised_features,
        DEFAULT_PRAISED_FEATURES
    ),
    commonComplaints: sanitizeList(
        payload?.commonComplaints ?? payload?.common_complaints,
        DEFAULT_COMMON_COMPLAINTS
    ),
    sentiment: {
        positive: normalizePercent(payload?.sentiment?.positive, DEFAULT_SENTIMENT.positive),
        neutral: normalizePercent(payload?.sentiment?.neutral, DEFAULT_SENTIMENT.neutral),
        negative: normalizePercent(payload?.sentiment?.negative, DEFAULT_SENTIMENT.negative),
    },
});
