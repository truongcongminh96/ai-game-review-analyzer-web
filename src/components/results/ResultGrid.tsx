import type {ReactElement} from 'react';
import {
    CalendarOutlined,
    CompassOutlined,
    DashboardOutlined,
    DatabaseOutlined,
    ExperimentOutlined,
    ProfileOutlined,
    ThunderboltOutlined,
} from '@ant-design/icons';
import {Col, Row, Space, Tag, Typography} from 'antd';
import type {
    AnalysisMode,
    AnalyzeResult,
} from '../../types/analyze';
import type {GameOption} from '../../types/game';
import HudOverlay from '../motion/HudOverlay';
import AdvancedResultView from './AdvancedResultView';
import SentimentChart from './SentimentChart';
import SentimentProgress from './SentimentProgress';
import SentimentStatCards from './SentimentStatCards';
import StandardResultView from './StandardResultView';
import SummaryPanel from './SummaryPanel';

type AnalysisContext = {
    game: GameOption;
    reviewLimit: number;
    mode: AnalysisMode;
};

type ResultGridProps = {
    result: AnalyzeResult;
    dataSourceMode: 'mock' | 'live';
    analysisContext: AnalysisContext | null;
};

type MetadataItem = {
    label: string;
    value: string;
    icon: ReactElement;
};

