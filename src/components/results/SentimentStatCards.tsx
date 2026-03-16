import {Card, Col, Row, Typography} from 'antd';

type SentimentStatCardsProps = {
    sentiment: {
        positive: number;
        neutral: number;
        negative: number;
    };
};

type StatCardProps = {
    label: string;
    value: number;
    color: string;
    background: string;
    border: string;
};

function StatCard({label, value, color, background, border}: StatCardProps) {
    const {Text, Title} = Typography;

    return (
        <Card
            style={{
                borderRadius: 20,
                background,
                border,
                boxShadow: '0 12px 30px rgba(0,0,0,0.18)',
            }}
            styles={{
                body: {padding: 20}
            }}
        >
            <Text style={{color: '#94a3b8'}}>{label}</Text>
            <Title level={2} style={{margin: '8px 0 0', color}}>
                {value}%
            </Title>
        </Card>
    );
}

function SentimentStatCards({sentiment}: SentimentStatCardsProps) {
    const {positive, neutral, negative} = sentiment;

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
                <StatCard
                    label="Positive"
                    value={positive}
                    color="#86efac"
                    background="rgba(34,197,94,0.10)"
                    border="1px solid rgba(34,197,94,0.18)"
                />
            </Col>

            <Col xs={24} md={8}>
                <StatCard
                    label="Neutral"
                    value={neutral}
                    color="#fcd34d"
                    background="rgba(245,158,11,0.10)"
                    border="1px solid rgba(245,158,11,0.18)"
                />
            </Col>

            <Col xs={24} md={8}>
                <StatCard
                    label="Negative"
                    value={negative}
                    color="#fda4af"
                    background="rgba(239,68,68,0.10)"
                    border="1px solid rgba(239,68,68,0.18)"
                />
            </Col>
        </Row>
    );
}

export default SentimentStatCards;
