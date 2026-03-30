import {Card, Space, Tag, Typography} from 'antd';
import {ApiOutlined, BarChartOutlined, CodeOutlined} from '@ant-design/icons';
import HudOverlay from '../motion/HudOverlay';

function BackendShowcase() {
    const {Paragraph, Text} = Typography;

    const games = [
        {label: 'Elden Ring', appId: '1245620'},
        {label: 'Cyberpunk 2077', appId: '1091500'},
        {label: "Baldur's Gate 3", appId: '1086940'},
        {label: 'Hades', appId: '1145360'},
    ];

    return (
        <Card
            className="soft-card hud-shell hud-angled-shell backend-showcase-card"
            title={
                <div className="ui-title-row" style={{alignItems: 'center'}}>
                    <span className="ui-icon-badge ui-icon-badge-cyan">
                        <ApiOutlined />
                    </span>
                    <div className="ui-title-stack">
                        <span className="ui-kicker">Delivery Layer</span>
                        <span className="ui-title-tight" style={{fontSize: 24}}>
                            Backend Contract
                        </span>
                    </div>
                </div>
            }
            style={{
                height: '100%',
                borderRadius: 24,
                background:
                    'radial-gradient(circle at top right, rgba(94,231,255,0.10), transparent 24%), radial-gradient(circle at bottom left, rgba(255,90,54,0.12), transparent 26%), linear-gradient(180deg, rgba(7,11,19,0.96), rgba(13,19,31,0.90))',
            }}
            styles={{
                header: {
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    color: '#f8fafc',
                },
                body: {
                    color: '#cbd5e1',
                },
            }}
        >
            <HudOverlay reticlePosition="bottom-left" scanDelay={0.5} />
            <Space orientation="vertical" size={20} style={{width: '100%'}}>
                <Paragraph
                    className="ui-copy-muted"
                    style={{
                        marginBottom: 0,
                        color: '#cbd5e1',
                        fontSize: 16,
                        lineHeight: 1.8,
                    }}
                >
                    The new source base is wired to the Steam analyze endpoint and
                    normalizes the response before rendering the UI.
                </Paragraph>

                <Space wrap size={[10, 10]}>
                    {games.map((game) => (
                        <Tag
                            className="hud-chip"
                            key={game.appId}
                            style={{
                                marginInlineEnd: 0,
                                borderRadius: 999,
                                padding: '6px 12px',
                                background: 'rgba(255,90,54,0.10)',
                                border: '1px solid rgba(255,90,54,0.18)',
                                color: '#ffd7c9',
                            }}
                        >
                            {game.label} #{game.appId}
                        </Tag>
                    ))}
                </Space>

                <div
                    className="hud-panel hud-angled-panel"
                    style={{
                        padding: 16,
                        borderRadius: 18,
                        background: 'rgba(5,7,13,0.54)',
                        border: '1px solid rgba(255,255,255,0.08)',
                    }}
                >
                    <Space orientation="vertical" size={12} style={{width: '100%'}}>
                        <div>
                            <Text className="ui-field-label" style={{marginBottom: 4}}>
                                <ApiOutlined />
                                Endpoint
                            </Text>
                            <Text
                                style={{
                                    color: '#5ee7ff',
                                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                                    fontSize: 14,
                                }}
                            >
                                POST /steam/analyze
                            </Text>
                        </div>

                        <div>
                            <Text className="ui-field-label" style={{marginBottom: 4}}>
                                <CodeOutlined />
                                Payload
                            </Text>
                            <Text style={{color: '#ffb59d'}}>
                                {`{ appId, limit, language }`}
                            </Text>
                        </div>

                        <div>
                            <Text className="ui-field-label" style={{marginBottom: 4}}>
                                <BarChartOutlined />
                                Output
                            </Text>
                            <Text style={{color: '#cbd5e1'}}>
                                summary, sentiment, praised_features, common_issues, topics
                            </Text>
                        </div>
                    </Space>
                </div>
            </Space>
        </Card>
    );
}

export default BackendShowcase;
