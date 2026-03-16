import {Layout, Space, Tag, Typography} from 'antd';
import {RobotOutlined, ThunderboltOutlined} from '@ant-design/icons';

const {Header} = Layout;
const {Text, Title} = Typography;

type AppPage = 'home' | 'source-review';

type AppHeaderProps = {
    dataSourceMode: 'mock' | 'live';
    currentPage: AppPage;
    onNavigate: (page: AppPage) => void;
};

function AppHeader({dataSourceMode, currentPage, onNavigate}: AppHeaderProps) {
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
                padding: '0 24px',
                height: 80,
                lineHeight: 'normal',
            }}
        >
            <div
                style={{
                    maxWidth: 1280,
                    margin: '0 auto',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 20,
                }}
            >
                <Space size={16} align="center">
                    <div
                        style={{
                            width: 48,
                            height: 48,
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
                        <RobotOutlined />
                    </div>

                    <div style={{display: 'flex', flexDirection: 'column', gap: 2}}>
                        <Title
                            level={3}
                            style={{
                                margin: 0,
                                color: '#f8fafc',
                                fontSize: 20,
                                lineHeight: 1.2,
                            }}
                        >
                            AI Game Review Analyzer
                        </Title>

                        <Text
                            style={{
                                color: '#94a3b8',
                                fontSize: 14,
                            }}
                        >
                            Steam Review Intelligence for product-minded teams
                        </Text>
                    </div>
                </Space>

                <Space
                    size={10}
                    style={{
                        background: 'rgba(15,23,42,0.55)',
                        border: '1px solid rgba(148,163,184,0.12)',
                        borderRadius: 999,
                        padding: 6,
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
                                    padding: '10px 16px',
                                    color: active ? '#f8fafc' : '#94a3b8',
                                    background: active
                                        ? 'linear-gradient(135deg, rgba(59,130,246,0.20), rgba(168,85,247,0.18))'
                                        : 'transparent',
                                    border: active
                                        ? '1px solid rgba(96,165,250,0.18)'
                                        : '1px solid transparent',
                                    fontWeight: active ? 600 : 500,
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                {item.label}
                            </div>
                        );
                    })}
                </Space>

                <Space wrap size={[10, 10]} align="center">
                    <Tag
                        style={{
                            marginInlineEnd: 0,
                            borderRadius: 999,
                            padding: '6px 12px',
                            border: sourceBadge.border,
                            background: sourceBadge.background,
                            color: sourceBadge.color,
                            fontSize: 14,
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
                            fontSize: 14,
                        }}
                    >
                        AI Powered
                    </Tag>

                    <Tag
                        icon={<ThunderboltOutlined />}
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

                    <Tag
                        style={{
                            marginInlineEnd: 0,
                            borderRadius: 999,
                            padding: '6px 12px',
                            border: '1px solid rgba(96,165,250,0.20)',
                            background: 'rgba(96,165,250,0.10)',
                            color: '#bfdbfe',
                            fontSize: 14,
                        }}
                    >
                        Portfolio Demo
                    </Tag>
                </Space>
            </div>
        </Header>
    );
}

export default AppHeader;
