import {Grid, Layout, Space, Tag, Typography} from 'antd';
import {RobotOutlined, ThunderboltOutlined} from '@ant-design/icons';

const {Header} = Layout;
const {Text, Title} = Typography;
const {useBreakpoint} = Grid;

type AppPage = 'home' | 'source-review';

type AppHeaderProps = {
    dataSourceMode: 'mock' | 'live';
    currentPage: AppPage;
    onNavigate: (page: AppPage) => void;
};

function AppHeader({dataSourceMode, currentPage, onNavigate}: AppHeaderProps) {
    const screens = useBreakpoint();
    const isMobile = !screens.md;
    const isCompactDesktop = Boolean(screens.md && !screens.xl);
    const sourceBadge =
        dataSourceMode === 'mock'
            ? {
                label: 'Mock Mode',
                border: '1px solid rgba(245,158,11,0.22)',
                background: 'rgba(245,158,11,0.10)',
                color: '#fcd34d',
            }
            : {
                label: 'Live API',
                border: '1px solid rgba(34,197,94,0.22)',
                background: 'rgba(34,197,94,0.10)',
                color: '#86efac',
            };

    return (
        <Header
            style={{
                background: 'rgba(6, 11, 23, 0.78)',
                borderBottom: '1px solid rgba(148, 163, 184, 0.10)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                position: 'sticky',
                top: 0,
                zIndex: 100,
                padding: isMobile ? '14px 16px' : isCompactDesktop ? '0 24px' : '0 32px',
                minHeight: isMobile ? 80 : 88,
                height: 'auto',
                lineHeight: 'normal',
            }}
        >
            <div
                style={{
                    maxWidth: 1280,
                    margin: '0 auto',
                    width: '100%',
                    minHeight: isMobile ? 52 : 88,
                    display: isMobile ? 'flex' : 'grid',
                    gridTemplateColumns: isMobile ? undefined : 'minmax(0, 1fr) auto minmax(0, 1fr)',
                    flexDirection: isMobile ? 'column' : undefined,
                    alignItems: 'center',
                    justifyContent: isMobile ? 'space-between' : undefined,
                    columnGap: isMobile ? undefined : 24,
                    rowGap: isMobile ? 12 : undefined,
                }}
            >
                <Space
                    size={isMobile ? 12 : 16}
                    align="center"
                    style={{
                        minWidth: 0,
                        width: '100%',
                        overflow: 'hidden',
                        justifySelf: isMobile ? undefined : 'start',
                    }}
                >
                    <div
                        style={{
                            width: isMobile ? 44 : 48,
                            height: isMobile ? 44 : 48,
                            borderRadius: 16,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background:
                                'linear-gradient(135deg, rgba(59,130,246,0.22), rgba(168,85,247,0.24))',
                            border: '1px solid rgba(148,163,184,0.16)',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
                            color: '#e2e8f0',
                            fontSize: 20,
                            flexShrink: 0,
                        }}
                    >
                        <RobotOutlined/>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            minWidth: 0,
                            flex: 1,
                            overflow: 'hidden',
                        }}
                    >
                        <Title
                            level={3}
                            style={{
                                margin: 0,
                                color: '#f8fafc',
                                fontSize: isMobile ? 18 : isCompactDesktop ? 18 : 20,
                                lineHeight: 1.2,
                                whiteSpace: isMobile ? 'normal' : 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            AI Game Review Analyzer
                        </Title>

                        {!isMobile && !isCompactDesktop ? (
                            <Text
                                style={{
                                    color: '#94a3b8',
                                    fontSize: 14,
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                Steam Review Intelligence for product-minded teams
                            </Text>
                        ) : null}
                    </div>
                </Space>

                <Space
                    size={10}
                    style={{
                        background: 'rgba(15,23,42,0.55)',
                        border: '1px solid rgba(148,163,184,0.12)',
                        borderRadius: 999,
                        padding: 6,
                        width: isMobile ? '100%' : 'auto',
                        justifyContent: isMobile ? 'space-between' : 'flex-start',
                        justifySelf: isMobile ? undefined : 'center',
                        boxShadow: isMobile ? 'none' : '0 10px 24px rgba(2, 6, 23, 0.18)',
                        flexShrink: 0,
                    }}
                >
                    {[
                        {key: 'home', label: 'Home'},
                        {key: 'source-review', label: 'Source Review'},
                    ].map((item) => {
                        const active = currentPage === item.key;

                        return (
                            <div
                                key={item.key}
                                onClick={() => onNavigate(item.key as AppPage)}
                                style={{
                                    cursor: 'pointer',
                                    borderRadius: 999,
                                    padding: isMobile ? '10px 14px' : isCompactDesktop ? '10px 14px' : '10px 16px',
                                    color: active ? '#f8fafc' : '#94a3b8',
                                    background: active
                                        ? 'linear-gradient(135deg, rgba(59,130,246,0.20), rgba(168,85,247,0.18))'
                                        : 'transparent',
                                    border: active
                                        ? '1px solid rgba(96,165,250,0.18)'
                                        : '1px solid transparent',
                                    fontWeight: active ? 600 : 500,
                                    transition: 'all 0.2s ease',
                                    textAlign: 'center',
                                    flex: isMobile ? 1 : 'none',
                                    minWidth: isMobile ? 0 : isCompactDesktop ? 84 : 96,
                                    fontSize: isCompactDesktop ? 13 : 14,
                                }}
                            >
                                {item.label}
                            </div>
                        );
                    })}
                </Space>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: isMobile ? 'flex-start' : 'flex-end',
                        width: isMobile ? '100%' : '100%',
                        minWidth: 0,
                        justifySelf: isMobile ? undefined : 'end',
                        overflow: 'hidden',
                    }}
                >
                    <Space wrap size={[10, 10]} align="center">
                        <Tag
                            style={{
                                marginInlineEnd: 0,
                                borderRadius: 999,
                                padding: '6px 12px',
                                border: sourceBadge.border,
                                background: sourceBadge.background,
                                color: sourceBadge.color,
                                fontSize: isCompactDesktop ? 13 : 14,
                                fontWeight: 600,
                            }}
                        >
                            {sourceBadge.label}
                        </Tag>

                        <Tag
                            style={{
                                marginInlineEnd: 0,
                                borderRadius: 999,
                                padding: '6px 12px',
                                border: '1px solid rgba(34,211,238,0.20)',
                                background: 'rgba(34,211,238,0.10)',
                                color: '#67e8f9',
                                fontSize: isCompactDesktop ? 13 : 14,
                            }}
                        >
                            AI Powered
                        </Tag>

                        {!isCompactDesktop ? (
                            <Tag
                                icon={<ThunderboltOutlined/>}
                                style={{
                                    marginInlineEnd: 0,
                                    borderRadius: 999,
                                    padding: '6px 12px',
                                    border: '1px solid rgba(168,85,247,0.20)',
                                    background: 'rgba(168,85,247,0.10)',
                                    color: '#d8b4fe',
                                    fontSize: 14,
                                }}
                            >
                                Gaming Analytics
                            </Tag>
                        ) : null}
                    </Space>
                </div>
            </div>
        </Header>
    );
}

export default AppHeader;