function ResultGrid({result, dataSourceMode, analysisContext}: ResultGridProps) {
    const {Paragraph, Text, Title} = Typography;
    const isAdvancedMode = result.mode === 'advanced';
    const advancedResult = result.mode === 'advanced' ? result : null;
    const standardResult = result.mode === 'standard' ? result : null;
    const topicCount = result.topics.length;
    const praiseCount = advancedResult ? advancedResult.praises.length : standardResult?.praisedFeatures.length ?? 0;
    const issueCount = advancedResult ? advancedResult.issues.length : standardResult?.commonComplaints.length ?? 0;

    const sentimentEntries = [
        {label: 'Positive', value: result.sentiment.positive},
        {label: 'Neutral', value: result.sentiment.neutral},
        {label: 'Negative', value: result.sentiment.negative},
    ];
    const dominantSentiment = sentimentEntries.reduce((highest, entry) =>
        entry.value > highest.value ? entry : highest
    );

    const sourceBadge =
        dataSourceMode === 'mock'
            ? {
                  label: 'Mock Mode',
                  border: '1px solid rgba(214,176,96,0.24)',
                  background: 'rgba(122,92,38,0.22)',
                  color: '#e8c98a',
              }
            : isAdvancedMode
              ? {
                    label: 'Advanced Beta',
                    border: '1px solid rgba(255,122,24,0.24)',
                    background: 'rgba(92,54,16,0.22)',
                    color: '#fed7aa',
                }
            : {
                  label: 'Standard',
                  border: '1px solid rgba(153,176,112,0.24)',
                  background: 'rgba(70,88,44,0.22)',
                  color: '#d9e3b4',
              };

    const metadataItems = [
        analysisContext?.game.genre
            ? {
                  label: 'Genre',
                  value: analysisContext.game.genre,
                  icon: <CompassOutlined />,
              }
            : null,
        analysisContext?.game.releaseYear
            ? {
                  label: 'Release Year',
                  value: String(analysisContext.game.releaseYear),
                  icon: <CalendarOutlined />,
              }
            : null,
        analysisContext
            ? {
                  label: 'Mode',
                  value: isAdvancedMode ? 'Advanced (Beta)' : 'Standard',
                  icon: isAdvancedMode ? <ExperimentOutlined /> : <ThunderboltOutlined />,
              }
            : null,
        analysisContext
            ? {
                  label: 'Steam App ID',
                  value: `#${analysisContext.game.appId}`,
                  icon: <DatabaseOutlined />,
              }
            : null,
        analysisContext
            ? {
                  label: 'Review Sample',
                  value: `${analysisContext.reviewLimit} reviews`,
                  icon: <ProfileOutlined />,
              }
            : null,
    ].filter((item): item is MetadataItem => item !== null);

    const telemetryItems = [
        {
            label: 'Primary signal',
            value: `${dominantSentiment.label} ${dominantSentiment.value}%`,
            border: '1px solid rgba(153,176,112,0.22)',
            background: 'rgba(70,88,44,0.22)',
            color: '#d9e3b4',
        },
        {
            label: 'Topic grid',
            value: `${topicCount || 0} detected`,
            border: '1px solid rgba(117,148,144,0.20)',
            background: 'rgba(41,58,57,0.22)',
            color: '#bdd2cc',
        },
        {
            label: 'Praise lanes',
            value: `${praiseCount} tracked`,
            border: '1px solid rgba(191,151,83,0.20)',
            background: 'rgba(94,67,28,0.22)',
            color: '#e2c88e',
        },
        {
            label: 'Pain lanes',
            value: `${issueCount} tracked`,
            border: '1px solid rgba(176,104,88,0.20)',
            background: 'rgba(78,40,35,0.24)',
            color: '#e3b0a3',
        },
    ];

    return (
        <Space orientation="vertical" size={22} style={{width: '100%'}} className="result-grid-stack">
            <div className="result-hero-shell hud-shell hud-angled-shell">
                <HudOverlay reticlePosition="bottom-left" scanDelay={0.48}/>

                <Space orientation="vertical" size={18} style={{width: '100%'}}>
                    <div className="result-hero-head">
                        <div className="result-hero-copy">
                            <div className="ui-title-row" style={{alignItems: 'center'}}>
                                <span className="ui-icon-badge ui-icon-badge-cyan">
                                    <DashboardOutlined />
                                </span>
                                <div className="ui-title-stack">
                                    <span className="ui-kicker">Tactical Console</span>
                                    <Title
                                        className="ui-title-tight"
                                        level={2}
                                        style={{margin: 0, fontSize: 'clamp(2rem, 3.2vw, 2.8rem)'}}
                                    >
                                        Insights for {result.gameTitle}
                                    </Title>
                                </div>
                            </div>

                            <Paragraph
                                className="ui-copy-muted"
                                style={{
                                    margin: '14px 0 0',
                                    fontSize: 16,
                                    maxWidth: 820,
                                }}
                            >
                                {isAdvancedMode
                                    ? 'Advanced report with queued analysis, evidence-backed signal extraction, and comparison-ready run history.'
                                    : 'AI-generated insight report based on sampled Steam reviews and normalized backend data.'}
                            </Paragraph>
                        </div>

                        <Tag
                            className="hud-chip result-mode-tag"
                            style={{
                                marginInlineEnd: 0,
                                borderRadius: 999,
                                padding: '9px 16px',
                                border: sourceBadge.border,
                                background: sourceBadge.background,
                                color: sourceBadge.color,
                                fontSize: 14,
                                fontWeight: 700,
                            }}
                        >
                            {sourceBadge.label}
                        </Tag>
                    </div>

                    <div className="hud-panel hud-angled-panel result-hero-telemetry">
                        <Space wrap size={[10, 10]}>
                                        {telemetryItems.map((item) => (
                                            <Tag
                                                className="hud-chip"
                                    key={item.label}
                                    style={{
                                        margin: 0,
                                        borderRadius: 999,
                                        padding: '7px 12px',
                                        border: item.border,
                                        background: item.background,
                                        color: item.color,
                                    }}
                                >
                                    {item.label}: {item.value}
                                </Tag>
                            ))}
                        </Space>
                    </div>

                    {metadataItems.length > 0 ? (
                        <div className="result-hero-meta">
                            {metadataItems.map((item, index) => (
                                <div
                                    key={item.label}
                                    className="result-meta-card hud-panel hud-angled-panel"
                                >
                                    <Text className="result-meta-node">{`NODE 0${index + 1}`}</Text>
                                    <Text className="ui-field-label" style={{marginBottom: 10}}>
                                        {item.icon}
                                        {item.label}
                                    </Text>
                                    <Text className="result-meta-value">{item.value}</Text>
                                </div>
                            ))}
                        </div>
                    ) : null}
                </Space>
            </div>

            <SentimentStatCards sentiment={result.sentiment}/>

            <Row gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                    <SummaryPanel title={result.gameTitle} summary={result.summary} />
                </Col>
                <Col xs={24} lg={12}>
                    <SentimentChart sentiment={result.sentiment} />
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
                <Col xs={24}>
                    <SentimentProgress sentiment={result.sentiment} />
                </Col>
            </Row>

            {advancedResult ? (
                <AdvancedResultView result={advancedResult} />
            ) : (
                standardResult ? <StandardResultView result={standardResult} /> : null
            )}
        </Space>
    );
}

export default ResultGrid;
