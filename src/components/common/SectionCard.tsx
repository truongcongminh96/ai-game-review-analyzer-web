import {Card} from 'antd';
import type {ReactNode} from 'react';
import HudOverlay from '../motion/HudOverlay';

type SectionCardProps = {
    title: ReactNode;
    children: ReactNode;
    extra?: ReactNode;
    kicker?: string;
    icon?: ReactNode;
    iconTone?: 'ember' | 'cyan' | 'hot' | 'violet';
    className?: string;
};

function SectionCard({
    title,
    children,
    extra,
    kicker,
    icon,
    iconTone = 'cyan',
    className,
}: SectionCardProps) {
    const shouldWrapTitle =
        typeof title === 'string' || typeof title === 'number' || Boolean(kicker) || Boolean(icon);

    const renderedTitle = shouldWrapTitle ? (
        <div className="ui-title-row" style={{alignItems: 'center'}}>
            {icon ? <span className={`ui-icon-badge ui-icon-badge-${iconTone}`}>{icon}</span> : null}
            <div className="ui-title-stack">
                {kicker ? <span className="ui-kicker">{kicker}</span> : null}
                {typeof title === 'string' || typeof title === 'number' ? (
                    <span className="ui-title-tight" style={{fontSize: 24}}>
                        {title}
                    </span>
                ) : (
                    title
                )}
            </div>
        </div>
    ) : (
        title
    );

    return (
        <Card
            className={['soft-card', 'hud-shell', 'hud-angled-shell', 'result-section-card', className]
                .filter(Boolean)
                .join(' ')}
            title={renderedTitle}
            extra={extra}
            style={{
                height: '100%',
                borderRadius: 24,
                background:
                    'radial-gradient(circle at top right, rgba(94,231,255,0.09), transparent 26%), radial-gradient(circle at bottom left, rgba(255,90,54,0.10), transparent 30%), linear-gradient(180deg, rgba(8,11,19,0.96), rgba(12,18,29,0.90))',
                border: '1px solid rgba(148,163,184,0.10)',
                boxShadow: '0 20px 52px rgba(2,6,23,0.18)',
            }}
            styles={{
                header: {
                    padding: '18px 22px 16px',
                    borderBottom: '1px solid rgba(148, 163, 184, 0.10)',
                    color: '#f8fafc',
                    minHeight: 82,
                    background:
                        'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.00))',
                },
                body: {
                    color: '#cbd5e1',
                    padding: '22px 22px 24px',
                },
            }}
        >
            <HudOverlay scanDelay={0.72}/>
            {children}
        </Card>
    );
}

export default SectionCard;
