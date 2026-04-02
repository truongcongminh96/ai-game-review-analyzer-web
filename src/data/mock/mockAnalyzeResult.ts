import type {
    AnalysisMode,
    AnalyzeApiResponse,
    AnalyzeCompareResponse,
    AnalyzeEvidenceItem,
    AnalyzeGameHistory,
    AnalyzeHistoryItem,
    AnalyzeInsightItem,
    AnalyzeRunDetail,
} from '../../types/analyze';
import {
    DEFAULT_COMMON_COMPLAINTS,
    DEFAULT_GAME_QUERY,
    DEFAULT_PRAISED_FEATURES,
    DEFAULT_SENTIMENT,
    DEFAULT_SUMMARY,
    DEFAULT_TOPICS,
} from '../../utils/constants';

type MockCatalogEntry = {
    appId: string;
    title: string;
    genre?: string;
    releaseYear?: number;
    summary: string;
    praisedFeatures: string[];
    commonIssues: string[];
    topics: string[];
    sentimentPercent: {
        positive: number;
        neutral: number;
        negative: number;
    };
    advanced: {
        currentRunId: string;
        previousRunId: string;
        reviewCount: number;
        praises: AnalyzeInsightItem[];
        issues: AnalyzeInsightItem[];
        topics: AnalyzeInsightItem[];
        currentRequestedAt: string;
        previousRequestedAt: string;
        currentSummary: string;
        previousSummary: string;
        previousSentimentPercent: {
            positive: number;
            neutral: number;
            negative: number;
        };
    };
};

const createEvidence = (
    quote: string,
    reviewId: string,
    votedUp: boolean,
    helpfulVotes: number,
    playtimeHours: number
): AnalyzeEvidenceItem => ({
    review_id: reviewId,
    quote,
    review_text: quote,
    voted_up: votedUp,
    language: 'english',
    helpful_votes: helpfulVotes,
    funny_votes: 0,
    playtime_hours: playtimeHours,
    reviewed_at: '2026-04-02T09:00:00.000Z',
});

const createInsightItem = (
    id: string,
    kind: AnalyzeInsightItem['kind'],
    label: string,
    summary: string,
    confidence: number,
    evidence: AnalyzeEvidenceItem[],
    severity?: number
): AnalyzeInsightItem => ({
    id,
    kind,
    label,
    summary,
    confidence,
    evidence_count: evidence.length,
    sample_evidence: evidence,
    severity,
});

