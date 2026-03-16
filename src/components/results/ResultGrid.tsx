import {Col, Row, Space, Typography} from 'antd';
import type {AnalyzeResult} from '../../types/analyze';
import InsightList from './InsightList';
import SentimentProgress from './SentimentProgress';
import SentimentStatCards from './SentimentStatCards';
import SummaryPanel from './SummaryPanel';
import SentimentChart from './SentimentChart';

type ResultGridProps = {
    result: AnalyzeResult;
};

function ResultGrid({result}: ResultGridProps) {
    const {Paragraph, Title} = Typography;

    return (
        <Space orientation="vertical" size={24} style={{width: '100%'}}>
            <div>
                <Title level={3} style={{marginBottom: 8, color: '#f8fafc'}}>
                    Insights for {result.gameTitle}
                </Title>
                <Paragraph
                    style={{
                        marginBottom: 0,
                        color: '#94a3b8',
                        fontSize: 15,
                    }}
                >
                    AI-generated insight report based on sampled Steam reviews and normalized backend data.
                </Paragraph>
            </div>

            <SentimentStatCards sentiment={result.sentiment}/>

            <Row gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                    <SummaryPanel title={result.gameTitle} summary={result.summary} />
                </Col>
                <Col xs={24} lg={12}>
                    <SentimentChart sentiment={result.sentiment} />
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
                <Col xs={24}>
                    <SentimentProgress sentiment={result.sentiment} />
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                    <InsightList title="Most Praised Features" items={result.praisedFeatures}/>
                </Col>
                <Col xs={24} lg={12}>
                    <InsightList title="Common Complaints" items={result.commonComplaints}/>
                </Col>
            </Row>
        </Space>
    );
}

export default ResultGrid;
