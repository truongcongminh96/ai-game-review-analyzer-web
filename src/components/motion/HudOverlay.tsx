type HudOverlayProps = {
    reticlePosition?: 'top-right' | 'bottom-left';
    scanDelay?: number;
    zIndex?: number;
};

function HudOverlay({
    reticlePosition = 'top-right',
    scanDelay = 0,
    zIndex = 0,
}: HudOverlayProps) {
    return (
        <>
            <div
                aria-hidden="true"
                className="hud-scan-sweep"
                style={{animationDelay: `${scanDelay}s`, zIndex}}
            />
            <div
                aria-hidden="true"
                className={`hud-reticle ${
                    reticlePosition === 'bottom-left'
                        ? 'hud-reticle-bottom-left'
                        : 'hud-reticle-top-right'
                }`}
                style={{zIndex}}
            />
        </>
    );
}

export default HudOverlay;
