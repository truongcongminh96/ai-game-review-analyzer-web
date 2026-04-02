import {Col, Row, Space, Typography} from 'antd';
import type {AdvancedAnalyzeResult} from '../../types/analyze';
import AdvancedInsightsPanel from './AdvancedInsightsPanel';
import StructuredInsightList from './StructuredInsightList';

type AdvancedResultViewProps = {
    result: AdvancedAnalyzeResult;
};

function AdvancedResultView({result}: AdvancedResultViewProps) {
    const {Text} = Typography;

    return (
        <Space direction="vertical" size={16} style={{width: '100%'}}>
            <div
                className="hud-panel hud-angled-panel"
                style={{
                    padding: 18,
                    borderRadius: 20,
                    border: '1px solid rgba(255,122,24,0.18)',
                    background:
                        'linear-gradient(135deg, rgba(42,23,14,0.78), rgba(13,18,29,0.92))',
                }}
            >
                <Text style={{display: 'block', color: '#fed7aa', marginBottom: 8, fontWeight: 700}}>
                    Advanced analysis profile
                </Text>
                <Text style={{color: '#cbd5e1'}}>
                    Structured `v2` output is rendered directly from praise, issue, and topic signals
                    instead of being collapsed back into the legacy result shape.
                </Text>
            </div>

            <Row gutter={[16, 16]}>
                <Col xs={24} xl={8}>
                    <StructuredInsightList
                        title="Priority Praises"
                        items={result.praises}
                        variant="praise"
                    />
                </Col>
                <Col xs={24} xl={8}>
                    <StructuredInsightList
                        title="Critical Issues"
                        items={result.issues}
                        variant="issue"
                    />
                </Col>
                <Col xs={24} xl={8}>
                    <StructuredInsightList
                        title="Tracked Topics"
                        items={result.topics}
                        variant="topic"
                    />
                </Col>
            </Row>

            {result.report ? (
                <Row gutter={[16, 16]}>
                    <Col xs={24}>
                        <AdvancedInsightsPanel report={result.report} />
                    </Col>
                </Row>
            ) : null}
        </Space>
    );
}

export default AdvancedResultView;
