import {Card, Grid, Space, Tag, Typography} from 'antd';
import {type ReactNode} from 'react';
import HudOverlay from '../motion/HudOverlay';
import {sourceSections, type SourceFileItem} from '../../data/sourceFiles';

const {Paragraph, Text, Title} = Typography;
const {useBreakpoint} = Grid;

type CodeViewerProps = {
    file: SourceFileItem;
};

const editorTheme = {
    shell: '#181818',
    panel: '#252526',
    tab: '#2d2d30',
    editor: '#1e1e1e',
    border: '#2d2d30',
    text: '#d4d4d4',
    muted: '#858585',
    status: '#007acc',
    keyword: '#569cd6',
    string: '#ce9178',
    comment: '#6a9955',
    number: '#b5cea8',
    function: '#dcdcaa',
    type: '#4ec9b0',
    constant: '#4fc1ff',
};

const sectionMap = new Map(sourceSections.map((section) => [section.key, section]));

const goKeywords = new Set([
    'break',
    'case',
    'chan',
    'const',
    'continue',
    'default',
    'defer',
    'else',
    'fallthrough',
    'for',
    'func',
    'go',
    'goto',
    'if',
    'import',
    'interface',
    'map',
    'package',
    'range',
    'return',
    'select',
    'struct',
    'switch',
    'type',
    'var',
]);

const sqlKeywords = new Set([
    'add',
    'all',
    'alter',
    'and',
    'as',
    'asc',
    'by',
    'cascade',
    'char',
    'check',
    'collate',
    'constraint',
    'create',
    'current_timestamp',
    'datetime',
    'default',
    'delete',
    'desc',
    'engine',
    'enum',
    'exists',
    'foreign',
    'from',
    'if',
    'in',
    'index',
    'insert',
    'into',
    'is',
    'json',
    'key',
    'not',
    'null',
    'on',
    'or',
    'order',
    'primary',
    'references',
    'select',
    'set',
    'table',
    'text',
    'unique',
    'update',
    'values',
    'varchar',
    'where',
]);

const constants = new Set(['true', 'false', 'nil', 'null']);

const languageAccent: Record<SourceFileItem['language'], string> = {
    go: '#00add8',
    sql: '#f5b544',
};

function getKeywords(language: SourceFileItem['language']) {
    return language === 'sql' ? sqlKeywords : goKeywords;
}

function tokenizeLine(line: string) {
    return (
        line.match(
            /(?:\s+|"(?:[^"\\]|\\.)*"|`[^`]*`|'(?:[^'\\]|\\.)*'|\/\/.*|--.*|\b\d+(?:\.\d+)?\b|\b[A-Za-z_][A-Za-z0-9_]*\b|[{}()[\].,:;+*/<>=!%&|-]+)/g
        ) ?? [line]
    );
}

function getNextMeaningfulToken(tokens: string[], index: number) {
    for (let current = index + 1; current < tokens.length; current += 1) {
        if (tokens[current].trim() !== '') {
            return tokens[current];
        }
    }

    return '';
}

function getPreviousMeaningfulToken(tokens: string[], index: number) {
    for (let current = index - 1; current >= 0; current -= 1) {
        if (tokens[current].trim() !== '') {
            return tokens[current];
        }
    }

    return '';
}

function getTokenColor(
    token: string,
    language: SourceFileItem['language'],
    nextToken: string,
    previousToken: string
) {
    const normalized = token.toLowerCase();
    const keywords = getKeywords(language);

    if (token.startsWith('//') || token.startsWith('--')) {
        return editorTheme.comment;
    }

    if (
        token.startsWith('"') ||
        token.startsWith("'") ||
        token.startsWith('`')
    ) {
        return editorTheme.string;
    }

    if (/^\d+(?:\.\d+)?$/.test(token)) {
        return editorTheme.number;
    }

    if (constants.has(normalized)) {
        return editorTheme.constant;
    }

    if (keywords.has(normalized)) {
        return editorTheme.keyword;
    }

    if (/^[A-Z][A-Za-z0-9_]*$/.test(token) && language === 'go') {
        return editorTheme.type;
    }

    if (
        /^[A-Za-z_][A-Za-z0-9_]*$/.test(token) &&
        nextToken === '(' &&
        previousToken !== '.' &&
        !keywords.has(normalized)
    ) {
        return editorTheme.function;
    }

    return editorTheme.text;
}

