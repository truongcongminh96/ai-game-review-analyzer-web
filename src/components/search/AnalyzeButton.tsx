import {ThunderboltOutlined} from '@ant-design/icons';
import {Button} from 'antd';

type AnalyzeButtonProps = {
    loading: boolean;
    onClick: () => void;
};

function AnalyzeButton({loading, onClick}: AnalyzeButtonProps) {
    return (
        <Button
            type="primary"
            size="large"
            block
            icon={<ThunderboltOutlined />}
            loading={loading}
            onClick={onClick}
        >
            Analyze reviews
        </Button>
    );
}

export default AnalyzeButton;
