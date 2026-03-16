import {Layout, Typography} from 'antd';

const {Header} = Layout;
const {Title} = Typography;

function AppHeader() {
    return (
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
    );
}

export default AppHeader;
