import HudOverlay from '../motion/HudOverlay';

type EmptyBlockProps = {
    title: string;
    description: string;
};

function EmptyBlock({title, description}: EmptyBlockProps) {
    return (
        <section
            className="glass-card hud-shell hud-angled-shell empty-state-card"
            style={{
                borderRadius: 24,
                minHeight: 340,
            }}
        >
            <HudOverlay scanDelay={0.42} />
            <div
                style={{
                    height: '100%',
                    minHeight: 340,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    padding: 32,
                    gap: 14,
                }}
            >
                <span
                    className="hud-chip"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        borderRadius: 999,
                        padding: '6px 12px',
                        border: '1px solid rgba(94,231,255,0.18)',
                        background: 'rgba(94,231,255,0.10)',
                        color: '#d6f9ff',
                        fontWeight: 700,
                    }}
                >
                    System Idle
                </span>

                <div className="hud-divider" style={{width: '100%', textAlign: 'center'}}>
                    <h3
                        className="ui-title-tight"
                        style={{
                            margin: 0,
                            color: '#f8fafc',
                        }}
                    >
                        {title}
                    </h3>
                </div>

                <div
                    aria-hidden="true"
                    style={{
                        position: 'relative',
                        width: 108,
                        height: 108,
                        borderRadius: 28,
                        border: '1px solid rgba(148,163,184,0.16)',
                        background: 'rgba(15,23,42,0.30)',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            width: 58,
                            height: 58,
                            transform: 'translate(-50%, -50%)',
                            borderRadius: '50%',
                            border: '1px solid rgba(148,163,184,0.18)',
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            width: 12,
                            height: 12,
                            transform: 'translate(-50%, -50%)',
                            borderRadius: '50%',
                            background: 'rgba(94,231,255,0.72)',
                            boxShadow: '0 0 20px rgba(94,231,255,0.28)',
                        }}
                    />
                </div>

                <p
                    className="ui-copy-muted"
                    style={{
                        maxWidth: 640,
                        margin: 0,
                        color: '#94a3b8',
                        fontSize: 18,
                        lineHeight: 1.7,
                    }}
                >
                    {description}
                </p>
            </div>
        </section>
    );
}

export default EmptyBlock;
