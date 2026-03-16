import {Card, Empty, Typography} from 'antd';

type EmptyBlockProps = {
    title: string;
    description: string;
};

function EmptyBlock({title, description}: EmptyBlockProps) {
    const {Paragraph, Title} = Typography;

    return (
        <Card
            className="glass-card"
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
            <Title
                level={3}
                style={{
                    marginBottom: 12,
                    color: '#f8fafc',
                }}
            >
                {title}
            </Title>

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
        </Card>
    );
}

export default EmptyBlock;
