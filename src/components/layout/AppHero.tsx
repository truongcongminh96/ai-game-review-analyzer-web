import {Card, Col, Row, Space, Typography} from 'antd';
import {motion} from 'framer-motion';
import HeroGameShowcase from "./HeroGameShowcase.tsx";
import {ApiOutlined, RobotOutlined, ReadOutlined} from '@ant-design/icons';
import HudOverlay from '../motion/HudOverlay';
import {MotionReveal, MotionStagger} from '../motion/Reveal';
import {hoverLiftTransition, revealVariant} from '../../motion/animations';

function AppHero() {
    const {Paragraph, Title, Text} = Typography;
    const heroHeadline = 'Turn raw player reviews into actionable game insight';

    return (
        <Card
            className="glass-card hud-shell hud-angled-shell app-hero-card"
            style={{
                borderRadius: 28,
                overflow: 'hidden',
                background:
                    'radial-gradient(circle at top right, rgba(255,90,54,0.14), transparent 26%), radial-gradient(circle at 0 100%, rgba(94,231,255,0.10), transparent 28%), linear-gradient(180deg, rgba(8,11,18,0.92), rgba(13,18,29,0.82))',
            }}
            styles={{
                body: {padding: 32}
            }}
        >
            <HudOverlay scanDelay={0.2} />
            <Row gutter={[32, 32]} align="middle">
                <Col xs={24} lg={14}>
                    <MotionStagger staggerChildren={0.08}>
                        <Space orientation="vertical" size={14} style={{width: '100%'}}>
                            <motion.div variants={revealVariant(0, 20, 8)}>
                                <Space wrap size={[10, 10]}>
                                    <motion.div
                                        whileHover={{y: -2, scale: 1.02}}
                                        transition={hoverLiftTransition}
                                    >
                                        <div className="hero-pill hero-pill-steam">
                                            <ReadOutlined/>
                                            <span>Steam Reviews</span>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        whileHover={{y: -2, scale: 1.02}}
                                        transition={hoverLiftTransition}
                                    >
                                        <div className="hero-pill hero-pill-ai">
                                            <RobotOutlined/>
                                            <span>AI Insights</span>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        whileHover={{y: -2, scale: 1.02}}
                                        transition={hoverLiftTransition}
                                    >
                                        <div className="hero-pill hero-pill-api">
                                            <ApiOutlined/>
                                            <span>Mock + API Ready</span>
                                        </div>
                                    </motion.div>
                                </Space>
                            </motion.div>

                            <motion.div variants={revealVariant(0, 20, 8)}>
                                <div className="ui-title-row">
                                    <span className="ui-icon-badge ui-icon-badge-ember">
                                        <RobotOutlined />
                                    </span>
                                    <div className="ui-title-stack">
                                        <span className="ui-kicker">AI Review Ops</span>
                                        <Title
                                            className="ui-title-tight"
                                            level={1}
                                            style={{
                                                margin: 0,
                                                color: '#f8fafc',
                                                fontSize: 'clamp(2rem, 4vw, 3.4rem)',
                                                fontFamily: 'var(--font-display)',
                                                fontWeight: 800,
                                                letterSpacing: '0.015em',
                                                lineHeight: 1.1,
                                            }}
                                        >
                                            <span className="hero-glitch-text" data-text={heroHeadline}>
                                                {heroHeadline}
                                            </span>
                                        </Title>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div variants={revealVariant(0, 18, 8)}>
                                <Paragraph
                                    className="ui-copy-muted"
                                    style={{
                                        fontSize: 16,
                                        color: '#cbd5e1',
                                        marginBottom: 0,
                                        maxWidth: 640,
                                    }}
                                >
                                    Analyze Steam feedback to spot sentiment, praised systems,
                                    recurring complaints, and AI summaries in a dashboard built for
                                    demos, portfolios, and product reviews.
                                </Paragraph>
                            </motion.div>

                            <motion.div variants={revealVariant(0, 18, 8)}>
                                <Space wrap size={[12, 12]}>
                                    <motion.div
                                        whileHover={{y: -2, scale: 1.02}}
                                        transition={hoverLiftTransition}
                                    >
                                        <div
                                            className="hud-chip"
                                            style={{
                                                padding: '10px 14px',
                                                borderRadius: 14,
                                                background: 'rgba(94, 231, 255, 0.10)',
                                                border: '1px solid rgba(94, 231, 255, 0.24)',
                                            }}
                                        >
                                            <Text style={{color: '#d6f9ff'}}>Sentiment detection</Text>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        whileHover={{y: -2, scale: 1.02}}
                                        transition={hoverLiftTransition}
                                    >
                                        <div
                                            className="hud-chip"
                                            style={{
                                                padding: '10px 14px',
                                                borderRadius: 14,
                                                background: 'rgba(255, 90, 54, 0.10)',
                                                border: '1px solid rgba(255, 90, 54, 0.22)',
                                            }}
                                        >
                                            <Text style={{color: '#ffd7c9'}}>Praise & complaint mining</Text>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        whileHover={{y: -2, scale: 1.02}}
                                        transition={hoverLiftTransition}
                                    >
                                        <div
                                            className="hud-chip"
                                            style={{
                                                padding: '10px 14px',
                                                borderRadius: 14,
                                                background: 'rgba(255, 122, 24, 0.10)',
                                                border: '1px solid rgba(255, 122, 24, 0.22)',
                                            }}
                                        >
                                            <Text style={{color: '#fed7aa'}}>Insight-ready report</Text>
                                        </div>
                                    </motion.div>
                                </Space>
                            </motion.div>
                        </Space>
                    </MotionStagger>
                </Col>

                <Col xs={24} lg={10}>
                    <MotionReveal delay={0.16} y={24} blur={12}>
                        <HeroGameShowcase/>
                    </MotionReveal>
                </Col>
            </Row>
        </Card>
    );
}

export default AppHero;
