import {InputNumber} from 'antd';

type ReviewLimitInputProps = {
    value: number;
    onChange: (value: number) => void;
};

function ReviewLimitInput({value, onChange}: ReviewLimitInputProps) {
    return (
        <InputNumber
            min={5}
            max={100}
            step={5}
            size="large"
            style={{width: '100%'}}
            value={value}
            onChange={(nextValue) => onChange(Number(nextValue) || 0)}
        />
    );
}

export default ReviewLimitInput;
