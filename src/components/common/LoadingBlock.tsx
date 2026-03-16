import {Card, Skeleton, Space, Typography} from 'antd';

function LoadingBlock() {
    const {Text, Title} = Typography;

    return (
        <Card
            className="glass-card loading-card"
            style={{borderRadius: 24}}
            styles={{
                body: {
                    padding: 28,
                },
            }}
        >
            <Space orientation="vertical" size={20} style={{width: '100%'}}>
                <div className="analyze-orb" />

                <Space orientation="vertical" size={6}>
                    <Title level={4} style={{margin: 0, color: '#f8fafc'}}>
                        Analyzing player feedback
                    </Title>
                    <Text
                        style={{
                            color: '#94a3b8',
                            fontSize: 15,
                        }}
                    >
                        Generating AI insight report from sampled Steam reviews...
                    </Text>
                </Space>

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
