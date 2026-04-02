import type {ReactElement} from 'react';
import {BulbOutlined, EyeOutlined, RadarChartOutlined, WarningOutlined} from '@ant-design/icons';
import {Space, Tag, Tooltip, Typography} from 'antd';
import type {AnalyzeInsightItem} from '../../types/analyze';
import EvidenceTooltipContent from './EvidenceTooltipContent';
import SectionCard from '../common/SectionCard';

type StructuredInsightVariant = 'praise' | 'issue' | 'topic';

type StructuredInsightListProps = {
    title: string;
    items: AnalyzeInsightItem[];
    variant: StructuredInsightVariant;
    onSelectInsight?: (item: AnalyzeInsightItem) => void;
};

const VARIANT_THEME: Record<
    StructuredInsightVariant,
    {
        kicker: string;
        icon: ReactElement;
        iconTone: 'cyan' | 'ember' | 'hot';
        className: string;
        chipLabel: string;
        chipBorder: string;
        chipBackground: string;
        chipColor: string;
        cardBorder: string;
        cardBackground: string;
        accent: string;
    }
> = {
    praise: {
        kicker: 'Priority Praises',
        icon: <BulbOutlined />,
        iconTone: 'cyan',
        className: 'result-section-tone-love',
        chipLabel: 'High confidence',
        chipBorder: '1px solid rgba(153,176,112,0.24)',
        chipBackground: 'rgba(70,88,44,0.22)',
        chipColor: '#d9e3b4',
        cardBorder: '1px solid rgba(153,176,112,0.18)',
        cardBackground:
            'linear-gradient(135deg, rgba(46,58,30,0.88), rgba(15,23,42,0.96))',
        accent: '#d9e3b4',
    },
    issue: {
        kicker: 'Critical Issues',
        icon: <WarningOutlined />,
        iconTone: 'ember',
        className: 'result-section-tone-complaint',
        chipLabel: 'Watchlist',
        chipBorder: '1px solid rgba(176,104,88,0.22)',
        chipBackground: 'rgba(78,40,35,0.24)',
        chipColor: '#e3b0a3',
        cardBorder: '1px solid rgba(176,104,88,0.18)',
        cardBackground:
            'linear-gradient(135deg, rgba(77,37,33,0.90), rgba(15,23,42,0.98))',
        accent: '#e3b0a3',
    },
    topic: {
        kicker: 'Tracked Topics',
        icon: <RadarChartOutlined />,
        iconTone: 'hot',
        className: 'result-section-tone-hot',
        chipLabel: 'Signal map',
        chipBorder: '1px solid rgba(117,148,144,0.20)',
        chipBackground: 'rgba(41,58,57,0.22)',
        chipColor: '#bdd2cc',
        cardBorder: '1px solid rgba(117,148,144,0.18)',
        cardBackground:
            'linear-gradient(135deg, rgba(32,48,49,0.88), rgba(15,23,42,0.96))',
        accent: '#bdd2cc',
    },
};

