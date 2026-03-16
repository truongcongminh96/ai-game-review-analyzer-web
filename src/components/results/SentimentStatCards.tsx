import {Card, Col, Row, Statistic} from 'antd';
import type {SentimentBreakdown} from '../../types/analyze';

type SentimentStatCardsProps = {
    sentiment: SentimentBreakdown;
};

function SentimentStatCards({sentiment}: SentimentStatCardsProps) {
    const cards = [
        {label: 'Positive', value: sentiment.positive},
        {label: 'Neutral', value: sentiment.neutral},
        {label: 'Negative', value: sentiment.negative},
    ];

    return (
        <Row gutter={[16, 16]}>
            {cards.map((card) => (
                <Col key={card.label} xs={24} md={8}>
                    <Card>
                        <Statistic title={card.label} value={card.value} suffix="%" />
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default SentimentStatCards;
