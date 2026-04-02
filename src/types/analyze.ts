export type SentimentBreakdown = {
    positive: number;
    neutral: number;
    negative: number;
};

export type AnalysisMode = 'standard' | 'advanced';

export type AnalysisStatus = 'pending' | 'success' | 'failed';

export type AnalysisStage =
    | 'queued'
    | 'fetching_reviews'
    | 'storing_reviews'
    | 'analyzing'
    | 'saving'
    | 'completed'
    | 'failed';

export type AnalysisProgress = {
    message: string;
    progressPercent: number | null;
    runId?: string;
    status?: AnalysisStatus;
    stage?: AnalysisStage;
    queueDebug?: AnalyzeQueueDebug;
    debug?: AnalyzeRunDebug;
};

type BaseAnalyzeResult = {
    gameTitle: string;
    summary: string;
    sentiment: SentimentBreakdown;
};

export type AnalyzeInsightKind = 'praise' | 'issue' | 'topic';

export type StandardAnalyzeResult = BaseAnalyzeResult & {
    mode: 'standard';
    praisedFeatures: string[];
    commonComplaints: string[];
    topics: string[];
};

export type AdvancedAnalyzeResult = BaseAnalyzeResult & {
    mode: 'advanced';
    runId?: string;
    reviewCount?: number;
    praises: AnalyzeInsightItem[];
    issues: AnalyzeInsightItem[];
    topics: AnalyzeInsightItem[];
    report: AnalyzeRunDetail | null;
};

export type AnalyzeResult = StandardAnalyzeResult | AdvancedAnalyzeResult;

export type AnalyzeEvidenceItem = {
    review_id: string;
    quote: string;
    review_text?: string;
    voted_up: boolean;
    language: string;
    helpful_votes: number;
    funny_votes: number;
    playtime_hours: number;
    reviewed_at?: string;
};

export type AnalyzeInsightItem = {
    id: string;
    kind: AnalyzeInsightKind;
    label: string;
    summary: string;
    severity?: number;
    confidence: number;
    evidence_count: number;
    sample_evidence?: AnalyzeEvidenceItem[];
};

export type AnalyzeEvidenceQuery = {
    runId: string;
    kind: AnalyzeInsightKind;
    label: string;
};

export type AnalyzeEvidenceResponse = {
    run_id?: string;
    kind?: AnalyzeInsightKind;
    label?: string;
    total?: number;
    items: AnalyzeEvidenceItem[];
};

export type AnalyzeQueueDebug = {
    estimated_batch_count: number;
    estimated_review_fetch_pages: number;
    batch_size_limit: number;
    batch_char_limit: number;
};

export type AnalyzeRunDebug = {
    batch_count: number;
    batch_size_limit: number;
    batch_char_limit: number;
    batch_sizes?: number[];
};

export type AnalyzeRunRequest = {
    app_id: string;
    limit: number;
    language: string;
};

export type AnalyzeRunLinks = {
    self: string;
    history: string;
};

export type AnalyzeV2QueuedResponse = {
    run_id: string;
    status: AnalysisStatus;
    current_stage: AnalysisStage;
    progress_percent: number;
    queue_debug?: AnalyzeQueueDebug;
    request: AnalyzeRunRequest;
    links: AnalyzeRunLinks;
};

export type AnalyzeGameView = {
    app_id: string;
    title: string;
    cover_url?: string;
    genre?: string;
    release_year?: number;
};

export type AnalyzeOverview = {
    review_count?: number;
    sentiment?: Partial<SentimentBreakdown>;
    summary?: string;
};

export type AnalyzeRunDetail = {
    run_id: string;
    status: AnalysisStatus;
    current_stage: AnalysisStage;
    progress_percent: number;
    requested_at?: string;
    started_at?: string;
    completed_at?: string;
    error?: string;
    error_message?: string;
    game: AnalyzeGameView;
    overview: AnalyzeOverview;
    queue_debug?: AnalyzeQueueDebug;
    debug?: AnalyzeRunDebug;
    request?: AnalyzeRunRequest;
    links?: AnalyzeRunLinks;
    praises: AnalyzeInsightItem[];
    issues: AnalyzeInsightItem[];
    topics: AnalyzeInsightItem[];
};

export type AnalyzeHistoryItem = {
    run_id: string;
    requested_at: string;
    review_count: number;
    sentiment: SentimentBreakdown;
    summary: string;
};

export type AnalyzeGameHistory = {
    game: AnalyzeGameView;
    items: AnalyzeHistoryItem[];
};

export type AnalyzeCompareItemChange = {
    label: string;
    change: string;
};

export type AnalyzeCompareResponse = {
    run_a: {
        run_id: string;
        label: string;
    };
    run_b: {
        run_id: string;
        label: string;
    };
    summary: string;
    sentiment_delta: SentimentBreakdown;
    issues: AnalyzeCompareItemChange[];
};

type LegacyAnalyzeApiResponse = {
    aiSummary?: string;
    commonComplaints?: string[];
    common_complaints?: string[];
    common_issues?: string[];
    gameTitle?: string;
    game_title?: string;
    praisedFeatures?: string[];
    praised_features?: string[];
    review_count?: number;
    topics?: string[] | AnalyzeInsightItem[];
    sentiment?: Partial<SentimentBreakdown>;
    summary?: string;
};

export type AnalyzeApiResponse = LegacyAnalyzeApiResponse &
    Omit<Partial<AnalyzeRunDetail>, 'topics'> & {
        topics?: string[] | AnalyzeInsightItem[];
    };
