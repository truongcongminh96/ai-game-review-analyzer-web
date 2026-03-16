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

export const mockAnalyzeApiResponsesByAppId: Record<string, AnalyzeApiResponse> = {
    '1245620': {
        gameTitle: 'Elden Ring',
        summary:
            'Players consistently praise Elden Ring for its sense of discovery, unforgettable boss encounters, and flexible build variety. The biggest complaints focus on inconsistent PC performance, camera friction in tight arenas, and a few late-game difficulty spikes that can feel punishing.',
        praisedFeatures: [
            'Expansive open-world exploration',
            'Challenging and memorable bosses',
            'Build variety and weapon experimentation',
            'Atmospheric art direction',
        ],
        commonComplaints: [
            'Frame drops in some areas',
            'Camera issues in close-quarter fights',
            'Late-game damage spikes',
            'Quest progression can feel opaque',
        ],
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
        praisedFeatures: [
            'Strong story and characters',
            'Detailed world building',
            'Stylized city atmosphere',
            'Satisfying combat builds',
        ],
        commonComplaints: [
            'Occasional bugs and glitches',
            'Enemy AI can feel inconsistent',
            'Driving controls split opinion',
            'Some side content feels repetitive',
        ],
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
        praisedFeatures: [
            'Reactive choices and branching quests',
            'Companion writing and voice acting',
            'Deep tactical combat systems',
            'High replay value across builds',
        ],
        commonComplaints: [
            'Inventory management can be clunky',
            'Long encounters slow the pacing',
            'Act 3 performance complaints',
            'UI can overwhelm new players',
        ],
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
        praisedFeatures: [
            'Fast and polished combat',
            'Excellent voice acting and dialogue',
            'Rewarding progression system',
            'Strong soundtrack and art style',
        ],
        commonComplaints: [
            'Repetition is not for everyone',
            'Early difficulty can feel steep',
            'Some weapons feel less balanced',
            'Endgame variety is limited for some players',
        ],
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
        praisedFeatures: [
            'Chaotic and memorable co-op missions',
            'Great teamwork-driven gameplay',
            'Satisfying stratagem system',
            'Strong moment-to-moment action',
        ],
        commonComplaints: [
            'Server and matchmaking instability',
            'Balancing changes can be divisive',
            'Disconnects hurt long missions',
            'Solo play feels rougher than co-op',
        ],
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
        praisedFeatures: [
            'Interconnected world design',
            'Memorable boss battles',
            'Beautiful atmosphere and soundtrack',
            'Tight platforming and combat feel',
        ],
        commonComplaints: [
            'Backtracking can feel heavy',
            'Map guidance is intentionally sparse',
            'Some boss runs are punishing',
            'Difficulty may turn away casual players',
        ],
        sentiment: {
            positive: 94,
            neutral: 3,
            negative: 3,
        },
    },
};

export const getMockAnalyzeApiResponse = (appId: string): AnalyzeApiResponse =>
    mockAnalyzeApiResponsesByAppId[appId] ?? mockAnalyzeApiResponse;
