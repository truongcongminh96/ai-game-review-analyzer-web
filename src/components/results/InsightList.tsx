import {LikeOutlined, WarningOutlined} from '@ant-design/icons';
import {Space, Tag, Typography} from 'antd';
import SectionCard from '../common/SectionCard';

type InsightVariant = 'love' | 'complaint';

type InsightListProps = {
    title: string;
    items: string[];
    variant: InsightVariant;
};

type ParsedInsightItem = {
    label: string;
    percent?: string;
};

const parseInsightItem = (item: string): ParsedInsightItem => {
    const trimmedItem = item.trim();
    const percentMatch = trimmedItem.match(/\((\d{1,3})%\)\s*$/);

    if (!percentMatch) {
        return {label: trimmedItem};
    }

    return {
        label: trimmedItem.replace(percentMatch[0], '').trim(),
        percent: `${percentMatch[1]}%`,
    };
};

function InsightList({title, items, variant}: InsightListProps) {
    const {Text, Title} = Typography;
    const parsedItems = items.map(parseInsightItem);
    const [highlightItem, ...secondaryItems] = parsedItems;
    const isLoveVariant = variant === 'love';
    const tagStyle = isLoveVariant
        ? {
              background: 'rgba(70,88,44,0.22)',
              border: '1px solid rgba(153,176,112,0.24)',
              color: '#d9e3b4',
          }
        : {
              background: 'rgba(78,40,35,0.24)',
              border: '1px solid rgba(176,104,88,0.22)',
              color: '#e3b0a3',
          };
    const spotlightStyle = isLoveVariant
        ? {
              background:
                  'radial-gradient(circle at top right, rgba(153,176,112,0.14), transparent 34%), linear-gradient(135deg, rgba(46,58,30,0.92), rgba(15,23,42,0.98))',
              border: '1px solid rgba(153,176,112,0.18)',
              boxShadow: '0 18px 42px rgba(62,74,39,0.18)',
          }
        : {
              background:
                  'radial-gradient(circle at top right, rgba(176,104,88,0.16), transparent 34%), linear-gradient(135deg, rgba(77,37,33,0.92), rgba(15,23,42,0.98))',
              border: '1px solid rgba(176,104,88,0.18)',
              boxShadow: '0 18px 42px rgba(79,40,35,0.18)',
          };
    const iconStyle = isLoveVariant
        ? {
              background:
                  'linear-gradient(135deg, rgba(90,110,54,0.34), rgba(54,68,34,0.16))',
              border: '1px solid rgba(153,176,112,0.18)',
              boxShadow: '0 14px 28px rgba(62,74,39,0.18)',
          }
        : {
              background:
                  'linear-gradient(135deg, rgba(114,56,46,0.34), rgba(78,40,35,0.16))',
              border: '1px solid rgba(176,104,88,0.18)',
              boxShadow: '0 14px 28px rgba(79,40,35,0.18)',
          };
    const scoreStyle = isLoveVariant
        ? {
              background: 'rgba(70,88,44,0.22)',
              border: '1px solid rgba(153,176,112,0.18)',
              color: '#d9e3b4',
          }
        : {
              background: 'rgba(78,40,35,0.24)',
              border: '1px solid rgba(176,104,88,0.18)',
              color: '#e3b0a3',
          };
    const listIndexStyle = isLoveVariant
        ? {
              background: 'rgba(70,88,44,0.26)',
              color: '#d9e3b4',
          }
        : {
              background: 'rgba(78,40,35,0.26)',
              color: '#e3b0a3',
          };

    if (!items.length) {
        return (
            <SectionCard
                title={title}
                kicker={isLoveVariant ? 'Field Signal' : 'Threat Signal'}
                icon={isLoveVariant ? <LikeOutlined /> : <WarningOutlined />}
                iconTone={isLoveVariant ? 'cyan' : 'ember'}
                className={isLoveVariant ? 'result-section-tone-love' : 'result-section-tone-complaint'}
            >
                <Text style={{color: '#94a3b8'}}>No insights available.</Text>
            </SectionCard>
        );
    }

    return (
        <SectionCard
            title={title}
            kicker={isLoveVariant ? 'Field Signal' : 'Threat Signal'}
            icon={isLoveVariant ? <LikeOutlined /> : <WarningOutlined />}
            iconTone={isLoveVariant ? 'cyan' : 'ember'}
            className={isLoveVariant ? 'result-section-tone-love' : 'result-section-tone-complaint'}
            extra={
                <Tag
                    className="hud-chip"
                    style={{
                        marginInlineEnd: 0,
                        borderRadius: 999,
                        padding: '6px 12px',
                        fontWeight: 600,
                        ...tagStyle,
                    }}
                >
                    {isLoveVariant ? 'Priority Asset' : 'Recurring Fault'}
                </Tag>
            }
        >
            <Space orientation="vertical" size={16} style={{width: '100%'}}>
                <div
                    className={`hud-panel hud-angled-panel result-insight-highlight ${
                        isLoveVariant
                            ? 'result-insight-highlight-love'
                            : 'result-insight-highlight-complaint'
                    }`}
                    style={{
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: 22,
                        padding: 20,
                        ...spotlightStyle,
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 12,
                            flexWrap: 'wrap',
                            marginBottom: 16,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 11,
                                fontWeight: 700,
                                letterSpacing: '0.18em',
                                textTransform: 'uppercase',
                                color: isLoveVariant ? '#bbf7d0' : '#fecdd3',
                            }}
                        >
                            {isLoveVariant ? 'Most loved' : 'Most complained'}
                        </Text>

                        <div
                            style={{
                                borderRadius: 999,
                                padding: '6px 12px',
                                fontSize: 12,
                                fontWeight: 600,
                                ...scoreStyle,
                            }}
                        >
                            {isLoveVariant ? 'Primary favorable lane' : 'Primary threat lane'}
                        </div>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            gap: 16,
                            alignItems: 'stretch',
                            flexWrap: 'wrap',
                        }}
                    >
                        <div
                            className={`result-insight-icon-shell ${
                                isLoveVariant
                                    ? 'result-insight-icon-shell-love'
                                    : 'result-insight-icon-shell-complaint'
                            }`}
                            style={{
                                width: 56,
                                height: 56,
                                borderRadius: 16,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 22,
                                flexShrink: 0,
                                ...iconStyle,
                            }}
                        >
                            {isLoveVariant ? <LikeOutlined /> : <WarningOutlined />}
                        </div>

                        <div style={{flex: 1, minWidth: 220}}>
                            <Text
                                style={{
                                    display: 'block',
                                    marginBottom: 8,
                                    color: '#cbd5e1',
                                    fontSize: 13,
                                }}
                            >
                                Leading theme from sampled Steam reviews
                            </Text>

                            <Title
                                className="ui-title-tight"
                                level={4}
                                style={{
                                    margin: 0,
                                    color: '#f8fafc',
                                    fontSize: 'clamp(1.85rem, 3vw, 2.35rem)',
                                }}
                            >
                                {highlightItem.label}
                            </Title>

                            <Text
                                style={{
                                    display: 'block',
                                    marginTop: 10,
                                    color: '#cbd5e1',
                                    fontSize: 14,
                                    lineHeight: 1.7,
                                }}
                            >
                                {isLoveVariant
                                    ? 'This is the clearest thing players consistently praise in the analyzed sample.'
                                    : 'This is the complaint surfacing most clearly across the analyzed sample.'}
                            </Text>
                        </div>

                        {highlightItem.percent ? (
                            <div
                                className="result-insight-share"
                                style={{
                                    minWidth: 110,
                                    borderRadius: 18,
                                    padding: '14px 16px',
                                    alignSelf: 'flex-start',
                                    ...scoreStyle,
                                }}
                            >
                                <Text
                                    style={{
                                        display: 'block',
                                        color: 'inherit',
                                        fontSize: 12,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.12em',
                                    }}
                                >
                                    Share
                                </Text>
                                <Title
                                    level={3}
                                    style={{
                                        margin: '4px 0 0',
                                        color: 'inherit',
                                    }}
                                >
                                    {highlightItem.percent}
                                </Title>
                            </div>
                        ) : null}
                    </div>
                </div>

                {secondaryItems.length > 0 ? (
                    <Space orientation="vertical" size={10} style={{width: '100%'}}>
                        <Text
                            style={{
                                color: '#94a3b8',
                                fontSize: 13,
                            }}
                        >
                            {isLoveVariant ? 'Also appreciated by players' : 'Other recurring pain points'}
                        </Text>

                        {secondaryItems.map((item, index) => (
                            <div
                                className={`result-insight-item ${
                                    isLoveVariant
                                        ? 'result-insight-item-love'
                                        : 'result-insight-item-complaint'
                                }`}
                                key={`${item.label}-${index}`}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 12,
                                    padding: '14px 16px',
                                    borderRadius: 18,
                                    background: 'rgba(15,23,42,0.36)',
                                    border: '1px solid rgba(148,163,184,0.08)',
                                }}
                            >
                                <div
                                    style={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: 999,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: 13,
                                        fontWeight: 700,
                                        flexShrink: 0,
                                        ...listIndexStyle,
                                    }}
                                >
                                    {index + 2}
                                </div>

                                <Text
                                    style={{
                                        flex: 1,
                                        color: '#e2e8f0',
                                        fontSize: 15,
                                        lineHeight: 1.7,
                                    }}
                                >
                                    {item.label}
                                </Text>

                                {item.percent ? (
                                    <Text
                                        style={{
                                            color: isLoveVariant ? '#bbf7d0' : '#fecdd3',
                                            fontSize: 13,
                                            fontWeight: 700,
                                        }}
                                    >
                                        {item.percent}
                                    </Text>
                                ) : null}
                            </div>
                        ))}
                    </Space>
                ) : null}
            </Space>
        </SectionCard>
    );
}

export default InsightList;
