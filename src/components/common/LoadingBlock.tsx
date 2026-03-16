import {Card, Skeleton} from 'antd';

function LoadingBlock() {
    return (
        <Card>
            <Skeleton active title paragraph={{rows: 6}} />
        </Card>
    );
}

export default LoadingBlock;
