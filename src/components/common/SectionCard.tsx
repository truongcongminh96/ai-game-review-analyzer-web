import {Card} from 'antd';
import type {ReactNode} from 'react';

type SectionCardProps = {
    title: ReactNode;
    children: ReactNode;
    extra?: ReactNode;
};

function SectionCard({title, children, extra}: SectionCardProps) {
    return (
        <Card
            className="soft-card"
            title={title}
            extra={extra}
            style={{
                height: '100%',
                borderRadius: 22,
            }}
            styles={{
                header: {
                    borderBottom: '1px solid rgba(148, 163, 184, 0.12)',
                    color: '#f8fafc',
                    minHeight: 64,
                },
                body: {
                    color: '#cbd5e1',
                },
            }}
        >
            {children}
        </Card>
    );
}

export default SectionCard;
