import {Button} from 'antd';
import {RocketOutlined} from '@ant-design/icons';

type AnalyzeButtonProps = {
    loading: boolean;
    onClick: () => void;
};

function AnalyzeButton({loading, onClick}: AnalyzeButtonProps) {
    return (
        <Button
            type="primary"
            size="large"
            icon={<RocketOutlined />}
            loading={loading}
            onClick={onClick}
            style={{
                width: '100%',
                height: 52,
                borderRadius: 16,
                border: '1px solid rgba(96,165,250,0.22)',
                background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                boxShadow: '0 12px 30px rgba(37, 99, 235, 0.30)',
                fontSize: 16,
                fontWeight: 600,
            }}
        >
            Generate AI Insight Report
        </Button>
    );
}

export default AnalyzeButton;
