import {Typography} from 'antd';
import SectionCard from '../common/SectionCard';

type SummaryPanelProps = {
    gameTitle: string;
    summary: string;
};

function SummaryPanel({gameTitle, summary}: SummaryPanelProps) {
    const {Paragraph, Text} = Typography;

    return (
        <SectionCard title="AI Summary" extra={<Text type="secondary">{gameTitle}</Text>}>
            <Paragraph style={{fontSize: 15, lineHeight: 1.8, marginBottom: 0}}>
                {summary}
            </Paragraph>
        </SectionCard>
    );
}

export default SummaryPanel;
