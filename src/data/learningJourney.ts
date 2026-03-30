export type LearningCourse = {
    id: string;
    providerMark: string;
    title: string;
    partner: string;
    progress: number;
    duration: string;
    modules: string;
    status: string;
    summary: string;
    credential: string;
    highlights: string[];
    toolGroups: Array<{
        category: string;
        tools: string[];
    }>;
    modulePreview: string[];
    tags: string[];
    takeaways: string[];
};

export type ResearchTrack = {
    id: string;
    title: string;
    summary: string;
    tags: string[];
    keySections: string[];
    problem: string;
    solution: string;
    impact: string;
    cautionTitle?: string;
    cautionPoints?: string[];
    goToMarketRows?: Array<{
        segment: string;
        whoPays: string;
    }>;
    surprises?: string[];
    tradeOffs?: Array<{
        option: string;
        tradeoff: string;
    }>;
    pdfPath?: string;
};

export type PortfolioProject = {
    id: string;
    title: string;
    summary: string;
    tech: string[];
    impact: string;
    learnings: string[];
    whyBuilt: Array<{
        title: string;
        detail: string;
    }>;
    usageScenario: Array<{
        label: string;
        detail: string;
    }>;
    engineeringDetails: Array<{
        title: string;
        detail: string;
    }>;
    tradeOffs: Array<{
        option: string;
        tradeoff: string;
    }>;
    limitations: string[];
};

export const learningCourses: LearningCourse[] = [
    {
        id: 'upgrad-generative-ai-mastery',
        providerMark: 'upGrad',
        title: 'Generative AI Mastery Certificate for Managerial Excellence',
        partner: 'In collaboration with Microsoft',
        progress: 99,
        duration: '20 Hours',
        modules: '2 Courses',
        status: 'Almost completed',
        summary:
            'A practical GenAI program for building AI workflows, no-code MVPs, and better product decisions.',
        credential:
            '2 globally recognized certificates from NSDC, Microsoft, and upGrad.',
        highlights: [
            'Build AI agents, automate daily workflows, and create deployable no-code MVPs.',
            'Learn how AI can support strategy, operations, and decision making across business functions.',
        ],
        toolGroups: [
            {
                category: 'Research',
                tools: [
                    'Perplexity AI',
                    'Google Scholar',
                    'Industry databases',
                    'SciSpace',
                    'Consensus',
                ],
            },
            {
                category: 'Data Analysis',
                tools: ['ChatGPT', 'Claude'],
            },
            {
                category: 'Design Thinking',
                tools: ['Best-fit tools for the problem'],
            },
            {
                category: 'Prototyping',
                tools: ['Lovable', 'Replit', 'Bolt.new', 'Bubble.io'],
            },
            {
                category: 'Documentation',
                tools: [
                    'Claude',
                    'ChatGPT',
                    'Gemini',
                    'Copilot',
                    'MS Word',
                    'Google Sheets',
                ],
            },
        ],
        modulePreview: [
            'Understanding Generative AI and business application potential',
            'Identifying and evaluating AI opportunities',
            'Managing GenAI solutions with product and business context',
        ],
        tags: ['LLM', 'NLP', 'SQL', 'Prompt Engineering'],
        takeaways: [
            'How LLM systems work and where they create real leverage',
            'Prompt engineering best practices for clarity, structure, and control',
            'Practical use cases that move beyond demos into product workflows',
        ],
    },
];