const MOCK_CATALOG: Record<string, MockCatalogEntry> = {
    '1245620': {
        appId: '1245620',
        title: 'Elden Ring',
        genre: 'Action RPG',
        releaseYear: 2022,
        summary:
            'Players consistently praise Elden Ring for its sense of discovery, unforgettable boss encounters, and flexible build variety. The biggest complaints focus on inconsistent PC performance, camera friction in tight arenas, and a few late-game difficulty spikes that can feel punishing.',
        praisedFeatures: [
            'Expansive open-world exploration',
            'Challenging and memorable bosses',
            'Build variety and weapon experimentation',
            'Atmospheric art direction',
        ],
        commonIssues: [
            'Frame drops in some areas',
            'Camera issues in close-quarter fights',
            'Late-game damage spikes',
            'Quest progression can feel opaque',
        ],
        topics: ['exploration', 'boss design', 'build variety', 'performance'],
        sentimentPercent: {positive: 82, neutral: 9, negative: 9},
        advanced: {
            currentRunId: 'run-er-current',
            previousRunId: 'run-er-previous',
            reviewCount: 50,
            currentRequestedAt: '2026-04-02T10:12:00.000Z',
            previousRequestedAt: '2026-03-28T08:20:00.000Z',
            currentSummary:
                'Advanced analysis shows exploration and boss design remain the dominant praise vectors, while performance and late-game tuning stay the primary risk areas.',
            previousSummary:
                'Previous advanced run highlighted exploration and build variety, but complaints around stutter and camera handling were slightly lower.',
            previousSentimentPercent: {positive: 79, neutral: 10, negative: 11},
            praises: [
                createInsightItem(
                    'er-praise-exploration',
                    'praise',
                    'Exploration Freedom',
                    'Players repeatedly describe the world as rewarding to roam, with detours and hidden encounters paying off constantly.',
                    0.94,
                    [createEvidence('Every cave and side path feels worth checking.', 'er-review-11', true, 18, 62.4)]
                ),
                createInsightItem(
                    'er-praise-bosses',
                    'praise',
                    'Boss Encounter Design',
                    'Bosses are framed as difficult but memorable milestones that make progress feel earned.',
                    0.91,
                    [createEvidence('Some bosses crushed me, but beating them felt incredible.', 'er-review-14', true, 21, 88.1)]
                ),
                createInsightItem(
                    'er-praise-builds',
                    'praise',
                    'Build Variety',
                    'The weapon and stat system supports repeated runs with clearly different playstyles.',
                    0.88,
                    [createEvidence('Trying a faith build made the second run feel brand new.', 'er-review-07', true, 12, 44.8)]
                ),
            ],
            issues: [
                createInsightItem(
                    'er-issue-performance',
                    'issue',
                    'PC Performance Spikes',
                    'Players still mention stutters in dense areas and during effect-heavy fights.',
                    0.9,
                    [createEvidence('I still get random frame drops in open areas.', 'er-review-19', false, 16, 39.2)],
                    4
                ),
                createInsightItem(
                    'er-issue-camera',
                    'issue',
                    'Camera Friction',
                    'Tight arenas create camera problems that make certain fights feel less fair.',
                    0.82,
                    [createEvidence('The camera is the real boss in smaller rooms.', 'er-review-23', false, 8, 27.5)],
                    3
                ),
                createInsightItem(
                    'er-issue-late-game',
                    'issue',
                    'Late-game Difficulty Spikes',
                    'Some players feel the final stretch raises incoming damage too sharply.',
                    0.84,
                    [createEvidence('Late game enemies delete you before you can react.', 'er-review-29', false, 11, 55.9)],
                    4
                ),
            ],
            topics: [
                createInsightItem(
                    'er-topic-exploration',
                    'topic',
                    'exploration',
                    'Exploration remains the most common recurring topic across sampled reviews.',
                    0.92,
                    [createEvidence('Getting lost in the world is the best part.', 'er-review-05', true, 14, 47.3)]
                ),
                createInsightItem(
                    'er-topic-boss-design',
                    'topic',
                    'boss design',
                    'Boss difficulty and spectacle dominate discussion threads.',
                    0.88,
                    [createEvidence('The bosses are brutal but impossible to forget.', 'er-review-08', true, 17, 70.6)]
                ),
                createInsightItem(
                    'er-topic-performance',
                    'topic',
                    'performance',
                    'Performance still appears as a recurring concern in negative reviews.',
                    0.78,
                    [createEvidence('Performance is better than launch, but not fixed.', 'er-review-31', false, 9, 33.7)]
                ),
            ],
        },
    },
    '1091500': {
        appId: '1091500',
        title: 'Cyberpunk 2077',
        genre: 'Open-World RPG',
        releaseYear: 2020,
        summary:
            'Cyberpunk 2077 is widely appreciated for its narrative presentation, visual style, and character writing. Reviewers still point out bugs, uneven enemy AI, and a few pacing issues, but overall sentiment trends strongly positive after major updates.',
        praisedFeatures: [
            'Strong story and characters',
            'Detailed world building',
            'Stylized city atmosphere',
            'Satisfying combat builds',
        ],
        commonIssues: [
            'Occasional bugs and glitches',
            'Enemy AI can feel inconsistent',
            'Driving controls split opinion',
            'Some side content feels repetitive',
        ],
        topics: ['story', 'world building', 'combat builds', 'bugs'],
        sentimentPercent: {positive: 78, neutral: 11, negative: 11},
        advanced: {
            currentRunId: 'run-cp-current',
            previousRunId: 'run-cp-previous',
            reviewCount: 50,
            currentRequestedAt: '2026-04-02T10:18:00.000Z',
            previousRequestedAt: '2026-03-29T09:10:00.000Z',
            currentSummary:
                'Advanced analysis shows Phantom Liberty-era reviews heavily reward narrative payoff and city immersion, while residual bugs and pacing complaints still appear in lower-confidence issue clusters.',
            previousSummary:
                'Previous advanced run found stronger bug pressure and weaker confidence in side-content pacing than the current snapshot.',
            previousSentimentPercent: {positive: 74, neutral: 12, negative: 14},
            praises: [
                createInsightItem(
                    'cp-praise-story',
                    'praise',
                    'Narrative Delivery',
                    'Players describe the main story and expansion writing as sharp, cinematic, and emotionally sticky.',
                    0.93,
                    [createEvidence('Phantom Liberty feels like the showrunner finally found the perfect season finale.', 'cp-review-09', true, 20, 41.7)]
                ),
                createInsightItem(
                    'cp-praise-world',
                    'praise',
                    'Night City Atmosphere',
                    'Night City still stands out as a dense, stylish setting that players enjoy inhabiting.',
                    0.91,
                    [createEvidence('Night City is absurdly good at selling the vibe every time I boot it up.', 'cp-review-17', true, 24, 55.2)]
                ),
                createInsightItem(
                    'cp-praise-builds',
                    'praise',
                    'Build Flexibility',
                    'Combat builds are praised for letting players pivot between stealth, netrunning, and gunplay.',
                    0.86,
                    [createEvidence('I switched from netrunner to shotgun chaos and both felt great.', 'cp-review-21', true, 13, 36.8)]
                ),
            ],
            issues: [
                createInsightItem(
                    'cp-issue-bugs',
                    'issue',
                    'Residual Bugs',
                    'Players still mention glitches, even if the overall tone is much more forgiving than launch-era feedback.',
                    0.84,
                    [createEvidence('It is miles better now, but weird bugs still pop up in quests.', 'cp-review-25', false, 15, 29.1)],
                    3
                ),
                createInsightItem(
                    'cp-issue-ai',
                    'issue',
                    'Enemy AI Inconsistency',
                    'Some combat encounters still feel uneven because enemy reactions are not always convincing.',
                    0.76,
                    [createEvidence('Some fights are excellent, others still have AI acting drunk.', 'cp-review-14', false, 7, 48.4)],
                    2
                ),
                createInsightItem(
                    'cp-issue-pacing',
                    'issue',
                    'Side-content Pacing',
                    'A subset of reviews says mission quality varies enough to make pacing feel uneven.',
                    0.71,
                    [createEvidence('A few side jobs feel like filler between the truly great ones.', 'cp-review-32', false, 5, 22.6)],
                    2
                ),
            ],
            topics: [
                createInsightItem(
                    'cp-topic-story',
                    'topic',
                    'story',
                    'Story remains the dominant topic in both long-form and short-form positive reviews.',
                    0.9,
                    [createEvidence('I came back for the expansion and stayed for the writing.', 'cp-review-11', true, 18, 33.9)]
                ),
                createInsightItem(
                    'cp-topic-world',
                    'topic',
                    'world building',
                    'World building is mentioned as a major retention driver in positive reviews.',
                    0.87,
                    [createEvidence('The world finally feels as alive as the trailers promised.', 'cp-review-18', true, 16, 52.1)]
                ),
                createInsightItem(
                    'cp-topic-bugs',
                    'topic',
                    'bugs',
                    'Bugs remain a recurring but lower-intensity topic compared with earlier snapshots.',
                    0.73,
                    [createEvidence('Still buggy sometimes, but not enough to ruin it anymore.', 'cp-review-28', false, 6, 27.4)]
                ),
            ],
        },
    },
};

