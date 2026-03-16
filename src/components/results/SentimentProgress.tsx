import {Space, Typography} from 'antd';
import type {SentimentBreakdown} from '../../types/analyze';
import SectionCard from '../common/SectionCard';

type SentimentProgressProps = {
    sentiment: SentimentBreakdown;
};

function SentimentProgress({sentiment}: SentimentProgressProps) {
    const {Text} = Typography;
    const items = [
        {label: 'Positive', value: sentiment.positive, className: 'positive'},
        {label: 'Neutral', value: sentiment.neutral, className: 'neutral'},
        {label: 'Negative', value: sentiment.negative, className: 'negative'},
    ];

    return (
        <SectionCard title="Sentiment Overview">
            <Space orientation="vertical" size={14} style={{width: '100%'}}>
                {items.map((item) => (
                    <div key={item.label}>
                        <Text strong>{item.label}</Text>
                        <div className="progress-bar">
                            <div
                                className={`progress-fill ${item.className}`}
                                style={{width: `${item.value}%`}}
                            />
                        </div>
                    </div>
                ))}
            </Space>
        </SectionCard>
    );
}

export default SentimentProgress;
