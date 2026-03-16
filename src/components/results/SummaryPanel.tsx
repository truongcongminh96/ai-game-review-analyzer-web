import {Space, Tag, Typography} from 'antd';
import SectionCard from '../common/SectionCard';

type SummaryPanelProps = {
    title: string;
    summary: string;
};

function SummaryPanel({title, summary}: SummaryPanelProps) {
    const {Paragraph, Text} = Typography;

    return (
        <SectionCard
            title="AI Summary"
            extra={
                <Tag
                    style={{
                        marginInlineEnd: 0,
                        borderRadius: 999,
                        background: 'rgba(59,130,246,0.12)',
                        border: '1px solid rgba(96,165,250,0.18)',
                        color: '#bfdbfe',
                        padding: '4px 10px',
                    }}
                >
                    AI Generated
                </Tag>
            }
        >
            <Space orientation="vertical" size={14} style={{width: '100%'}}>
                <Text
                    style={{
                        color: '#94a3b8',
                        fontSize: 14,
                    }}
                >
                    Insight summary for <span style={{color: '#f8fafc'}}>{title}</span>
                </Text>

                <Paragraph
                    style={{
                        marginBottom: 0,
                        color: '#e2e8f0',
                        fontSize: 16,
                        lineHeight: 1.85,
                    }}
                >
                    {summary}
                </Paragraph>
            </Space>
        </SectionCard>
    );
}

export default SummaryPanel;
