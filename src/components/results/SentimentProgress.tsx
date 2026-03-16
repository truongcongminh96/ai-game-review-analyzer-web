import {Space, Typography} from 'antd';
import SectionCard from '../common/SectionCard';

type SentimentProgressProps = {
    sentiment: {
        positive: number;
        neutral: number;
        negative: number;
    };
};

type SentimentRowProps = {
    label: string;
    value: number;
    variant: 'positive' | 'neutral' | 'negative';
};

function SentimentRow({label, value, variant}: SentimentRowProps) {
    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 8,
                    gap: 12,
                }}
            >
                <span
                    style={{
                        color: '#e2e8f0',
                        fontSize: 15,
                        fontWeight: 600,
                    }}
                >
                    {label}
                </span>

                <span
                    style={{
                        color:
                            variant === 'positive'
                                ? '#86efac'
                                : variant === 'neutral'
                                    ? '#fcd34d'
                                    : '#fda4af',
                        fontSize: 14,
                        fontWeight: 700,
                    }}
                >
                    {value}%
                </span>
            </div>

            <div className="progress-bar">
                <div
                    className={`progress-fill ${variant}`}
                    style={{width: `${value}%`}}
                />
            </div>
        </div>
    );
}

function SentimentProgress({sentiment}: SentimentProgressProps) {
    const {positive, neutral, negative} = sentiment;
    const {Text} = Typography;

    return (
        <SectionCard title="Sentiment Overview">
            <Space orientation="vertical" size={18} style={{width: '100%'}}>
                <Text style={{color: '#94a3b8'}}>
                    Distribution of sampled review sentiment from the analyzed dataset.
                </Text>

                <SentimentRow label="Positive" value={positive} variant="positive" />
                <SentimentRow label="Neutral" value={neutral} variant="neutral" />
                <SentimentRow label="Negative" value={negative} variant="negative" />
            </Space>
        </SectionCard>
    );
}

export default SentimentProgress;
