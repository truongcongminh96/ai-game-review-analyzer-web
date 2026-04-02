const normalizeBoolean = (value: string | undefined, fallback = false) => {
    if (!value) {
        return fallback;
    }

    return ['1', 'true', 'yes', 'on'].includes(value.trim().toLowerCase());
};

const normalizeNumber = (value: string | undefined, fallback: number) => {
    if (!value) {
        return fallback;
    }

    const parsedValue = Number(value.trim());

    return Number.isFinite(parsedValue) && parsedValue > 0 ? parsedValue : fallback;
};

const normalizeApiVersion = (value: string | undefined) =>
    value?.trim().toLowerCase() === 'v2' ? 'v2' : 'v1';

const normalizeAnalysisMode = (value: string | undefined, fallback: 'standard' | 'advanced') =>
    value?.trim().toLowerCase() === 'advanced' ? 'advanced' : fallback;

const defaultAnalysisMode =
    normalizeApiVersion(import.meta.env.VITE_API_VERSION) === 'v2' ? 'advanced' : 'standard';

export const env = {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL?.trim() || 'http://localhost:8080',
    apiVersion: normalizeApiVersion(import.meta.env.VITE_API_VERSION),
    apiPollIntervalMs: normalizeNumber(import.meta.env.VITE_API_POLL_INTERVAL_MS, 1500),
    apiPollTimeoutMs: normalizeNumber(import.meta.env.VITE_API_POLL_TIMEOUT_MS, 300000),
    defaultAnalysisMode: normalizeAnalysisMode(
        import.meta.env.VITE_DEFAULT_ANALYSIS_MODE,
        defaultAnalysisMode
    ),
    mockMode: normalizeBoolean(import.meta.env.VITE_MOCK_MODE, false),
    defaultReviewLanguage: import.meta.env.VITE_DEFAULT_REVIEW_LANGUAGE?.trim() || 'english',
};
