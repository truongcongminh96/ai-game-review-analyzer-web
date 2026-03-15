import { Layout, Typography, Card, Input, Button, Row, Col } from "antd"
import { ThunderboltOutlined } from "@ant-design/icons"

const { Header, Content } = Layout
const { Title, Paragraph } = Typography

function App() {
  return (
      <Layout style={{ minHeight: "100vh" }}>
        <Header style={{ background: "#111827", display: "flex", alignItems: "center" }}>
          <Title style={{ color: "#fff", margin: 0 }} level={3}>
            AI Game Review Analyzer
          </Title>
        </Header>

        <Content style={{ padding: 40, maxWidth: 1200, margin: "0 auto" }}>
          <Card>
            <Title level={2}>Analyze Game Reviews with AI</Title>

            <Paragraph>
              Extract sentiment, praised features, and gameplay insights from player reviews.
            </Paragraph>

            <Row gutter={16}>
              <Col span={12}>
                <Input placeholder="Steam Game Name or App ID" size="large" />
              </Col>

              <Col span={6}>
                <Input placeholder="Review count" size="large" />
              </Col>

              <Col span={6}>
                <Button
                    type="primary"
                    size="large"
                    icon={<ThunderboltOutlined />}
                    block
                >
                  Analyze
                </Button>
              </Col>
            </Row>
          </Card>
        </Content>
      </Layout>
  )
}

export default App
