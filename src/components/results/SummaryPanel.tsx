import {RobotOutlined} from '@ant-design/icons';
import {Space, Tag, Typography} from 'antd';
import SectionCard from '../common/SectionCard';

type SummaryPanelProps = {
    summary: string;
};

function SummaryPanel({summary}: SummaryPanelProps) {
    const {Paragraph} = Typography;

    return (
        <SectionCard
            title="AI Summary"
            kicker="Briefing Layer"
            icon={<RobotOutlined />}
            iconTone="ember"
            className="result-section-tone-ember"
            extra={
                <Tag
                    className="hud-chip"
                    style={{
                        marginInlineEnd: 0,
                        borderRadius: 999,
                        background: 'rgba(72,86,46,0.22)',
                        border: '1px solid rgba(153,176,112,0.22)',
                        color: '#d9e3b4',
                        padding: '6px 12px',
                        fontWeight: 600,
                    }}
                >
                    Auto Brief
                </Tag>
            }
        >
            <div
                className="hud-panel hud-angled-panel result-summary-shell"
                style={{
                    padding: 20,
                    borderRadius: 20,
                    background: 'linear-gradient(180deg, rgba(5,7,13,0.52), rgba(9,15,26,0.38))',
                    border: '1px solid rgba(148,163,184,0.10)',
                }}
            >
                <Space orientation="vertical" size={14} style={{width: '100%'}}>
                    <Paragraph
                        className="ui-copy-strong"
                        style={{
                            marginBottom: 0,
                            color: '#e2e8f0',
                            fontSize: 16,
                            lineHeight: 1.88,
                        }}
                    >
                        {summary}
                    </Paragraph>
                </Space>
            </div>
        </SectionCard>
    );
}

export default SummaryPanel;
