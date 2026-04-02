import {TagsOutlined} from '@ant-design/icons';
import {Col, Row, Space, Tag, Typography} from 'antd';
import type {StandardAnalyzeResult} from '../../types/analyze';
import SectionCard from '../common/SectionCard';
import InsightList from './InsightList';

type StandardResultViewProps = {
    result: StandardAnalyzeResult;
};

function StandardResultView({result}: StandardResultViewProps) {
    const {Text} = Typography;

    return (
        <Space direction="vertical" size={16} style={{width: '100%'}}>
            <Row gutter={[16, 16]}>
                <Col xs={24}>
                    <SectionCard
                        title="Key Topics"
                        kicker="Recon Tags"
                        icon={<TagsOutlined />}
                        iconTone="hot"
                        className="result-section-tone-hot"
                    >
                        <Space orientation="vertical" size={18} style={{width: '100%'}}>
                            <Text className="ui-copy-muted" style={{marginBottom: 0}}>
                                Recurring discussion clusters extracted from the sampled review set.
                            </Text>

                            {result.topics.length ? (
                                <div className="result-topic-wrap">
                                    {result.topics.map((topic) => (
                                        <Tag
                                            className="hud-chip result-topic-chip"
                                            key={topic}
                                            style={{
                                                marginInlineEnd: 0,
                                                padding: '10px 16px',
                                                borderRadius: 999,
                                                border: '1px solid rgba(126,145,99,0.22)',
                                                background:
                                                    'linear-gradient(135deg, rgba(74,88,48,0.30), rgba(112,87,42,0.18))',
                                                color: '#d8e1b1',
                                                boxShadow: '0 10px 22px rgba(58,69,36,0.18)',
                                            }}
                                        >
                                            {topic}
                                        </Tag>
                                    ))}
                                </div>
                            ) : (
                                <Text style={{color: '#94a3b8'}}>No topics available.</Text>
                            )}
                        </Space>
                    </SectionCard>
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                    <InsightList
                        title="Most Loved"
                        items={result.praisedFeatures}
                        variant="love"
                    />
                </Col>
                <Col xs={24} lg={12}>
                    <InsightList
                        title="Most Complained"
                        items={result.commonComplaints}
                        variant="complaint"
                    />
                </Col>
            </Row>
        </Space>
    );
}

export default StandardResultView;
