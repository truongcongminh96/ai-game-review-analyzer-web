import {
    CalendarOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    LikeOutlined,
    MessageOutlined,
    ProfileOutlined,
    WarningOutlined,
} from '@ant-design/icons';
import {Button, Drawer, Empty, Skeleton, Space, Tag, Typography} from 'antd';
import type {
    AnalyzeEvidenceItem,
    AnalyzeEvidenceResponse,
    AnalyzeInsightItem,
} from '../../types/analyze';

type EvidenceDrawerProps = {
    open: boolean;
    insight: AnalyzeInsightItem | null;
    evidence: AnalyzeEvidenceResponse | null;
    loading: boolean;
    error: string | null;
    onClose: () => void;
    onRetry: () => void;
};

const KIND_THEME: Record<
    AnalyzeInsightItem['kind'],
    {
        label: string;
        border: string;
        background: string;
        color: string;
    }
> = {
    praise: {
        label: 'Praise Signal',
        border: '1px solid rgba(153,176,112,0.24)',
        background: 'rgba(70,88,44,0.22)',
        color: '#d9e3b4',
    },
    issue: {
        label: 'Issue Signal',
        border: '1px solid rgba(176,104,88,0.22)',
        background: 'rgba(78,40,35,0.24)',
        color: '#e3b0a3',
    },
    topic: {
        label: 'Topic Signal',
        border: '1px solid rgba(117,148,144,0.20)',
        background: 'rgba(41,58,57,0.22)',
        color: '#bdd2cc',
    },
};

const formatReviewedAt = (value: string | undefined) => {
    if (!value) {
        return 'Reviewed date unavailable';
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return date.toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
    });
};

const formatRecommendation = (value: boolean) => (value ? 'Recommended' : 'Not recommended');

const renderEvidenceMetaTags = (item: AnalyzeEvidenceItem) => {
    const recommendationTheme = item.voted_up
        ? {
              border: '1px solid rgba(153,176,112,0.24)',
              background: 'rgba(70,88,44,0.22)',
              color: '#d9e3b4',
              icon: <CheckCircleOutlined />,
          }
        : {
              border: '1px solid rgba(176,104,88,0.22)',
              background: 'rgba(78,40,35,0.24)',
              color: '#e3b0a3',
              icon: <WarningOutlined />,
          };

    return (
        <Space wrap size={[8, 8]}>
            <Tag
                className="hud-chip"
                style={{
                    margin: 0,
                    borderRadius: 999,
                    padding: '6px 12px',
                    border: recommendationTheme.border,
                    background: recommendationTheme.background,
                    color: recommendationTheme.color,
                    fontWeight: 700,
                }}
            >
                {recommendationTheme.icon} {formatRecommendation(item.voted_up)}
            </Tag>
            <Tag
                className="hud-chip"
                style={{
                    margin: 0,
                    borderRadius: 999,
                    padding: '6px 12px',
                    border: '1px solid rgba(94,231,255,0.18)',
                    background: 'rgba(94,231,255,0.10)',
                    color: '#d6f9ff',
                    fontWeight: 700,
                }}
            >
                <LikeOutlined /> {item.helpful_votes} helpful
            </Tag>
            <Tag
                className="hud-chip"
                style={{
                    margin: 0,
                    borderRadius: 999,
                    padding: '6px 12px',
                    border: '1px solid rgba(191,151,83,0.20)',
                    background: 'rgba(94,67,28,0.22)',
                    color: '#e2c88e',
                    fontWeight: 700,
                }}
            >
                <ClockCircleOutlined /> {item.playtime_hours.toFixed(1)}h playtime
            </Tag>
            <Tag
                className="hud-chip"
                style={{
                    margin: 0,
                    borderRadius: 999,
                    padding: '6px 12px',
                    border: '1px solid rgba(148,163,184,0.18)',
                    background: 'rgba(15,23,42,0.32)',
                    color: '#cbd5e1',
                    fontWeight: 700,
                }}
            >
                <CalendarOutlined /> {formatReviewedAt(item.reviewed_at)}
            </Tag>
            <Tag
                className="hud-chip"
                style={{
                    margin: 0,
                    borderRadius: 999,
                    padding: '6px 12px',
                    border: '1px solid rgba(148,163,184,0.18)',
                    background: 'rgba(15,23,42,0.32)',
                    color: '#cbd5e1',
                    fontWeight: 700,
                }}
            >
                <ProfileOutlined /> Review {item.review_id}
            </Tag>
        </Space>
    );
};