function StructuredInsightList({title, items, variant, onSelectInsight}: StructuredInsightListProps) {
    const {Paragraph, Text, Title} = Typography;
    const theme = VARIANT_THEME[variant];

    if (!items.length) {
        return (
            <SectionCard
                title={title}
                kicker={theme.kicker}
                icon={theme.icon}
                iconTone={theme.iconTone}
                className={theme.className}
            >
                <Text style={{color: '#94a3b8'}}>No structured signals available yet.</Text>
            </SectionCard>
        );
    }

    return (
        <SectionCard
            title={title}
            kicker={theme.kicker}
            icon={theme.icon}
            iconTone={theme.iconTone}
            className={theme.className}
            extra={
                <Tag
                    className="hud-chip"
                    style={{
                        marginInlineEnd: 0,
                        borderRadius: 999,
                        padding: '6px 12px',
                        fontWeight: 600,
                        border: theme.chipBorder,
                        background: theme.chipBackground,
                        color: theme.chipColor,
                    }}
                >
                    {theme.chipLabel}
                </Tag>
            }
        >
            <Space direction="vertical" size={14} style={{width: '100%'}}>
                {items.slice(0, 4).map((item) => {
                    const canInspectEvidence = Boolean(onSelectInsight) && item.evidence_count > 0;
                    const cardButton = (
                        <button
                            key={item.id}
                            type="button"
                            className="result-evidence-trigger"
                            onClick={canInspectEvidence ? () => onSelectInsight?.(item) : undefined}
                            disabled={!canInspectEvidence}
                            aria-label={
                                canInspectEvidence
                                    ? `Open full evidence for ${item.label}`
                                    : undefined
                            }
                            style={{
                                width: '100%',
                                padding: 0,
                                border: 'none',
                                background: 'transparent',
                                textAlign: 'left',
                                cursor: canInspectEvidence ? 'pointer' : 'default',
                            }}
                        >
                            <div
                                className="hud-panel hud-angled-panel result-evidence-trigger-card"
                                style={{
                                    borderRadius: 20,
                                    padding: 18,
                                    border: theme.cardBorder,
                                    background: theme.cardBackground,
                                    boxShadow: canInspectEvidence
                                        ? '0 14px 28px rgba(2, 6, 23, 0.18)'
                                        : 'none',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        gap: 12,
                                        alignItems: 'flex-start',
                                        flexWrap: 'wrap',
                                    }}
                                >
                                    <div>
                                        <Title level={4} className="ui-title-tight" style={{margin: 0}}>
                                            {item.label}
                                        </Title>
                                        <Paragraph
                                            style={{
                                                margin: '10px 0 0',
                                                color: '#cbd5e1',
                                                fontSize: 14,
                                                lineHeight: 1.75,
                                            }}
                                        >
                                            {item.summary}
                                        </Paragraph>
                                    </div>

                                    <Space wrap size={[8, 8]}>
                                        <Tag
                                            className="hud-chip"
                                            style={{
                                                margin: 0,
                                                borderRadius: 999,
                                                padding: '4px 10px',
                                                border: theme.chipBorder,
                                                background: 'rgba(15,23,42,0.32)',
                                                color: theme.accent,
                                                fontWeight: 700,
                                            }}
                                        >
                                            {Math.round(item.confidence * 100)}% confidence
                                        </Tag>

                                        {typeof item.severity === 'number' ? (
                                            <Tag
                                                className="hud-chip"
                                                style={{
                                                    margin: 0,
                                                    borderRadius: 999,
                                                    padding: '4px 10px',
                                                    border: theme.chipBorder,
                                                    background: 'rgba(15,23,42,0.32)',
                                                    color: '#fca5a5',
                                                    fontWeight: 700,
                                                }}
                                            >
                                                Severity {item.severity}/5
                                            </Tag>
                                        ) : null}
                                    </Space>
                                </div>

                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        gap: 12,
                                        alignItems: 'center',
                                        flexWrap: 'wrap',
                                    }}
                                >
                                    <Tag
                                        className="hud-chip"
                                        style={{
                                            margin: 0,
                                            borderRadius: 999,
                                            padding: '6px 12px',
                                            border: theme.chipBorder,
                                            background: theme.chipBackground,
                                            color: theme.chipColor,
                                            fontWeight: 700,
                                        }}
                                    >
                                        Stored evidence {item.evidence_count}
                                    </Tag>

                                    {canInspectEvidence ? (
                                        <Text
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: 8,
                                                color: theme.accent,
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
                            key={item.id}
                            title={
                                <EvidenceTooltipContent
                                    evidenceCount={item.evidence_count}
                                    kind={variant}
                                />
                            }
                            overlayClassName={`result-evidence-tooltip result-evidence-tooltip-${variant}`}
                            mouseEnterDelay={0.2}
                            placement="top"
                        >
                            {cardButton}
                        </Tooltip>
                    ) : (
                        <div key={item.id}>
                            {cardButton}
                        </div>
                    );
                })}
            </Space>
        </SectionCard>
    );
}

export default StructuredInsightList;
