import type {AnalyzeQueueDebug, AnalyzeRunDebug} from '../../types/analyze';
import HudOverlay from '../motion/HudOverlay';

type LoadingBlockProps = {
    description?: string;
    progressPercent?: number | null;
    queueDebug?: AnalyzeQueueDebug;
    debug?: AnalyzeRunDebug;
};

const buildBatchSizePreview = (batchSizes: number[] | undefined) => {
    if (!Array.isArray(batchSizes) || batchSizes.length === 0) {
        return null;
    }

    return batchSizes.join(' / ');
};

function LoadingBlock({description, progressPercent, queueDebug, debug}: LoadingBlockProps) {
    const skeletonWidths = ['42%', '100%', '92%', '96%', '88%', '94%', '90%'];
    const resolvedDescription =
        description ?? 'Generating AI insight report from sampled Steam reviews...';
    const actualBatchSizes = buildBatchSizePreview(debug?.batch_sizes);

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

                <div style={{display: 'flex', flexWrap: 'wrap', gap: 10}}>
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

                    {queueDebug ? (
                        <>
                            <span
                                className="hud-chip"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    width: 'fit-content',
                                    borderRadius: 999,
                                    padding: '6px 12px',
                                    border: '1px solid rgba(255,122,24,0.20)',
                                    background: 'rgba(255,122,24,0.10)',
                                    color: '#fed7aa',
                                    fontWeight: 700,
                                }}
                            >
                                Est. {queueDebug.estimated_batch_count} AI batches
                            </span>
                            <span
                                className="hud-chip"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    width: 'fit-content',
                                    borderRadius: 999,
                                    padding: '6px 12px',
                                    border: '1px solid rgba(117,148,144,0.20)',
                                    background: 'rgba(41,58,57,0.22)',
                                    color: '#bdd2cc',
                                    fontWeight: 700,
                                }}
                            >
                                Est. {queueDebug.estimated_review_fetch_pages} Steam pages
                            </span>
                        </>
                    ) : null}

                    {debug ? (
                        <span
                            className="hud-chip"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                width: 'fit-content',
                                borderRadius: 999,
                                padding: '6px 12px',
                                border: '1px solid rgba(153,176,112,0.22)',
                                background: 'rgba(70,88,44,0.22)',
                                color: '#d9e3b4',
                                fontWeight: 700,
                            }}
                        >
                            Actual {debug.batch_count} batches{actualBatchSizes ? ` • ${actualBatchSizes}` : ''}
                        </span>
                    ) : null}
                </div>

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
