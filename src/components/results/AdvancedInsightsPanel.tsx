import {
    BranchesOutlined,
    EyeOutlined,
    ExperimentOutlined,
    HistoryOutlined,
    RiseOutlined,
} from '@ant-design/icons';
import {Button, Col, Row, Space, Tag, Tooltip, Typography} from 'antd';
import {useState} from 'react';
import {compareAnalysisRuns, getGameHistory} from '../../services/api';
import type {
    AnalyzeCompareResponse,
    AnalyzeEvidenceItem,
    AnalyzeInsightItem,
    AnalyzeRunDetail,
} from '../../types/analyze';
import EvidenceTooltipContent from './EvidenceTooltipContent';
import SectionCard from '../common/SectionCard';

type AdvancedInsightsPanelProps = {
    report: AnalyzeRunDetail;
    onSelectInsight?: (item: AnalyzeInsightItem) => void;
};

const confidencePercent = (value: number) => `${Math.round(value * 100)}%`;

const formatBatchSizes = (batchSizes: number[] | undefined) => {
    if (!Array.isArray(batchSizes) || batchSizes.length === 0) {
        return null;
    }

    return batchSizes.join(' / ');
};

const formatEvidenceMeta = (evidence: AnalyzeEvidenceItem) =>
    [
        evidence.voted_up ? 'Recommended' : 'Not recommended',
        `${evidence.playtime_hours.toFixed(1)}h played`,
        `${evidence.helpful_votes} helpful`,
    ].join(' • ');

const buildCompareTone = (value: number) => {
    if (value > 0) {
        return {
            border: '1px solid rgba(153,176,112,0.24)',
            background: 'rgba(70,88,44,0.22)',
            color: '#d9e3b4',
            prefix: '+',
        };
    }

    if (value < 0) {
        return {
            border: '1px solid rgba(176,104,88,0.22)',
            background: 'rgba(78,40,35,0.24)',
            color: '#e3b0a3',
            prefix: '',
        };
    }

    return {
        border: '1px solid rgba(148,163,184,0.22)',
        background: 'rgba(30,41,59,0.24)',
        color: '#cbd5e1',
        prefix: '',
    };
};

const renderInsightCard = (
    title: string,
    item: AnalyzeInsightItem | undefined,
    tone: {
        border: string;
        background: string;
        accent: string;
    },
    onSelectInsight?: (item: AnalyzeInsightItem) => void
) => {
    const {Paragraph, Text, Title} = Typography;

    if (!item) {
        return (
            <div
                className="hud-panel hud-angled-panel"
                style={{
                    height: '100%',
                    padding: 18,
                    borderRadius: 20,
                    border: tone.border,
                    background: tone.background,
                }}
            >
                <Text style={{color: '#94a3b8'}}>No signal captured for {title.toLowerCase()} yet.</Text>
            </div>
        );
    }

    const sample = item.sample_evidence?.[0];
    const canInspectEvidence = Boolean(onSelectInsight) && item.evidence_count > 0;
    const cardButton = (
        <button
            type="button"
            className="result-evidence-trigger"
            onClick={canInspectEvidence ? () => onSelectInsight?.(item) : undefined}
            disabled={!canInspectEvidence}
            aria-label={canInspectEvidence ? `Open full evidence for ${item.label}` : undefined}
            style={{
                height: '100%',
                width: '100%',
                padding: 0,
                border: 'none',
                background: 'transparent',
                textAlign: 'left',
                cursor: canInspectEvidence ? 'pointer' : 'default',
            }}
        >
            <div>
                <div
                    className="hud-panel hud-angled-panel result-evidence-trigger-card"
                    style={{
                        height: '100%',
                        padding: 18,
                        borderRadius: 18,
                        border: tone.border,
                        background: tone.background,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 14,
                        boxShadow: canInspectEvidence
                            ? '0 14px 28px rgba(2, 6, 23, 0.18)'
                            : 'none',
                    }}
                >
                    <div style={{display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap'}}>
                        <span
                            style={{
                                color: tone.accent,
                                fontSize: 12,
                                fontWeight: 700,
                                letterSpacing: '0.14em',
                                textTransform: 'uppercase',
                            }}
                        >
                            {title}
                        </span>
                        <Space wrap size={[8, 8]}>
                            <Tag
                                className="hud-chip"
                                style={{
                                    margin: 0,
                                    borderRadius: 999,
                                    padding: '4px 10px',
                                    border: tone.border,
                                    background: 'rgba(15,23,42,0.32)',
                                    color: '#f8fafc',
                                    fontWeight: 700,
                                }}
                            >
                                Confidence {confidencePercent(item.confidence)}
                            </Tag>
                            <Tag
                                className="hud-chip"
                                style={{
                                    margin: 0,
                                    borderRadius: 999,
                                    padding: '4px 10px',
                                    border: tone.border,
                                    background: 'rgba(15,23,42,0.32)',
                                    color: tone.accent,
                                    fontWeight: 700,
                                }}
                            >
                                Stored evidence {item.evidence_count}
                            </Tag>
                        </Space>
                    </div>

                    <div>
                        <Title level={4} className="ui-title-tight" style={{margin: 0, color: '#f8fafc'}}>
                            {item.label}
                        </Title>
                        <Paragraph style={{margin: '10px 0 0', color: '#cbd5e1'}}>
                            {item.summary}
                        </Paragraph>
                    </div>

                    {typeof item.severity === 'number' ? (
                        <span style={{color: '#fca5a5', fontWeight: 700}}>
                            Severity {item.severity}/5
                        </span>
                    ) : null}

                    {sample ? (
                        <div
                            style={{
                                borderRadius: 18,
                                border: '1px solid rgba(255,255,255,0.08)',
                                background: 'rgba(15,23,42,0.46)',
                                padding: 14,
                            }}
                        >
                            <Text style={{display: 'block', color: '#94a3b8', marginBottom: 8}}>
                                Sample evidence
                            </Text>
                            <Paragraph style={{margin: 0, color: '#f8fafc', fontSize: 15, lineHeight: 1.7}}>
                                “{sample.quote}”
                            </Paragraph>
                            <Text style={{display: 'block', marginTop: 10, color: '#94a3b8'}}>
                                {formatEvidenceMeta(sample)}
                            </Text>
                        </div>
                    ) : null}

                    {canInspectEvidence ? (
                        <Text
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 8,
                                color: tone.accent,
                                fontWeight: 700,
                            }}
                        >
                            <EyeOutlined />
                            Open full evidence
                        </Text>
                    ) : null}
                </div>
            </div>
        </button>
    );

    return canInspectEvidence ? (
        <Tooltip
            title={
                <EvidenceTooltipContent
                    evidenceCount={item.evidence_count}
                    kind={item.kind}
                />
            }
            overlayClassName={`result-evidence-tooltip result-evidence-tooltip-${item.kind}`}
            mouseEnterDelay={0.2}
            placement="top"
        >
            {cardButton}
        </Tooltip>
    ) : (
        cardButton
    );
};

