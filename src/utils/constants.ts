import type {SentimentBreakdown} from '../types/analyze';

export const DEFAULT_GAME_QUERY = 'Elden Ring';
export const DEFAULT_REVIEW_LIMIT = 50;
export const MAX_GAME_SUGGESTIONS = 6;

export const DEFAULT_SENTIMENT: SentimentBreakdown = {
    positive: 62,
    neutral: 18,
    negative: 20,
};

export const DEFAULT_PRAISED_FEATURES = [
    'Open world exploration',
    'Combat mechanics',
    'Art direction',
    'Boss encounters',
];

export const DEFAULT_COMMON_COMPLAINTS = [
    'Performance issues',
    'Frame drops in some areas',
    'Difficulty spikes',
    'Repetitive side content',
];

export const DEFAULT_TOPICS = [
    'exploration',
    'combat',
    'performance',
    'boss design',
];

export const DEFAULT_SUMMARY =
    'Elden Ring is widely praised as a masterpiece with exceptional world design, art direction, and combat systems. Players consistently commend its vast exploration, deep gameplay, and memorable boss encounters. However, the game faces criticism for performance issues, repetitive content, and enemy damage scaling that can make progression frustrating.';

export const VALIDATION_MESSAGES = {
    missingGame: 'Please select a Steam game title or paste a valid app id.',
    invalidLimit: 'Review limit must be greater than 0.',
    backendUnavailable:
        'Unable to analyze reviews right now. Check that the API server is running and that the configured API version is available.',
};
