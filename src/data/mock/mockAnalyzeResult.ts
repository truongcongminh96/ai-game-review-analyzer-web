import type {AnalyzeApiResponse} from '../../types/analyze';
import {
    DEFAULT_COMMON_COMPLAINTS,
    DEFAULT_GAME_QUERY,
    DEFAULT_PRAISED_FEATURES,
    DEFAULT_SENTIMENT,
    DEFAULT_SUMMARY,
    DEFAULT_TOPICS,
} from '../../utils/constants';

export const mockAnalyzeApiResponse: AnalyzeApiResponse = {
    gameTitle: DEFAULT_GAME_QUERY,
    summary: DEFAULT_SUMMARY,
    praised_features: DEFAULT_PRAISED_FEATURES,
    common_issues: DEFAULT_COMMON_COMPLAINTS,
    topics: DEFAULT_TOPICS,
    sentiment: DEFAULT_SENTIMENT,
};

export const mockAnalyzeApiResponsesByAppId: Record<string, AnalyzeApiResponse> = {
    '1245620': {
        gameTitle: 'Elden Ring',
        summary:
            'Players consistently praise Elden Ring for its sense of discovery, unforgettable boss encounters, and flexible build variety. The biggest complaints focus on inconsistent PC performance, camera friction in tight arenas, and a few late-game difficulty spikes that can feel punishing.',
        praised_features: [
            'Expansive open-world exploration',
            'Challenging and memorable bosses',
            'Build variety and weapon experimentation',
            'Atmospheric art direction',
        ],
        common_issues: [
            'Frame drops in some areas',
            'Camera issues in close-quarter fights',
            'Late-game damage spikes',
            'Quest progression can feel opaque',
        ],
        topics: ['exploration', 'boss design', 'build variety', 'performance'],
        sentiment: {
            positive: 82,
            neutral: 9,
            negative: 9,
        },
    },
    '1091500': {
        gameTitle: 'Cyberpunk 2077',
        summary:
            'Cyberpunk 2077 is widely appreciated for its narrative presentation, visual style, and character writing. Reviewers still point out bugs, uneven enemy AI, and a few pacing issues, but overall sentiment trends strongly positive after major updates.',
        praised_features: [
            'Strong story and characters',
            'Detailed world building',
            'Stylized city atmosphere',
            'Satisfying combat builds',
        ],
        common_issues: [
            'Occasional bugs and glitches',
            'Enemy AI can feel inconsistent',
            'Driving controls split opinion',
            'Some side content feels repetitive',
        ],
        topics: ['story', 'world building', 'combat builds', 'bugs'],
        sentiment: {
            positive: 78,
            neutral: 11,
            negative: 11,
        },
    },
    '1086940': {
        gameTitle: "Baldur's Gate 3",
        summary:
            "Baldur's Gate 3 receives outstanding praise for player freedom, reactive storytelling, and party interactions. Negative feedback exists, but it usually centers on long combat encounters, inventory friction, and performance dips in larger acts.",
        praised_features: [
            'Reactive choices and branching quests',
            'Companion writing and voice acting',
            'Deep tactical combat systems',
            'High replay value across builds',
        ],
        common_issues: [
            'Inventory management can be clunky',
            'Long encounters slow the pacing',
            'Act 3 performance complaints',
            'UI can overwhelm new players',
        ],
        topics: ['player choice', 'companions', 'tactical combat', 'inventory'],
        sentiment: {
            positive: 91,
            neutral: 5,
            negative: 4,
        },
    },
    '1145360': {
        gameTitle: 'Hades',
        summary:
            'Hades stands out for its polished combat loop, character-driven progression, and strong replayability. The few negative reviews mostly mention genre fatigue, repetitive runs for non-roguelike fans, and difficulty walls before upgrades settle in.',
        praised_features: [
            'Fast and polished combat',
            'Excellent voice acting and dialogue',
            'Rewarding progression system',
            'Strong soundtrack and art style',
        ],
        common_issues: [
            'Repetition is not for everyone',
            'Early difficulty can feel steep',
            'Some weapons feel less balanced',
            'Endgame variety is limited for some players',
        ],
        topics: ['combat loop', 'progression', 'replayability', 'difficulty'],
        sentiment: {
            positive: 93,
            neutral: 4,
            negative: 3,
        },
    },
    '553850': {
        gameTitle: 'HELLDIVERS 2',
        summary:
            'HELLDIVERS 2 is loved for its chaotic co-op action, teamwork moments, and cinematic battlefield feel. The loudest complaints are tied to matchmaking instability, live-service balancing swings, and frustration when squads lose connection mid-mission.',
        praised_features: [
            'Chaotic and memorable co-op missions',
            'Great teamwork-driven gameplay',
            'Satisfying stratagem system',
            'Strong moment-to-moment action',
        ],
        common_issues: [
            'Server and matchmaking instability',
            'Balancing changes can be divisive',
            'Disconnects hurt long missions',
            'Solo play feels rougher than co-op',
        ],
        topics: ['co-op', 'matchmaking', 'stratagems', 'balance'],
        sentiment: {
            positive: 76,
            neutral: 10,
            negative: 14,
        },
    },
    '367520': {
        gameTitle: 'Hollow Knight',
        summary:
            'Hollow Knight is praised as a genre favorite thanks to its exploration, boss design, and cohesive world building. Negative feedback usually focuses on backtracking, vague map guidance, and difficulty spikes that can frustrate less patient players.',
        praised_features: [
            'Interconnected world design',
            'Memorable boss battles',
            'Beautiful atmosphere and soundtrack',
            'Tight platforming and combat feel',
        ],
        common_issues: [
            'Backtracking can feel heavy',
            'Map guidance is intentionally sparse',
            'Some boss runs are punishing',
            'Difficulty may turn away casual players',
        ],
        topics: ['exploration', 'platforming', 'boss fights', 'difficulty'],
        sentiment: {
            positive: 94,
            neutral: 3,
            negative: 3,
        },
    },
};

export const getMockAnalyzeApiResponse = (appId: string): AnalyzeApiResponse =>
    mockAnalyzeApiResponsesByAppId[appId] ?? mockAnalyzeApiResponse;
