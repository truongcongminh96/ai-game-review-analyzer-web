import {motion} from 'framer-motion';
import HeroGameShowcase from "./HeroGameShowcase.tsx";
import {ApiOutlined, RobotOutlined, ReadOutlined} from '@ant-design/icons';
import {MotionStagger} from '../motion/Reveal';
import {hoverLiftTransition, revealVariant} from '../../motion/animations';

function AppHero() {
    const heroHeadline = 'Turn raw player reviews into actionable game insight';

    return (
        <section
            className="glass-card hud-shell hud-angled-shell app-hero-card"
            style={{
                borderRadius: 28,
                overflow: 'hidden',
                background:
                    'radial-gradient(circle at top right, rgba(255,90,54,0.14), transparent 26%), radial-gradient(circle at 0 100%, rgba(94,231,255,0.10), transparent 28%), linear-gradient(180deg, rgba(8,11,18,0.92), rgba(13,18,29,0.82))',
            }}
        >
            <HeroGameShowcase
                mode="background"
                overlay={
                    <MotionStagger staggerChildren={0.08}>
                        <div className="app-hero-copy">
                            <motion.div variants={revealVariant(0, 20, 8)}>
                                <div style={{display: 'flex', flexWrap: 'wrap', gap: 10}}>
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
                                </div>
                            </motion.div>

                            <motion.div variants={revealVariant(0, 20, 8)}>
                                <div className="ui-title-row">
                                    <span className="ui-icon-badge ui-icon-badge-ember">
                                        <RobotOutlined />
                                    </span>
                                    <div className="ui-title-stack">
                                        <span className="ui-kicker">AI Review Ops</span>
                                        <h1
                                            className="ui-title-tight"
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
                                        </h1>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div variants={revealVariant(0, 18, 8)}>
                                <p
                                    className="ui-copy-muted"
                                    style={{
                                        fontSize: 16,
                                        color: '#d9e4ef',
                                        margin: 0,
                                        maxWidth: 720,
                                    }}
                                >
                                    Analyze Steam feedback to spot sentiment, praised systems,
                                    recurring complaints, and AI summaries in a dashboard built for
                                    demos, portfolios, and product reviews.
                                </p>
                            </motion.div>

                            <motion.div variants={revealVariant(0, 18, 8)}>
                                <div style={{display: 'flex', flexWrap: 'wrap', gap: 12}}>
                                    <motion.div
                                        whileHover={{y: -2, scale: 1.02}}
                                        transition={hoverLiftTransition}
                                    >
                                        <div
                                            className="hud-chip"
                                            style={{
                                                padding: '10px 14px',
                                                borderRadius: 14,
                                                background: 'rgba(94, 231, 255, 0.12)',
                                                border: '1px solid rgba(94, 231, 255, 0.28)',
                                            }}
                                        >
                                            <span style={{color: '#d6f9ff'}}>Sentiment detection</span>
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
                                                background: 'rgba(255, 90, 54, 0.12)',
                                                border: '1px solid rgba(255, 90, 54, 0.26)',
                                            }}
                                        >
                                            <span style={{color: '#ffd7c9'}}>Praise & complaint mining</span>
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
                                                background: 'rgba(255, 122, 24, 0.12)',
                                                border: '1px solid rgba(255, 122, 24, 0.24)',
                                            }}
                                        >
                                            <span style={{color: '#fed7aa'}}>Insight-ready report</span>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </MotionStagger>
                }
            />
        </section>
    );
}

export default AppHero;
