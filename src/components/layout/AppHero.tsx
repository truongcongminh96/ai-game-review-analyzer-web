import {Card, Col, Row, Space, Tag, Typography} from 'antd';
import heroImage from '../../assets/hero.png';

function AppHero() {
    const {Paragraph, Title} = Typography;

    return (
        <Card
            style={{
                borderRadius: 24,
                boxShadow: '0 18px 40px rgba(17,24,39,0.08)',
                overflow: 'hidden',
            }}
        >
            <Row gutter={[32, 32]} align="middle">
                <Col xs={24} lg={14}>
                    <Space orientation="vertical" size={12}>
                        <Tag color="blue">Steam + AI + Review Mining</Tag>
                        <Title level={2} style={{margin: 0}}>
                            Refactored into the new app structure
                        </Title>
                        <Paragraph style={{fontSize: 16, marginBottom: 0}}>
                            The old one-file screen is now split into `app`, `components`,
                            `hooks`, `types`, `utils`, and mock data so each part is easier to
                            maintain and replace with real backend responses.
                        </Paragraph>
                    </Space>
                </Col>

                <Col xs={24} lg={10}>
                    <img
                        src={heroImage}
                        alt="Game review dashboard illustration"
                        style={{
                            display: 'block',
                            width: '100%',
                            maxWidth: 340,
                            margin: '0 auto',
                        }}
                    />
                </Col>
            </Row>
        </Card>
    );
}

export default AppHero;
