import {
  Layout,
  Typography,
  Card,
  Input,
  Button,
  Row,
  Col,
  Statistic,
  Space,
  List,
} from 'antd';
import { ThunderboltOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const praisedFeatures = [
  'Open world exploration',
  'Combat mechanics',
  'Art direction',
  'Boss encounters',
];

const commonComplaints = [
  'Performance issues',
  'Frame drops in some areas',
  'Difficulty spikes',
  'Repetitive side content',
];

function App() {
  return (
      <Layout style={{ minHeight: '100vh', background: '#f5f7fb' }}>
        <Header
            style={{
              background: '#111827',
              display: 'flex',
              alignItems: 'center',
              padding: '0 24px',
            }}
        >
          <Title level={3} style={{ color: '#fff', margin: 0 }}>
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
          <Space direction="vertical" size={24} style={{ width: '100%' }}>
            <Card
                style={{
                  borderRadius: 20,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                }}
            >
              <Row gutter={[24, 24]} align="middle">
                <Col xs={24} lg={14}>
                  <Title level={2} style={{ marginBottom: 8 }}>
                    Analyze game reviews with AI
                  </Title>
                  <Paragraph style={{ fontSize: 16, marginBottom: 0 }}>
                    Extract sentiment, praised features, gameplay issues, and
                    player feedback insights from Steam reviews.
                  </Paragraph>
                </Col>

                <Col xs={24} lg={10}>
                  <Space direction="vertical" size={12} style={{ width: '100%' }}>
                    <Input
                        size="large"
                        placeholder="Enter Steam game name or app id"
                        defaultValue="Elden Ring"
                    />
                    <Input
                        size="large"
                        placeholder="Number of reviews"
                        defaultValue="500"
                    />
                    <Button
                        type="primary"
                        size="large"
                        icon={<ThunderboltOutlined />}
                    >
                      Analyze Reviews
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Card>

            <Row gutter={[16, 16]}>
              <Col xs={24} md={8}>
                <Card>
                  <Statistic title="Positive" value={62} suffix="%" />
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card>
                  <Statistic title="Neutral" value={18} suffix="%" />
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card>
                  <Statistic title="Negative" value={20} suffix="%" />
                </Card>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col xs={24} lg={12}>
                <Card style={{ height: '100%' }}>
                  <Title level={4}>AI Summary</Title>
                  <Paragraph style={{ fontSize: 15, lineHeight: 1.8 }}>
                    Elden Ring is widely praised as a masterpiece with exceptional
                    world design, art direction, and combat systems. Players
                    consistently commend its vast exploration, deep gameplay, and
                    memorable boss encounters. However, the game faces criticism
                    for performance issues, repetitive content, and challenging
                    enemy damage scaling that can make progression frustrating.
                  </Paragraph>
                </Card>
              </Col>

              <Col xs={24} lg={12}>
                <Card style={{ height: '100%' }}>
                  <Title level={4}>Sentiment Overview</Title>
                  <Space direction="vertical" size={14} style={{ width: '100%' }}>
                    <div>
                      <Text strong>Positive</Text>
                      <div className="progress-bar">
                        <div
                            className="progress-fill positive"
                            style={{ width: '62%' }}
                        />
                      </div>
                    </div>

                    <div>
                      <Text strong>Neutral</Text>
                      <div className="progress-bar">
                        <div
                            className="progress-fill neutral"
                            style={{ width: '18%' }}
                        />
                      </div>
                    </div>

                    <div>
                      <Text strong>Negative</Text>
                      <div className="progress-bar">
                        <div
                            className="progress-fill negative"
                            style={{ width: '20%' }}
                        />
                      </div>
                    </div>
                  </Space>
                </Card>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col xs={24} lg={12}>
                <Card style={{ height: '100%' }}>
                  <Title level={4}>Most Praised Features</Title>
                  <List
                      dataSource={praisedFeatures}
                      renderItem={(item) => <List.Item>- {item}</List.Item>}
                  />
                </Card>
              </Col>

              <Col xs={24} lg={12}>
                <Card style={{ height: '100%' }}>
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
