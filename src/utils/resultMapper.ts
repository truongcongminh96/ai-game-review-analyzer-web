import type {
    AnalysisMode,
    AdvancedAnalyzeResult,
    AnalyzeApiResponse,
    AnalyzeInsightItem,
    AnalyzeRunDetail,
    AnalyzeResult,
    StandardAnalyzeResult,
} from '../types/analyze';
import {
    DEFAULT_COMMON_COMPLAINTS,
    DEFAULT_GAME_QUERY,
    DEFAULT_PRAISED_FEATURES,
    DEFAULT_SENTIMENT,
    DEFAULT_SUMMARY,
} from './constants';

const isInsightItem = (value: unknown): value is AnalyzeInsightItem => {
    if (typeof value !== 'object' || value === null) {
        return false;
    }

    return typeof (value as {label?: unknown}).label === 'string';
};

const isAdvancedRunDetail = (
    report: AnalyzeApiResponse | null | undefined
): report is AnalyzeRunDetail =>
    Boolean(
        report?.run_id &&
            report?.game?.app_id &&
            report?.overview &&
            Array.isArray(report?.praises) &&
            Array.isArray(report?.issues) &&
            Array.isArray(report?.topics)
    );

const sanitizeLabelList = (
    value: string[] | AnalyzeInsightItem[] | undefined,
    fallback: string[]
) => {
    if (!Array.isArray(value)) {
        return fallback;
    }

    const seen = new Set<string>();
    const normalizedItems = value
        .map((item) => {
            if (typeof item === 'string') {
                return item.trim();
            }

            if (isInsightItem(item)) {
                return item.label.trim();
            }

            return '';
        })
        .filter((item): item is string => {
            if (!item) {
                return false;
            }

            const key = item.toLowerCase();
            if (seen.has(key)) {
                return false;
            }
            seen.add(key);
            return true;
        });

    return normalizedItems.length > 0 ? normalizedItems : fallback;
};

const slugify = (value: string) =>
    value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

const coerceInsightItems = (
    value: AnalyzeInsightItem[] | string[] | undefined,
    kind: AnalyzeInsightItem['kind']
) => {
    if (!Array.isArray(value)) {
        return [] as AnalyzeInsightItem[];
    }

    const seen = new Set<string>();
    const result: AnalyzeInsightItem[] = [];

    value.forEach((item, index) => {
        const normalizedItem =
            typeof item === 'string'
                ? {
                      id: `${kind}-${slugify(item) || index + 1}`,
                      kind,
                      label: item.trim(),
                      summary: item.trim(),
                      confidence: 0.5,
                      evidence_count: 0,
                  }
                : isInsightItem(item)
                  ? {
                        ...item,
                        kind,
                        label: item.label.trim(),
                        summary: item.summary.trim() || item.label.trim(),
                    }
                  : null;

        if (!normalizedItem?.label) {
            return;
        }

        const key = normalizedItem.label.toLowerCase();
        if (seen.has(key)) {
            return;
        }
        seen.add(key);
        result.push(normalizedItem);
    });

    return result;
};

export const normalizePercent = (value: number | undefined, fallback: number) => {
    if (typeof value !== 'number' || Number.isNaN(value)) {
        return fallback;
    }

    const scaledValue = value <= 1 ? value * 100 : value;

    return Math.max(0, Math.min(100, Math.round(scaledValue)));
};

const normalizeSentimentFromCounts = (
    value: number | undefined,
    reviewCount: number | undefined,
    fallback: number
) => {
    if (
        typeof value !== 'number' ||
        Number.isNaN(value) ||
        typeof reviewCount !== 'number' ||
        Number.isNaN(reviewCount) ||
        reviewCount <= 0
    ) {
        return fallback;
    }

    return Math.max(0, Math.min(100, Math.round((value / reviewCount) * 100)));
};

const mapSentiment = (payload: AnalyzeApiResponse | null | undefined) => ({
    positive:
        typeof payload?.overview?.review_count === 'number' && payload.overview.review_count > 0
            ? normalizeSentimentFromCounts(
                  payload?.overview?.sentiment?.positive,
                  payload?.overview?.review_count,
                  DEFAULT_SENTIMENT.positive
              )
            : normalizePercent(payload?.sentiment?.positive, DEFAULT_SENTIMENT.positive),
    neutral:
        typeof payload?.overview?.review_count === 'number' && payload.overview.review_count > 0
            ? normalizeSentimentFromCounts(
                  payload?.overview?.sentiment?.neutral,
                  payload?.overview?.review_count,
                  DEFAULT_SENTIMENT.neutral
              )
            : normalizePercent(payload?.sentiment?.neutral, DEFAULT_SENTIMENT.neutral),
    negative:
        typeof payload?.overview?.review_count === 'number' && payload.overview.review_count > 0
            ? normalizeSentimentFromCounts(
                  payload?.overview?.sentiment?.negative,
                  payload?.overview?.review_count,
                  DEFAULT_SENTIMENT.negative
              )
            : normalizePercent(payload?.sentiment?.negative, DEFAULT_SENTIMENT.negative),
});

const mapCommonFields = (
    payload: AnalyzeApiResponse | null | undefined,
    fallbackGameTitle: string
) => ({
    gameTitle: payload?.game?.title ?? payload?.gameTitle ?? payload?.game_title ?? fallbackGameTitle,
    summary: payload?.overview?.summary ?? payload?.summary ?? payload?.aiSummary ?? DEFAULT_SUMMARY,
    sentiment: mapSentiment(payload),
});

const mapStandardAnalyzeResult = (
    payload: AnalyzeApiResponse | null | undefined,
    fallbackGameTitle: string
): StandardAnalyzeResult => ({
    mode: 'standard',
    ...mapCommonFields(payload, fallbackGameTitle),
    praisedFeatures: sanitizeLabelList(
        payload?.praises ?? payload?.praisedFeatures ?? payload?.praised_features,
        DEFAULT_PRAISED_FEATURES
    ),
    commonComplaints: sanitizeLabelList(
        payload?.issues ?? payload?.commonComplaints ?? payload?.common_complaints ?? payload?.common_issues,
        DEFAULT_COMMON_COMPLAINTS
    ),
    topics: sanitizeLabelList(payload?.topics, []),
});

const mapAdvancedAnalyzeResult = (
    payload: AnalyzeApiResponse | null | undefined,
    fallbackGameTitle: string
): AdvancedAnalyzeResult => {
    const report = isAdvancedRunDetail(payload) ? payload : null;

    return {
        mode: 'advanced',
        ...mapCommonFields(payload, fallbackGameTitle),
        runId: report?.run_id,
        reviewCount: report?.overview?.review_count,
        praises: coerceInsightItems(
            report?.praises ?? payload?.praisedFeatures ?? payload?.praised_features,
            'praise'
        ),
        issues: coerceInsightItems(
            report?.issues ?? payload?.commonComplaints ?? payload?.common_complaints ?? payload?.common_issues,
            'issue'
        ),
        topics: coerceInsightItems(report?.topics ?? payload?.topics, 'topic'),
        report,
    };
};

export const mapAnalyzeResult = (
    payload: AnalyzeApiResponse | null | undefined,
    fallbackGameTitle = DEFAULT_GAME_QUERY,
    mode: AnalysisMode = 'standard'
): AnalyzeResult =>
    mode === 'advanced'
        ? mapAdvancedAnalyzeResult(payload, fallbackGameTitle)
        : mapStandardAnalyzeResult(payload, fallbackGameTitle);

