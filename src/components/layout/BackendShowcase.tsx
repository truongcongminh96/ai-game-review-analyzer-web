import {ApiOutlined, BarChartOutlined, CodeOutlined} from '@ant-design/icons';
import HudOverlay from '../motion/HudOverlay';

function BackendShowcase() {
    const games = [
        {label: 'Elden Ring', appId: '1245620'},
        {label: 'Cyberpunk 2077', appId: '1091500'},
        {label: "Baldur's Gate 3", appId: '1086940'},
        {label: 'Hades', appId: '1145360'},
    ];

    return (
        <section
            className="soft-card hud-shell hud-angled-shell backend-showcase-card"
            style={{
                height: '100%',
                borderRadius: 24,
                background:
                    'radial-gradient(circle at top right, rgba(94,231,255,0.10), transparent 24%), radial-gradient(circle at bottom left, rgba(255,90,54,0.12), transparent 26%), linear-gradient(180deg, rgba(7,11,19,0.96), rgba(13,19,31,0.90))',
            }}
        >
            <div
                style={{
                    padding: '24px 24px 0',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                }}
            >
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
            </div>
            <HudOverlay reticlePosition="bottom-left" scanDelay={0.5} />
            <div style={{display: 'flex', flexDirection: 'column', gap: 20, width: '100%', padding: 24}}>
                <p
                    className="ui-copy-muted"
                    style={{
                        margin: 0,
                        color: '#cbd5e1',
                        fontSize: 16,
                        lineHeight: 1.8,
                    }}
                >
                    The new source base is wired to the Steam analyze endpoint and
                    normalizes the response before rendering the UI.
                </p>

                <div style={{display: 'flex', flexWrap: 'wrap', gap: 10}}>
                    {games.map((game) => (
                        <span
                            className="hud-chip"
                            key={game.appId}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                borderRadius: 999,
                                padding: '6px 12px',
                                background: 'rgba(255,90,54,0.10)',
                                border: '1px solid rgba(255,90,54,0.18)',
                                color: '#ffd7c9',
                            }}
                        >
                            {game.label} #{game.appId}
                        </span>
                    ))}
                </div>

                <div
                    className="hud-panel hud-angled-panel"
                    style={{
                        padding: 16,
                        borderRadius: 18,
                        background: 'rgba(5,7,13,0.54)',
                        border: '1px solid rgba(255,255,255,0.08)',
                    }}
                >
                    <div style={{display: 'flex', flexDirection: 'column', gap: 12, width: '100%'}}>
                        <div>
                            <span
                                className="ui-field-label"
                                style={{marginBottom: 4, display: 'inline-flex', alignItems: 'center', gap: 8}}
                            >
                                <ApiOutlined />
                                Endpoint
                            </span>
                            <span
                                style={{
                                    display: 'block',
                                    color: '#5ee7ff',
                                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                                    fontSize: 14,
                                }}
                            >
                                POST /steam/analyze
                            </span>
                        </div>

                        <div>
                            <span
                                className="ui-field-label"
                                style={{marginBottom: 4, display: 'inline-flex', alignItems: 'center', gap: 8}}
                            >
                                <CodeOutlined />
                                Payload
                            </span>
                            <span style={{color: '#ffb59d'}}>
                                {`{ appId, limit, language }`}
                            </span>
                        </div>

                        <div>
                            <span
                                className="ui-field-label"
                                style={{marginBottom: 4, display: 'inline-flex', alignItems: 'center', gap: 8}}
                            >
                                <BarChartOutlined />
                                Output
                            </span>
                            <span style={{color: '#cbd5e1'}}>
                                summary, sentiment, praised_features, common_issues, topics
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BackendShowcase;
