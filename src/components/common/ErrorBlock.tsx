import {Alert} from 'antd';
import {WarningOutlined} from '@ant-design/icons';

type ErrorBlockProps = {
    message: string;
};

function ErrorBlock({message}: ErrorBlockProps) {
    return (
        <Alert
            className="hud-shell hud-angled-shell"
            showIcon
            icon={<WarningOutlined />}
            type="error"
            title="Analysis failed"
            description={message}
            style={{
                borderRadius: 20,
                border: '1px solid rgba(239,68,68,0.18)',
                background: 'rgba(127,29,29,0.18)',
                color: '#fecaca',
                boxShadow: '0 16px 36px rgba(0,0,0,0.18)',
            }}
        />
    );
}

export default ErrorBlock;
