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
                min={5}
                max={100}
                step={5}
                size="large"
                style={{width: '100%'}}
                value={value}
                onChange={(nextValue) => onChange(Number(nextValue) || 0)}
            />
        </Space>
    );
}

export default ReviewLimitInput;
