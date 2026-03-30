import {Button, Card, Col, Progress, Row, Space, Tag, Typography} from 'antd';
import {useState} from 'react';
import {motion} from 'framer-motion';
import {MotionReveal} from '../components/motion/Reveal';
import HudOverlay from '../components/motion/HudOverlay';
import {
    learningCourses,
    portfolioProjects,
    researchTracks,
    type LearningCourse,
    type PortfolioProject,
    type ResearchTrack,
} from '../data/learningJourney';
import {hoverLiftTransition} from '../motion/animations';

const {Paragraph, Text, Title} = Typography;

type CourseCardProps = {
    course: LearningCourse;
    notesOpen: boolean;
    onToggleNotes: () => void;
};

type ResearchWorkspaceProps = {
    tracks: ResearchTrack[];
    activeTrackId: string;
    summaryOpen: boolean;
    onSelectTrack: (trackId: string) => void;
    onToggleSummary: () => void;
};

type ProjectCardProps = {
    project: PortfolioProject;
};

const storyFlowSteps = ['Problem', 'Research', 'Idea', 'Build', 'Test', 'Impact'];

const journeyCardBackground =
    'radial-gradient(circle at top left, rgba(255,90,54,0.14), transparent 24%), radial-gradient(circle at bottom right, rgba(94,231,255,0.10), transparent 28%), linear-gradient(135deg, rgba(7,11,19,0.96), rgba(13,19,31,0.92))';
const journeyPanelBackground =
    'linear-gradient(180deg, rgba(8,12,19,0.94), rgba(14,20,31,0.86))';
const journeyPanelSoft = 'rgba(255,255,255,0.03)';
const journeyPanelStronger = 'rgba(5,7,13,0.54)';
const journeyBorder = '1px solid rgba(255,255,255,0.08)';
const journeySubtleBorder = '1px solid rgba(255,255,255,0.10)';
const journeyText = '#f8fafc';
const journeyTextBody = '#dbe3ef';
const journeyTextMuted = '#9fb0c2';
const journeyTextDim = '#7f92ab';
const accentEmber = '#ff5a36';
const accentHot = '#ff7a18';
const accentCyan = '#5ee7ff';
const accentEmberSoft = 'rgba(255,90,54,0.12)';
const accentCyanSoft = 'rgba(94,231,255,0.10)';
const accentHotSoft = 'rgba(255,122,24,0.12)';