function renderHighlightedLine(line: string, language: SourceFileItem['language']) {
    const tokens = tokenizeLine(line);

    return tokens.map((token, index) => {
        const nextToken = getNextMeaningfulToken(tokens, index);
        const previousToken = getPreviousMeaningfulToken(tokens, index);
        const color = getTokenColor(token, language, nextToken, previousToken);
        const isComment = token.startsWith('//') || token.startsWith('--');

        return (
            <span
                key={`${token}-${index}`}
                style={{
                    color,
                    fontStyle: isComment ? 'italic' : 'normal',
                }}
            >
                {token}
            </span>
        );
    });
}

function buildMiniMap(lines: string[], accent: string) {
    return lines.map((line, index) => {
        const density = Math.max(10, Math.min(100, Math.round(line.trim().length * 2.2)));
        const filled = line.trim().length > 0;

        return (
            <div
                key={`minimap-${index}`}
                style={{
                    height: 3,
                    width: `${density}%`,
                    borderRadius: 999,
                    background: filled ? accent : 'rgba(148,163,184,0.18)',
                    opacity: filled ? 0.55 : 0.3,
                }}
            />
        );
    });
}

function InfoPill({children}: { children: ReactNode }) {
    return (
        <Tag
            className="hud-chip"
            style={{
                margin: 0,
                borderRadius: 999,
                padding: '4px 10px',
                border: '1px solid rgba(148,163,184,0.14)',
                background: 'rgba(30,41,59,0.70)',
                color: '#cbd5e1',
            }}
        >
            {children}
        </Tag>
    );
}

