import {Card, Col, Row, Space, Typography} from 'antd';
import HeroGameShowcase from "./HeroGameShowcase.tsx";
import {ApiOutlined, RobotOutlined, ReadOutlined} from '@ant-design/icons';

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
                body: {padding: 32}
            }}
        >
            <Row gutter={[32, 32]} align="middle">
                <Col xs={24} lg={14}>
                    <Space orientation="vertical" size={14} style={{width: '100%'}}>
                        <Space wrap size={[10, 10]}>
                            <div className="hero-pill hero-pill-steam">
                                <ReadOutlined/>
                                <span>Steam Reviews</span>
                            </div>

                            <div className="hero-pill hero-pill-ai">
                                <RobotOutlined/>
                                <span>AI Insights</span>
                            </div>

                            <div className="hero-pill hero-pill-api">
                                <ApiOutlined/>
                                <span>Mock + API Ready</span>
                            </div>
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
                    <HeroGameShowcase/>
                </Col>
            </Row>
        </Card>
    );
}

export default AppHero;
