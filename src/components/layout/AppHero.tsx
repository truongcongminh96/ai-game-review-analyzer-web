import {Card, Col, Row, Space, Tag, Typography} from 'antd';
import heroImage from '../../assets/hero.png';

function AppHero() {
    const {Paragraph, Title, Text} = Typography;

    return (
        <Card
            className="glass-card"
            style={{
                borderRadius: 28,
                overflow: 'hidden',
            }}
            styles={{
                body: { padding: 32 }
            }}
        >
            <Row gutter={[32, 32]} align="middle">
                <Col xs={24} lg={14}>
                    <Space orientation="vertical" size={14}>
                        <Space wrap size={[8, 8]}>
                            <Tag color="blue">Steam Reviews</Tag>
                            <Tag color="purple">AI Insights</Tag>
                            <Tag color="cyan">Mock + API Ready</Tag>
                        </Space>

                        <Title
                            level={1}
                            style={{
                                margin: 0,
                                color: '#f8fafc',
                                fontSize: 'clamp(2rem, 4vw, 3.4rem)',
                                lineHeight: 1.1,
                            }}
                        >
                            Turn raw player reviews into actionable game insight
                        </Title>

                        <Paragraph
                            style={{
                                fontSize: 16,
                                color: '#cbd5e1',
                                marginBottom: 0,
                                maxWidth: 640,
                            }}
                        >
                            Analyze Steam feedback to detect sentiment, praised gameplay
                            systems, recurring complaints, and AI-generated summaries in a
                            clean dashboard built for demos, portfolios, and product reviews.
                        </Paragraph>

                        <Space wrap size={[12, 12]}>
                            <div
                                style={{
                                    padding: '10px 14px',
                                    borderRadius: 14,
                                    background: 'rgba(59, 130, 246, 0.12)',
                                    border: '1px solid rgba(96, 165, 250, 0.22)',
                                }}
                            >
                                <Text style={{color: '#dbeafe'}}>Sentiment detection</Text>
                            </div>

                            <div
                                style={{
                                    padding: '10px 14px',
                                    borderRadius: 14,
                                    background: 'rgba(168, 85, 247, 0.12)',
                                    border: '1px solid rgba(192, 132, 252, 0.22)',
                                }}
                            >
                                <Text style={{color: '#f3e8ff'}}>Praise & complaint mining</Text>
                            </div>

                            <div
                                style={{
                                    padding: '10px 14px',
                                    borderRadius: 14,
                                    background: 'rgba(34, 211, 238, 0.12)',
                                    border: '1px solid rgba(103, 232, 249, 0.22)',
                                }}
                            >
                                <Text style={{color: '#cffafe'}}>Insight-ready report</Text>
                            </div>
                        </Space>
                    </Space>
                </Col>

                <Col xs={24} lg={10}>
                    <div
                        style={{
                            position: 'relative',
                            padding: 16,
                            borderRadius: 24,
                            background:
                                'linear-gradient(180deg, rgba(15,23,42,0.75), rgba(30,41,59,0.65))',
                            border: '1px solid rgba(148,163,184,0.14)',
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                inset: -1,
                                borderRadius: 24,
                                background:
                                    'linear-gradient(135deg, rgba(59,130,246,0.18), rgba(168,85,247,0.16), transparent)',
                                zIndex: 0,
                            }}
                        />
                        <img
                            src={heroImage}
                            alt="Game review dashboard illustration"
                            style={{
                                position: 'relative',
                                zIndex: 1,
                                display: 'block',
                                width: '100%',
                                maxWidth: 360,
                                margin: '0 auto',
                                filter: 'drop-shadow(0 18px 40px rgba(0,0,0,0.3))',
                            }}
                        />
                    </div>
                </Col>
            </Row>
        </Card>
    );
}

export default AppHero;
