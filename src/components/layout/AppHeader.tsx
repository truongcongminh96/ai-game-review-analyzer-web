import {Grid, Layout, Tag, Typography} from 'antd';
import {ThunderboltOutlined} from '@ant-design/icons';
import {motion} from 'framer-motion';
import {hoverLiftTransition} from '../../motion/animations';

const {Header} = Layout;
const {Text, Title} = Typography;
const {useBreakpoint} = Grid;

type AppPage = 'home' | 'source-review' | 'learning-journey';

type AppHeaderProps = {
    dataSourceMode: 'mock' | 'live';
    currentPage: AppPage;
    onNavigate: (page: AppPage) => void;
};

type BrandGlyphProps = {
    size: number;
};

function BrandGlyph({size}: BrandGlyphProps) {
    return (
        <div
            style={{
                width: size,
                height: size,
                borderRadius: size * 0.34,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background:
                    'radial-gradient(circle at 24% 18%, rgba(255,90,54,0.34), transparent 34%), radial-gradient(circle at 78% 18%, rgba(94,231,255,0.28), transparent 34%), linear-gradient(135deg, rgba(5,7,13,0.98), rgba(19,29,45,0.96))',
                border: '1px solid rgba(255,255,255,0.10)',
                boxShadow:
                    '0 18px 42px rgba(255,90,54,0.18), 0 22px 54px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.08)',
                overflow: 'hidden',
                flexShrink: 0,
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    inset: 5,
                    borderRadius: size * 0.26,
                    background:
                        'linear-gradient(180deg, rgba(15,23,42,0.18), rgba(15,23,42,0.56))',
                    border: '1px solid rgba(148,163,184,0.08)',
                }}
            />

            <svg
                viewBox="0 0 64 64"
                width={size * 0.66}
                height={size * 0.66}
                aria-hidden="true"
                style={{position: 'relative', zIndex: 1}}
            >
                <path
                    d="M21 25.2c1.6-4.3 4.7-6.4 9.3-6.4h3.4c4.6 0 7.7 2.1 9.3 6.4l2 6.8c1.4 4.7-2.1 9.2-6.9 9.2c-2.5 0-4.9-1.2-6.3-3.2h-.2c-1.4 2-3.8 3.2-6.3 3.2c-4.8 0-8.3-4.5-6.9-9.2l2-6.8Z"
                    fill="rgba(15,23,42,0.25)"
                    stroke="#e2e8f0"
                    strokeWidth="2.3"
                    strokeLinejoin="round"
                />
                <path
                    d="M24.5 29.5v7M21 33h7"
                    stroke="#5ee7ff"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                />
                <circle cx="39.5" cy="30.5" r="2.5" fill="#ff7a18"/>
                <circle cx="45" cy="35" r="2.5" fill="#5ee7ff"/>
                <path
                    d="M18.5 19.5c3.2-1.8 6.3-2.8 9.4-2.8"
                    stroke="#ff5a36"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    opacity="0.8"
                />
                <path
                    d="M36.5 16.8c3 .1 6.3 1.2 9.2 3.1"
                    stroke="#5ee7ff"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    opacity="0.8"
                />
                <path
                    d="M26 47.5h4l2.2-3.3l3.4 4.8l4.1-6.1H45"
                    stroke="#f8fafc"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.82"
                />
            </svg>
        </div>
    );
}