function AdvancedInsightsPanel({report, onSelectInsight}: AdvancedInsightsPanelProps) {
    const {Paragraph, Text} = Typography;
    const [compareData, setCompareData] = useState<AnalyzeCompareResponse | null>(null);
    const [compareError, setCompareError] = useState<string | null>(null);
    const [compareLoading, setCompareLoading] = useState(false);
    const actualBatchSizes = formatBatchSizes(report.debug?.batch_sizes);

    const handleCompare = async () => {
        try {
            setCompareLoading(true);
            setCompareError(null);

            const history = await getGameHistory(report.game.app_id, 6);
            const previousRun = history.items.find((item) => item.run_id !== report.run_id);

            if (!previousRun) {
                setCompareData(null);
                setCompareError('No previous Advanced runs are available yet for this game.');
                return;
            }

            const comparison = await compareAnalysisRuns(previousRun.run_id, report.run_id);

            setCompareData(comparison);
        } catch (error) {
            console.error(error);
            setCompareError(
                error instanceof Error && error.message.trim()
                    ? error.message
                    : 'Unable to compare this run right now.'
            );
        } finally {
            setCompareLoading(false);
        }
    };

    return (
        <SectionCard
            title="Advanced Signal"
            kicker="Beta Output"
            icon={<ExperimentOutlined />}
            iconTone="hot"
            extra={
                <Tag
                    className="hud-chip"
                    style={{
                        marginInlineEnd: 0,
                        borderRadius: 999,
                        padding: '6px 12px',
                        border: '1px solid rgba(255,122,24,0.24)',
                        background: 'rgba(255,122,24,0.14)',
                        color: '#fed7aa',
                        fontWeight: 700,
                    }}
                >
                    run {report.run_id.slice(0, 8)}
                </Tag>
            }
        >
            <Space direction="vertical" size={18} style={{width: '100%'}}>
                <div
                    className="hud-panel hud-angled-panel"
                    style={{
                        padding: 18,
                        borderRadius: 20,
                        border: '1px solid rgba(255,255,255,0.08)',
                        background:
                            'linear-gradient(135deg, rgba(42,23,14,0.78), rgba(13,18,29,0.92))',
                    }}
                >
                    <div style={{display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap'}}>
                        <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
                            <Text
                                style={{
                                    color: '#fed7aa',
                                    fontWeight: 700,
                                    letterSpacing: '0.12em',
                                    textTransform: 'uppercase',
                                }}
                            >
                                Evidence-backed analysis
                            </Text>
                            <Paragraph style={{margin: 0, color: '#cbd5e1', maxWidth: 760}}>
                                Advanced mode runs the async pipeline, keeps history in the
                                database, and returns richer insight objects with confidence scores
                                and evidence samples.
                            </Paragraph>
                        </div>

                        <Space wrap size={[10, 10]}>
                            <Tag
                                className="hud-chip"
                                style={{
                                    margin: 0,
                                    borderRadius: 999,
                                    padding: '6px 12px',
                                    border: '1px solid rgba(255,255,255,0.10)',
                                    background: 'rgba(15,23,42,0.32)',
                                    color: '#f8fafc',
                                }}
                            >
                                <HistoryOutlined /> {report.overview.review_count ?? 0} reviews
                            </Tag>
                            <Tag
                                className="hud-chip"
                                style={{
                                    margin: 0,
                                    borderRadius: 999,
                                    padding: '6px 12px',
                                    border: '1px solid rgba(255,255,255,0.10)',
                                    background: 'rgba(15,23,42,0.32)',
                                    color: '#d6f9ff',
                                }}
                            >
                                status {report.status}
                            </Tag>
                            {report.queue_debug ? (
                                <Tag
                                    className="hud-chip"
                                    style={{
                                        margin: 0,
                                        borderRadius: 999,
                                        padding: '6px 12px',
                                        border: '1px solid rgba(255,122,24,0.24)',
                                        background: 'rgba(255,122,24,0.10)',
                                        color: '#fed7aa',
                                    }}
                                >
                                    est. {report.queue_debug.estimated_batch_count} batches
                                </Tag>
                            ) : null}
                            {report.debug ? (
                                <Tag
                                    className="hud-chip"
                                    style={{
                                        margin: 0,
                                        borderRadius: 999,
                                        padding: '6px 12px',
                                        border: '1px solid rgba(153,176,112,0.24)',
                                        background: 'rgba(70,88,44,0.22)',
                                        color: '#d9e3b4',
                                    }}
                                >
                                    actual {report.debug.batch_count} batches
                                </Tag>
                            ) : null}
                        </Space>
                    </div>
                </div>

                {report.queue_debug || report.debug ? (
                    <Row gutter={[16, 16]}>
                        {report.queue_debug ? (
                            <Col xs={24} lg={12}>
                                <div
                                    className="hud-panel hud-angled-panel"
                                    style={{
                                        height: '100%',
                                        padding: 18,
                                        borderRadius: 20,
                                        border: '1px solid rgba(255,122,24,0.18)',
                                        background:
                                            'linear-gradient(180deg, rgba(66,33,16,0.60), rgba(15,23,42,0.94))',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 10,
                                    }}
                                >
                                    <Text style={{color: '#fed7aa', fontWeight: 700}}>
                                        Queue estimate
                                    </Text>
                                    <Text style={{color: '#f8fafc'}}>
                                        {report.queue_debug.estimated_batch_count} AI batches across{' '}
                                        {report.queue_debug.estimated_review_fetch_pages} Steam fetch pages
                                    </Text>
                                    <Text style={{color: '#94a3b8'}}>
                                        Limits {report.queue_debug.batch_size_limit} reviews/batch and{' '}
                                        {report.queue_debug.batch_char_limit.toLocaleString()} chars/batch
                                    </Text>
                                </div>
                            </Col>
                        ) : null}

                        {report.debug ? (
                            <Col xs={24} lg={12}>
                                <div
                                    className="hud-panel hud-angled-panel"
                                    style={{
                                        height: '100%',
                                        padding: 18,
                                        borderRadius: 20,
                                        border: '1px solid rgba(153,176,112,0.18)',
                                        background:
                                            'linear-gradient(180deg, rgba(46,58,30,0.62), rgba(15,23,42,0.96))',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 10,
                                    }}
                                >
                                    <Text style={{color: '#d9e3b4', fontWeight: 700}}>
                                        Execution debug
                                    </Text>
                                    <Text style={{color: '#f8fafc'}}>
                                        {report.debug.batch_count} actual AI batches
                                        {actualBatchSizes ? ` • sizes ${actualBatchSizes}` : ''}
                                    </Text>
                                    <Text style={{color: '#94a3b8'}}>
                                        Limits {report.debug.batch_size_limit} reviews/batch and{' '}
                                        {report.debug.batch_char_limit.toLocaleString()} chars/batch
                                    </Text>
                                </div>
                            </Col>
                        ) : null}
                    </Row>
                ) : null}

                <Row gutter={[16, 16]}>
                    <Col xs={24} lg={8}>
                        {renderInsightCard('Top Praise', report.praises[0], {
                            border: '1px solid rgba(153,176,112,0.18)',
                            background:
                                'linear-gradient(180deg, rgba(46,58,30,0.66), rgba(15,23,42,0.96))',
                            accent: '#d9e3b4',
                        }, onSelectInsight)}
                    </Col>
                    <Col xs={24} lg={8}>
                        {renderInsightCard('Top Issue', report.issues[0], {
                            border: '1px solid rgba(176,104,88,0.18)',
                            background:
                                'linear-gradient(180deg, rgba(77,37,33,0.66), rgba(15,23,42,0.96))',
                            accent: '#fda4af',
                        }, onSelectInsight)}
                    </Col>
                    <Col xs={24} lg={8}>
                        {renderInsightCard('Top Topic', report.topics[0], {
                            border: '1px solid rgba(94,231,255,0.18)',
                            background:
                                'linear-gradient(180deg, rgba(22,53,62,0.66), rgba(15,23,42,0.96))',
                            accent: '#d6f9ff',
                        }, onSelectInsight)}
                    </Col>
                </Row>

                <div
                    className="hud-panel hud-angled-panel"
                    style={{
                        padding: 18,
                        borderRadius: 20,
                        border: '1px solid rgba(255,255,255,0.08)',
                        background:
                            'linear-gradient(180deg, rgba(9,13,22,0.92), rgba(15,23,42,0.84))',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: 16,
                            flexWrap: 'wrap',
                            marginBottom: 14,
                        }}
                    >
                        <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
                            <Text style={{color: '#f8fafc', fontWeight: 700}}>
                                Compare with previous Advanced run
                            </Text>
                            <Text style={{color: '#94a3b8'}}>
                                Pulls recent history for this game and compares the last stored run
                                against the current one.
                            </Text>
                        </div>

                        <Button
                            icon={<BranchesOutlined />}
                            onClick={handleCompare}
                            loading={compareLoading}
                            style={{
                                borderRadius: 14,
                                border: '1px solid rgba(94,231,255,0.18)',
                                background: 'rgba(94,231,255,0.10)',
                                color: '#d6f9ff',
                                fontWeight: 700,
                            }}
                        >
                            Compare runs
                        </Button>
                    </div>

                    {compareError ? (
                        <Text style={{color: '#fca5a5'}}>{compareError}</Text>
                    ) : null}

                    {compareData ? (
                        <Space direction="vertical" size={14} style={{width: '100%'}}>
                            <Paragraph style={{margin: 0, color: '#cbd5e1'}}>
                                {compareData.summary}
                            </Paragraph>

                            <Space wrap size={[10, 10]}>
                                {(
                                    [
                                        ['Positive', compareData.sentiment_delta.positive],
                                        ['Neutral', compareData.sentiment_delta.neutral],
                                        ['Negative', compareData.sentiment_delta.negative],
                                    ] as const
                                ).map(([label, value]) => {
                                    const tone = buildCompareTone(value);

                                    return (
                                        <Tag
                                            key={label}
                                            className="hud-chip"
                                            style={{
                                                margin: 0,
                                                borderRadius: 999,
                                                padding: '6px 12px',
                                                border: tone.border,
                                                background: tone.background,
                                                color: tone.color,
                                                fontWeight: 700,
                                            }}
                                        >
                                            <RiseOutlined /> {label} {tone.prefix}{value}
                                        </Tag>
                                    );
                                })}
                            </Space>

                            {compareData.issues.length ? (
                                <div style={{display: 'flex', flexWrap: 'wrap', gap: 10}}>
                                    {compareData.issues.map((issue) => (
                                        <Tag
                                            key={`${issue.label}-${issue.change}`}
                                            className="hud-chip"
                                            style={{
                                                margin: 0,
                                                borderRadius: 999,
                                                padding: '6px 12px',
                                                border: '1px solid rgba(255,122,24,0.18)',
                                                background: 'rgba(255,122,24,0.10)',
                                                color: '#fed7aa',
                                            }}
                                        >
                                            {issue.label}: {issue.change}
                                        </Tag>
                                    ))}
                                </div>
                            ) : null}
                        </Space>
                    ) : null}
                </div>
            </Space>
        </SectionCard>
    );
}

export default AdvancedInsightsPanel;
