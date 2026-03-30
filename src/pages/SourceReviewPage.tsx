import {useMemo, useState} from 'react';
import {Card, Col, Collapse, Row, Space, Tag, Typography} from 'antd';
import {
    ApartmentOutlined,
    CodeOutlined,
    DatabaseOutlined,
    FolderOpenOutlined,
    RocketOutlined,
} from '@ant-design/icons';
import {
    sourceFiles,
    sourceSections,
    type SourceFileItem,
} from '../data/sourceFiles.ts';
import CodeViewer from '../components/source-review/CodeViewer';
import HudOverlay from '../components/motion/HudOverlay';
import RepoStructure from '../components/source-review/RepoStructure';
import {fileToFlowStep} from '../data/flowMapping';

const {Title, Paragraph, Text} = Typography;

function SourceReviewPage() {
    const [selectedKey, setSelectedKey] = useState(sourceFiles[0]?.key ?? '');
    const [openedSections, setOpenedSections] = useState<string[]>([
        sourceFiles[0]?.sectionKey ?? sourceSections[0]?.key ?? '',
    ].filter(Boolean));

    const activeFile = useMemo(
        () => sourceFiles.find((item) => item.key === selectedKey) ?? sourceFiles[0],
        [selectedKey]
    );

    const sectionFiles = useMemo(() => {
        const fileMap = new Map(sourceFiles.map((file) => [file.key, file]));

        return sourceSections.map((section) => ({
            section,
            files: section.fileKeys
                .map((key) => fileMap.get(key))
                .filter((file): file is SourceFileItem => Boolean(file)),
        }));
    }, []);

    const activeStep = activeFile ? (fileToFlowStep[activeFile.path] ?? null) : null;
    const activeFileName = activeFile.path.split('/').pop() ?? activeFile.path;
    const activeSectionTitle =
        sourceSections.find((section) => section.key === activeFile.sectionKey)?.title ?? 'Unknown';

    const handleSelectFile = (file: SourceFileItem) => {
        setSelectedKey(file.key);
        setOpenedSections((current) =>
            current.includes(file.sectionKey) ? current : [...current, file.sectionKey]
        );
    };

    if (!activeFile) {
        return null;
    }

    return (
        <Space orientation="vertical" size={24} style={{width: '100%'}}>
            <Card
                className="hud-shell hud-angled-shell source-review-hero"
                style={{
                    background: 'linear-gradient(135deg, rgba(15,23,42,0.92), rgba(17,24,39,0.88))',
                    border: '1px solid rgba(148,163,184,0.12)',
                    borderRadius: 24,
                    overflow: 'hidden',
                    boxShadow: '0 24px 80px rgba(2,6,23,0.32)',
                }}
                styles={{
                    body: {padding: 28}
                }}
            >
                <HudOverlay scanDelay={0.18} />
                <Space orientation="vertical" size={14} style={{width: '100%'}}>
                    <Tag
                        className="hud-chip"
                        style={{
                            width: 'fit-content',
                            margin: 0,
                            borderRadius: 999,
                            padding: '6px 12px',
                            border: '1px solid rgba(96,165,250,0.20)',
                            background: 'rgba(96,165,250,0.10)',
                            color: '#bfdbfe',
                            fontWeight: 600,
                        }}
                    >
                        Backend Source Review
                    </Tag>

                    <div className="ui-title-row">
                        <span className="ui-icon-badge ui-icon-badge-cyan">
                            <CodeOutlined />
                        </span>
                        <div className="ui-title-stack">
                            <span className="ui-kicker">System Architecture</span>
                            <Title
                                className="ui-title-tight"
                                level={2}
                                style={{
                                    margin: 0,
                                    color: '#f8fafc',
                                }}
                            >
                                Inspect the backend architecture behind the demo
                            </Title>
                        </div>
                    </div>

                    <Paragraph
                        className="ui-copy-muted"
                        style={{
                            margin: 0,
                            color: '#94a3b8',
                            fontSize: 16,
                            lineHeight: 1.8,
                            maxWidth: 980,
                        }}
                    >
                        This walkthrough now reflects the newer backend structure from the latest
                        source snapshot: runtime config, health-aware HTTP delivery, use case
                        orchestration, Steam + Ollama integrations, optional persistence, and the
                        migration/schema layer that stores analysis runs.
                    </Paragraph>

                    <div
                        className="hud-panel hud-angled-panel source-review-telemetry"
                        style={{
                            padding: '14px 16px',
                            borderRadius: 18,
                            background:
                                'linear-gradient(135deg, rgba(8,11,18,0.72), rgba(19,28,45,0.52))',
                            border: '1px solid rgba(148,163,184,0.10)',
                        }}
                    >
                        <Space wrap size={[8, 8]}>
                            <Tag
                                className="hud-chip"
                                style={{
                                    margin: 0,
                                    borderRadius: 999,
                                    padding: '5px 10px',
                                    border: '1px solid rgba(94,231,255,0.20)',
                                    background: 'rgba(94,231,255,0.10)',
                                    color: '#d6f9ff',
                                }}
                            >
                                Focus: {activeFileName}
                            </Tag>
                            <Tag
                                className="hud-chip"
                                style={{
                                    margin: 0,
                                    borderRadius: 999,
                                    padding: '5px 10px',
                                    border: '1px solid rgba(255,90,54,0.18)',
                                    background: 'rgba(255,90,54,0.10)',
                                    color: '#ffd7c9',
                                }}
                            >
                                Layer: {activeSectionTitle}
                            </Tag>
                            {activeStep ? (
                                <Tag
                                    className="hud-chip"
                                    style={{
                                        margin: 0,
                                        borderRadius: 999,
                                        padding: '5px 10px',
                                        border: '1px solid rgba(255,122,24,0.18)',
                                        background: 'rgba(255,122,24,0.10)',
                                        color: '#fed7aa',
                                    }}
                                >
                                    Step 0{activeStep} mapped
                                </Tag>
                            ) : null}
                        </Space>
                    </div>

                    <Space wrap size={[10, 10]}>
                        <Tag
                            className="hud-chip"
                            icon={<CodeOutlined/>}
                            style={{
                                margin: 0,
                                borderRadius: 999,
                                padding: '6px 12px',
                                border: '1px solid rgba(34,211,238,0.20)',
                                background: 'rgba(34,211,238,0.10)',
                                color: '#67e8f9',
                            }}
                        >
                            Go Backend v2
                        </Tag>

                        <Tag
                            className="hud-chip"
                            icon={<DatabaseOutlined/>}
                            style={{
                                margin: 0,
                                borderRadius: 999,
                                padding: '6px 12px',
                                border: '1px solid rgba(168,85,247,0.20)',
                                background: 'rgba(168,85,247,0.10)',
                                color: '#d8b4fe',
                            }}
                        >
                            MySQL + Postgres Ready
                        </Tag>

                        <Tag
                            className="hud-chip"
                            icon={<RocketOutlined/>}
                            style={{
                                margin: 0,
                                borderRadius: 999,
                                padding: '6px 12px',
                                border: '1px solid rgba(250,204,21,0.20)',
                                background: 'rgba(250,204,21,0.10)',
                                color: '#fcd34d',
                            }}
                        >
                            Migration CLI Included
                        </Tag>
                    </Space>
                </Space>
            </Card>

            <Row gutter={[16, 16]}>
                <Col xs={24}>
            <Card
                        className="hud-shell hud-angled-shell source-review-flow"
                        style={{
                            background: 'rgba(15,23,42,0.72)',
                            border: '1px solid rgba(148,163,184,0.12)',
                            borderRadius: 20,
                        }}
                        styles={{
                            body: {padding: 20},
                        }}
                    >
                        <HudOverlay reticlePosition="bottom-left" scanDelay={0.52} />
                        <Space orientation="vertical" size={18} style={{width: '100%'}}>
                            <div className="hud-divider">
                                <div className="ui-title-row">
                                    <span className="ui-icon-badge ui-icon-badge-violet">
                                        <ApartmentOutlined />
                                    </span>
                                    <div className="ui-title-stack">
                                        <span className="ui-kicker">Runtime Map</span>
                                        <Title
                                            className="ui-title-tight"
                                            level={4}
                                            style={{color: '#f8fafc', margin: 0}}
                                        >
                                            Layer Walkthrough
                                        </Title>
                                    </div>
                                </div>
                                <Paragraph
                                    className="ui-copy-muted"
                                    style={{
                                        color: '#94a3b8',
                                        margin: '8px 0 0',
                                    }}
                                >
                                    Selecting a file highlights where it belongs in the updated
                                    backend architecture. The flow below now follows the new layered
                                    structure instead of the older single-path demo pipeline.
                                </Paragraph>

                                <Space wrap size={[8, 8]} style={{marginTop: 12}}>
                                    <Tag
                                        className="hud-chip"
                                        style={{
                                            margin: 0,
                                            borderRadius: 999,
                                            padding: '4px 10px',
                                            border: '1px solid rgba(34,211,238,0.20)',
                                            background: 'rgba(34,211,238,0.10)',
                                            color: '#67e8f9',
                                        }}
                                    >
                                        {sourceSections.length} layers
                                    </Tag>

                                    <Tag
                                        className="hud-chip"
                                        style={{
                                            margin: 0,
                                            borderRadius: 999,
                                            padding: '4px 10px',
                                            border: '1px solid rgba(168,85,247,0.20)',
                                            background: 'rgba(168,85,247,0.10)',
                                            color: '#d8b4fe',
                                        }}
                                    >
                                        {sourceFiles.length} curated files
                                    </Tag>

                                    <Tag
                                        className="hud-chip"
                                        style={{
                                            margin: 0,
                                            borderRadius: 999,
                                            padding: '4px 10px',
                                            border: '1px solid rgba(250,204,21,0.20)',
                                            background: 'rgba(250,204,21,0.10)',
                                            color: '#fcd34d',
                                        }}
                                    >
                                        2 database drivers
                                    </Tag>
                                </Space>
                            </div>

                            <Row gutter={[12, 12]}>
                                {sourceSections.map((section, index) => {
                                    const stepIndex = index + 1;
                                    const isActive = activeStep === stepIndex;

                                    return (
                                        <Col xs={24} sm={12} lg={8} key={section.key}>
                                            <div
                                                className="hud-step-card hud-angled-panel"
                                                style={{
                                                    height: '100%',
                                                    padding: 16,
                                                    borderRadius: 18,
                                                    background: isActive
                                                        ? 'linear-gradient(135deg, rgba(59,130,246,0.25), rgba(168,85,247,0.22))'
                                                        : 'linear-gradient(135deg, rgba(30,41,59,0.75), rgba(15,23,42,0.86))',
                                                    border: isActive
                                                        ? '1px solid rgba(96,165,250,0.45)'
                                                        : '1px solid rgba(148,163,184,0.12)',
                                                    boxShadow: isActive
                                                        ? '0 0 24px rgba(96,165,250,0.24)'
                                                        : 'none',
                                                    transform: isActive ? 'translateY(-2px)' : 'none',
                                                    transition: 'all 0.25s ease',
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: 30,
                                                        height: 30,
                                                        borderRadius: 999,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        marginBottom: 12,
                                                        background: isActive ? 'rgba(96,165,250,0.22)' : 'rgba(96,165,250,0.14)',
                                                        border: isActive
                                                            ? '1px solid rgba(147,197,253,0.45)'
                                                            : '1px solid rgba(96,165,250,0.20)',
                                                        color: '#bfdbfe',
                                                        fontWeight: 700,
                                                        fontSize: 13,
                                                    }}
                                                >
                                                    {stepIndex}
                                                </div>

                                                <div
                                                    style={{
                                                        color: '#f8fafc',
                                                        fontWeight: 700,
                                                        fontSize: 15,
                                                        marginBottom: 8,
                                                    }}
                                                >
                                                    {section.title}
                                                </div>

                                                <div
                                                    style={{
                                                        color: isActive ? '#cbd5e1' : '#94a3b8',
                                                        fontSize: 13,
                                                        lineHeight: 1.7,
                                                    }}
                                                >
                                                    {section.description}
                                                </div>
                                            </div>
                                        </Col>
                                    );
                                })}
                            </Row>
                        </Space>
                    </Card>
                </Col>

                <Col xs={24} lg={8}>
                    <Card
                        className="hud-shell hud-angled-shell source-review-browser"
                        title={
                            <div className="ui-title-row" style={{alignItems: 'center'}}>
                                <span className="ui-icon-badge ui-icon-badge-hot">
                                    <FolderOpenOutlined />
                                </span>
                                <div className="ui-title-stack">
                                    <span className="ui-kicker">Inspection Console</span>
                                    <span className="ui-title-tight" style={{fontSize: 24}}>
                                        Layered File Browser
                                    </span>
                                </div>
                            </div>
                        }
                        style={{
                            background: 'rgba(15,23,42,0.72)',
                            border: '1px solid rgba(148,163,184,0.12)',
                            borderRadius: 20,
                            minHeight: 520,
                        }}
                        styles={{
                            body: {padding: 20}
                        }}
                    >
                        <HudOverlay scanDelay={0.8} />
                        <Space orientation="vertical" size={16} style={{width: '100%'}}>
                            <Paragraph
                                style={{
                                    margin: 0,
                                    color: '#94a3b8',
                                }}
                            >
                                Each layer can be expanded when needed. The persistence examples use
                                MySQL snippets, while the Postgres side follows the same repository
                                contracts.
                            </Paragraph>

                            <div
                                className="hud-panel hud-angled-panel"
                                style={{
                                    padding: '14px 16px',
                                    borderRadius: 18,
                                    background:
                                        'linear-gradient(135deg, rgba(8,11,18,0.78), rgba(19,28,45,0.52))',
                                    border: '1px solid rgba(148,163,184,0.10)',
                                }}
                            >
                                <Text style={{display: 'block', color: '#94a3b8', marginBottom: 6}}>
                                    Current focus
                                </Text>
                                <Text style={{display: 'block', color: '#f8fafc', fontWeight: 700}}>
                                    {activeFile.title}
                                </Text>
                                <Text style={{color: '#67e8f9', fontSize: 13}}>
                                    {activeFile.path}
                                </Text>
                            </div>

                            <Collapse
                                ghost
                                activeKey={openedSections}
                                onChange={(keys) =>
                                    setOpenedSections(
                                        (Array.isArray(keys) ? keys : [keys])
                                            .map((key) => String(key))
                                            .filter(Boolean)
                                    )
                                }
                                items={sectionFiles.map(({section, files}) => ({
                                    key: section.key,
                                    label: (
                                        <Space size={10} wrap>
                                            <Tag
                                                className="hud-chip"
                                                style={{
                                                    margin: 0,
                                                    borderRadius: 999,
                                                    padding: '4px 10px',
                                                    border: '1px solid rgba(96,165,250,0.20)',
                                                    background: 'rgba(96,165,250,0.10)',
                                                    color: '#bfdbfe',
                                                }}
                                            >
                                                {section.badge}
                                            </Tag>

                                            <span
                                                style={{
                                                    color: '#f8fafc',
                                                    fontWeight: 700,
                                                }}
                                            >
                                                {section.title}
                                            </span>

                                            <Text style={{color: '#94a3b8'}}>
                                                {files.length} files
                                            </Text>
                                        </Space>
                                    ),
                                    children: (
                                        <Space orientation="vertical" size={12} style={{width: '100%'}}>
                                            <Text style={{color: '#94a3b8'}}>
                                                {section.description}
                                            </Text>

                                            <Space orientation="vertical" size={8} style={{width: '100%'}}>
                                                {files.map((file) => {
                                                    const isActive = file.key === activeFile.key;

                                                    return (
                                                        <div
                                                            className="hud-panel hud-angled-panel"
                                                            key={file.key}
                                                            onClick={() => handleSelectFile(file)}
                                                            style={{
                                                                padding: '10px 14px',
                                                                borderRadius: 14,
                                                                background: isActive
                                                                    ? 'linear-gradient(135deg, rgba(59,130,246,0.16), rgba(168,85,247,0.14))'
                                                                    : 'rgba(30,41,59,0.55)',
                                                                border: isActive
                                                                    ? '1px solid rgba(96,165,250,0.30)'
                                                                    : '1px solid rgba(148,163,184,0.10)',
                                                                color: isActive ? '#f8fafc' : '#cbd5e1',
                                                                fontSize: 12,
                                                                cursor: 'pointer',
                                                                transition: 'all 0.2s ease',
                                                                boxShadow: isActive ? '0 10px 24px rgba(37,99,235,0.12)' : 'none',
                                                            }}
                                                        >
                                                            <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
                                                                <span style={{fontWeight: 600}}>{file.path}</span>
                                                                <span
                                                                    style={{
                                                                        fontSize: 12,
                                                                        color: isActive ? 'rgba(226,232,240,0.78)' : '#94a3b8',
                                                                    }}
                                                                >
                                                                    {file.title}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </Space>
                                        </Space>
                                    ),
                                    style: {
                                        marginBottom: 10,
                                        borderRadius: 18,
                                        background: 'rgba(2,6,23,0.34)',
                                        border: '1px solid rgba(148,163,184,0.10)',
                                    },
                                }))}
                            />
                        </Space>
                    </Card>
                </Col>

                <Col xs={24} lg={16}>
                    <CodeViewer file={activeFile}/>
                </Col>
            </Row>

            <RepoStructure/>
        </Space>
    );
}

export default SourceReviewPage;
