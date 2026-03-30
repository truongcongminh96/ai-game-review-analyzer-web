import {Collapse, Space, Tag, Typography} from 'antd';
import HudOverlay from '../motion/HudOverlay';
import {backendRepoTree, sourceSections} from '../../data/sourceFiles';

const {Paragraph, Text} = Typography;

function RepoStructure() {
    return (
        <div
            className="repo-structure hud-shell hud-angled-shell"
            style={{
                background: 'rgba(15,23,42,0.72)',
                border: '1px solid rgba(148,163,184,0.12)',
                borderRadius: 20,
                padding: 24,
                boxShadow: '0 18px 48px rgba(2,6,23,0.18)',
            }}
        >
            <HudOverlay scanDelay={1.15} />
            <Space orientation="vertical" size={20} style={{width: '100%'}}>
                <div>
                    <h3
                        style={{
                            margin: 0,
                            color: '#f8fafc',
                            fontSize: 22,
                            fontWeight: 700,
                        }}
                    >
                        Full Repository Reference
                    </h3>

                    <Paragraph
                        style={{
                            margin: '10px 0 0',
                            color: '#94a3b8',
                            maxWidth: 920,
                        }}
                    >
                        The main review flow above is the primary reading experience. This section is
                        kept as a compact deep-dive for anyone who wants the full repository tree and
                        a quick checklist of the covered layers.
                    </Paragraph>
                </div>

                <Space wrap size={[8, 8]}>
                    {sourceSections.map((section) => (
                        <Tag
                            className="hud-chip"
                            key={section.key}
                            style={{
                                margin: 0,
                                borderRadius: 999,
                                padding: '4px 10px',
                                border: '1px solid rgba(96,165,250,0.20)',
                                background: 'rgba(96,165,250,0.10)',
                                color: '#bfdbfe',
                            }}
                        >
                            {section.badge}: {section.title}
                        </Tag>
                    ))}
                </Space>

                <Collapse
                    ghost
                    items={[
                        {
                            key: 'repo-tree',
                            label: (
                                <Text style={{color: '#f8fafc', fontWeight: 600}}>
                                    Open full repository tree
                                </Text>
                            ),
                            children: (
                                <div
                                    style={{
                                        padding: 18,
                                        borderRadius: 18,
                                        border: '1px solid rgba(148,163,184,0.10)',
                                        background: '#020617',
                                    }}
                                >
                                    <pre
                                        style={{
                                            margin: 0,
                                            color: '#cbd5e1',
                                            fontSize: 14,
                                            lineHeight: 1.8,
                                            overflowX: 'auto',
                                            fontFamily:
                                                'ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, monospace',
                                        }}
                                    >
                                        {backendRepoTree}
                                    </pre>
                                </div>
                            ),
                            style: {
                                borderRadius: 18,
                                background: 'rgba(2,6,23,0.34)',
                                border: '1px solid rgba(148,163,184,0.10)',
                            },
                        },
                    ]}
                />
            </Space>
        </div>
    );
}

export default RepoStructure;
