import {InputNumber, Space, Typography} from 'antd';

type ReviewLimitInputProps = {
    value: number;
    onChange: (value: number) => void;
};

function ReviewLimitInput({value, onChange}: ReviewLimitInputProps) {
    return (
        <Space orientation="vertical" size={4} style={{width: '100%'}}>
            <Typography.Text strong>Review limit</Typography.Text>
            <InputNumber
                size="large"
                min={1}
                max={1000}
                value={value}
                onChange={(nextValue) => onChange(typeof nextValue === 'number' ? nextValue : 0)}
                style={{width: '100%'}}
            />
        </Space>
    );
}

export default ReviewLimitInput;