function EvidenceDrawer({
    open,
    insight,
    evidence,
    loading,
    error,
    onClose,
    onRetry,
}: EvidenceDrawerProps) {
    const {Paragraph, Text, Title} = Typography;
    const theme = insight ? KIND_THEME[insight.kind] : null;
    const evidenceCount = evidence?.total ?? evidence?.items.length ?? 0;

    return (
        <Drawer
            open={open}
            onClose={onClose}
            destroyOnClose={false}
            rootClassName="result-evidence-drawer"
            width="min(760px, calc(100vw - 24px))"
            title={
                <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
                    <span className="ui-kicker" style={{color: '#9fb0c7'}}>
                        Full Evidence Drill-down
                    </span>
                    <span className="ui-title-tight" style={{fontSize: 26, color: '#f8fafc'}}>
                        {insight?.label ?? 'Evidence'}
                    </span>
                </div>
            }
            extra={
                insight && theme ? (
                    <Space wrap size={[8, 8]}>
                        <Tag
                            className="hud-chip"
                            style={{
                                margin: 0,
                                borderRadius: 999,
                                padding: '6px 12px',
                                border: theme.border,
                                background: theme.background,
                                color: theme.color,
                                fontWeight: 700,
                            }}
                        >
                            {theme.label}
                        </Tag>
                        <Tag
                            className="hud-chip"
                            style={{
                                margin: 0,
                                borderRadius: 999,
                                padding: '6px 12px',
                                border: '1px solid rgba(148,163,184,0.18)',
                                background: 'rgba(15,23,42,0.32)',
                                color: '#f8fafc',
                                fontWeight: 700,
                            }}
                        >
                            {evidenceCount} evidence
                        </Tag>
                    </Space>
                ) : null
            }
            styles={{
                content: {
                    background:
                        'radial-gradient(circle at top right, rgba(94,231,255,0.08), transparent 26%), radial-gradient(circle at bottom left, rgba(255,90,54,0.10), transparent 30%), linear-gradient(180deg, rgba(8,11,19,0.98), rgba(12,18,29,0.96))',
                    color: '#e2e8f0',
                },
                header: {
                    borderBottom: '1px solid rgba(148,163,184,0.10)',
                    padding: '18px 22px 16px',
                    background:
                        'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.00))',
                    color: '#f8fafc',
                },
                body: {
                    padding: 22,
                    background:
                        'radial-gradient(circle at top right, rgba(94,231,255,0.05), transparent 24%), linear-gradient(180deg, rgba(10,14,24,0.98), rgba(12,18,29,0.96))',
                },
            }}
        >
            <Space direction="vertical" size={16} style={{width: '100%'}}>
                <div
                    className="hud-panel hud-angled-panel"
                    style={{
                        padding: 18,
                        borderRadius: 20,
                        border: '1px solid rgba(255,255,255,0.08)',
                        background: 'linear-gradient(180deg, rgba(9,13,22,0.92), rgba(15,23,42,0.84))',
                    }}
                >
                    <Text style={{display: 'block', color: '#94a3b8', marginBottom: 8}}>
                        Evidence-backed trace
                    </Text>
                    <Paragraph style={{margin: 0, color: '#cbd5e1'}}>
                        Review snapshots stored for this run are shown below so you can verify the
                        signal against real player text instead of only trusting the summary.
                    </Paragraph>
                </div>

                {loading ? (
                    <Space direction="vertical" size={14} style={{width: '100%'}}>
                        {[0, 1, 2].map((index) => (
                            <div
                                key={index}
                                className="hud-panel hud-angled-panel"
                                style={{
                                    padding: 18,
                                    borderRadius: 20,
                                    border: '1px solid rgba(148,163,184,0.10)',
                                    background: 'rgba(15,23,42,0.36)',
                                }}
                            >
                                <Skeleton
                                    active
                                    title={{width: '32%'}}
                                    paragraph={{rows: 4}}
                                />
                            </div>
                        ))}
                    </Space>
                ) : null}

                {!loading && error ? (
                    <div
                        className="hud-shell hud-angled-shell"
                        role="alert"
                        style={{
                            borderRadius: 20,
                            border: '1px solid rgba(239,68,68,0.18)',
                            background: 'rgba(127,29,29,0.18)',
                            color: '#fecaca',
                            boxShadow: '0 16px 36px rgba(0,0,0,0.18)',
                            padding: '16px 18px',
                        }}
                    >
                        <div style={{display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap'}}>
                            <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
                                <strong style={{fontSize: 16}}>Unable to load evidence</strong>
                                <span>{error}</span>
                            </div>

                            <Button
                                onClick={onRetry}
                                style={{
                                    borderRadius: 12,
                                    border: '1px solid rgba(255,255,255,0.14)',
                                    background: 'rgba(255,255,255,0.06)',
                                    color: '#f8fafc',
                                    fontWeight: 700,
                                }}
                            >
                                Retry
                            </Button>
                        </div>
                    </div>
                ) : null}

                {!loading && !error && evidence && evidence.items.length === 0 ? (
                    <div
                        className="hud-panel hud-angled-panel"
                        style={{
                            padding: 28,
                            borderRadius: 20,
                            border: '1px solid rgba(148,163,184,0.10)',
                            background: 'rgba(15,23,42,0.32)',
                        }}
                    >
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description={
                                <span style={{color: '#94a3b8'}}>
                                    No evidence snapshots were returned for this label.
                                </span>
                            }
                        />
                    </div>
                ) : null}

                {!loading && !error && evidence?.items.length ? (
                    <Space direction="vertical" size={14} style={{width: '100%'}}>
                        {evidence.items.map((item, index) => {
                            const reviewText = item.review_text?.trim() || item.quote.trim();

                            return (
                                <div
                                    key={`${item.review_id}-${index}`}
                                    className="hud-panel hud-angled-panel"
                                    style={{
                                        padding: 18,
                                        borderRadius: 20,
                                        border: '1px solid rgba(148,163,184,0.10)',
                                        background:
                                            'linear-gradient(180deg, rgba(9,13,22,0.92), rgba(15,23,42,0.84))',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 14,
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            gap: 12,
                                            flexWrap: 'wrap',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Title level={4} className="ui-title-tight" style={{margin: 0}}>
                                            Evidence #{index + 1}
                                        </Title>
                                        {renderEvidenceMetaTags(item)}
                                    </div>

                                    <div
                                        style={{
                                            padding: 16,
                                            borderRadius: 18,
                                            border: theme?.border ?? '1px solid rgba(148,163,184,0.12)',
                                            background: 'rgba(15,23,42,0.46)',
                                        }}
                                    >
                                        <Text style={{display: 'block', color: '#94a3b8', marginBottom: 8}}>
                                            Quote
                                        </Text>
                                        <Paragraph
                                            className="ui-copy-strong"
                                            style={{
                                                margin: 0,
                                                color: '#f8fafc',
                                                lineHeight: 1.8,
                                            }}
                                        >
                                            “{item.quote}”
                                        </Paragraph>
                                    </div>

                                    <div
                                        style={{
                                            padding: 16,
                                            borderRadius: 18,
                                            border: '1px solid rgba(148,163,184,0.10)',
                                            background: 'rgba(2,6,23,0.34)',
                                        }}
                                    >
                                        <Text style={{display: 'block', color: '#94a3b8', marginBottom: 8}}>
                                            <MessageOutlined /> Full review text
                                        </Text>
                                        <Paragraph
                                            style={{
                                                margin: 0,
                                                color: '#dbe5f1',
                                                lineHeight: 1.8,
                                                whiteSpace: 'pre-wrap',
                                            }}
                                        >
                                            {reviewText}
                                        </Paragraph>
                                    </div>
                                </div>
                            );
                        })}
                    </Space>
                ) : null}
            </Space>
        </Drawer>
    );
}

export default EvidenceDrawer;
