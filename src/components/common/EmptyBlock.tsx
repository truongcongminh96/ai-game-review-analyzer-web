import {Card, Empty, Space, Tag, Typography} from 'antd';
import HudOverlay from '../motion/HudOverlay';

type EmptyBlockProps = {
    title: string;
    description: string;
};

function EmptyBlock({title, description}: EmptyBlockProps) {
    const {Paragraph, Title} = Typography;

    return (
        <Card
            className="glass-card hud-shell hud-angled-shell empty-state-card"
            style={{
                borderRadius: 24,
                minHeight: 340,
            }}
            styles={{
                body: {
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    padding: 32,
                }
            }}
        >
            <HudOverlay scanDelay={0.42} />
            <Space orientation="vertical" size={14} style={{width: '100%', alignItems: 'center'}}>
                <Tag
                    className="hud-chip"
                    style={{
                        margin: 0,
                        borderRadius: 999,
                        padding: '6px 12px',
                        border: '1px solid rgba(94,231,255,0.18)',
                        background: 'rgba(94,231,255,0.10)',
                        color: '#d6f9ff',
                        fontWeight: 700,
                    }}
                >
                    System Idle
                </Tag>

                <div className="hud-divider" style={{width: '100%', textAlign: 'center'}}>
                    <Title
                        className="ui-title-tight"
                        level={3}
                        style={{
                            marginBottom: 0,
                            color: '#f8fafc',
                        }}
                    >
                        {title}
                    </Title>
                </div>

                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    styles={{
                        image: {
                            opacity: 0.22,
                            filter: 'grayscale(0.2)',
                        },
                        description: {
                            display: 'none',
                        },
                    }}
                />

                <Paragraph
                    className="ui-copy-muted"
                    style={{
                        maxWidth: 640,
                        marginBottom: 0,
                        color: '#94a3b8',
                        fontSize: 18,
                        lineHeight: 1.7,
                    }}
                >
                    {description}
                </Paragraph>
            </Space>
        </Card>
    );
}

export default EmptyBlock;
