import {Space, Typography} from 'antd';
import SectionCard from '../common/SectionCard';

type InsightListProps = {
    title: string;
    items: string[];
};

function InsightList({title, items}: InsightListProps) {
    const {Text} = Typography;

    if (!items.length) {
        return (
            <SectionCard title={title}>
                <Text style={{color: '#94a3b8'}}>No insights available.</Text>
            </SectionCard>
        );
    }

    return (
        <SectionCard title={title}>
            <Space orientation="vertical" size={14} style={{width: '100%'}}>
                {items.map((item, index) => (
                    <div
                        key={`${item}-${index}`}
                        style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 12,
                            padding: '12px 14px',
                            borderRadius: 16,
                            background: 'rgba(15,23,42,0.36)',
                            border: '1px solid rgba(148,163,184,0.08)',
                        }}
                    >
                        <div
                            style={{
                                width: 10,
                                height: 10,
                                borderRadius: '50%',
                                marginTop: 6,
                                flexShrink: 0,
                                background:
                                    title.toLowerCase().includes('praised')
                                        ? 'linear-gradient(135deg, #22c55e, #4ade80)'
                                        : 'linear-gradient(135deg, #fb7185, #ef4444)',
                                boxShadow:
                                    title.toLowerCase().includes('praised')
                                        ? '0 0 12px rgba(34,197,94,0.35)'
                                        : '0 0 12px rgba(239,68,68,0.30)',
                            }}
                        />

                        <Text
                            style={{
                                color: '#e2e8f0',
                                fontSize: 15,
                                lineHeight: 1.7,
                            }}
                        >
                            {item}
                        </Text>
                    </div>
                ))}
            </Space>
        </SectionCard>
    );
}

export default InsightList;
