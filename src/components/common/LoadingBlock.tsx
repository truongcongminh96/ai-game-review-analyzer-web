import {Card, Skeleton, Space, Typography} from 'antd';

function LoadingBlock() {
    const {Text} = Typography;

    return (
        <Card
            className="glass-card"
            style={{borderRadius: 24}}
            styles={{
                body: {
                    padding: 28,
                },
            }}
        >
            <Space orientation="vertical" size={18} style={{width: '100%'}}>
                <Text
                    style={{
                        color: '#94a3b8',
                        fontSize: 15,
                    }}
                >
                    Generating AI insight report from sampled Steam reviews...
                </Text>

                <Skeleton
                    active
                    title={{width: '38%'}}
                    paragraph={{rows: 6, width: ['100%', '92%', '96%', '88%', '94%', '90%']}}
                />
            </Space>
        </Card>
    );
}

export default LoadingBlock;