function CourseCard({course, notesOpen, onToggleNotes}: CourseCardProps) {
    const keyTools = Array.from(new Set(course.toolGroups.flatMap((group) => group.tools))).slice(
        0,
        4
    );

    return (
        <Card
            className="hud-shell hud-angled-shell"
            style={{
                borderRadius: 32,
                background: journeyCardBackground,
                border: journeyBorder,
                boxShadow: '0 32px 80px rgba(0,0,0,0.34)',
                overflow: 'hidden',
            }}
            styles={{
                body: {padding: 32},
            }}
        >
            <HudOverlay reticlePosition="bottom-left" scanDelay={0.35} />
            <Space orientation="vertical" size={28} style={{width: '100%'}}>
                <Row gutter={[28, 28]} align="stretch">
                    <Col xs={24} lg={15}>
                        <Space orientation="vertical" size={22} style={{width: '100%'}}>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: 16,
                                    flexWrap: 'wrap',
                                }}
                            >
                                <div>
                                    <div
                                        className="hud-chip"
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: 10,
                                            padding: '12px 14px',
                                            borderRadius: 20,
                                            background: accentEmberSoft,
                                            border: '1px solid rgba(255,90,54,0.18)',
                                            boxShadow: '0 12px 24px rgba(255,90,54,0.14)',
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: 12,
                                                height: 12,
                                                borderRadius: 999,
                                                background: accentEmber,
                                                boxShadow: '0 0 18px rgba(255,90,54,0.32)',
                                            }}
                                        />
                                        <div
                                            style={{
                                                color: '#ffd7c9',
                                                fontSize: 18,
                                                fontWeight: 800,
                                                lineHeight: 1,
                                                letterSpacing: '-0.04em',
                                            }}
                                        >
                                            {course.providerMark}
                                        </div>
                                    </div>

                                    <div
                                        style={{
                                            marginTop: 14,
                                            color: '#fdba74',
                                            fontSize: 12,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.18em',
                                            fontWeight: 800,
                                        }}
                                    >
                                        {course.status}
                                    </div>

                                    <div
                                        style={{
                                            marginTop: 8,
                                            color: journeyTextBody,
                                            fontSize: 15,
                                            fontWeight: 600,
                                        }}
                                    >
                                        {course.partner}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3
                                    style={{
                                        margin: 0,
                                        color: journeyText,
                                        fontSize: 44,
                                        lineHeight: 1.08,
                                        letterSpacing: '-0.05em',
                                        maxWidth: 760,
                                    }}
                                >
                                    {course.title}
                                </h3>

                                <p
                                    style={{
                                        margin: '18px 0 0',
                                        color: journeyTextBody,
                                        fontSize: 17,
                                        lineHeight: 1.85,
                                        maxWidth: 760,
                                    }}
                                >
                                    {course.summary}
                                </p>

                                <div
                                    style={{
                                        marginTop: 16,
                                        color: journeyTextMuted,
                                        fontSize: 14,
                                        fontWeight: 600,
                                        lineHeight: 1.7,
                                    }}
                                >
                                    {course.credential}
                                </div>
                            </div>

                            <Space orientation="vertical" size={12} style={{width: '100%'}}>
                                {course.highlights.map((highlight) => (
                                    <div
                                        className="hud-panel"
                                        key={highlight}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: 12,
                                            padding: '14px 16px',
                                            borderRadius: 18,
                                            background: journeyPanelSoft,
                                            border: journeySubtleBorder,
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: 10,
                                                height: 10,
                                                borderRadius: 999,
                                                marginTop: 8,
                                                background: accentEmber,
                                                boxShadow: '0 0 16px rgba(255,90,54,0.24)',
                                                flexShrink: 0,
                                            }}
                                        />
                                        <div
                                            style={{
                                                color: journeyTextBody,
                                                fontSize: 15,
                                                lineHeight: 1.8,
                                                fontWeight: 600,
                                            }}
                                        >
                                            {highlight}
                                        </div>
                                    </div>
                                ))}
                            </Space>

                            <Space wrap size={[10, 10]}>
                                {course.tags.map((tag) => (
                                    <Tag
                                        className="hud-chip"
                                        key={tag}
                                        style={{
                                            margin: 0,
                                            borderRadius: 999,
                                            padding: '7px 14px',
                                            border: '1px solid rgba(255,90,54,0.20)',
                                            background: accentEmberSoft,
                                            color: '#ffd7c9',
                                            fontWeight: 700,
                                            fontSize: 14,
                                        }}
                                    >
                                        {tag}
                                    </Tag>
                                ))}
                            </Space>

                            <Space wrap size={[12, 12]}>
                                <Button
                                    type="primary"
                                    size="large"
                                    onClick={onToggleNotes}
                                    style={{
                                        height: 56,
                                        borderRadius: 18,
                                        paddingInline: 28,
                                        background:
                                            'linear-gradient(135deg, rgba(255,90,54,1), rgba(255,122,24,0.94) 58%, rgba(94,231,255,0.78))',
                                        border: '1px solid rgba(255,90,54,0.28)',
                                        fontWeight: 700,
                                        fontSize: 18,
                                        letterSpacing: '0.04em',
                                        textTransform: 'uppercase',
                                        boxShadow:
                                            '0 18px 34px rgba(255,90,54,0.28), inset 0 1px 0 rgba(255,255,255,0.14)',
                                    }}
                                >
                                    {notesOpen ? 'Hide Notes' : 'Review Notes'}
                                </Button>

                                <div
                                    className="hud-panel"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 10,
                                        padding: '12px 16px',
                                        borderRadius: 18,
                                        background: journeyPanelStronger,
                                        border: journeySubtleBorder,
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 10,
                                            height: 10,
                                            borderRadius: 999,
                                            background: accentCyan,
                                            boxShadow: '0 0 14px rgba(94,231,255,0.26)',
                                        }}
                                    />
                                    <div
                                        style={{
                                            color: journeyTextBody,
                                            fontSize: 14,
                                            fontWeight: 700,
                                        }}
                                    >
                                        Near completion and portfolio-ready
                                    </div>
                                </div>
                            </Space>
                        </Space>
                    </Col>

                    <Col xs={24} lg={9}>
                        <Space orientation="vertical" size={16} style={{width: '100%'}}>
                            <div
                                className="hud-panel"
                                style={{
                                    borderRadius: 26,
                                    padding: 24,
                                    background:
                                        'linear-gradient(180deg, rgba(10,14,22,0.96), rgba(16,22,34,0.94))',
                                    border: journeyBorder,
                                    boxShadow: '0 20px 44px rgba(0,0,0,0.26)',
                                }}
                            >
                                <div
                                    style={{
                                        color: journeyTextMuted,
                                        fontSize: 12,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.18em',
                                        fontWeight: 700,
                                    }}
                                >
                                    Course snapshot
                                </div>

                                <div
                                    style={{
                                        marginTop: 12,
                                        color: '#f8fafc',
                                        fontSize: 54,
                                        fontWeight: 800,
                                        lineHeight: 1,
                                        letterSpacing: '-0.05em',
                                    }}
                                >
                                    {course.progress}%
                                </div>

                                <div
                                    style={{
                                        marginTop: 6,
                                        color: accentCyan,
                                        fontSize: 14,
                                        fontWeight: 700,
                                    }}
                                >
                                    Completion progress
                                </div>

                                <div style={{marginTop: 18}}>
                                    <Progress
                                        percent={course.progress}
                                        showInfo={false}
                                        strokeColor={accentEmber}
                                        railColor="rgba(148,163,184,0.16)"
                                        size={{height: 10}}
                                        style={{marginBottom: 0}}
                                    />
                                </div>

                                <div
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                                        gap: 12,
                                        marginTop: 20,
                                    }}
                                >
                                    {[
                                        {label: 'Duration', value: course.duration},
                                        {label: 'Scope', value: course.modules},
                                    ].map((item) => (
                                        <div
                                            className="hud-stat-card"
                                            key={item.label}
                                            style={{
                                                padding: '14px 14px',
                                                borderRadius: 18,
                                                background: 'rgba(255,255,255,0.04)',
                                                border: journeySubtleBorder,
                                            }}
                                        >
                                            <div
                                                style={{
                                                    color: journeyTextMuted,
                                                    fontSize: 11,
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.14em',
                                                    marginBottom: 6,
                                                }}
                                            >
                                                {item.label}
                                            </div>
                                            <div
                                                style={{
                                                    color: '#f8fafc',
                                                    fontSize: 18,
                                                    fontWeight: 700,
                                                    lineHeight: 1.3,
                                                }}
                                            >
                                                {item.value}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div
                                className="hud-panel"
                                style={{
                                    borderRadius: 26,
                                    padding: 22,
                                    background: journeyPanelBackground,
                                    border: journeyBorder,
                                    boxShadow: '0 16px 36px rgba(0,0,0,0.20)',
                                }}
                            >
                                <div
                                    style={{
                                        color: journeyText,
                                        fontSize: 13,
                                        fontWeight: 800,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.16em',
                                        marginBottom: 14,
                                    }}
                                >
                                    Key tools
                                </div>

                                <Space wrap size={[10, 10]} style={{width: '100%'}}>
                                    {keyTools.map((tool) => (
                                        <div
                                            className="hud-chip"
                                            key={tool}
                                            style={{
                                                padding: '10px 12px',
                                                borderRadius: 14,
                                                background: 'rgba(255,255,255,0.04)',
                                                border: journeySubtleBorder,
                                                color: journeyTextBody,
                                                fontSize: 14,
                                                fontWeight: 700,
                                            }}
                                        >
                                            {tool}
                                        </div>
                                    ))}
                                </Space>

                                <div
                                    style={{
                                        marginTop: 16,
                                        color: journeyTextMuted,
                                        lineHeight: 1.75,
                                        fontSize: 14,
                                    }}
                                >
                                    Detailed takeaways are tucked into <strong>Review Notes</strong>{' '}
                                    to keep this card compact.
                                </div>
                            </div>
                        </Space>
                    </Col>
                </Row>

                {notesOpen ? (
                    <div
                        className="hud-shell hud-angled-panel"
                        style={{
                            padding: '24px 24px',
                            borderRadius: 26,
                            background:
                                'linear-gradient(180deg, rgba(10,14,22,0.96), rgba(16,22,34,0.94))',
                            border: journeyBorder,
                            boxShadow: '0 22px 48px rgba(0,0,0,0.26)',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: 16,
                                flexWrap: 'wrap',
                                marginBottom: 18,
                            }}
                        >
                            <div>
                                <div
                                    style={{
                                        color: '#f8fafc',
                                        fontSize: 22,
                                        fontWeight: 800,
                                        letterSpacing: '-0.03em',
                                    }}
                                >
                                    Study Notes
                                </div>
                                <div
                                    style={{
                                        marginTop: 6,
                                        color: '#94a3b8',
                                        fontSize: 14,
                                    }}
                                >
                                    The main ideas I want to remember and reuse in future product work.
                                </div>
                            </div>

                            <div
                                style={{
                                    padding: '8px 12px',
                                    borderRadius: 999,
                                    background: accentEmberSoft,
                                    border: '1px solid rgba(255,90,54,0.18)',
                                    color: '#ffd7c9',
                                    fontSize: 13,
                                    fontWeight: 700,
                                }}
                            >
                                {course.takeaways.length} note blocks
                            </div>
                        </div>

                        <Row gutter={[14, 14]}>
                            {course.takeaways.map((takeaway, index) => (
                                <Col xs={24} md={12} xl={8} key={takeaway}>
                                    <div
                                        className="hud-panel"
                                        style={{
                                            height: '100%',
                                            padding: '18px 18px',
                                            borderRadius: 20,
                                            background: 'rgba(255,255,255,0.04)',
                                            border: journeySubtleBorder,
                                        }}
                                    >
                                        <div
                                            style={{
                                                color: accentHot,
                                                fontSize: 12,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.16em',
                                                fontWeight: 800,
                                                marginBottom: 10,
                                            }}
                                        >
                                            Note 0{index + 1}
                                        </div>
                                        <div
                                            style={{
                                                color: '#f8fafc',
                                                fontSize: 17,
                                                lineHeight: 1.7,
                                                fontWeight: 600,
                                            }}
                                        >
                                            {takeaway}
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>
                ) : null}
            </Space>
        </Card>
    );
}

function ResearchWorkspace({
    tracks,
    activeTrackId,
    summaryOpen,
    onSelectTrack,
    onToggleSummary,
}: ResearchWorkspaceProps) {
    const activeTrack = tracks.find((track) => track.id === activeTrackId) ?? tracks[0];

    if (!activeTrack) {
        return null;
    }

    const viewPdfEnabled = Boolean(activeTrack.pdfPath);
    const keySectionsSectionId = `${activeTrack.id}-key-sections`;
    const impactSectionId = `${activeTrack.id}-impact`;

    const jumpToSection = (sectionId: string, openSummaryFirst = false) => {
        if (typeof document === 'undefined') {
            return;
        }

        if (openSummaryFirst && !summaryOpen) {
            onToggleSummary();
            window.setTimeout(() => {
                document
                    .getElementById(sectionId)
                    ?.scrollIntoView({behavior: 'smooth', block: 'start'});
            }, 0);
            return;
        }

        document.getElementById(sectionId)?.scrollIntoView({behavior: 'smooth', block: 'start'});
    };

    const memoryFrameItems = [
        {label: 'Problem', value: activeTrack.problem, color: accentEmber},
        {label: 'Solution', value: activeTrack.solution, color: accentCyan},
        {label: 'Impact', value: activeTrack.impact, color: accentHot, id: impactSectionId},
    ];

    return (
        <Space orientation="vertical" size={18} style={{width: '100%'}}>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: 12,
                }}
            >
                {tracks.map((track) => {
                    const active = track.id === activeTrack.id;

                    return (
                        <motion.button
                            className="hud-step-card hud-angled-panel"
                            key={track.id}
                            type="button"
                            onClick={() => onSelectTrack(track.id)}
                            aria-pressed={active}
                            whileHover={{
                                y: -3,
                                scale: 1.01,
                                boxShadow: active
                                    ? '0 24px 48px rgba(255,90,54,0.18)'
                                    : '0 18px 36px rgba(0,0,0,0.22)',
                            }}
                            whileTap={{scale: 0.985}}
                            transition={hoverLiftTransition}
                            style={{
                                textAlign: 'left',
                                padding: '18px 18px',
                                borderRadius: 22,
                                cursor: 'pointer',
                                appearance: 'none',
                                background: active
                                    ? 'linear-gradient(135deg, rgba(255,90,54,0.24), rgba(255,122,24,0.18), rgba(94,231,255,0.12))'
                                    : journeyPanelBackground,
                                border: active
                                    ? '1px solid rgba(255,90,54,0.24)'
                                    : journeyBorder,
                                boxShadow: active
                                    ? '0 18px 42px rgba(255,90,54,0.16)'
                                    : '0 14px 32px rgba(0,0,0,0.18)',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            <div
                                style={{
                                    color: active ? '#ffd7c9' : journeyTextMuted,
                                    fontSize: 11,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.16em',
                                    fontWeight: 800,
                                    marginBottom: 8,
                                }}
                            >
                                Research tab
                            </div>
                            <div
                                style={{
                                    color: '#f8fafc',
                                    fontSize: 20,
                                    fontWeight: 800,
                                    lineHeight: 1.25,
                                    marginBottom: 8,
                                }}
                            >
                                {track.title}
                            </div>
                            <div
                                style={{
                                    color: '#cbd5e1',
                                    fontSize: 14,
                                    lineHeight: 1.7,
                                }}
                            >
                                {track.summary}
                            </div>
                        </motion.button>
                    );
                })}
            </div>

            <Card
                className="hud-shell hud-angled-shell"
                style={{
                    borderRadius: 28,
                    background:
                        'radial-gradient(circle at top right, rgba(94,231,255,0.10), transparent 24%), radial-gradient(circle at top left, rgba(255,90,54,0.12), transparent 22%), linear-gradient(180deg, rgba(8,12,19,0.94), rgba(15,22,33,0.98))',
                    border: journeyBorder,
                    boxShadow: '0 24px 64px rgba(0,0,0,0.30)',
                }}
                styles={{
                    body: {padding: 26},
                }}
            >
                <HudOverlay scanDelay={0.65} />
                <Row gutter={[20, 20]}>
                    <Col xs={24} xl={14}>
                        <Space orientation="vertical" size={18} style={{width: '100%'}}>
                            <div>
                                <div
                                    style={{
                                        color: accentCyan,
                                        fontSize: 12,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.16em',
                                        fontWeight: 800,
                                        marginBottom: 10,
                                    }}
                                >
                                    Active research
                                </div>
                                <Title level={3} style={{margin: 0, color: '#f8fafc'}}>
                                    {activeTrack.title}
                                </Title>
                                <Paragraph
                                    style={{
                                        margin: '12px 0 0',
                                        color: '#cbd5e1',
                                        fontSize: 15,
                                        lineHeight: 1.85,
                                    }}
                                >
                                    {activeTrack.summary}
                                </Paragraph>
                            </div>

                            <Space wrap size={[10, 10]}>
                                {activeTrack.tags.map((tag) => (
                                    <Tag
                                        className="hud-chip"
                                        key={tag}
                                        style={{
                                            margin: 0,
                                            borderRadius: 999,
                                            padding: '6px 12px',
                                            border: '1px solid rgba(255,90,54,0.18)',
                                            background: accentEmberSoft,
                                            color: '#ffd7c9',
                                            fontWeight: 700,
                                        }}
                                    >
                                        {tag}
                                    </Tag>
                                ))}
                            </Space>

                            <div
                                className="hud-panel"
                                id={keySectionsSectionId}
                                style={{
                                    padding: '18px 18px',
                                    borderRadius: 22,
                                    background: journeyPanelStronger,
                                    border: journeySubtleBorder,
                                }}
                            >
                                <div
                                    style={{
                                        color: '#f8fafc',
                                        fontSize: 13,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.16em',
                                        fontWeight: 800,
                                        marginBottom: 12,
                                    }}
                                >
                                    Key sections
                                </div>
                                <Space wrap size={[10, 10]}>
                                    {activeTrack.keySections.map((section) => (
                                        <div
                                            className="hud-chip"
                                            key={section}
                                            style={{
                                                padding: '8px 12px',
                                                borderRadius: 14,
                                                background: 'rgba(255,255,255,0.04)',
                                                border: journeySubtleBorder,
                                                color: journeyTextBody,
                                                fontSize: 13,
                                                fontWeight: 700,
                                            }}
                                        >
                                            {section}
                                        </div>
                                    ))}
                                </Space>
                            </div>

                            <Space size={10} wrap>
                                <Button
                                    type="primary"
                                    size="large"
                                    href={activeTrack.pdfPath}
                                    target="_blank"
                                    disabled={!viewPdfEnabled}
                                    style={{
                                        borderRadius: 16,
                                        height: 46,
                                        paddingInline: 18,
                                        background:
                                            'linear-gradient(135deg, rgba(255,90,54,0.98), rgba(255,122,24,0.94) 58%, rgba(94,231,255,0.74))',
                                        border: '1px solid rgba(255,90,54,0.24)',
                                        fontWeight: 700,
                                        letterSpacing: '0.04em',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    View PDF
                                </Button>

                                <Button
                                    size="large"
                                    onClick={onToggleSummary}
                                    style={{
                                        borderRadius: 16,
                                        height: 46,
                                        paddingInline: 18,
                                        background: journeyPanelStronger,
                                        border: journeyBorder,
                                        color: '#f8fafc',
                                        fontWeight: 700,
                                    }}
                                >
                                    {summaryOpen ? 'Hide Summary' : 'Quick Summary'}
                                </Button>
                            </Space>

                            {summaryOpen ? (
                                <div
                                    className="hud-panel"
                                    style={{
                                        padding: '18px 20px',
                                        borderRadius: 22,
                                        background: journeyPanelBackground,
                                        border: journeyBorder,
                                    }}
                                >
                                    <Text
                                        style={{
                                            display: 'block',
                                            marginBottom: 14,
                                            color: '#f8fafc',
                                            fontSize: 13,
                                            fontWeight: 700,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.14em',
                                        }}
                                    >
                                        10-second memory frame
                                    </Text>

                                    <Space orientation="vertical" size={12} style={{width: '100%'}}>
                                        {memoryFrameItems.map((item) => (
                                            <div
                                                className="hud-panel"
                                                key={item.label}
                                                id={item.id}
                                                style={{
                                                    padding: '12px 14px',
                                                    borderRadius: 16,
                                                    background: journeyPanelStronger,
                                                    border: journeySubtleBorder,
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        display: 'block',
                                                        marginBottom: 6,
                                                        color: item.color,
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    {item.label}
                                                </Text>
                                                <Text style={{color: '#e2e8f0', lineHeight: 1.7}}>
                                                    {item.value}
                                                </Text>
                                            </div>
                                        ))}
                                    </Space>
                                </div>
                            ) : null}

                            {activeTrack.cautionPoints ? (
                                <div
                                    className="hud-panel"
                                    style={{
                                        padding: '18px 20px',
                                        borderRadius: 22,
                                        background:
                                            'linear-gradient(180deg, rgba(255,90,54,0.16), rgba(10,14,22,0.52))',
                                        border: '1px solid rgba(255,90,54,0.18)',
                                    }}
                                >
                                    <div
                                        style={{
                                            color: '#ffd7c9',
                                            fontSize: 13,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.14em',
                                            fontWeight: 800,
                                            marginBottom: 12,
                                        }}
                                    >
                                        {activeTrack.cautionTitle}
                                    </div>
                                    <Space orientation="vertical" size={10} style={{width: '100%'}}>
                                        {activeTrack.cautionPoints.map((point) => (
                                            <div
                                                className="hud-panel"
                                                key={point}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'flex-start',
                                                    gap: 12,
                                                    padding: '12px 14px',
                                                    borderRadius: 16,
                                                    background: 'rgba(255,255,255,0.04)',
                                                    border: '1px solid rgba(255,90,54,0.10)',
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: 8,
                                                        height: 8,
                                                        borderRadius: 999,
                                                        marginTop: 8,
                                                        background: accentEmber,
                                                        flexShrink: 0,
                                                    }}
                                                />
                                                <div
                                                    style={{
                                                        color: '#ffe2d8',
                                                        lineHeight: 1.75,
                                                    }}
                                                >
                                                    {point}
                                                </div>
                                            </div>
                                        ))}
                                    </Space>
                                </div>
                            ) : null}

                            {activeTrack.goToMarketRows ? (
                                <div
                                    className="hud-panel"
                                    style={{
                                        padding: '18px 20px',
                                        borderRadius: 22,
                                        background: journeyPanelBackground,
                                        border: journeyBorder,
                                    }}
                                >
                                    <div
                                        style={{
                                            color: '#f8fafc',
                                            fontSize: 13,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.14em',
                                            fontWeight: 800,
                                            marginBottom: 14,
                                        }}
                                    >
                                        Go-to-market clarity
                                    </div>

                                    <div
                                        style={{
                                            overflow: 'hidden',
                                            borderRadius: 18,
                                            border: journeySubtleBorder,
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: 'grid',
                                                gridTemplateColumns: '1fr 1fr',
                                                background: 'rgba(255,255,255,0.04)',
                                            }}
                                        >
                                            {['Segment', 'Who pays'].map((header) => (
                                                <div
                                                    key={header}
                                                    style={{
                                                        padding: '12px 14px',
                                                        color: accentCyan,
                                                        fontSize: 12,
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.12em',
                                                        fontWeight: 800,
                                                    }}
                                                >
                                                    {header}
                                                </div>
                                            ))}
                                        </div>

                                        {activeTrack.goToMarketRows.map((row) => (
                                            <div
                                                key={`${row.segment}-${row.whoPays}`}
                                                style={{
                                                    display: 'grid',
                                                    gridTemplateColumns: '1fr 1fr',
                                                    borderTop: journeySubtleBorder,
                                                    background: journeyPanelStronger,
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        padding: '14px 14px',
                                                        color: '#f8fafc',
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    {row.segment}
                                                </div>
                                                <div
                                                    style={{
                                                        padding: '14px 14px',
                                                        color: '#cbd5e1',
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    {row.whoPays}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : null}

                            {activeTrack.surprises ? (
                                <div
                                    className="hud-panel"
                                    style={{
                                        padding: '18px 20px',
                                        borderRadius: 22,
                                        background:
                                            'linear-gradient(180deg, rgba(94,231,255,0.12), rgba(10,14,22,0.42))',
                                        border: '1px solid rgba(94,231,255,0.16)',
                                    }}
                                >
                                    <div
                                        style={{
                                            color: '#d6f9ff',
                                            fontSize: 13,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.14em',
                                            fontWeight: 800,
                                            marginBottom: 12,
                                        }}
                                    >
                                        What surprised us
                                    </div>
                                    <Space orientation="vertical" size={10} style={{width: '100%'}}>
                                        {activeTrack.surprises.map((surprise) => (
                                            <div
                                                className="hud-panel"
                                                key={surprise}
                                                style={{
                                                    padding: '12px 14px',
                                                    borderRadius: 16,
                                                    background: 'rgba(255,255,255,0.04)',
                                                    border: '1px solid rgba(94,231,255,0.10)',
                                                    color: '#e6fbff',
                                                    lineHeight: 1.75,
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {surprise}
                                            </div>
                                        ))}
                                    </Space>
                                </div>
                            ) : null}

                            {activeTrack.tradeOffs ? (
                                <div
                                    className="hud-panel"
                                    style={{
                                        padding: '18px 20px',
                                        borderRadius: 22,
                                        background:
                                            'linear-gradient(180deg, rgba(255,122,24,0.14), rgba(10,14,22,0.42))',
                                        border: '1px solid rgba(255,122,24,0.16)',
                                    }}
                                >
                                    <div
                                        style={{
                                            color: '#fed7aa',
                                            fontSize: 13,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.14em',
                                            fontWeight: 800,
                                            marginBottom: 12,
                                        }}
                                    >
                                        System trade-offs
                                    </div>
                                    <Space orientation="vertical" size={12} style={{width: '100%'}}>
                                        {activeTrack.tradeOffs.map((item) => (
                                            <div
                                                className="hud-panel"
                                                key={item.option}
                                                style={{
                                                    padding: '14px 14px',
                                                    borderRadius: 16,
                                                    background: 'rgba(255,255,255,0.04)',
                                                    border: '1px solid rgba(255,122,24,0.10)',
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        color: accentHot,
                                                        fontWeight: 800,
                                                        marginBottom: 6,
                                                    }}
                                                >
                                                    {item.option}
                                                </div>
                                                <div
                                                    style={{
                                                        color: '#ffe7c2',
                                                        lineHeight: 1.75,
                                                    }}
                                                >
                                                    {item.tradeoff}
                                                </div>
                                            </div>
                                        ))}
                                    </Space>
                                </div>
                            ) : null}
                        </Space>
                    </Col>

                    <Col xs={24} xl={10}>
                        <Space orientation="vertical" size={16} style={{width: '100%'}}>
                            <div
                                className="hud-panel"
                                style={{
                                    borderRadius: 24,
                                    padding: 18,
                                    background: journeyPanelBackground,
                                    border: journeyBorder,
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        gap: 12,
                                        marginBottom: 12,
                                        flexWrap: 'wrap',
                                    }}
                                >
                                    <div>
                                        <div
                                            style={{
                                                color: '#f8fafc',
                                                fontSize: 16,
                                                fontWeight: 800,
                                            }}
                                        >
                                            Inline PDF preview
                                        </div>
                                        <div
                                            style={{
                                                marginTop: 4,
                                                color: journeyTextMuted,
                                                fontSize: 13,
                                            }}
                                        >
                                            Faster skim without leaving the page.
                                        </div>
                                    </div>

                                    {viewPdfEnabled ? (
                                        <div
                                            className="hud-chip"
                                            style={{
                                                padding: '8px 12px',
                                                borderRadius: 999,
                                                background: accentCyanSoft,
                                                border: '1px solid rgba(94,231,255,0.16)',
                                                color: '#d6f9ff',
                                                fontSize: 12,
                                                fontWeight: 700,
                                            }}
                                        >
                                            Preview ready
                                        </div>
                                    ) : null}
                                </div>

                                <div
                                    className="hud-panel"
                                    style={{
                                        marginBottom: 14,
                                        padding: '14px 14px',
                                        borderRadius: 18,
                                        background: journeyPanelStronger,
                                        border: journeySubtleBorder,
                                    }}
                                >
                                    <div
                                        style={{
                                            color: '#f8fafc',
                                            fontSize: 12,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.14em',
                                            fontWeight: 800,
                                            marginBottom: 12,
                                        }}
                                    >
                                        Focus first
                                    </div>

                                    <Space wrap size={[8, 8]} style={{marginBottom: 12}}>
                                        {memoryFrameItems.map((item) => (
                                            <button
                                                className="hud-chip"
                                                key={item.label}
                                                type="button"
                                                onClick={() =>
                                                    jumpToSection(item.id ?? impactSectionId, true)
                                                }
                                                style={{
                                                    appearance: 'none',
                                                    borderRadius: 999,
                                                    padding: '8px 12px',
                                                    border: `1px solid ${item.color}33`,
                                                    background: `${item.color}14`,
                                                    color: item.color,
                                                    fontWeight: 800,
                                                    letterSpacing: '0.06em',
                                                    textTransform: 'uppercase',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                {item.label}
                                            </button>
                                        ))}
                                    </Space>

                                    <Space wrap size={[10, 10]}>
                                        <Button
                                            size="middle"
                                            onClick={() => jumpToSection(keySectionsSectionId)}
                                            style={{
                                                borderRadius: 14,
                                                background: journeyPanelBackground,
                                                border: journeyBorder,
                                                color: '#f8fafc',
                                                fontWeight: 700,
                                            }}
                                        >
                                            Go to insights
                                        </Button>
                                        <Button
                                            size="middle"
                                            onClick={() => jumpToSection(impactSectionId, true)}
                                            style={{
                                                borderRadius: 14,
                                                background: journeyPanelBackground,
                                                border: journeyBorder,
                                                color: '#f8fafc',
                                                fontWeight: 700,
                                            }}
                                        >
                                            Go to ROI
                                        </Button>
                                    </Space>
                                </div>

                                {viewPdfEnabled ? (
                                    <iframe
                                        title={`${activeTrack.title} preview`}
                                        src={activeTrack.pdfPath}
                                        style={{
                                            width: '100%',
                                            height: 520,
                                            border: 'none',
                                            borderRadius: 18,
                                            background: '#ffffff',
                                        }}
                                    />
                                ) : (
                                    <div
                                        style={{
                                            padding: '26px 18px',
                                            borderRadius: 18,
                                            background: journeyPanelStronger,
                                            border: journeySubtleBorder,
                                            color: journeyTextMuted,
                                            lineHeight: 1.8,
                                        }}
                                    >
                                        PDF preview will appear here once the file is linked.
                                    </div>
                                )}
                            </div>

                            <div
                                className="hud-panel"
                                style={{
                                    borderRadius: 24,
                                    padding: 18,
                                    background: journeyPanelBackground,
                                    border: journeyBorder,
                                }}
                            >
                                <div
                                    style={{
                                        color: '#f8fafc',
                                        fontSize: 13,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.14em',
                                        fontWeight: 800,
                                        marginBottom: 12,
                                    }}
                                >
                                    Highlight key sections
                                </div>
                                <Space orientation="vertical" size={10} style={{width: '100%'}}>
                                    {activeTrack.keySections.map((section, index) => (
                                        <div
                                            className="hud-panel"
                                            key={section}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 12,
                                                padding: '10px 12px',
                                                borderRadius: 16,
                                                background: journeyPanelStronger,
                                                border: journeySubtleBorder,
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: 28,
                                                    height: 28,
                                                    borderRadius: 999,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    background: accentCyanSoft,
                                                    color: accentCyan,
                                                    fontWeight: 800,
                                                    flexShrink: 0,
                                                }}
                                            >
                                                {index + 1}
                                            </div>
                                            <div
                                                style={{
                                                    color: '#e2e8f0',
                                                    fontWeight: 600,
                                                    lineHeight: 1.6,
                                                }}
                                            >
                                                {section}
                                            </div>
                                        </div>
                                    ))}
                                </Space>
                            </div>
                        </Space>
                    </Col>
                </Row>
            </Card>
        </Space>
    );
}

function ProjectCard({project}: ProjectCardProps) {
    const [showEngineeringDetails, setShowEngineeringDetails] = useState(false);
    const scenarioAccentColors = [accentEmber, accentCyan, accentHot, '#fdba74', '#fca5a5'];

    return (
        <motion.div
            whileHover={{y: -4, scale: 1.003}}
            transition={hoverLiftTransition}
        >
            <Card
                className="hud-shell hud-angled-shell"
                style={{
                    borderRadius: 28,
                    background:
                        'radial-gradient(circle at top right, rgba(255,90,54,0.14), transparent 26%), radial-gradient(circle at bottom left, rgba(94,231,255,0.10), transparent 26%), linear-gradient(135deg, rgba(8,12,19,0.94), rgba(15,22,33,0.96))',
                    border: journeyBorder,
                    boxShadow: '0 24px 64px rgba(0,0,0,0.32)',
                }}
                styles={{
                    body: {padding: 28},
                }}
            >
                <HudOverlay scanDelay={0.9} />
                <Row gutter={[24, 24]}>
                    <Col xs={24} lg={14}>
                        <Space orientation="vertical" size={16} style={{width: '100%'}}>
                            <Tag
                                className="hud-chip"
                                style={{
                                    width: 'fit-content',
                                    margin: 0,
                                    borderRadius: 999,
                                    padding: '6px 12px',
                                    border: '1px solid rgba(255,90,54,0.20)',
                                    background: accentEmberSoft,
                                    color: '#ffd7c9',
                                    fontWeight: 600,
                                }}
                            >
                                Applied knowledge
                            </Tag>

                            <Title
                                level={2}
                                style={{
                                    margin: 0,
                                    color: '#f8fafc',
                                }}
                            >
                                {project.title}
                            </Title>

                            <Paragraph
                                style={{
                                    margin: 0,
                                    color: '#cbd5e1',
                                    fontSize: 16,
                                    lineHeight: 1.85,
                                }}
                            >
                                {project.summary}
                            </Paragraph>

                            <Space wrap size={[10, 10]}>
                                {project.tech.map((tech) => (
                                    <Tag
                                        className="hud-chip"
                                        key={tech}
                                        style={{
                                            margin: 0,
                                            borderRadius: 999,
                                            padding: '6px 12px',
                                            border: '1px solid rgba(94,231,255,0.18)',
                                            background: accentCyanSoft,
                                            color: '#d6f9ff',
                                            fontWeight: 600,
                                        }}
                                    >
                                        {tech}
                                    </Tag>
                                ))}
                            </Space>

                            <div
                                className="hud-panel"
                                style={{
                                    padding: '18px 18px',
                                    borderRadius: 20,
                                    background: journeyPanelSoft,
                                    border: journeySubtleBorder,
                                }}
                            >
                                <Text
                                    style={{
                                        display: 'block',
                                        color: '#94a3b8',
                                        fontSize: 12,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.14em',
                                        marginBottom: 12,
                                    }}
                                >
                                    I built this because
                                </Text>

                                <Row gutter={[12, 12]}>
                                    {project.whyBuilt.map((item) => (
                                        <Col xs={24} md={8} key={item.title}>
                                            <div
                                                className="hud-panel"
                                                style={{
                                                    height: '100%',
                                                    padding: '14px 14px',
                                                    borderRadius: 18,
                                                    background: journeyPanelStronger,
                                                    border: journeySubtleBorder,
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        display: 'block',
                                                        color: accentCyan,
                                                        fontWeight: 800,
                                                        marginBottom: 8,
                                                    }}
                                                >
                                                    {item.title}
                                                </Text>
                                                <Text style={{color: '#e2e8f0', lineHeight: 1.75}}>
                                                    {item.detail}
                                                </Text>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        </Space>
                    </Col>

                    <Col xs={24} lg={10}>
                        <div
                            className="hud-panel hud-angled-panel"
                            style={{
                                height: '100%',
                                padding: 22,
                                borderRadius: 24,
                                background: journeyPanelBackground,
                                border: journeyBorder,
                            }}
                        >
                            <Text
                                style={{
                                    display: 'block',
                                    color: '#94a3b8',
                                    fontSize: 12,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.14em',
                                    marginBottom: 8,
                                }}
                            >
                                Impact
                            </Text>

                            <Text
                                style={{
                                    display: 'block',
                                    color: '#f8fafc',
                                    fontSize: 34,
                                    fontWeight: 700,
                                    lineHeight: 1.1,
                                    marginBottom: 18,
                                }}
                            >
                                {project.impact}
                            </Text>

                            <Text
                                style={{
                                    display: 'block',
                                    color: '#94a3b8',
                                    fontSize: 12,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.14em',
                                    marginBottom: 10,
                                }}
                            >
                                What I learned
                            </Text>

                            <Space orientation="vertical" size={12} style={{width: '100%'}}>
                                {project.learnings.map((learning) => (
                                    <div
                                        key={learning}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: 12,
                                            padding: '12px 14px',
                                            borderRadius: 16,
                                            background: journeyPanelStronger,
                                            border: journeySubtleBorder,
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: 999,
                                                marginTop: 8,
                                                background: accentHot,
                                                flexShrink: 0,
                                            }}
                                        />
                                        <Text style={{color: '#e2e8f0', lineHeight: 1.7}}>
                                            {learning}
                                        </Text>
                                    </div>
                                ))}
                            </Space>
                        </div>
                    </Col>
                </Row>

            <div
                className="hud-panel"
                style={{
                    marginTop: 20,
                    padding: '20px 20px',
                    borderRadius: 22,
                    background:
                        'linear-gradient(135deg, rgba(10,14,22,0.92), rgba(16,22,34,0.88))',
                    border: journeyBorder,
                }}
            >
                <Text
                    style={{
                        display: 'block',
                        color: '#94a3b8',
                        fontSize: 12,
                        textTransform: 'uppercase',
                        letterSpacing: '0.14em',
                        marginBottom: 8,
                    }}
                >
                    Real-world usage scenario
                </Text>

                <Text
                    style={{
                        display: 'block',
                        color: '#cbd5e1',
                        lineHeight: 1.75,
                        marginBottom: 16,
                    }}
                >
                    A recruiter or PM should be able to scan this left to right and understand how
                    the product moves from noisy player feedback to a concrete fix and measurable
                    outcome.
                </Text>

                <div
                    style={{
                        overflowX: 'auto',
                        paddingBottom: 6,
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'stretch',
                            minWidth: 'max-content',
                        }}
                    >
                        {project.usageScenario.map((step, index) => {
                            const accentColor =
                                scenarioAccentColors[index % scenarioAccentColors.length];

                            return (
                                <motion.div
                                    key={`${step.label}-${step.detail}`}
                                    className="hud-step-card"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexShrink: 0,
                                    }}
                                    whileHover={{y: -4, scale: 1.015}}
                                    transition={hoverLiftTransition}
                                >
                                    <div
                                        className="hud-step-card"
                                        style={{
                                            width: 224,
                                            minWidth: 224,
                                            padding: '16px 16px',
                                            borderRadius: 20,
                                            background:
                                                'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(5,7,13,0.34))',
                                            border: `1px solid ${accentColor}22`,
                                            boxShadow: `0 16px 34px ${accentColor}12`,
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                gap: 12,
                                                marginBottom: 14,
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: 8,
                                                    padding: '6px 10px',
                                                    borderRadius: 999,
                                                    background: `${accentColor}16`,
                                                    border: `1px solid ${accentColor}28`,
                                                    color: accentColor,
                                                    fontWeight: 800,
                                                    fontSize: 12,
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.10em',
                                                }}
                                            >
                                                {step.label}
                                            </div>
                                            <div
                                                style={{
                                                    color: '#94a3b8',
                                                    fontSize: 11,
                                                    fontWeight: 800,
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.14em',
                                                }}
                                            >
                                                Step 0{index + 1}
                                            </div>
                                        </div>
                                        <Text
                                            style={{
                                                display: 'block',
                                                color: '#f8fafc',
                                                lineHeight: 1.8,
                                                fontWeight: 600,
                                            }}
                                        >
                                            {step.detail}
                                        </Text>
                                    </div>

                                    {index < project.usageScenario.length - 1 ? (
                                        <div
                                            aria-hidden="true"
                                            style={{
                                                width: 60,
                                                minWidth: 60,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: 28,
                                                    height: 2,
                                                    borderRadius: 999,
                                                    background: 'rgba(148,163,184,0.44)',
                                                }}
                                            />
                                            <div
                                                style={{
                                                    width: 0,
                                                    height: 0,
                                                    marginLeft: 4,
                                                    borderTop: '6px solid transparent',
                                                    borderBottom: '6px solid transparent',
                                                    borderLeft: `8px solid ${accentColor}`,
                                                }}
                                            />
                                        </div>
                                    ) : null}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div
                className="hud-panel"
                style={{
                    marginTop: 20,
                    padding: '20px 20px',
                    borderRadius: 22,
                    background:
                        'linear-gradient(180deg, rgba(255,122,24,0.18), rgba(10,14,22,0.54))',
                    border: '1px solid rgba(255,122,24,0.18)',
                }}
            >
                <Text
                    style={{
                        display: 'block',
                        color: '#fed7aa',
                        fontSize: 12,
                        textTransform: 'uppercase',
                        letterSpacing: '0.14em',
                        fontWeight: 800,
                        marginBottom: 14,
                    }}
                >
                    Known limitations
                </Text>

                <Row gutter={[12, 12]}>
                    {project.limitations.map((limitation) => (
                        <Col xs={24} md={12} key={limitation}>
                            <div
                                className="hud-panel"
                                style={{
                                    height: '100%',
                                    padding: '14px 14px',
                                    borderRadius: 18,
                                    background: 'rgba(255,255,255,0.04)',
                                    border: '1px solid rgba(255,122,24,0.10)',
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#fef3c7',
                                        lineHeight: 1.75,
                                        fontWeight: 600,
                                    }}
                                >
                                    {limitation}
                                </Text>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>

            <div
                style={{
                    marginTop: 20,
                }}
            >
                <Button
                    size="large"
                    onClick={() => setShowEngineeringDetails((current) => !current)}
                    style={{
                        borderRadius: 16,
                        height: 48,
                        paddingInline: 20,
                        background: journeyPanelBackground,
                        border: journeyBorder,
                        color: '#f8fafc',
                        fontWeight: 700,
                    }}
                >
                    {showEngineeringDetails
                        ? 'Hide engineering details'
                        : 'Show engineering details'}
                </Button>
            </div>

            {showEngineeringDetails ? (
                <div
                    className="hud-panel"
                    style={{
                        marginTop: 16,
                        padding: '20px 20px',
                        borderRadius: 22,
                        background:
                            'linear-gradient(180deg, rgba(8,12,19,0.96), rgba(15,22,33,0.98))',
                        border: journeyBorder,
                    }}
                >
                    <Text
                        style={{
                            display: 'block',
                            color: '#f8fafc',
                            fontSize: 12,
                            textTransform: 'uppercase',
                            letterSpacing: '0.14em',
                            marginBottom: 14,
                        }}
                    >
                        Engineering details
                    </Text>

                    <Row gutter={[14, 14]}>
                        {project.engineeringDetails.map((detail) => (
                            <Col xs={24} md={12} xl={8} key={detail.title}>
                                <div
                                    className="hud-panel"
                                    style={{
                                        height: '100%',
                                        padding: '16px 16px',
                                        borderRadius: 18,
                                        background: 'rgba(255,255,255,0.03)',
                                        border: journeySubtleBorder,
                                    }}
                                >
                                    <Text
                                        style={{
                                            display: 'block',
                                            color: accentCyan,
                                            fontWeight: 800,
                                            marginBottom: 8,
                                        }}
                                    >
                                        {detail.title}
                                    </Text>
                                    <Text style={{color: '#e2e8f0', lineHeight: 1.8}}>
                                        {detail.detail}
                                    </Text>
                                </div>
                            </Col>
                        ))}
                    </Row>

                    <div
                        className="hud-panel"
                        style={{
                            marginTop: 18,
                            padding: '18px 18px',
                            borderRadius: 20,
                            background:
                                'linear-gradient(180deg, rgba(255,90,54,0.14), rgba(5,7,13,0.28))',
                            border: '1px solid rgba(255,90,54,0.14)',
                        }}
                    >
                        <Text
                            style={{
                                display: 'block',
                                color: '#ffd7c9',
                                fontSize: 12,
                                textTransform: 'uppercase',
                                letterSpacing: '0.14em',
                                fontWeight: 800,
                                marginBottom: 14,
                            }}
                        >
                            Trade-offs
                        </Text>

                        <Row gutter={[12, 12]}>
                            {project.tradeOffs.map((item) => (
                                <Col xs={24} md={12} xl={8} key={item.option}>
                                    <div
                                        className="hud-panel"
                                        style={{
                                            height: '100%',
                                            padding: '14px 14px',
                                            borderRadius: 18,
                                            background: 'rgba(255,255,255,0.04)',
                                            border: '1px solid rgba(255,90,54,0.10)',
                                        }}
                                    >
                                        <Text
                                            style={{
                                                display: 'block',
                                                color: accentEmber,
                                                fontWeight: 800,
                                                marginBottom: 8,
                                            }}
                                        >
                                            {item.option}
                                        </Text>
                                        <Text style={{color: '#ffe2d8', lineHeight: 1.8}}>
                                            {item.tradeoff}
                                        </Text>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div>
            ) : null}
            </Card>
        </motion.div>
    );
}

function LearningJourneyPage() {
    const [openCourseId, setOpenCourseId] = useState<string | null>(learningCourses[0]?.id ?? null);
    const [activeResearchId, setActiveResearchId] = useState<string>(researchTracks[0]?.id ?? '');
    const [researchSummaryOpen, setResearchSummaryOpen] = useState(true);

    return (
        <Space orientation="vertical" size={24} style={{width: '100%'}}>
            <MotionReveal y={20} blur={12}>
                <Card
                    className="hud-shell hud-angled-shell"
                    style={{
                        borderRadius: 28,
                        overflow: 'hidden',
                        background:
                            'radial-gradient(circle at top right, rgba(255,90,54,0.18), transparent 24%), radial-gradient(circle at 20% 20%, rgba(94,231,255,0.12), transparent 26%), linear-gradient(135deg, rgba(8,12,19,0.96), rgba(15,22,33,0.92))',
                        border: journeyBorder,
                        boxShadow: '0 28px 80px rgba(0,0,0,0.34)',
                    }}
                    styles={{
                        body: {padding: 28},
                    }}
                >
                    <HudOverlay scanDelay={0.15} />
                    <Row gutter={[24, 24]} align="middle">
                        <Col xs={24} lg={15}>
                            <Space orientation="vertical" size={16} style={{width: '100%'}}>
                                <Tag
                                    className="hud-chip"
                                    style={{
                                        width: 'fit-content',
                                        margin: 0,
                                        borderRadius: 999,
                                        padding: '6px 12px',
                                        border: '1px solid rgba(255,90,54,0.20)',
                                        background: accentEmberSoft,
                                        color: '#ffd7c9',
                                        fontWeight: 600,
                                    }}
                                >
                                    My AI Journey
                                </Tag>

                                <Title
                                    level={1}
                                    style={{
                                        margin: 0,
                                        color: '#f8fafc',
                                        lineHeight: 1.1,
                                        letterSpacing: '-0.04em',
                                    }}
                                >
                                    Turning raw player feedback into real product decisions using AI
                                </Title>

                                <Paragraph
                                    style={{
                                        margin: 0,
                                        color: '#cbd5e1',
                                        fontSize: 16,
                                        lineHeight: 1.9,
                                        maxWidth: 880,
                                    }}
                                >
                                    Courses, research, and applied AI work in one place so this reads as
                                    more than a demo. It shows the learning layer, the research layer,
                                    and the product layer behind how I think about AI engineering with a
                                    product mindset.
                                </Paragraph>

                                <Space wrap size={[10, 10]}>
                                    <Tag
                                        className="hud-chip"
                                        style={{
                                            margin: 0,
                                            borderRadius: 999,
                                            padding: '6px 12px',
                                            border: '1px solid rgba(94,231,255,0.18)',
                                            background: accentCyanSoft,
                                            color: '#d6f9ff',
                                        }}
                                    >
                                        AI Engineer
                                    </Tag>
                                    <Tag
                                        className="hud-chip"
                                        style={{
                                            margin: 0,
                                            borderRadius: 999,
                                            padding: '6px 12px',
                                            border: '1px solid rgba(255,122,24,0.18)',
                                            background: accentHotSoft,
                                            color: '#fed7aa',
                                        }}
                                    >
                                        Product Mindset
                                    </Tag>
                                    <Tag
                                        className="hud-chip"
                                        style={{
                                            margin: 0,
                                            borderRadius: 999,
                                            padding: '6px 12px',
                                            border: '1px solid rgba(255,90,54,0.18)',
                                            background: accentEmberSoft,
                                            color: '#ffd7c9',
                                        }}
                                    >
                                        Continuous Learning
                                    </Tag>
                                </Space>
                            </Space>
                        </Col>

                        <Col xs={24} lg={9}>
                            <div style={{display: 'grid', gap: 12}}>
                                {[
                                    {label: 'Courses', value: `${learningCourses.length}`},
                                    {label: 'Research PDFs', value: `${researchTracks.length}`},
                                    {
                                        label: 'Flagship impact',
                                        value: portfolioProjects[0]?.impact ?? 'N/A',
                                    },
                                ].map((item) => (
                                    <div
                                        className="hud-stat-card hud-angled-stat"
                                        key={item.label}
                                        style={{
                                            padding: '18px 18px',
                                            borderRadius: 20,
                                            background: journeyPanelBackground,
                                            border: journeyBorder,
                                            boxShadow: '0 16px 36px rgba(0,0,0,0.18)',
                                        }}
                                    >
                                        <Text
                                            style={{
                                                display: 'block',
                                                color: '#94a3b8',
                                                fontSize: 12,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.14em',
                                                marginBottom: 8,
                                            }}
                                        >
                                            {item.label}
                                        </Text>
                                        <Text
                                            style={{
                                                color: '#f8fafc',
                                                fontSize: item.label === 'Flagship impact' ? 24 : 36,
                                                fontWeight: 700,
                                                lineHeight: 1.1,
                                            }}
                                        >
                                            {item.value}
                                        </Text>
                                    </div>
                                ))}
                            </div>
                        </Col>
                    </Row>
                </Card>
            </MotionReveal>

            <MotionReveal delay={0.04} y={18} blur={8}>
                <div>
                    <div className="hud-divider">
                        <Text
                            style={{
                                display: 'block',
                                color: accentEmber,
                                fontSize: 12,
                                fontWeight: 700,
                                letterSpacing: '0.16em',
                                textTransform: 'uppercase',
                                marginBottom: 8,
                            }}
                        >
                            1. Courses
                        </Text>
                        <Title level={2} style={{margin: 0, color: '#f8fafc'}}>
                            Learning that feeds product judgment
                        </Title>
                    </div>
                </div>
            </MotionReveal>

            <Row gutter={[16, 16]}>
                {learningCourses.map((course) => (
                    <Col xs={24} key={course.id}>
                        <MotionReveal delay={0.08} y={24} blur={10}>
                            <CourseCard
                                course={course}
                                notesOpen={openCourseId === course.id}
                                onToggleNotes={() =>
                                    setOpenCourseId((current) =>
                                        current === course.id ? null : course.id
                                    )
                                }
                            />
                        </MotionReveal>
                    </Col>
                ))}
            </Row>

            <MotionReveal delay={0.04} y={18} blur={8}>
                <div>
                    <div className="hud-divider">
                        <Text
                            style={{
                                display: 'block',
                                color: accentCyan,
                                fontSize: 12,
                                fontWeight: 700,
                                letterSpacing: '0.16em',
                                textTransform: 'uppercase',
                                marginBottom: 8,
                            }}
                        >
                            2. Research
                        </Text>
                        <Title level={2} style={{margin: 0, color: '#f8fafc'}}>
                            Deep knowledge compressed for fast recall
                        </Title>
                        <Paragraph
                            style={{
                                margin: '8px 0 0',
                                color: journeyTextMuted,
                                fontSize: 15,
                                lineHeight: 1.8,
                                maxWidth: 900,
                            }}
                        >
                            Each report card has a short summary and a quick memory frame so I or a
                            reader can open it for 10 seconds and remember the problem, solution, and
                            impact.
                        </Paragraph>
                    </div>
                </div>
            </MotionReveal>

            <MotionReveal delay={0.08} y={22} blur={10}>
                <div
                    className="hud-panel hud-angled-panel"
                    style={{
                        padding: '18px 18px',
                        borderRadius: 24,
                        background:
                            'linear-gradient(135deg, rgba(10,14,22,0.92), rgba(16,22,34,0.84))',
                        border: journeyBorder,
                        boxShadow: '0 18px 42px rgba(0,0,0,0.24)',
                    }}
                >
                    <HudOverlay reticlePosition="bottom-left" scanDelay={1.2} />
                    <Text
                        style={{
                            display: 'block',
                            color: accentCyan,
                            fontSize: 12,
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '0.16em',
                            marginBottom: 12,
                        }}
                    >
                        Story flow
                    </Text>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                            gap: 10,
                        }}
                    >
                        {storyFlowSteps.map((step, index) => (
                            <motion.div
                                key={step}
                                className="hud-step-card hud-angled-panel"
                                style={{
                                    padding: '14px 14px',
                                    borderRadius: 18,
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(148,163,184,0.10)',
                                }}
                                whileHover={{y: -2, scale: 1.02}}
                                transition={hoverLiftTransition}
                            >
                                <div
                                    style={{
                                        color: journeyTextDim,
                                        fontSize: 11,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.14em',
                                        marginBottom: 8,
                                        fontWeight: 800,
                                    }}
                                >
                                    Step 0{index + 1}
                                </div>
                                <div
                                    style={{
                                        color: '#f8fafc',
                                        fontSize: 18,
                                        fontWeight: 700,
                                    }}
                                >
                                    {step}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </MotionReveal>

            <MotionReveal delay={0.1} y={24} blur={10}>
                <ResearchWorkspace
                    tracks={researchTracks}
                    activeTrackId={activeResearchId}
                    summaryOpen={researchSummaryOpen}
                    onSelectTrack={(trackId) => {
                        setActiveResearchId(trackId);
                        setResearchSummaryOpen(true);
                    }}
                    onToggleSummary={() => setResearchSummaryOpen((current) => !current)}
                />
            </MotionReveal>

            <MotionReveal delay={0.04} y={18} blur={8}>
                <div>
                    <div className="hud-divider">
                        <Text
                            style={{
                                display: 'block',
                                color: accentHot,
                                fontSize: 12,
                                fontWeight: 700,
                                letterSpacing: '0.16em',
                                textTransform: 'uppercase',
                                marginBottom: 8,
                            }}
                        >
                            3. Projects
                        </Text>
                        <Title level={2} style={{margin: 0, color: '#f8fafc'}}>
                            Applied knowledge in a real shipped artifact
                        </Title>
                    </div>
                </div>
            </MotionReveal>

            <Space orientation="vertical" size={16} style={{width: '100%'}}>
                {portfolioProjects.map((project) => (
                    <MotionReveal key={project.id} delay={0.08} y={24} blur={10}>
                        <ProjectCard project={project} />
                    </MotionReveal>
                ))}
            </Space>
        </Space>
    );
}

export default LearningJourneyPage;
