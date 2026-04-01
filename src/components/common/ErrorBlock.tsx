import {WarningOutlined} from '@ant-design/icons';

type ErrorBlockProps = {
    message: string;
};

function ErrorBlock({message}: ErrorBlockProps) {
    return (
        <div
            className="hud-shell hud-angled-shell"
            role="alert"
            style={{
                borderRadius: 20,
                border: '1px solid rgba(239,68,68,0.18)',
                background: 'rgba(127,29,29,0.18)',
                color: '#fecaca',
                boxShadow: '0 16px 36px rgba(0,0,0,0.18)',
                padding: '16px 18px',
            }}
        >
            <div style={{display: 'flex', alignItems: 'flex-start', gap: 12}}>
                <WarningOutlined style={{fontSize: 18, marginTop: 2}} />
                <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
                    <strong style={{fontSize: 16}}>Analysis failed</strong>
                    <span>{message}</span>
                </div>
            </div>
        </div>
    );
}

export default ErrorBlock;
