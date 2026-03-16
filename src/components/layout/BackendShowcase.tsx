import {List, Space, Tag, Typography} from 'antd';
import {mockAnalyzeResult} from '../../data/mock/mockAnalyzeResult';
import {mockGames} from '../../data/mock/mockGames';
import {API_BASE_URL} from '../../utils/constants';
import SectionCard from '../common/SectionCard';

function BackendShowcase() {
    const {Paragraph, Text} = Typography;
    const checklist = [
        `POST ${API_BASE_URL}/steam/analyze`,
        'Payload: { appId, limit, language }',
        'Response supports camelCase and snake_case fields',
    ];

    return (
        <SectionCard title="Backend Contract">
            <Paragraph>
                The new source base is wired to the Steam analyze endpoint and normalizes the
                response before rendering the UI.
            </Paragraph>

            <Space wrap size={[8, 8]} style={{marginBottom: 16}}>
                {mockGames.slice(0, 4).map((game) => (
                    <Tag key={game.appId}>
                        {game.label} #{game.appId}
                    </Tag>
                ))}
            </Space>

            <List
                size="small"
                dataSource={checklist}
                renderItem={(item) => <List.Item>{item}</List.Item>}
            />

            <Text type="secondary">
                Preview fallback summary length: {mockAnalyzeResult.summary.length} characters.
            </Text>
        </SectionCard>
    );
}

export default BackendShowcase;
