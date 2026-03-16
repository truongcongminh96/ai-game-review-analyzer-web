import {Card, Empty, Typography} from 'antd';

type EmptyBlockProps = {
    title: string;
    description: string;
};

function EmptyBlock({title, description}: EmptyBlockProps) {
    return (
        <Card>
            <Typography.Title level={4}>{title}</Typography.Title>
            <Empty description={description} />
        </Card>
    );
}

export default EmptyBlock;
