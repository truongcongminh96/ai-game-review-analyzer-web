import {Card, Space, Tag, Typography} from 'antd';

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
            className="soft-card"
            title="Backend Contract"
            style={{
                height: '100%',
                borderRadius: 24,
            }}
            styles={{
                header: {
                    borderBottom: '1px solid rgba(148, 163, 184, 0.10)',
                    color: '#f8fafc',
                },
                body: {
                    color: '#cbd5e1',
                },
            }}
        >
            <Space orientation="vertical" size={20} style={{width: '100%'}}>
                <Paragraph
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
                            key={game.appId}
                            style={{
                                marginInlineEnd: 0,
                                borderRadius: 999,
                                padding: '6px 12px',
                                background: 'rgba(59,130,246,0.10)',
                                border: '1px solid rgba(96,165,250,0.18)',
                                color: '#dbeafe',
                            }}
                        >
                            {game.label} #{game.appId}
                        </Tag>
                    ))}
                </Space>

                <div
                    style={{
                        padding: 16,
                        borderRadius: 18,
                        background: 'rgba(2,6,23,0.28)',
                        border: '1px solid rgba(148,163,184,0.10)',
                    }}
                >
                    <Space orientation="vertical" size={12} style={{width: '100%'}}>
                        <div>
                            <Text style={{color: '#94a3b8', display: 'block', marginBottom: 4}}>
                                Endpoint
                            </Text>
                            <Text
                                style={{
                                    color: '#67e8f9',
                                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                                    fontSize: 14,
                                }}
                            >
                                POST /steam/analyze
                            </Text>
                        </div>

                        <div>
                            <Text style={{color: '#94a3b8', display: 'block', marginBottom: 4}}>
                                Payload
                            </Text>
                            <Text style={{color: '#67e8f9'}}>
                                {`{ appId, limit, language }`}
                            </Text>
                        </div>

                        <div>
                            <Text style={{color: '#94a3b8', display: 'block', marginBottom: 4}}>
                                Output
                            </Text>
                            <Text style={{color: '#cbd5e1'}}>
                                summary, sentiment, praisedFeatures, commonComplaints
                            </Text>
                        </div>
                    </Space>
                </div>
            </Space>
        </Card>
    );
}

export default BackendShowcase;