function AppHeader({dataSourceMode, currentPage, onNavigate}: AppHeaderProps) {
    const screens = useBreakpoint();
    const isMobile = !screens.md;
    const isCompactDesktop = Boolean(screens.md && !screens.xl);
    const showInlineBadges = Boolean(screens.xl);
    const contextBadge =
        currentPage === 'learning-journey'
            ? {
                label: 'Portfolio Journey',
                border: '1px solid rgba(94,231,255,0.22)',
                background: 'rgba(94,231,255,0.10)',
                color: '#a5f3fc',
            }
            : {
                label: 'Gaming Analytics',
                border: '1px solid rgba(255,90,54,0.22)',
                background: 'rgba(255,90,54,0.10)',
                color: '#fec2b3',
            };
    const sourceBadge =
        dataSourceMode === 'mock'
            ? {
                label: 'Mock Mode',
                border: '1px solid rgba(255,122,24,0.24)',
                background: 'rgba(255,122,24,0.12)',
                color: '#fdba74',
            }
            : {
                label: 'Live API',
                border: '1px solid rgba(94,231,255,0.22)',
                background: 'rgba(94,231,255,0.10)',
                color: '#a5f3fc',
            };
    const titleFontSize = isMobile ? 24 : isCompactDesktop ? 30 : 38;
    const subtitleFontSize = isMobile ? 14 : isCompactDesktop ? 15 : 17;
    const iconSize = isMobile ? 58 : isCompactDesktop ? 68 : 78;
    const brandGap = isMobile ? 14 : isCompactDesktop ? 18 : 22;
    const navItems: Array<{ key: AppPage; label: string }> = [
        {key: 'home', label: 'Home'},
        {key: 'source-review', label: 'Source Review'},
        {key: 'learning-journey', label: 'My AI Journey'},
    ];
    const badgeCluster = (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 12,
                justifyContent: showInlineBadges ? 'flex-end' : 'flex-start',
            }}
        >
            <motion.div
                whileHover={{y: -2, scale: 1.02, filter: 'brightness(1.05)'}}
                transition={hoverLiftTransition}
            >
                <Tag
                    style={{
                        marginInlineEnd: 0,
                        borderRadius: 999,
                        padding: isMobile ? '6px 12px' : '9px 16px',
                        border: sourceBadge.border,
                        background: sourceBadge.background,
                        color: sourceBadge.color,
                        fontSize: isMobile ? 12 : 14,
                        fontWeight: 700,
                        fontFamily: 'var(--font-display)',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    {sourceBadge.label}
                </Tag>
            </motion.div>

            <motion.div
                whileHover={{y: -2, scale: 1.02, filter: 'brightness(1.06)'}}
                transition={hoverLiftTransition}
            >
                <Tag
                    style={{
                        marginInlineEnd: 0,
                        borderRadius: 999,
                        padding: isMobile ? '6px 12px' : '9px 16px',
                        border: '1px solid rgba(34,211,238,0.22)',
                        background: 'rgba(34,211,238,0.10)',
                        color: '#67e8f9',
                        fontSize: isMobile ? 12 : 14,
                        fontWeight: 700,
                        fontFamily: 'var(--font-display)',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    AI Powered
                </Tag>
            </motion.div>

            <motion.div
                whileHover={{y: -2, scale: 1.02, filter: 'brightness(1.05)'}}
                transition={hoverLiftTransition}
            >
                <Tag
                    icon={<ThunderboltOutlined/>}
                    style={{
                        marginInlineEnd: 0,
                        borderRadius: 999,
                        padding: isMobile ? '6px 12px' : '9px 16px',
                        border: contextBadge.border,
                        background: contextBadge.background,
                        color: contextBadge.color,
                        fontSize: isMobile ? 12 : 14,
                        fontWeight: 700,
                        fontFamily: 'var(--font-display)',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    {contextBadge.label}
                </Tag>
            </motion.div>
        </div>
    );

    return (
        <Header
            style={{
                background:
                    'radial-gradient(circle at top left, rgba(255,90,54,0.10), transparent 24%), radial-gradient(circle at top right, rgba(94,231,255,0.10), transparent 26%), linear-gradient(180deg, rgba(5,7,13,0.98), rgba(8,13,21,0.94) 58%, rgba(10,15,24,0.90))',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                position: 'sticky',
                top: 0,
                zIndex: 100,
                minHeight: isMobile ? 134 : 174,
                padding: isMobile ? '16px 16px 18px' : isCompactDesktop ? '18px 24px 20px' : '20px 32px 24px',
                height: 'auto',
                lineHeight: 'normal',
            }}
        >
            <div
                style={{
                    maxWidth: 1280,
                    margin: '0 auto',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: isMobile ? 14 : 18,
                }}
            >
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: showInlineBadges ? 'minmax(0, 1fr) auto' : '1fr',
                        alignItems: 'start',
                        gap: isMobile ? 14 : 24,
                    }}
                >
                    <div
                        style={{
                            minWidth: 0,
                            width: '100%',
                            display: 'flex',
                            alignItems: isMobile ? 'flex-start' : 'center',
                            gap: brandGap,
                        }}
                    >
                        <BrandGlyph size={iconSize}/>

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 4,
                                minWidth: 0,
                                flex: 1,
                                overflow: 'hidden',
                            }}
                        >
                            <Title
                                className="ui-title-tight"
                                level={2}
                                style={{
                                    margin: 0,
                                    color: '#f8fafc',
                                    fontSize: titleFontSize,
                                    fontFamily: 'var(--font-display)',
                                    fontWeight: 800,
                                    lineHeight: 1,
                                    letterSpacing: '0.012em',
                                    textShadow: '0 0 26px rgba(255,90,54,0.12)',
                                    whiteSpace: 'normal',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                AI Game Review Analyzer
                            </Title>

                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 10,
                                    minWidth: 0,
                                    flexWrap: 'wrap',
                                }}
                            >
                                <Text
                                    className="ui-copy-muted"
                                    style={{
                                        color: '#cbd5e1',
                                        fontSize: subtitleFontSize,
                                        fontWeight: 500,
                                        lineHeight: 1.5,
                                        whiteSpace: 'normal',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        maxWidth: isMobile ? '100%' : isCompactDesktop ? 520 : 680,
                                    }}
                                >
                                    Turn raw player feedback into actionable game insight.
                                </Text>
                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 10,
                                    minWidth: 0,
                                    flexWrap: 'wrap',
                                }}
                            >
                                <div
                                    style={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: 999,
                                        background: '#ff5a36',
                                        boxShadow: '0 0 14px rgba(255,90,54,0.52)',
                                        flexShrink: 0,
                                    }}
                                />
                                <Text
                                    className="ui-kicker"
                                    style={{
                                        color: '#fec2b3',
                                        fontSize: isMobile ? 12 : 14,
                                        fontWeight: 700,
                                        fontFamily: 'var(--font-display)',
                                        letterSpacing: '0.1em',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    Steam-ready demo
                                </Text>
                            </div>
                        </div>
                    </div>

                    {showInlineBadges ? (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                minWidth: 0,
                                paddingTop: 8,
                            }}
                        >
                            {badgeCluster}
                        </div>
                    ) : null}
                </div>

                {!showInlineBadges ? <div>{badgeCluster}</div> : null}

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                        paddingTop: isMobile ? 2 : 0,
                    }}
                >
                    <div
                        style={{
                            width: isMobile ? '100%' : 'auto',
                            maxWidth: '100%',
                            padding: 1,
                            borderRadius: 999,
                            background:
                                'linear-gradient(135deg, rgba(255,90,54,0.38), rgba(28,38,50,0.48) 32%, rgba(94,231,255,0.24))',
                            boxShadow: isMobile ? 'none' : '0 16px 40px rgba(0, 0, 0, 0.34)',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                gap: 8,
                                width: '100%',
                                maxWidth: '100%',
                                padding: isMobile ? 6 : 8,
                                borderRadius: 999,
                                background:
                                    'linear-gradient(180deg, rgba(8,12,19,0.98), rgba(13,19,29,0.88))',
                                border: '1px solid rgba(255,255,255,0.08)',
                                justifyContent: isMobile ? 'space-between' : 'flex-start',
                                overflowX: 'auto',
                            }}
                        >
                            {navItems.map((item) => {
                                const active = currentPage === item.key;

                                return (
                                    <motion.button
                                        key={item.key}
                                        type="button"
                                        onClick={() => onNavigate(item.key)}
                                        aria-pressed={active}
                                        whileHover={
                                            active
                                                ? {
                                                    y: -2,
                                                    scale: 1.01,
                                                    boxShadow:
                                                        'inset 0 1px 0 rgba(255,255,255,0.12), 0 18px 28px rgba(255,90,54,0.24)',
                                                }
                                                : {
                                                    y: -2,
                                                    scale: 1.01,
                                                    background: 'rgba(24,32,45,0.92)',
                                                    borderColor: 'rgba(255,255,255,0.12)',
                                                    color: '#e2e8f0',
                                                }
                                        }
                                        whileTap={{scale: 0.985}}
                                        transition={hoverLiftTransition}
                                        style={{
                                            cursor: 'pointer',
                                            appearance: 'none',
                                            outline: 'none',
                                            borderRadius: 999,
                                            padding: isMobile
                                                ? '11px 10px'
                                                : isCompactDesktop
                                                    ? '12px 18px'
                                                    : '13px 22px',
                                            color: active ? '#f8fafc' : '#94a3b8',
                                            background: active
                                                ? 'linear-gradient(135deg, rgba(255,90,54,0.72), rgba(255,122,24,0.42), rgba(94,231,255,0.22))'
                                                : 'transparent',
                                            border: active
                                                ? '1px solid rgba(255,90,54,0.32)'
                                                : '1px solid transparent',
                                            boxShadow: active
                                                ? 'inset 0 1px 0 rgba(255,255,255,0.10), 0 10px 22px rgba(255,90,54,0.24)'
                                                : 'none',
                                            fontFamily: 'var(--font-display)',
                                            fontWeight: active ? 700 : 600,
                                            transition: 'all 0.2s ease',
                                            textAlign: 'center',
                                            flex: isMobile ? 1 : 'none',
                                            minWidth: isMobile ? 0 : isCompactDesktop ? 164 : 182,
                                            fontSize: isMobile ? 15 : 18,
                                            letterSpacing: active ? '0.07em' : '0.06em',
                                            textTransform: 'uppercase',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {item.label}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Header>
    );
}

export default AppHeader;
