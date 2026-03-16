import {Alert} from 'antd';

type ErrorBlockProps = {
    message: string;
};

function ErrorBlock({message}: ErrorBlockProps) {
    return <Alert showIcon type="error" title={message} />;
}

export default ErrorBlock;