const buildLegacyMockResponse = (entry: MockCatalogEntry): AnalyzeApiResponse => ({
    gameTitle: entry.title,
    summary: entry.summary,
    review_count: entry.advanced.reviewCount,
    praised_features: entry.praisedFeatures,
    common_issues: entry.commonIssues,
    topics: entry.topics,
    sentiment: toSentimentCounts(entry.sentimentPercent, entry.advanced.reviewCount),
});

const buildQueueDebug = (reviewCount: number) => ({
    estimated_batch_count: Math.max(1, Math.ceil(reviewCount / 50)),
    estimated_review_fetch_pages: Math.max(1, Math.ceil(reviewCount / 100)),
    batch_size_limit: 50,
    batch_char_limit: 14000,
});

const buildRunDebug = (reviewCount: number) => {
    const batchSizeLimit = 50;
    const batchCount = Math.max(1, Math.ceil(reviewCount / batchSizeLimit));
    const batchSizes = Array.from({length: batchCount}, (_, index) => {
        const remaining = reviewCount - index * batchSizeLimit;

        return Math.min(batchSizeLimit, Math.max(remaining, 0));
    }).filter((size) => size > 0);

    return {
        batch_count: batchSizes.length || 1,
        batch_size_limit: batchSizeLimit,
        batch_char_limit: 14000,
        batch_sizes: batchSizes.length ? batchSizes : [reviewCount],
    };
};

