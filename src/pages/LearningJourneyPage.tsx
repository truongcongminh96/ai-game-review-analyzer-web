import {Button, Card, Col, Progress, Row, Space, Tag, Typography} from 'antd';
import {useState} from 'react';
import {
    learningCourses,
    portfolioProjects,
    researchTracks,
    type LearningCourse,
    type PortfolioProject,
    type ResearchTrack,
} from '../data/learningJourney';

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

function CourseCard({course, notesOpen, onToggleNotes}: CourseCardProps) {
    const keyTools = Array.from(new Set(course.toolGroups.flatMap((group) => group.tools))).slice(
        0,
        4
    );

    return (
        <Card
            style={{
                borderRadius: 32,
                background:
                    'radial-gradient(circle at top left, rgba(239,35,60,0.10), transparent 28%), radial-gradient(circle at bottom right, rgba(59,130,246,0.08), transparent 30%), linear-gradient(135deg, rgba(255,248,244,0.98), rgba(255,255,255,0.97))',
                border: '1px solid rgba(255,255,255,0.62)',
                boxShadow: '0 32px 80px rgba(15,23,42,0.22)',
                overflow: 'hidden',
            }}
            styles={{
                body: {padding: 32},
            }}
        >
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
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: 10,
                                            padding: '12px 14px',
                                            borderRadius: 20,
                                            background: 'rgba(255,255,255,0.58)',
                                            border: '1px solid rgba(239,35,60,0.10)',
                                            boxShadow: '0 12px 24px rgba(255,255,255,0.35)',
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: 12,
                                                height: 12,
                                                borderRadius: 999,
                                                background: '#ef233c',
                                                boxShadow: '0 0 18px rgba(239,35,60,0.28)',
                                            }}
                                        />
                                        <div
                                            style={{
                                                color: '#ef233c',
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
                                            color: '#64748b',
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
                                            color: '#334155',
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
                                        color: '#0f172a',
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
                                        color: '#334155',
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
                                        color: '#64748b',
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
                                        key={highlight}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: 12,
                                            padding: '14px 16px',
                                            borderRadius: 18,
                                            background: 'rgba(255,255,255,0.58)',
                                            border: '1px solid rgba(15,23,42,0.06)',
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: 10,
                                                height: 10,
                                                borderRadius: 999,
                                                marginTop: 8,
                                                background: '#f43f5e',
                                                boxShadow: '0 0 16px rgba(244,63,94,0.22)',
                                                flexShrink: 0,
                                            }}
                                        />
                                        <div
                                            style={{
                                                color: '#334155',
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
                                        key={tag}
                                        style={{
                                            margin: 0,
                                            borderRadius: 999,
                                            padding: '7px 14px',
                                            border: '1px solid rgba(239,35,60,0.16)',
                                            background: 'rgba(239,35,60,0.08)',
                                            color: '#be123c',
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
                                        background: 'linear-gradient(135deg, #ef233c, #f43f5e)',
                                        border: 'none',
                                        fontWeight: 700,
                                        fontSize: 18,
                                        boxShadow: '0 18px 38px rgba(239,35,60,0.26)',
                                    }}
                                >
                                    {notesOpen ? 'Hide Notes' : 'Review Notes'}
                                </Button>

                                <div
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 10,
                                        padding: '12px 16px',
                                        borderRadius: 18,
                                        background: 'rgba(15,23,42,0.05)',
                                        border: '1px solid rgba(15,23,42,0.08)',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 10,
                                            height: 10,
                                            borderRadius: 999,
                                            background: '#15803d',
                                        }}
                                    />
                                    <div
                                        style={{
                                            color: '#0f172a',
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
                                style={{
                                    borderRadius: 26,
                                    padding: 24,
                                    background:
                                        'linear-gradient(180deg, rgba(15,23,42,0.92), rgba(17,24,39,0.98))',
                                    border: '1px solid rgba(148,163,184,0.12)',
                                    boxShadow: '0 20px 44px rgba(15,23,42,0.22)',
                                }}
                            >
                                <div
                                    style={{
                                        color: '#94a3b8',
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
                                        color: '#86efac',
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
                                        strokeColor="#22c55e"
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
                                            key={item.label}
                                            style={{
                                                padding: '14px 14px',
                                                borderRadius: 18,
                                                background: 'rgba(255,255,255,0.03)',
                                                border: '1px solid rgba(148,163,184,0.10)',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    color: '#94a3b8',
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
                                style={{
                                    borderRadius: 26,
                                    padding: 22,
                                    background: 'rgba(255,255,255,0.62)',
                                    border: '1px solid rgba(15,23,42,0.08)',
                                    boxShadow: '0 16px 36px rgba(15,23,42,0.10)',
                                }}
                            >
                                <div
                                    style={{
                                        color: '#0f172a',
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
                                            key={tool}
                                            style={{
                                                padding: '10px 12px',
                                                borderRadius: 14,
                                                background: 'rgba(255,255,255,0.66)',
                                                border: '1px solid rgba(15,23,42,0.08)',
                                                color: '#334155',
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
                                        color: '#475569',
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
                        style={{
                            padding: '24px 24px',
                            borderRadius: 26,
                            background:
                                'linear-gradient(180deg, rgba(15,23,42,0.94), rgba(17,24,39,0.98))',
                            border: '1px solid rgba(148,163,184,0.12)',
                            boxShadow: '0 22px 48px rgba(15,23,42,0.20)',
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
                                    background: 'rgba(239,35,60,0.10)',
                                    border: '1px solid rgba(239,35,60,0.18)',
                                    color: '#fda4af',
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
                                        style={{
                                            height: '100%',
                                            padding: '18px 18px',
                                            borderRadius: 20,
                                            background: 'rgba(255,255,255,0.03)',
                                            border: '1px solid rgba(148,163,184,0.10)',
                                        }}
                                    >
                                        <div
                                            style={{
                                                color: '#f87171',
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
        {label: 'Problem', value: activeTrack.problem, color: '#fda4af'},
        {label: 'Solution', value: activeTrack.solution, color: '#93c5fd'},
        {label: 'Impact', value: activeTrack.impact, color: '#86efac', id: impactSectionId},
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
                        <button
                            key={track.id}
                            type="button"
                            onClick={() => onSelectTrack(track.id)}
                            aria-pressed={active}
                            style={{
                                textAlign: 'left',
                                padding: '18px 18px',
                                borderRadius: 22,
                                cursor: 'pointer',
                                appearance: 'none',
                                background: active
                                    ? 'linear-gradient(135deg, rgba(59,130,246,0.22), rgba(14,165,233,0.16))'
                                    : 'rgba(15,23,42,0.46)',
                                border: active
                                    ? '1px solid rgba(96,165,250,0.32)'
                                    : '1px solid rgba(148,163,184,0.12)',
                                boxShadow: active
                                    ? '0 18px 42px rgba(59,130,246,0.16)'
                                    : '0 14px 32px rgba(2,6,23,0.14)',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            <div
                                style={{
                                    color: active ? '#e0f2fe' : '#94a3b8',
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
                        </button>
                    );
                })}
            </div>

            <Card
                style={{
                    borderRadius: 28,
                    background:
                        'radial-gradient(circle at top right, rgba(96,165,250,0.14), transparent 24%), linear-gradient(180deg, rgba(15,23,42,0.90), rgba(17,24,39,0.98))',
                    border: '1px solid rgba(148,163,184,0.12)',
                    boxShadow: '0 24px 64px rgba(2,6,23,0.24)',
                }}
                styles={{
                    body: {padding: 26},
                }}
            >
                <Row gutter={[20, 20]}>
                    <Col xs={24} xl={14}>
                        <Space orientation="vertical" size={18} style={{width: '100%'}}>
                            <div>
                                <div
                                    style={{
                                        color: '#93c5fd',
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
                                        key={tag}
                                        style={{
                                            margin: 0,
                                            borderRadius: 999,
                                            padding: '6px 12px',
                                            border: '1px solid rgba(96,165,250,0.20)',
                                            background: 'rgba(96,165,250,0.10)',
                                            color: '#bfdbfe',
                                            fontWeight: 700,
                                        }}
                                    >
                                        {tag}
                                    </Tag>
                                ))}
                            </Space>

                            <div
                                id={keySectionsSectionId}
                                style={{
                                    padding: '18px 18px',
                                    borderRadius: 22,
                                    background: 'rgba(2,6,23,0.24)',
                                    border: '1px solid rgba(148,163,184,0.10)',
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
                                            key={section}
                                            style={{
                                                padding: '8px 12px',
                                                borderRadius: 14,
                                                background: 'rgba(255,255,255,0.04)',
                                                border: '1px solid rgba(148,163,184,0.10)',
                                                color: '#e2e8f0',
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
                                            'linear-gradient(135deg, rgba(59,130,246,0.92), rgba(14,165,233,0.92))',
                                        border: 'none',
                                        fontWeight: 700,
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
                                        background: 'rgba(15,23,42,0.52)',
                                        border: '1px solid rgba(148,163,184,0.14)',
                                        color: '#f8fafc',
                                        fontWeight: 700,
                                    }}
                                >
                                    {summaryOpen ? 'Hide Summary' : 'Quick Summary'}
                                </Button>
                            </Space>

                            {summaryOpen ? (
                                <div
                                    style={{
                                        padding: '18px 20px',
                                        borderRadius: 22,
                                        background: 'rgba(15,23,42,0.42)',
                                        border: '1px solid rgba(148,163,184,0.12)',
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
                                                key={item.label}
                                                id={item.id}
                                                style={{
                                                    padding: '12px 14px',
                                                    borderRadius: 16,
                                                    background: 'rgba(2,6,23,0.28)',
                                                    border: '1px solid rgba(148,163,184,0.08)',
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
                                    style={{
                                        padding: '18px 20px',
                                        borderRadius: 22,
                                        background:
                                            'linear-gradient(180deg, rgba(127,29,29,0.22), rgba(15,23,42,0.48))',
                                        border: '1px solid rgba(248,113,113,0.18)',
                                    }}
                                >
                                    <div
                                        style={{
                                            color: '#fecaca',
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
                                                key={point}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'flex-start',
                                                    gap: 12,
                                                    padding: '12px 14px',
                                                    borderRadius: 16,
                                                    background: 'rgba(255,255,255,0.04)',
                                                    border: '1px solid rgba(248,113,113,0.10)',
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: 8,
                                                        height: 8,
                                                        borderRadius: 999,
                                                        marginTop: 8,
                                                        background: '#f87171',
                                                        flexShrink: 0,
                                                    }}
                                                />
                                                <div
                                                    style={{
                                                        color: '#fee2e2',
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
                                    style={{
                                        padding: '18px 20px',
                                        borderRadius: 22,
                                        background: 'rgba(15,23,42,0.42)',
                                        border: '1px solid rgba(148,163,184,0.12)',
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
                                            border: '1px solid rgba(148,163,184,0.10)',
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
                                                        color: '#93c5fd',
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
                                                    borderTop: '1px solid rgba(148,163,184,0.08)',
                                                    background: 'rgba(2,6,23,0.18)',
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
                                    style={{
                                        padding: '18px 20px',
                                        borderRadius: 22,
                                        background:
                                            'linear-gradient(180deg, rgba(88,28,135,0.18), rgba(15,23,42,0.42))',
                                        border: '1px solid rgba(196,181,253,0.16)',
                                    }}
                                >
                                    <div
                                        style={{
                                            color: '#e9d5ff',
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
                                                key={surprise}
                                                style={{
                                                    padding: '12px 14px',
                                                    borderRadius: 16,
                                                    background: 'rgba(255,255,255,0.04)',
                                                    border: '1px solid rgba(196,181,253,0.10)',
                                                    color: '#f3e8ff',
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
                                    style={{
                                        padding: '18px 20px',
                                        borderRadius: 22,
                                        background:
                                            'linear-gradient(180deg, rgba(20,83,45,0.18), rgba(15,23,42,0.42))',
                                        border: '1px solid rgba(74,222,128,0.16)',
                                    }}
                                >
                                    <div
                                        style={{
                                            color: '#bbf7d0',
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
                                                key={item.option}
                                                style={{
                                                    padding: '14px 14px',
                                                    borderRadius: 16,
                                                    background: 'rgba(255,255,255,0.04)',
                                                    border: '1px solid rgba(74,222,128,0.10)',
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        color: '#86efac',
                                                        fontWeight: 800,
                                                        marginBottom: 6,
                                                    }}
                                                >
                                                    {item.option}
                                                </div>
                                                <div
                                                    style={{
                                                        color: '#dcfce7',
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
                                style={{
                                    borderRadius: 24,
                                    padding: 18,
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(148,163,184,0.10)',
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
                                                color: '#94a3b8',
                                                fontSize: 13,
                                            }}
                                        >
                                            Faster skim without leaving the page.
                                        </div>
                                    </div>

                                    {viewPdfEnabled ? (
                                        <div
                                            style={{
                                                padding: '8px 12px',
                                                borderRadius: 999,
                                                background: 'rgba(34,197,94,0.10)',
                                                border: '1px solid rgba(34,197,94,0.16)',
                                                color: '#86efac',
                                                fontSize: 12,
                                                fontWeight: 700,
                                            }}
                                        >
                                            Preview ready
                                        </div>
                                    ) : null}
                                </div>

                                <div
                                    style={{
                                        marginBottom: 14,
                                        padding: '14px 14px',
                                        borderRadius: 18,
                                        background: 'rgba(2,6,23,0.24)',
                                        border: '1px solid rgba(148,163,184,0.10)',
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
                                                background: 'rgba(15,23,42,0.52)',
                                                border: '1px solid rgba(148,163,184,0.14)',
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
                                                background: 'rgba(15,23,42,0.52)',
                                                border: '1px solid rgba(148,163,184,0.14)',
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
                                            background: 'rgba(2,6,23,0.28)',
                                            border: '1px solid rgba(148,163,184,0.08)',
                                            color: '#94a3b8',
                                            lineHeight: 1.8,
                                        }}
                                    >
                                        PDF preview will appear here once the file is linked.
                                    </div>
                                )}
                            </div>

                            <div
                                style={{
                                    borderRadius: 24,
                                    padding: 18,
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(148,163,184,0.10)',
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
                                            key={section}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 12,
                                                padding: '10px 12px',
                                                borderRadius: 16,
                                                background: 'rgba(2,6,23,0.22)',
                                                border: '1px solid rgba(148,163,184,0.08)',
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
                                                    background: 'rgba(59,130,246,0.14)',
                                                    color: '#93c5fd',
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
    const scenarioAccentColors = ['#60a5fa', '#22d3ee', '#34d399', '#f59e0b', '#fb7185'];

    return (
        <Card
            style={{
                borderRadius: 28,
                background:
                    'radial-gradient(circle at top right, rgba(34,197,94,0.16), transparent 26%), linear-gradient(135deg, rgba(15,23,42,0.92), rgba(17,24,39,0.96))',
                border: '1px solid rgba(148,163,184,0.12)',
                boxShadow: '0 24px 64px rgba(2,6,23,0.24)',
            }}
            styles={{
                body: {padding: 28},
            }}
        >
            <Row gutter={[24, 24]}>
                <Col xs={24} lg={14}>
                    <Space orientation="vertical" size={16} style={{width: '100%'}}>
                        <Tag
                            style={{
                                width: 'fit-content',
                                margin: 0,
                                borderRadius: 999,
                                padding: '6px 12px',
                                border: '1px solid rgba(34,197,94,0.20)',
                                background: 'rgba(34,197,94,0.10)',
                                color: '#86efac',
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
                                    key={tech}
                                    style={{
                                        margin: 0,
                                        borderRadius: 999,
                                        padding: '6px 12px',
                                        border: '1px solid rgba(34,211,238,0.20)',
                                        background: 'rgba(34,211,238,0.10)',
                                        color: '#67e8f9',
                                        fontWeight: 600,
                                    }}
                                >
                                    {tech}
                                </Tag>
                            ))}
                        </Space>

                        <div
                            style={{
                                padding: '18px 18px',
                                borderRadius: 20,
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(148,163,184,0.10)',
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
                                            style={{
                                                height: '100%',
                                                padding: '14px 14px',
                                                borderRadius: 18,
                                                background: 'rgba(2,6,23,0.22)',
                                                border: '1px solid rgba(148,163,184,0.08)',
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    display: 'block',
                                                    color: '#67e8f9',
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
                        style={{
                            height: '100%',
                            padding: 22,
                            borderRadius: 24,
                            background: 'rgba(15,23,42,0.46)',
                            border: '1px solid rgba(148,163,184,0.12)',
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
                                        background: 'rgba(2,6,23,0.22)',
                                        border: '1px solid rgba(148,163,184,0.08)',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: 999,
                                            marginTop: 8,
                                            background: '#4ade80',
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
                style={{
                    marginTop: 20,
                    padding: '20px 20px',
                    borderRadius: 22,
                    background:
                        'linear-gradient(135deg, rgba(15,23,42,0.72), rgba(17,24,39,0.88))',
                    border: '1px solid rgba(148,163,184,0.12)',
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
                                <div
                                    key={`${step.label}-${step.detail}`}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexShrink: 0,
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 224,
                                            minWidth: 224,
                                            padding: '16px 16px',
                                            borderRadius: 20,
                                            background:
                                                'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(2,6,23,0.20))',
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
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div
                style={{
                    marginTop: 20,
                    padding: '20px 20px',
                    borderRadius: 22,
                    background:
                        'linear-gradient(180deg, rgba(120,53,15,0.20), rgba(15,23,42,0.54))',
                    border: '1px solid rgba(251,191,36,0.18)',
                }}
            >
                <Text
                    style={{
                        display: 'block',
                        color: '#fde68a',
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
                                style={{
                                    height: '100%',
                                    padding: '14px 14px',
                                    borderRadius: 18,
                                    background: 'rgba(255,255,255,0.04)',
                                    border: '1px solid rgba(251,191,36,0.10)',
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
                        background: 'rgba(15,23,42,0.52)',
                        border: '1px solid rgba(148,163,184,0.14)',
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
                    style={{
                        marginTop: 16,
                        padding: '20px 20px',
                        borderRadius: 22,
                        background:
                            'linear-gradient(180deg, rgba(15,23,42,0.96), rgba(17,24,39,0.98))',
                        border: '1px solid rgba(148,163,184,0.12)',
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
                                    style={{
                                        height: '100%',
                                        padding: '16px 16px',
                                        borderRadius: 18,
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid rgba(148,163,184,0.10)',
                                    }}
                                >
                                    <Text
                                        style={{
                                            display: 'block',
                                            color: '#67e8f9',
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
                        style={{
                            marginTop: 18,
                            padding: '18px 18px',
                            borderRadius: 20,
                            background:
                                'linear-gradient(180deg, rgba(20,83,45,0.18), rgba(2,6,23,0.28))',
                            border: '1px solid rgba(74,222,128,0.14)',
                        }}
                    >
                        <Text
                            style={{
                                display: 'block',
                                color: '#bbf7d0',
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
                                        style={{
                                            height: '100%',
                                            padding: '14px 14px',
                                            borderRadius: 18,
                                            background: 'rgba(255,255,255,0.04)',
                                            border: '1px solid rgba(74,222,128,0.10)',
                                        }}
                                    >
                                        <Text
                                            style={{
                                                display: 'block',
                                                color: '#86efac',
                                                fontWeight: 800,
                                                marginBottom: 8,
                                            }}
                                        >
                                            {item.option}
                                        </Text>
                                        <Text style={{color: '#dcfce7', lineHeight: 1.8}}>
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
    );
}

function LearningJourneyPage() {
    const [openCourseId, setOpenCourseId] = useState<string | null>(learningCourses[0]?.id ?? null);
    const [activeResearchId, setActiveResearchId] = useState<string>(researchTracks[0]?.id ?? '');
    const [researchSummaryOpen, setResearchSummaryOpen] = useState(true);

    return (
        <Space orientation="vertical" size={24} style={{width: '100%'}}>
            <Card
                style={{
                    borderRadius: 28,
                    overflow: 'hidden',
                    background:
                        'radial-gradient(circle at top right, rgba(244,63,94,0.16), transparent 24%), radial-gradient(circle at 20% 20%, rgba(34,211,238,0.14), transparent 26%), linear-gradient(135deg, rgba(15,23,42,0.94), rgba(17,24,39,0.92))',
                    border: '1px solid rgba(148,163,184,0.12)',
                    boxShadow: '0 28px 80px rgba(2,6,23,0.28)',
                }}
                styles={{
                    body: {padding: 28},
                }}
            >
                <Row gutter={[24, 24]} align="middle">
                    <Col xs={24} lg={15}>
                        <Space orientation="vertical" size={16} style={{width: '100%'}}>
                            <Tag
                                style={{
                                    width: 'fit-content',
                                    margin: 0,
                                    borderRadius: 999,
                                    padding: '6px 12px',
                                    border: '1px solid rgba(244,114,182,0.20)',
                                    background: 'rgba(244,114,182,0.10)',
                                    color: '#f9a8d4',
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
                                    style={{
                                        margin: 0,
                                        borderRadius: 999,
                                        padding: '6px 12px',
                                        border: '1px solid rgba(96,165,250,0.20)',
                                        background: 'rgba(96,165,250,0.10)',
                                        color: '#bfdbfe',
                                    }}
                                >
                                    AI Engineer
                                </Tag>
                                <Tag
                                    style={{
                                        margin: 0,
                                        borderRadius: 999,
                                        padding: '6px 12px',
                                        border: '1px solid rgba(168,85,247,0.20)',
                                        background: 'rgba(168,85,247,0.10)',
                                        color: '#d8b4fe',
                                    }}
                                >
                                    Product Mindset
                                </Tag>
                                <Tag
                                    style={{
                                        margin: 0,
                                        borderRadius: 999,
                                        padding: '6px 12px',
                                        border: '1px solid rgba(34,197,94,0.20)',
                                        background: 'rgba(34,197,94,0.10)',
                                        color: '#86efac',
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
                                {label: 'Flagship impact', value: portfolioProjects[0]?.impact ?? 'N/A'},
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    style={{
                                        padding: '18px 18px',
                                        borderRadius: 20,
                                        background: 'rgba(15,23,42,0.46)',
                                        border: '1px solid rgba(148,163,184,0.12)',
                                        boxShadow: '0 16px 36px rgba(2,6,23,0.18)',
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

            <div>
                <Text
                    style={{
                        display: 'block',
                        color: '#f9a8d4',
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

            <Row gutter={[16, 16]}>
                {learningCourses.map((course) => (
                    <Col xs={24} key={course.id}>
                        <CourseCard
                            course={course}
                            notesOpen={openCourseId === course.id}
                            onToggleNotes={() =>
                                setOpenCourseId((current) =>
                                    current === course.id ? null : course.id
                                )
                            }
                        />
                    </Col>
                ))}
            </Row>

            <div>
                <Text
                    style={{
                        display: 'block',
                        color: '#93c5fd',
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
                        color: '#94a3b8',
                        fontSize: 15,
                        lineHeight: 1.8,
                        maxWidth: 900,
                    }}
                >
                    Each report card has a short summary and a quick memory frame so I or a reader
                    can open it for 10 seconds and remember the problem, solution, and impact.
                </Paragraph>
            </div>

            <div
                style={{
                    padding: '18px 18px',
                    borderRadius: 24,
                    background:
                        'linear-gradient(135deg, rgba(15,23,42,0.72), rgba(17,24,39,0.84))',
                    border: '1px solid rgba(148,163,184,0.12)',
                    boxShadow: '0 18px 42px rgba(2,6,23,0.18)',
                }}
            >
                <Text
                    style={{
                        display: 'block',
                        color: '#93c5fd',
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
                        <div
                            key={step}
                            style={{
                                padding: '14px 14px',
                                borderRadius: 18,
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(148,163,184,0.10)',
                            }}
                        >
                            <div
                                style={{
                                    color: '#64748b',
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
                        </div>
                    ))}
                </div>
            </div>

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

            <div>
                <Text
                    style={{
                        display: 'block',
                        color: '#86efac',
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

            <Space orientation="vertical" size={16} style={{width: '100%'}}>
                {portfolioProjects.map((project) => (
                    <ProjectCard key={project.id} project={project}/>
                ))}
            </Space>
        </Space>
    );
}

export default LearningJourneyPage;
