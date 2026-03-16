const normalizeBoolean = (value: string | undefined, fallback = false) => {
    if (!value) {
        return fallback;
    }

    return ['1', 'true', 'yes', 'on'].includes(value.trim().toLowerCase());
};

export const env = {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL?.trim() || 'http://localhost:8080',
    mockMode: normalizeBoolean(import.meta.env.VITE_MOCK_MODE, false),
    defaultReviewLanguage: import.meta.env.VITE_DEFAULT_REVIEW_LANGUAGE?.trim() || 'english',
};