const toSentimentCounts = (
    sentimentPercent: {positive: number; neutral: number; negative: number},
    reviewCount: number
) => ({
    positive: Math.round((sentimentPercent.positive / 100) * reviewCount),
    neutral: Math.round((sentimentPercent.neutral / 100) * reviewCount),
    negative: Math.round((sentimentPercent.negative / 100) * reviewCount),
});

const buildHistoryItem = (
    runId: string,
    requestedAt: string,
    reviewCount: number,
    summary: string,
    sentimentPercent: {positive: number; neutral: number; negative: number}
): AnalyzeHistoryItem => ({
    run_id: runId,
    requested_at: requestedAt,
    review_count: reviewCount,
    summary,
    sentiment: sentimentPercent,
});

const buildAdvancedMockResponse = (entry: MockCatalogEntry): AnalyzeRunDetail => ({
    run_id: entry.advanced.currentRunId,
    status: 'success',
    current_stage: 'completed',
    progress_percent: 100,
    requested_at: entry.advanced.currentRequestedAt,
    started_at: entry.advanced.currentRequestedAt,
    completed_at: '2026-04-02T10:19:00.000Z',
    game: {
        app_id: entry.appId,
        title: entry.title,
        genre: entry.genre,
        release_year: entry.releaseYear,
    },
    overview: {
        review_count: entry.advanced.reviewCount,
        summary: entry.advanced.currentSummary,
        sentiment: toSentimentCounts(entry.sentimentPercent, entry.advanced.reviewCount),
    },
    queue_debug: buildQueueDebug(entry.advanced.reviewCount),
    debug: buildRunDebug(entry.advanced.reviewCount),
    praises: entry.advanced.praises,
    issues: entry.advanced.issues,
    topics: entry.advanced.topics,
});

const FALLBACK_ENTRY: MockCatalogEntry = {
    appId: '0',
    title: DEFAULT_GAME_QUERY,
    summary: DEFAULT_SUMMARY,
    praisedFeatures: DEFAULT_PRAISED_FEATURES,
    commonIssues: DEFAULT_COMMON_COMPLAINTS,
    topics: DEFAULT_TOPICS,
    sentimentPercent: DEFAULT_SENTIMENT,
    advanced: {
        currentRunId: 'run-mock-current',
        previousRunId: 'run-mock-previous',
        reviewCount: 30,
        currentRequestedAt: '2026-04-02T10:00:00.000Z',
        previousRequestedAt: '2026-03-30T09:00:00.000Z',
        currentSummary: DEFAULT_SUMMARY,
        previousSummary: 'Previous mock run with broadly similar sentiment and slightly fewer issues.',
        previousSentimentPercent: {positive: 70, neutral: 15, negative: 15},
        praises: [
            createInsightItem(
                'mock-praise',
                'praise',
                'Clear Strength',
                'Mock output highlights a clearly positive capability in the game experience.',
                0.8,
                [createEvidence('This mock review is strongly positive about the experience.', 'mock-review-1', true, 3, 12)]
            ),
        ],
        issues: [
            createInsightItem(
                'mock-issue',
                'issue',
                'Recurring Friction',
                'Mock output also keeps one clear issue signal to exercise the advanced UI.',
                0.7,
                [createEvidence('This mock review calls out a recurring frustration.', 'mock-review-2', false, 1, 8)],
                2
            ),
        ],
        topics: [
            createInsightItem(
                'mock-topic',
                'topic',
                'core loop',
                'Mock topic data keeps the advanced structured panels populated.',
                0.75,
                [createEvidence('The mock review keeps returning to the core gameplay loop.', 'mock-review-3', true, 2, 10)]
            ),
        ],
    },
};

