import {Card, Space, Tag, Typography} from 'antd';
import type {SourceFileItem} from '../../data/sourceFiles';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const {Paragraph, Text, Title} = Typography;

type CodeViewerProps = {
    file: SourceFileItem;
};

const getSyntaxLanguage = (language: SourceFileItem['language']) => {
    if (language === 'text') {
        return 'text';
    }

    return language;
};

function CodeViewer({file}: CodeViewerProps) {
    return (
        <Card
            title={
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <span style={{color: '#f8fafc'}}>Code Viewer</span>

                    <a
                        href="https://github.com/truongcongminh96/ai-game-review-analyzer"
                        target="_blank"
                        rel="noreferrer"
                        style={{
                            padding: '6px 12px',
                            borderRadius: 8,
                            border: '1px solid rgba(148,163,184,0.2)',
                            fontSize: 13,
                            color: '#67e8f9',
                            textDecoration: 'none',
                        }}
                    >
                        View GitHub
                    </a>
                </div>
            }
            style={{
                background: 'rgba(15,23,42,0.72)',
                border: '1px solid rgba(148,163,184,0.12)',
                borderRadius: 20,
                minHeight: 420,
            }}
            styles={{
                body: {padding: 20},
            }}
        >
            <Space orientation="vertical" size={14} style={{width: '100%'}}>
                <div>
                    <Text style={{color: '#67e8f9', fontSize: 13}}>{file.path}</Text>

                    <Title level={4} style={{color: '#f8fafc', margin: '8px 0 6px'}}>
                        {file.title}
                    </Title>

                    <Paragraph style={{color: '#94a3b8', marginBottom: 12}}>
                        {file.description}
                    </Paragraph>

                    <Space wrap size={[8, 8]}>
                        <Tag
                            style={{
                                margin: 0,
                                borderRadius: 999,
                                padding: '4px 10px',
                                border: '1px solid rgba(34,211,238,0.20)',
                                background: 'rgba(34,211,238,0.10)',
                                color: '#67e8f9',
                            }}
                        >
                            Real backend source
                        </Tag>

                        <Tag
                            style={{
                                margin: 0,
                                borderRadius: 999,
                                padding: '4px 10px',
                                border: '1px solid rgba(168,85,247,0.20)',
                                background: 'rgba(168,85,247,0.10)',
                                color: '#d8b4fe',
                            }}
                        >
                            {file.language.toUpperCase()}
                        </Tag>

                        <Tag
                            style={{
                                margin: 0,
                                borderRadius: 999,
                                padding: '4px 10px',
                                border: '1px solid rgba(250,204,21,0.20)',
                                background: 'rgba(250,204,21,0.10)',
                                color: '#fcd34d',
                            }}
                        >
                            Production-style structure
                        </Tag>
                    </Space>
                </div>

                <div
                    style={{
                        borderRadius: 18,
                        overflow: 'hidden',
                        border: '1px solid rgba(148,163,184,0.10)',
                        background: '#020617',
                        minHeight: 420,
                    }}
                >
                    <SyntaxHighlighter
                        language={getSyntaxLanguage(file.language)}
                        style={vscDarkPlus}
                        showLineNumbers
                        wrapLongLines
                        customStyle={{
                            margin: 0,
                            padding: 20,
                            background: '#020617',
                            fontSize: 13,
                            lineHeight: 1.75,
                            minHeight: 420,
                            overflowY: 'auto',
                        }}
                        codeTagProps={{
                            style: {
                                fontFamily:
                                    'ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, monospace',
                            },
                        }}
                        lineNumberStyle={{
                            color: '#475569',
                            minWidth: '2.25em',
                            paddingRight: '1em',
                        }}
                    >
                        {file.code}
                    </SyntaxHighlighter>
                </div>
            </Space>
        </Card>
    );
}

export default CodeViewer;