export const researchTracks: ResearchTrack[] = [
    {
        id: 'research-report',
        title: 'Research Report',
        summary:
            'A structured overview of why review analysis breaks down at scale and where AI can reduce noise for product teams.',
        tags: ['LLM', 'NLP', 'Product Insight'],
        keySections: ['Review overload', 'Signal extraction', 'Evaluation risk'],
        problem: 'Review overload makes manual analysis slow, inconsistent, and easy to miss.',
        solution: 'Combine LLM summarization with NLP pattern extraction to surface the strongest signals fast.',
        impact: '95% faster analysis for repeat review-reading workflows.',
        cautionTitle: 'When AI should NOT be used',
        cautionPoints: [
            'When the review set is small enough that direct reading is faster and more reliable.',
            'When legal, moderation, or compliance decisions require auditable evidence rather than generated summaries.',
            'When edge-case complaints are rare but highly important, because over-aggregation can hide them.',
        ],
        pdfPath: '/research/1_Research_Report.pdf',
    },
    {
        id: 'market-landscape',
        title: 'Market Research Report',
        summary:
            'A quick scan of the opportunity space around AI-assisted feedback analysis, user insight tooling, and product intelligence.',
        tags: ['Market', 'Strategy', 'Positioning'],
        keySections: ['Buyer types', 'Packaging', 'Pricing logic'],
        problem: 'Teams collect lots of feedback but struggle to turn it into a repeatable product signal.',
        solution: 'Use AI workflows to compress market and user feedback into clearer decision-ready briefs.',
        impact: 'Sharper positioning and faster prioritization without reading everything manually.',
        goToMarketRows: [
            {
                segment: 'Indie dev',
                whoPays: 'Low budget',
            },
            {
                segment: 'AAA studio',
                whoPays: 'Enterprise',
            },
            {
                segment: 'SaaS tool',
                whoPays: 'Subscription',
            },
        ],
        pdfPath: '/research/2_Market_Research_Report.pdf',
    },
    {
        id: 'design-thinking-report',
        title: 'Design Thinking Report',
        summary:
            'A product-framing document that connects user pain, workflow friction, and opportunity areas into a clearer solution direction.',
        tags: ['Design Thinking', 'Problem Framing', 'User Need'],
        keySections: ['Trust gap', 'Developer needs', 'Workflow fit'],
        problem: 'Teams often jump into building AI features before clarifying the real user pain and decision flow.',
        solution: 'Use design-thinking structure to define user needs, solution shape, and the context for applying LLM workflows.',
        impact: 'Better problem-solution fit before implementation starts.',
        surprises: [
            'Users trust AI less than expected when summaries do not show supporting evidence.',
            'Developers care more about bug clustering and reproducible issue patterns than raw sentiment alone.',
        ],
        pdfPath: '/research/3_Design_Thinking_Report.pdf',
    },
    {
        id: 'ai-solution-prototype',
        title: 'AI Solution Prototype',
        summary:
            'A prototype-oriented report showing how the AI workflow can be shaped into a usable product flow with concrete outputs and system behavior.',
        tags: ['Prototype', 'Architecture', 'LLM Workflow'],
        keySections: ['Model choice', 'Latency', 'Deployment fit'],
        problem: 'Raw model output alone is not enough to create a stable and convincing user-facing product experience.',
        solution: 'Wrap the LLM with structured prompts, predictable outputs, and a product flow that users can trust.',
        impact: 'Faster path from concept to a portfolio-ready AI prototype.',
        tradeOffs: [
            {
                option: 'Local LLM',
                tradeoff: 'Lower operating cost and more control, but slower responses and less stable output quality.',
            },
            {
                option: 'Cloud model',
                tradeoff: 'Faster responses and stronger quality, but higher cost and vendor dependency.',
            },
            {
                option: 'Hybrid routing',
                tradeoff: 'Better fit across use cases, but more orchestration complexity and monitoring overhead.',
            },
        ],
        pdfPath: '/research/4_AI_Solution_Prototype.pdf',
    },
];

export const portfolioProjects: PortfolioProject[] = [
    {
        id: 'ai-game-review-analyzer',
        title: 'AI Game Review Analyzer',
        summary:
            'An applied AI product that turns noisy Steam reviews into structured insight cards, summaries, sentiment breakdowns, and decision-ready signals.',
        tech: ['Go', 'React', 'Ollama'],
        impact: '95% faster review analysis',
        learnings: [
            'System design across frontend, backend, and inference flow',
            'Prompt engineering for more structured and reusable outputs',
            'Handling LLM latency while keeping the UI readable and responsive',
        ],
        whyBuilt: [
            {
                title: 'I saw the problem',
                detail: 'Teams waste hours reading reviews but still miss critical issues.',
            },
            {
                title: 'Existing tools fail',
                detail: 'Dashboards show sentiment, but hide root causes and patterns.',
            },
            {
                title: 'AI can solve this',
                detail: 'Structured LLM pipelines convert noisy feedback into decision-ready signals.',
            },
        ],
        usageScenario: [
            {
                label: 'Launch',
                detail: 'A game release starts receiving 10k reviews a day.',
            },
            {
                label: 'Analyze',
                detail: 'The AI pipeline analyzes the stream and clusters recurring complaints.',
            },
            {
                label: 'Surface',
                detail: 'A PM sees a concentrated bug or performance issue immediately.',
            },
            {
                label: 'Respond',
                detail: 'The team ships a targeted fix within 24 hours.',
            },
            {
                label: 'Impact',
                detail: 'Player sentiment stabilizes and the rating trend improves.',
            },
        ],
        engineeringDetails: [
            {
                title: 'Architecture',
                detail: 'A Go backend handles Steam fetching, prompt orchestration, and model execution, while a React frontend turns the output into a readable decision dashboard.',
            },
            {
                title: 'Prompt',
                detail: 'The prompt is structured to extract summary, praised features, complaints, topics, and sentiment so the output stays reusable and easier to trust.',
            },
            {
                title: 'Infra',
                detail: 'A local-first Ollama setup keeps experimentation low-cost and flexible, while mock and live modes make the product easier to demo, test, and iterate.',
            },
        ],
        tradeOffs: [
            {
                option: 'Local LLM (Ollama)',
                tradeoff: 'Low cost and high control, but higher latency during heavier review batches.',
            },
            {
                option: 'Cloud LLM',
                tradeoff: 'Lower latency and stronger quality, but higher cost and less deployment control.',
            },
            {
                option: 'Batch processing',
                tradeoff: 'Improves consistency and stability, but increases delay before insight cards are ready.',
            },
        ],
        limitations: [
            'LLM hallucination risk still exists when reviews are noisy or contradictory.',
            'Topic clustering is useful, but not perfect for overlapping complaints.',
            'The current workflow is biased toward English-language reviews.',
            'Large datasets still create noticeable latency in local inference mode.',
        ],
    },
];
