import {
    ExperimentOutlined,
    ThunderboltOutlined,
} from '@ant-design/icons';
import type {AnalysisMode} from '../../types/analyze';

type AnalysisModeSwitchProps = {
    value: AnalysisMode;
    onChange: (mode: AnalysisMode) => void;
};

type AnalysisModeOption = {
    value: AnalysisMode;
    title: string;
    subtitle: string;
    caption: string;
    badge: string;
    icon: typeof ThunderboltOutlined;
    accent: {
        border: string;
        background: string;
        glow: string;
        iconBackground: string;
        iconColor: string;
        badgeBackground: string;
        badgeBorder: string;
        badgeColor: string;
    };
};

const OPTIONS: AnalysisModeOption[] = [
    {
        value: 'standard',
        title: 'Standard',
        subtitle: 'Fast analysis with instant results',
        caption: 'Stable',
        badge: 'v1',
        icon: ThunderboltOutlined,
        accent: {
            border: 'rgba(94,231,255,0.22)',
            background:
                'linear-gradient(135deg, rgba(24,53,63,0.92), rgba(10,18,28,0.92))',
            glow: '0 18px 36px rgba(20,85,108,0.18)',
            iconBackground: 'rgba(94,231,255,0.14)',
            iconColor: '#d6f9ff',
            badgeBackground: 'rgba(94,231,255,0.12)',
            badgeBorder: 'rgba(94,231,255,0.24)',
            badgeColor: '#d6f9ff',
        },
    },
    {
        value: 'advanced',
        title: 'Advanced',
        subtitle: 'Deeper insights with AI reasoning, evidence, and history tracking',
        caption: 'Beta',
        badge: 'v2',
        icon: ExperimentOutlined,
        accent: {
            border: 'rgba(255,122,24,0.24)',
            background:
                'linear-gradient(135deg, rgba(63,35,18,0.92), rgba(16,18,28,0.92))',
            glow: '0 18px 36px rgba(132,66,16,0.18)',
            iconBackground: 'rgba(255,122,24,0.14)',
            iconColor: '#fed7aa',
            badgeBackground: 'rgba(255,122,24,0.12)',
            badgeBorder: 'rgba(255,122,24,0.24)',
            badgeColor: '#fed7aa',
        },
    },
];

function AnalysisModeSwitch({value, onChange}: AnalysisModeSwitchProps) {
    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
            <label
                className="ui-field-label"
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    color: '#cbd5e1',
                    fontWeight: 600,
                }}
            >
                Analysis mode
            </label>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: 12,
                }}
            >
                {OPTIONS.map((option) => {
                    const Icon = option.icon;
                    const isActive = value === option.value;

                    return (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => onChange(option.value)}
                            style={{
                                textAlign: 'left',
                                borderRadius: 20,
                                border: `1px solid ${isActive ? option.accent.border : 'rgba(255,255,255,0.08)'}`,
                                background: isActive
                                    ? option.accent.background
                                    : 'linear-gradient(180deg, rgba(10,14,22,0.88), rgba(14,18,28,0.72))',
                                padding: 16,
                                cursor: 'pointer',
                                boxShadow: isActive ? option.accent.glow : 'none',
                                transition: 'transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 14,
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: 12,
                                }}
                            >
                                <span
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 14,
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: 18,
                                        background: option.accent.iconBackground,
                                        color: option.accent.iconColor,
                                        border: `1px solid ${option.accent.border}`,
                                    }}
                                >
                                    <Icon />
                                </span>

                                <span
                                    className="hud-chip"
                                    style={{
                                        borderRadius: 999,
                                        padding: '4px 10px',
                                        background: option.accent.badgeBackground,
                                        border: `1px solid ${option.accent.badgeBorder}`,
                                        color: option.accent.badgeColor,
                                        fontWeight: 700,
                                        fontSize: 12,
                                        letterSpacing: '0.08em',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    {option.caption}
                                </span>
                            </div>

                            <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
                                <span style={{color: '#f8fafc', fontSize: 18, fontWeight: 700}}>
                                    {option.title}
                                </span>
                                <span style={{color: '#b6c2d3', lineHeight: 1.6}}>
                                    {option.subtitle}
                                </span>
                            </div>

                            <span
                                style={{
                                    color: isActive ? option.accent.iconColor : '#7dd3fc',
                                    fontSize: 12,
                                    fontWeight: 700,
                                    letterSpacing: '0.12em',
                                    textTransform: 'uppercase',
                                }}
                            >
                                {option.badge}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default AnalysisModeSwitch;
