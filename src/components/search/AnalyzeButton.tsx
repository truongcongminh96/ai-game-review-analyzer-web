import {Button} from 'antd';
import {RocketOutlined} from '@ant-design/icons';
import type {AnalysisMode} from '../../types/analyze';

type AnalyzeButtonProps = {
    loading: boolean;
    mode: AnalysisMode;
    onClick: () => void | Promise<void>;
};

function AnalyzeButton({loading, mode, onClick}: AnalyzeButtonProps) {
    return (
        <Button
            type="primary"
            size="large"
            icon={<RocketOutlined />}
            loading={loading}
            onClick={onClick}
            style={{
                width: '100%',
                height: 56,
                borderRadius: 18,
                border: '1px solid rgba(255,90,54,0.28)',
                background:
                    'linear-gradient(135deg, rgba(255,90,54,1), rgba(255,122,24,0.94) 58%, rgba(94,231,255,0.78))',
                boxShadow:
                    '0 18px 34px rgba(255, 90, 54, 0.28), inset 0 1px 0 rgba(255,255,255,0.14)',
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
            }}
        >
            {mode === 'advanced' ? 'Generate Advanced Insight Report' : 'Generate AI Insight Report'}
        </Button>
    );
}

export default AnalyzeButton;
