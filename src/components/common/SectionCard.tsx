import {Card} from 'antd';
import type {ReactNode} from 'react';

type SectionCardProps = {
    title: ReactNode;
    children: ReactNode;
    extra?: ReactNode;
};

function SectionCard({title, children, extra}: SectionCardProps) {
    return (
        <Card title={title} extra={extra} style={{height: '100%'}}>
            {children}
        </Card>
    );
}

export default SectionCard;
