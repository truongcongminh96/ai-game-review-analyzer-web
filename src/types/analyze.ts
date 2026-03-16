export type SentimentBreakdown = {
    positive: number;
    neutral: number;
    negative: number;
};

export type AnalyzeResult = {
    gameTitle: string;
    summary: string;
    praisedFeatures: string[];
    commonComplaints: string[];
    sentiment: SentimentBreakdown;
};

export type AnalyzeApiResponse = {
    aiSummary?: string;
    commonComplaints?: string[];
    common_complaints?: string[];
    gameTitle?: string;
    game_title?: string;
    praisedFeatures?: string[];
    praised_features?: string[];
    sentiment?: Partial<SentimentBreakdown>;
    summary?: string;
};