function CodeViewer({file}: CodeViewerProps) {
    const screens = useBreakpoint();
    const codeLines = file.code.split('\n');
    const section = sectionMap.get(file.sectionKey);
    const accent = languageAccent[file.language];
    const showMinimap = Boolean(screens.xl);
    const fileName = file.path.split('/').pop() ?? file.path;

    return (
        <Card
            className="hud-shell hud-angled-shell"
            title={
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 12,
                    }}
                >
                    <span style={{color: '#f8fafc'}}>Editor Preview</span>

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
                            whiteSpace: 'nowrap',
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
                minHeight: 520,
            }}
            styles={{
                body: {padding: 20},
            }}
        >
            <HudOverlay reticlePosition="bottom-left" scanDelay={0.95} />
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
                            VS Code inspired view
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
                            {section?.title ?? 'Backend Layer'}
                        </Tag>

                        <Tag
                            style={{
                                margin: 0,
                                borderRadius: 999,
                                padding: '4px 10px',
                                border: `1px solid ${accent}44`,
                                background: `${accent}18`,
                                color: accent,
                            }}
                        >
                            {file.language.toUpperCase()}
                        </Tag>
                    </Space>

                    <Space wrap size={[8, 8]} style={{marginTop: 12}}>
                        {file.highlights.map((item) => (
                            <InfoPill key={`${file.key}-${item}`}>{item}</InfoPill>
                        ))}
                    </Space>
                </div>

                <div
                    style={{
                        borderRadius: 18,
                        border: '1px solid rgba(148,163,184,0.12)',
                        background: editorTheme.shell,
                        overflow: 'hidden',
                        boxShadow: '0 28px 60px rgba(2,6,23,0.36)',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 12,
                            padding: '10px 14px',
                            background: editorTheme.panel,
                            borderBottom: `1px solid ${editorTheme.border}`,
                        }}
                    >
                        <Space size={8}>
                            {['#ff5f57', '#febc2e', '#28c840'].map((color) => (
                                <span
                                    key={color}
                                    style={{
                                        width: 12,
                                        height: 12,
                                        borderRadius: 999,
                                        background: color,
                                        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.18)',
                                    }}
                                />
                            ))}
                        </Space>

                        <Text
                            style={{
                                color: '#c7c7c7',
                                fontSize: 12,
                                fontFamily: '"JetBrains Mono", "Fira Code", ui-monospace, monospace',
                            }}
                        >
                            ai-game-review-analyzer
                        </Text>

                        <Text style={{color: editorTheme.muted, fontSize: 12}}>
                            source review
                        </Text>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'space-between',
                            gap: 12,
                            padding: '0 12px',
                            background: editorTheme.tab,
                            borderBottom: `1px solid ${editorTheme.border}`,
                        }}
                    >
                        <div
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 10,
                                padding: '12px 14px 11px',
                                background: editorTheme.editor,
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10,
                                borderTop: `2px solid ${accent}`,
                                color: '#f3f4f6',
                                minWidth: screens.md ? 280 : undefined,
                            }}
                        >
                            <span
                                style={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: 2,
                                    background: accent,
                                    boxShadow: `0 0 0 4px ${accent}22`,
                                    flexShrink: 0,
                                }}
                            />

                            <Text
                                style={{
                                    color: '#f8fafc',
                                    fontSize: 13,
                                    fontWeight: 600,
                                    fontFamily: '"JetBrains Mono", "Fira Code", ui-monospace, monospace',
                                }}
                            >
                                {fileName}
                            </Text>

                            <Text style={{color: editorTheme.muted, fontSize: 12}}>
                                {file.language}
                            </Text>
                        </div>

                        {screens.md ? (
                            <Text
                                style={{
                                    color: editorTheme.muted,
                                    fontSize: 12,
                                    paddingBottom: 10,
                                }}
                            >
                                {codeLines.length} lines
                            </Text>
                        ) : null}
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 12,
                            padding: '10px 16px',
                            background: '#1b1b1c',
                            borderBottom: `1px solid ${editorTheme.border}`,
                        }}
                    >
                        <Text
                            style={{
                                color: '#9cdcfe',
                                fontSize: 12,
                                fontFamily: '"JetBrains Mono", "Fira Code", ui-monospace, monospace',
                            }}
                        >
                            {section?.title ?? 'Backend Layer'} {'>'} {file.path}
                        </Text>

                        {screens.md ? (
                            <Space size={8} wrap>
                                <InfoPill>{file.language.toUpperCase()}</InfoPill>
                                <InfoPill>{codeLines.length} lines</InfoPill>
                            </Space>
                        ) : null}
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            minHeight: 500,
                            background: editorTheme.editor,
                        }}
                    >
                        <div
                            style={{
                                flex: 1,
                                overflow: 'auto',
                                padding: '14px 0',
                            }}
                        >
                            <div
                                style={{
                                    minWidth: 0,
                                    fontSize: 13.5,
                                    lineHeight: 1.8,
                                    fontFamily:
                                        '"JetBrains Mono", "Fira Code", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
                                }}
                            >
                                {codeLines.map((line, index) => (
                                    <div
                                        key={`${file.path}-${index}`}
                                        style={{
                                            display: 'grid',
                                            gridTemplateColumns: '3.5rem minmax(0, 1fr)',
                                            columnGap: 16,
                                            padding: '0 16px 0 0',
                                            borderLeft: index % 5 === 0 ? `2px solid ${accent}10` : '2px solid transparent',
                                            background:
                                                index === 0
                                                    ? 'linear-gradient(90deg, rgba(255,255,255,0.02), transparent 55%)'
                                                    : 'transparent',
                                        }}
                                    >
                                        <span
                                            style={{
                                                color: editorTheme.muted,
                                                textAlign: 'right',
                                                userSelect: 'none',
                                                paddingRight: 12,
                                            }}
                                        >
                                            {index + 1}
                                        </span>

                                        <code
                                            style={{
                                                color: editorTheme.text,
                                                whiteSpace: 'pre-wrap',
                                                wordBreak: 'break-word',
                                                display: 'block',
                                            }}
                                        >
                                            {line.trim().length === 0 ? ' ' : renderHighlightedLine(line, file.language)}
                                        </code>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {showMinimap ? (
                            <div
                                style={{
                                    width: 92,
                                    borderLeft: `1px solid ${editorTheme.border}`,
                                    background: '#1b1b1c',
                                    padding: '14px 10px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 5,
                                }}
                            >
                                {buildMiniMap(codeLines, accent)}
                            </div>
                        ) : null}
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: 12,
                            padding: '8px 12px',
                            background: editorTheme.status,
                            color: '#f8fafc',
                            fontSize: 12,
                        }}
                    >
                        <Space size={12} wrap>
                            <Text style={{color: '#f8fafc', fontSize: 12}}>main</Text>
                            <Text style={{color: '#f8fafc', fontSize: 12}}>{file.language.toUpperCase()}</Text>
                            <Text style={{color: '#f8fafc', fontSize: 12}}>UTF-8</Text>
                        </Space>

                        <Space size={12} wrap>
                            <Text style={{color: '#f8fafc', fontSize: 12}}>
                                {section?.badge ?? 'Layer'}
                            </Text>
                            <Text style={{color: '#f8fafc', fontSize: 12}}>
                                Ln {codeLines.length}
                            </Text>
                        </Space>
                    </div>
                </div>
            </Space>
        </Card>
    );
}

export default CodeViewer;
