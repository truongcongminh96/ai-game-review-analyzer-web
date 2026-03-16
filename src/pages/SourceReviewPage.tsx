import {useMemo, useState} from 'react';
import {Card, Col, Row, Space, Tag, Typography} from 'antd';
import {CodeOutlined, FolderOpenOutlined, RocketOutlined} from '@ant-design/icons';
import {sourceFiles} from '../data/sourceFiles.ts';
import CodeViewer from '../components/source-review/CodeViewer';
import RepoStructure from '../components/source-review/RepoStructure';

const {Title, Paragraph} = Typography;

function SourceReviewPage() {
    const [selectedKey, setSelectedKey] = useState(sourceFiles[0]?.key ?? '');

    const activeFile = useMemo(
        () => sourceFiles.find((item) => item.key === selectedKey) ?? sourceFiles[0],
        [selectedKey]
    );

    if (!activeFile) {
        return null;
    }

    return (
        <Space orientation="vertical" size={24} style={{width: '100%'}}>
            <Card
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
                <Space orientation="vertical" size={14} style={{width: '100%'}}>
                    <Tag
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
                        Backend Walkthrough
                    </Tag>

                    <Title
                        level={2}
                        style={{
                            margin: 0,
                            color: '#f8fafc',
                        }}
                    >
                        Review the backend source code behind the demo
                    </Title>

                    <Paragraph
                        style={{
                            margin: 0,
                            color: '#94a3b8',
                            fontSize: 16,
                            lineHeight: 1.8,
                            maxWidth: 960,
                        }}
                    >
                        This page walks through the Go backend that powers the demo: configuration loading,
                        HTTP delivery, route registration, Steam review fetching, use-case orchestration,
                        and Ollama-based insight generation.
                    </Paragraph>

                    <Space wrap size={[10, 10]}>
                        <Tag
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
                            Go Backend
                        </Tag>

                        <Tag
                            icon={<FolderOpenOutlined/>}
                            style={{
                                margin: 0,
                                borderRadius: 999,
                                padding: '6px 12px',
                                border: '1px solid rgba(168,85,247,0.20)',
                                background: 'rgba(168,85,247,0.10)',
                                color: '#d8b4fe',
                            }}
                        >
                            Clean Structure
                        </Tag>

                        <Tag
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
                            Portfolio Ready
                        </Tag>
                    </Space>
                </Space>
            </Card>

            <Row gutter={[16, 16]}>
                <Col xs={24}>
                    <Card
                        style={{
                            background: 'rgba(15,23,42,0.72)',
                            border: '1px solid rgba(148,163,184,0.12)',
                            borderRadius: 20,
                        }}
                        styles={{
                            body: {padding: 20},
                        }}
                    >
                        <Space orientation="vertical" size={18} style={{width: '100%'}}>
                            <div>
                                <Title level={4} style={{color: '#f8fafc', margin: 0}}>
                                    Request Flow
                                </Title>
                                <Paragraph
                                    style={{
                                        color: '#94a3b8',
                                        margin: '8px 0 0',
                                    }}
                                >
                                    A simplified walkthrough of how the frontend request travels
                                    through the backend and comes back as an AI-generated insight
                                    report.
                                </Paragraph>
                            </div>

                            <Row gutter={[12, 12]}>
                                {[
                                    {
                                        title: 'Frontend',
                                        desc: 'User searches and submits appId + review limit',
                                    },
                                    {
                                        title: 'POST /steam/analyze',
                                        desc: 'HTTP handler validates input and triggers the use case',
                                    },
                                    {
                                        title: 'Use Case',
                                        desc: 'Coordinates Steam client + AI client and shapes the response',
                                    },
                                    {
                                        title: 'Steam Client',
                                        desc: 'Fetches real player reviews from Steam endpoints',
                                    },
                                    {
                                        title: 'Ollama Client',
                                        desc: 'Sends curated reviews to the local LLM for summarization',
                                    },
                                    {
                                        title: 'Insight Response',
                                        desc: 'Frontend receives sentiment, summary, praises, and complaints',
                                    },
                                ].map((step, index) => (
                                    <Col xs={24} sm={12} lg={8} key={step.title}>
                                        <div
                                            style={{
                                                height: '100%',
                                                padding: 16,
                                                borderRadius: 18,
                                                background:
                                                    'linear-gradient(135deg, rgba(30,41,59,0.75), rgba(15,23,42,0.86))',
                                                border: '1px solid rgba(148,163,184,0.12)',
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
                                                    background: 'rgba(96,165,250,0.14)',
                                                    border: '1px solid rgba(96,165,250,0.20)',
                                                    color: '#bfdbfe',
                                                    fontWeight: 700,
                                                    fontSize: 13,
                                                }}
                                            >
                                                {index + 1}
                                            </div>

                                            <div
                                                style={{
                                                    color: '#f8fafc',
                                                    fontWeight: 700,
                                                    fontSize: 15,
                                                    marginBottom: 8,
                                                }}
                                            >
                                                {step.title}
                                            </div>

                                            <div
                                                style={{
                                                    color: '#94a3b8',
                                                    fontSize: 13,
                                                    lineHeight: 1.7,
                                                }}
                                            >
                                                {step.desc}
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </Space>
                    </Card>
                </Col>

                <Col xs={24} lg={8}>
                    <Card
                        title={<span style={{color: '#f8fafc'}}>File Tree</span>}
                        style={{
                            background: 'rgba(15,23,42,0.72)',
                            border: '1px solid rgba(148,163,184,0.12)',
                            borderRadius: 20,
                            minHeight: 420,
                        }}
                        styles={{
                            body: {padding: 20}
                        }}
                    >
                        <Space orientation="vertical" size={12} style={{width: '100%'}}>
                            {sourceFiles.map((file) => {
                                const isActive = file.key === activeFile.key;

                                return (
                                    <div
                                        key={file.key}
                                        onClick={() => setSelectedKey(file.key)}
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
                    </Card>
                </Col>

                <Col xs={24} lg={16}>
                    <CodeViewer file={activeFile} />
                </Col>
            </Row>

            <RepoStructure />
        </Space>
    );
}

export default SourceReviewPage;
