import {LineChartOutlined} from '@ant-design/icons';
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
        <div className={`result-progress-row hud-panel hud-angled-panel result-progress-row-${variant}`}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 10,
                    gap: 12,
                    flexWrap: 'wrap',
                }}
            >
                <div>
                    <span className="result-progress-label">{label}</span>
                    <span className="result-progress-kicker">channel track</span>
                </div>

                <span
                    className={`result-progress-value result-progress-value-${variant}`}
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
        <SectionCard
            title="Sentiment Overview"
            kicker="Channel Matrix"
            icon={<LineChartOutlined />}
            iconTone="hot"
            className="result-section-tone-hot"
        >
            <Space orientation="vertical" size={18} style={{width: '100%'}}>
                <Text className="ui-copy-muted" style={{marginBottom: 0}}>
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
