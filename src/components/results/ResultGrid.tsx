import {Col, Row, Space, Tag, Typography} from 'antd';
import type {AnalyzeResult} from '../../types/analyze';
import type {GameOption} from '../../types/game';
import SectionCard from '../common/SectionCard';
import InsightList from './InsightList';
import SentimentProgress from './SentimentProgress';
import SentimentStatCards from './SentimentStatCards';
import SummaryPanel from './SummaryPanel';
import SentimentChart from './SentimentChart';

type AnalysisContext = {
    game: GameOption;
    reviewLimit: number;
};

type ResultGridProps = {
    result: AnalyzeResult;
    dataSourceMode: 'mock' | 'live';
    analysisContext: AnalysisContext | null;
};

function ResultGrid({result, dataSourceMode, analysisContext}: ResultGridProps) {
    const {Paragraph, Text, Title} = Typography;
    const sourceBadge =
        dataSourceMode === 'mock'
            ? {
                  label: 'Mock Mode',
                  border: '1px solid rgba(245,158,11,0.22)',
                  background: 'rgba(245,158,11,0.10)',
                  color: '#fcd34d',
              }
            : {
                  label: 'Live API',
                  border: '1px solid rgba(34,197,94,0.22)',
                  background: 'rgba(34,197,94,0.10)',
                  color: '#86efac',
              };

    const metadataItems = [
        analysisContext?.game.genre
            ? {label: 'Genre', value: analysisContext.game.genre}
            : null,
        analysisContext?.game.releaseYear
            ? {label: 'Release Year', value: String(analysisContext.game.releaseYear)}
            : null,
        analysisContext
            ? {label: 'Steam App ID', value: `#${analysisContext.game.appId}`}
            : null,
        analysisContext
            ? {label: 'Review Sample', value: `${analysisContext.reviewLimit} reviews`}
            : null,
    ].filter((item): item is {label: string; value: string} => item !== null);

    return (
        <Space orientation="vertical" size={24} style={{width: '100%'}}>
            <Space
                align="start"
                style={{
                    width: '100%',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    rowGap: 12,
                }}
            >
                <div>
                    <Title level={3} style={{marginBottom: 8, color: '#f8fafc'}}>
                        Insights for {result.gameTitle}
                    </Title>
                    <Paragraph
                        style={{
                            marginBottom: 0,
                            color: '#94a3b8',
                            fontSize: 15,
                        }}
                    >
                        AI-generated insight report based on sampled Steam reviews and normalized
                        backend data.
                    </Paragraph>
                </div>

                <Tag
                    style={{
                        marginInlineEnd: 0,
                        borderRadius: 999,
                        padding: '7px 14px',
                        border: sourceBadge.border,
                        background: sourceBadge.background,
                        color: sourceBadge.color,
                        fontSize: 14,
                        fontWeight: 600,
                    }}
                >
                    {sourceBadge.label}
                </Tag>
            </Space>

            {metadataItems.length > 0 ? (
                <Space wrap size={[12, 12]}>
                    {metadataItems.map((item) => (
                        <div
                            key={item.label}
                            style={{
                                minWidth: 140,
                                padding: '12px 14px',
                                borderRadius: 16,
                                background: 'rgba(15,23,42,0.42)',
                                border: '1px solid rgba(148,163,184,0.12)',
                                boxShadow: '0 10px 24px rgba(0,0,0,0.12)',
                            }}
                        >
                            <Text
                                style={{
                                    display: 'block',
                                    color: '#94a3b8',
                                    fontSize: 12,
                                    marginBottom: 4,
                                }}
                            >
                                {item.label}
                            </Text>
                            <Text
                                style={{
                                    color: '#f8fafc',
                                    fontSize: 15,
                                    fontWeight: 600,
                                }}
                            >
                                {item.value}
                            </Text>
                        </div>
                    ))}
                </Space>
            ) : null}

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

            <Row gutter={[16, 16]}>
                <Col xs={24}>
                    <SectionCard title="Key Topics">
                        {result.topics.length ? (
                            <Space wrap size={[10, 10]}>
                                {result.topics.map((topic) => (
                                    <Tag
                                        key={topic}
                                        style={{
                                            marginInlineEnd: 0,
                                            padding: '8px 14px',
                                            borderRadius: 999,
                                            border: '1px solid rgba(103,232,249,0.20)',
                                            background:
                                                'linear-gradient(135deg, rgba(8,145,178,0.18), rgba(34,211,238,0.10))',
                                            color: '#a5f3fc',
                                            fontSize: 14,
                                            boxShadow: '0 10px 22px rgba(8,145,178,0.12)',
                                        }}
                                    >
                                        {topic}
                                    </Tag>
                                ))}
                            </Space>
                        ) : (
                            <Text style={{color: '#94a3b8'}}>No topics available.</Text>
                        )}
                    </SectionCard>
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                    <InsightList
                        title="Most Loved"
                        items={result.praisedFeatures}
                        variant="love"
                    />
                </Col>
                <Col xs={24} lg={12}>
                    <InsightList
                        title="Most Complained"
                        items={result.commonComplaints}
                        variant="complaint"
                    />
                </Col>
            </Row>
        </Space>
    );
}

export default ResultGrid;
