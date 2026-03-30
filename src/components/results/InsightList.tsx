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
              background: 'rgba(34,197,94,0.12)',
              border: '1px solid rgba(74,222,128,0.22)',
              color: '#bbf7d0',
          }
        : {
              background: 'rgba(239,68,68,0.12)',
              border: '1px solid rgba(251,113,133,0.22)',
              color: '#fecdd3',
          };
    const spotlightStyle = isLoveVariant
        ? {
              background:
                  'radial-gradient(circle at top right, rgba(74,222,128,0.18), transparent 34%), linear-gradient(135deg, rgba(20,83,45,0.88), rgba(15,23,42,0.96))',
              border: '1px solid rgba(74,222,128,0.18)',
              boxShadow: '0 18px 42px rgba(34,197,94,0.16)',
          }
        : {
              background:
                  'radial-gradient(circle at top right, rgba(251,113,133,0.18), transparent 34%), linear-gradient(135deg, rgba(127,29,29,0.88), rgba(15,23,42,0.96))',
              border: '1px solid rgba(251,113,133,0.18)',
              boxShadow: '0 18px 42px rgba(239,68,68,0.16)',
          };
    const iconStyle = isLoveVariant
        ? {
              background:
                  'linear-gradient(135deg, rgba(34,197,94,0.26), rgba(74,222,128,0.14))',
              border: '1px solid rgba(134,239,172,0.18)',
              boxShadow: '0 14px 28px rgba(34,197,94,0.18)',
          }
        : {
              background:
                  'linear-gradient(135deg, rgba(239,68,68,0.26), rgba(251,113,133,0.14))',
              border: '1px solid rgba(254,205,211,0.18)',
              boxShadow: '0 14px 28px rgba(239,68,68,0.18)',
          };
    const scoreStyle = isLoveVariant
        ? {
              background: 'rgba(34,197,94,0.10)',
              border: '1px solid rgba(134,239,172,0.16)',
              color: '#dcfce7',
          }
        : {
              background: 'rgba(239,68,68,0.10)',
              border: '1px solid rgba(254,205,211,0.16)',
              color: '#ffe4e6',
          };
    const listIndexStyle = isLoveVariant
        ? {
              background: 'rgba(34,197,94,0.14)',
              color: '#86efac',
          }
        : {
              background: 'rgba(239,68,68,0.14)',
              color: '#fda4af',
          };

    if (!items.length) {
        return (
            <SectionCard title={title}>
                <Text style={{color: '#94a3b8'}}>No insights available.</Text>
            </SectionCard>
        );
    }

    return (
        <SectionCard
            title={title}
            extra={
                <Tag
                    style={{
                        marginInlineEnd: 0,
                        borderRadius: 999,
                        padding: '4px 10px',
                        fontWeight: 600,
                        ...tagStyle,
                    }}
                >
                    {isLoveVariant ? 'Player Favorite' : 'Recurring Issue'}
                </Tag>
            }
        >
            <Space orientation="vertical" size={16} style={{width: '100%'}}>
                <div
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
                            {isLoveVariant ? 'Strongest positive signal' : 'Biggest pain point'}
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
                            style={{
                                width: 56,
                                height: 56,
                                borderRadius: 18,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 26,
                                flexShrink: 0,
                                ...iconStyle,
                            }}
                        >
                            {isLoveVariant ? '❤️' : '🔥'}
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
                                level={4}
                                style={{
                                    margin: 0,
                                    color: '#f8fafc',
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
                                key={`${item.label}-${index}`}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 12,
                                    padding: '12px 14px',
                                    borderRadius: 16,
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
