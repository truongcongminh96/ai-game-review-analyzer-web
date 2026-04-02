import type {ReactElement} from 'react';
import {BulbOutlined, RadarChartOutlined, WarningOutlined} from '@ant-design/icons';
import {Space, Tag, Typography} from 'antd';
import type {AnalyzeInsightItem} from '../../types/analyze';
import SectionCard from '../common/SectionCard';

type StructuredInsightVariant = 'praise' | 'issue' | 'topic';

type StructuredInsightListProps = {
    title: string;
    items: AnalyzeInsightItem[];
    variant: StructuredInsightVariant;
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

function StructuredInsightList({title, items, variant}: StructuredInsightListProps) {
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
                {items.slice(0, 4).map((item) => (
                    <div
                        key={item.id}
                        className="hud-panel hud-angled-panel"
                        style={{
                            borderRadius: 20,
                            padding: 18,
                            border: theme.cardBorder,
                            background: theme.cardBackground,
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

                        <Text style={{color: '#94a3b8'}}>
                            {item.evidence_count} evidence references
                        </Text>
                    </div>
                ))}
            </Space>
        </SectionCard>
    );
}

export default StructuredInsightList;
