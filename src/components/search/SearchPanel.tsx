import {Card, Col, Row, Space, Tag, Typography} from 'antd';
import type {GameOption} from '../../types/game';
import AnalyzeButton from './AnalyzeButton';
import GameAutocomplete from './GameAutocomplete';
import ReviewLimitInput from './ReviewLimitInput';

type SearchPanelProps = {
    gameQuery: string;
    gameOptions: GameOption[];
    selectedGame: GameOption | null;
    limit: number;
    loading: boolean;
    onGameChange: (value: string) => void;
    onGameSelect: (value: string) => void;
    onLimitChange: (value: number) => void;
    onAnalyze: () => void;
};

function SearchPanel({
    gameQuery,
    gameOptions,
    selectedGame,
    limit,
    loading,
    onGameChange,
    onGameSelect,
    onLimitChange,
    onAnalyze,
}: SearchPanelProps) {
    const {Paragraph, Text, Title} = Typography;

    return (
        <Card
            style={{
                borderRadius: 20,
                boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
            }}
        >
            <Row gutter={[24, 24]} align="middle">
                <Col xs={24} lg={14}>
                    <Title level={3} style={{marginBottom: 8}}>
                        Search a Steam title
                    </Title>
                    <Paragraph style={{fontSize: 16, marginBottom: 12}}>
                        Pick a suggested title for a clean app id, or paste the numeric Steam app
                        id directly if you already have it.
                    </Paragraph>
                    {selectedGame ? (
                        <Tag color="green">Resolved app id: #{selectedGame.appId}</Tag>
                    ) : (
                        <Text type="secondary">
                            Start typing to match a Steam game from the new source structure.
                        </Text>
                    )}
                </Col>

                <Col xs={24} lg={10}>
                    <Space orientation="vertical" size={12} style={{width: '100%'}}>
                        <GameAutocomplete
                            value={gameQuery}
                            options={gameOptions}
                            onChange={onGameChange}
                            onSelect={onGameSelect}
                        />
                        <ReviewLimitInput value={limit} onChange={onLimitChange} />
                        <AnalyzeButton loading={loading} onClick={onAnalyze} />
                    </Space>
                </Col>
            </Row>
        </Card>
    );
}

export default SearchPanel;
