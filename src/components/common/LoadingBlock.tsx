import HudOverlay from '../motion/HudOverlay';

type LoadingBlockProps = {
    description?: string;
    progressPercent?: number | null;
};

function LoadingBlock({description, progressPercent}: LoadingBlockProps) {
    const skeletonWidths = ['42%', '100%', '92%', '96%', '88%', '94%', '90%'];
    const resolvedDescription =
        description ?? 'Generating AI insight report from sampled Steam reviews...';

    return (
        <section
            className="glass-card loading-card hud-shell hud-angled-shell"
            style={{borderRadius: 24, padding: 28}}
        >
            <HudOverlay reticlePosition="bottom-left" scanDelay={0.32} />
            <div style={{display: 'flex', flexDirection: 'column', gap: 20, width: '100%'}}>
                <div className="analyze-radar" aria-hidden="true">
                    <div className="analyze-radar-ring analyze-radar-ring-outer" />
                    <div className="analyze-radar-ring analyze-radar-ring-inner" />
                    <div className="analyze-radar-crosshair analyze-radar-crosshair-x" />
                    <div className="analyze-radar-crosshair analyze-radar-crosshair-y" />
                    <div className="analyze-radar-sweep" />
                    <div className="analyze-radar-core" />
                </div>

                <span
                    className="hud-chip"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        width: 'fit-content',
                        borderRadius: 999,
                        padding: '6px 12px',
                        border: '1px solid rgba(255,90,54,0.18)',
                        background: 'rgba(255,90,54,0.10)',
                        color: '#ffd7c9',
                        fontWeight: 700,
                    }}
                >
                    Inference Pipeline Active
                </span>

                {typeof progressPercent === 'number' ? (
                    <span
                        className="hud-chip"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            width: 'fit-content',
                            borderRadius: 999,
                            padding: '6px 12px',
                            border: '1px solid rgba(94,231,255,0.22)',
                            background: 'rgba(94,231,255,0.12)',
                            color: '#d6f9ff',
                            fontWeight: 700,
                        }}
                    >
                        Progress {progressPercent}%
                    </span>
                ) : null}

                <div className="hud-divider">
                    <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
                        <h4 style={{margin: 0, color: '#f8fafc', fontSize: 26}}>
                            Analyzing player feedback
                        </h4>
                        <p
                            className="ui-copy-muted"
                            style={{
                                color: '#94a3b8',
                                fontSize: 15,
                                margin: 0,
                            }}
                        >
                            {resolvedDescription}
                        </p>
                    </div>
                </div>

                <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
                    {skeletonWidths.map((width, index) => (
                        <div
                            key={`${width}-${index}`}
                            style={{
                                width,
                                height: index === 0 ? 18 : 14,
                                borderRadius: 999,
                                background:
                                    'linear-gradient(90deg, rgba(51,65,85,0.35) 25%, rgba(71,85,105,0.55) 37%, rgba(51,65,85,0.35) 63%)',
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default LoadingBlock;
