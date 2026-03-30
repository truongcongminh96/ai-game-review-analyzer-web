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
    className: string;
    descriptor: string;
};

function StatCard({label, value, color, background, border, className, descriptor}: StatCardProps) {
    const {Text, Title} = Typography;

    return (
        <Card
            className={`hud-stat-card hud-angled-stat result-stat-card ${className}`}
            style={{
                borderRadius: 24,
                background,
                border,
                boxShadow: '0 18px 40px rgba(0,0,0,0.18)',
            }}
            styles={{
                body: {padding: 22}
            }}
        >
            <Text className="result-stat-kicker">Signal ratio</Text>

            <div className="result-stat-head">
                <Text className="result-stat-label">{label}</Text>
                <div className="result-stat-pill">{descriptor}</div>
            </div>

            <Title className="result-stat-value" level={2} style={{margin: 0, color}}>
                {value}%
            </Title>

            <Text className="result-stat-footnote">of the sampled Steam review set</Text>
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
                    color="#d9e3b4"
                    background="linear-gradient(180deg, rgba(54,68,34,0.78), rgba(16,24,20,0.92))"
                    border="1px solid rgba(153,176,112,0.18)"
                    className="result-stat-card-positive"
                    descriptor="Field praise"
                />
            </Col>

            <Col xs={24} md={8}>
                <StatCard
                    label="Neutral"
                    value={neutral}
                    color="#e2c88e"
                    background="linear-gradient(180deg, rgba(72,54,26,0.78), rgba(20,18,15,0.92))"
                    border="1px solid rgba(191,151,83,0.18)"
                    className="result-stat-card-neutral"
                    descriptor="Mixed chatter"
                />
            </Col>

            <Col xs={24} md={8}>
                <StatCard
                    label="Negative"
                    value={negative}
                    color="#e3b0a3"
                    background="linear-gradient(180deg, rgba(78,40,35,0.80), rgba(22,16,16,0.94))"
                    border="1px solid rgba(176,104,88,0.18)"
                    className="result-stat-card-negative"
                    descriptor="Threat flag"
                />
            </Col>
        </Row>
    );
}

export default SentimentStatCards;
