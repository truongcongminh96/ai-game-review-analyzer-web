import {
    Alert,
    Button,
    Card,
    Col,
    Input,
    Layout,
    List,
    Row,
    Space,
    Statistic,
    Typography,
} from 'antd';
import {ThunderboltOutlined} from '@ant-design/icons';
import {useState} from 'react';
import {analyzeReviews} from './services/api';

type SentimentBreakdown = {
    positive?: number;
    neutral?: number;
    negative?: number;
};

type AnalyzeResult = {
    aiSummary?: string;
    commonComplaints?: string[];
    common_complaints?: string[];
    praisedFeatures?: string[];
    praised_features?: string[];
    sentiment?: SentimentBreakdown;
    summary?: string;
};

const {Header, Content} = Layout;
const {Title, Paragraph, Text} = Typography;

const defaultSentiment = {
    positive: 62,
    neutral: 18,
    negative: 20,
};

const defaultPraisedFeatures = [
    'Open world exploration',
    'Combat mechanics',
    'Art direction',
    'Boss encounters',
];

const defaultCommonComplaints = [
    'Performance issues',
    'Frame drops in some areas',
    'Difficulty spikes',
    'Repetitive side content',
];

const defaultSummary =
    'Elden Ring is widely praised as a masterpiece with exceptional world design, art direction, and combat systems. Players consistently commend its vast exploration, deep gameplay, and memorable boss encounters. However, the game faces criticism for performance issues, repetitive content, and challenging enemy damage scaling that can make progression frustrating.';

const normalizePercent = (value: number | undefined, fallback: number) => {
    if (typeof value !== 'number' || Number.isNaN(value)) {
        return fallback;
    }

    const scaledValue = value <= 1 ? value * 100 : value;

    return Math.max(0, Math.min(100, Math.round(scaledValue)));
};

function App() {
    const [game, setGame] = useState('');
    const [limit, setLimit] = useState(50);
    const [result, setResult] = useState<AnalyzeResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sentiment = {
        positive: normalizePercent(result?.sentiment?.positive, defaultSentiment.positive),
        neutral: normalizePercent(result?.sentiment?.neutral, defaultSentiment.neutral),
        negative: normalizePercent(result?.sentiment?.negative, defaultSentiment.negative),
    };

    const praisedFeatures =
        result?.praisedFeatures ?? result?.praised_features ?? defaultPraisedFeatures;
    const commonComplaints =
        result?.commonComplaints ?? result?.common_complaints ?? defaultCommonComplaints;
    const summary = result?.summary ?? result?.aiSummary ?? defaultSummary;

    const handleAnalyze = async () => {
        const trimmedGame = game.trim();

        if (!trimmedGame) {
            setError('Please enter a game title.');
            return;
        }

        if (!Number.isFinite(limit) || limit <= 0) {
            setError('Review limit must be greater than 0.');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const data = await analyzeReviews(trimmedGame, limit);

            setResult(data);
        } catch (err) {
            console.error(err);
            setError(
                'Unable to analyze reviews right now. Check that the API server is running on http://localhost:8080.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout style={{minHeight: '100vh', background: '#f5f7fb'}}>
            <Header
                style={{
                    background: '#111827',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 24px',
                }}
            >
                <Title level={3} style={{color: '#fff', margin: 0}}>
                    AI Game Review Analyzer
                </Title>
            </Header>

            <Content
                style={{
                    padding: '32px 24px',
                    maxWidth: 1280,
                    margin: '0 auto',
                    width: '100%',
                }}
            >
                <Space orientation="vertical" size={24} style={{width: '100%'}}>
                    <Card
                        style={{
                            borderRadius: 20,
                            boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                        }}
                    >
                        <Row gutter={[24, 24]} align="middle">
                            <Col xs={24} lg={14}>
                                <Title level={2} style={{marginBottom: 8}}>
                                    Analyze game reviews with AI
                                </Title>
                                <Paragraph style={{fontSize: 16, marginBottom: 0}}>
                                    Extract sentiment, praised features, gameplay issues, and
                                    player feedback insights from Steam reviews.
                                </Paragraph>
                            </Col>

                            <Col xs={24} lg={10}>
                                <Space orientation="vertical" size={12} style={{width: '100%'}}>
                                    <Input
                                        size="large"
                                        placeholder="Enter a game title"
                                        value={game}
                                        onChange={(e) => setGame(e.target.value)}
                                    />
                                    <Space orientation="vertical" size={4} style={{width: '100%'}}>
                                        <Text strong>Review limit</Text>
                                        <Input
                                            size="large"
                                            type="number"
                                            min={1}
                                            value={limit}
                                            onChange={(e) => setLimit(Number(e.target.value) || 0)}
                                        />
                                    </Space>
                                    <Button
                                        type="primary"
                                        size="large"
                                        block
                                        icon={<ThunderboltOutlined/>}
                                        loading={loading}
                                        onClick={handleAnalyze}
                                    >
                                        Analyze reviews
                                    </Button>
                                    {error ? <Alert showIcon type="error" title={error}/> : null}
                                </Space>
                            </Col>
                        </Row>
                    </Card>

                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={8}>
                            <Card>
                                <Statistic title="Positive" value={sentiment.positive} suffix="%"/>
                            </Card>
                        </Col>
                        <Col xs={24} md={8}>
                            <Card>
                                <Statistic title="Neutral" value={sentiment.neutral} suffix="%"/>
                            </Card>
                        </Col>
                        <Col xs={24} md={8}>
                            <Card>
                                <Statistic title="Negative" value={sentiment.negative} suffix="%"/>
                            </Card>
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]}>
                        <Col xs={24} lg={12}>
                            <Card style={{height: '100%'}}>
                                <Title level={4}>AI Summary</Title>
                                <Paragraph style={{fontSize: 15, lineHeight: 1.8}}>
                                    {summary}
                                </Paragraph>
                            </Card>
                        </Col>

                        <Col xs={24} lg={12}>
                            <Card style={{height: '100%'}}>
                                <Title level={4}>Sentiment Overview</Title>
                                <Space orientation="vertical" size={14} style={{width: '100%'}}>
                                    <div>
                                        <Text strong>Positive</Text>
                                        <div className="progress-bar">
                                            <div
                                                className="progress-fill positive"
                                                style={{width: `${sentiment.positive}%`}}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Text strong>Neutral</Text>
                                        <div className="progress-bar">
                                            <div
                                                className="progress-fill neutral"
                                                style={{width: `${sentiment.neutral}%`}}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Text strong>Negative</Text>
                                        <div className="progress-bar">
                                            <div
                                                className="progress-fill negative"
                                                style={{width: `${sentiment.negative}%`}}
                                            />
                                        </div>
                                    </div>
                                </Space>
                            </Card>
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]}>
                        <Col xs={24} lg={12}>
                            <Card style={{height: '100%'}}>
                                <Title level={4}>Most Praised Features</Title>
                                <List
                                    dataSource={praisedFeatures}
                                    renderItem={(item) => <List.Item>- {item}</List.Item>}
                                />
                            </Card>
                        </Col>

                        <Col xs={24} lg={12}>
                            <Card style={{height: '100%'}}>
                                <Title level={4}>Common Complaints</Title>
                                <List
                                    dataSource={commonComplaints}
                                    renderItem={(item) => <List.Item>- {item}</List.Item>}
                                />
                            </Card>
                        </Col>
                    </Row>
                </Space>
            </Content>
        </Layout>
    );
}

export default App;