const getMockEntry = (appId: string) => MOCK_CATALOG[appId] ?? FALLBACK_ENTRY;

const findMockEntryByRunId = (runId: string) =>
    Object.values(MOCK_CATALOG).find(
        (entry) =>
            entry.advanced.currentRunId === runId || entry.advanced.previousRunId === runId
    ) ?? FALLBACK_ENTRY;

export const getMockAnalyzeApiResponse = (
    appId: string,
    mode: AnalysisMode = 'standard'
): AnalyzeApiResponse => {
    const entry = getMockEntry(appId);

    return mode === 'advanced'
        ? buildAdvancedMockResponse(entry)
        : buildLegacyMockResponse(entry);
};

export const getMockGameHistory = (appId: string, limit = 10): AnalyzeGameHistory => {
    const entry = getMockEntry(appId);
    const items = [
        buildHistoryItem(
            entry.advanced.currentRunId,
            entry.advanced.currentRequestedAt,
            entry.advanced.reviewCount,
            entry.advanced.currentSummary,
            entry.sentimentPercent
        ),
        buildHistoryItem(
            entry.advanced.previousRunId,
            entry.advanced.previousRequestedAt,
            entry.advanced.reviewCount - 6,
            entry.advanced.previousSummary,
            entry.advanced.previousSentimentPercent
        ),
    ].slice(0, limit);

    return {
        game: {
            app_id: entry.appId,
            title: entry.title,
            genre: entry.genre,
            release_year: entry.releaseYear,
        },
        items,
    };
};

export const getMockCompareAnalysisRuns = (
    runA: string,
    runB: string
): AnalyzeCompareResponse => {
    const entry = findMockEntryByRunId(runA === FALLBACK_ENTRY.advanced.currentRunId ? runB : runA);
    const current = buildHistoryItem(
        entry.advanced.currentRunId,
        entry.advanced.currentRequestedAt,
        entry.advanced.reviewCount,
        entry.advanced.currentSummary,
        entry.sentimentPercent
    );
    const previous = buildHistoryItem(
        entry.advanced.previousRunId,
        entry.advanced.previousRequestedAt,
        entry.advanced.reviewCount - 6,
        entry.advanced.previousSummary,
        entry.advanced.previousSentimentPercent
    );

    const left = current.run_id === runA ? current : previous;
    const right = current.run_id === runB ? current : previous;

    return {
        run_a: {
            run_id: left.run_id,
            label: left.run_id === current.run_id ? 'Current' : 'Previous',
        },
        run_b: {
            run_id: right.run_id,
            label: right.run_id === current.run_id ? 'Current' : 'Previous',
        },
        summary:
            right.run_id === current.run_id
                ? 'Current advanced snapshot improves positive sentiment and reduces issue pressure compared with the previous run.'
                : 'Comparison between two mock advanced runs.',
        sentiment_delta: {
            positive: right.sentiment.positive - left.sentiment.positive,
            neutral: right.sentiment.neutral - left.sentiment.neutral,
            negative: right.sentiment.negative - left.sentiment.negative,
        },
        issues: [
            {label: 'Residual Bugs', change: 'improved'},
            {label: 'Narrative Confidence', change: 'improved'},
            {label: 'Pacing Complaints', change: 'stable'},
        ],
    };
};
