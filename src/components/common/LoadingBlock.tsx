import {Card, Skeleton, Space, Tag, Typography} from 'antd';
import HudOverlay from '../motion/HudOverlay';

function LoadingBlock() {
    const {Text, Title} = Typography;

    return (
        <Card
            className="glass-card loading-card hud-shell hud-angled-shell"
            style={{borderRadius: 24}}
            styles={{
                body: {
                    padding: 28,
                },
            }}
        >
            <HudOverlay reticlePosition="bottom-left" scanDelay={0.32} />
            <Space orientation="vertical" size={20} style={{width: '100%'}}>
                <div className="analyze-orb" />

                <Tag
                    className="hud-chip"
                    style={{
                        width: 'fit-content',
                        margin: 0,
                        borderRadius: 999,
                        padding: '6px 12px',
                        border: '1px solid rgba(255,90,54,0.18)',
                        background: 'rgba(255,90,54,0.10)',
                        color: '#ffd7c9',
                        fontWeight: 700,
                    }}
                >
                    Inference Pipeline Active
                </Tag>

                <div className="hud-divider">
                    <Space orientation="vertical" size={6}>
                        <Title level={4} style={{margin: 0, color: '#f8fafc'}}>
                            Analyzing player feedback
                        </Title>
                        <Text
                            className="ui-copy-muted"
                            style={{
                                color: '#94a3b8',
                                fontSize: 15,
                            }}
                        >
                            Generating AI insight report from sampled Steam reviews...
                        </Text>
                    </Space>
                </div>

                <Skeleton
                    active
                    title={{width: '42%'}}
                    paragraph={{rows: 6, width: ['100%', '92%', '96%', '88%', '94%', '90%']}}
                />
            </Space>
        </Card>
    );
}

export default LoadingBlock;
