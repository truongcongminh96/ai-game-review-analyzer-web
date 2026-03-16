import {Card, Col, Row, Space, Tag, Typography} from 'antd';
import type {GameOption} from '../../types/game';
import AnalyzeButton from './AnalyzeButton';
import GameAutocomplete from './GameAutocomplete';
import ReviewLimitInput from './ReviewLimitInput';
import {buildSteamHeaderImage} from "../../utils/steam.ts";

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
            className="glass-card"
            style={{
                borderRadius: 28,
                overflow: 'hidden',
            }}
            styles={{
                body: {padding: 0}
            }}
        >
            <Row gutter={0}>
                <Col xs={24} lg={11}>
                    <div
                        style={{
                            height: '100%',
                            padding: 28,
                            borderRight: '1px solid rgba(148, 163, 184, 0.10)',
                            background:
                                'linear-gradient(180deg, rgba(15,23,42,0.55), rgba(15,23,42,0.25))',
                        }}
                    >
                        <Space orientation="vertical" size={14} style={{width: '100%'}}>
                            <Tag
                                style={{
                                    width: 'fit-content',
                                    marginInlineEnd: 0,
                                    borderRadius: 999,
                                    padding: '6px 12px',
                                    border: '1px solid rgba(96,165,250,0.20)',
                                    background: 'rgba(96,165,250,0.10)',
                                    color: '#bfdbfe',
                                }}
                            >
                                Review Input Console
                            </Tag>

                            <Title level={3} style={{margin: 0, color: '#f8fafc'}}>
                                Analyze a Steam game
                            </Title>

                            <Paragraph
                                style={{
                                    marginBottom: 0,
                                    color: '#cbd5e1',
                                    fontSize: 16,
                                    lineHeight: 1.7,
                                }}
                            >
                                Search by game title or enter a Steam App ID to generate an
                                AI-powered insight report from recent player reviews.
                            </Paragraph>

                            <Space wrap size={[8, 8]}>
                                <Tag
                                    style={{
                                        marginInlineEnd: 0,
                                        borderRadius: 999,
                                        background: 'rgba(34,197,94,0.10)',
                                        color: '#86efac',
                                        border: '1px solid rgba(34,197,94,0.18)',
                                        padding: '4px 10px',
                                    }}
                                >
                                    Sentiment
                                </Tag>
                                <Tag
                                    style={{
                                        marginInlineEnd: 0,
                                        borderRadius: 999,
                                        background: 'rgba(168,85,247,0.10)',
                                        color: '#d8b4fe',
                                        border: '1px solid rgba(168,85,247,0.18)',
                                        padding: '4px 10px',
                                    }}
                                >
                                    Praise Mining
                                </Tag>
                                <Tag
                                    style={{
                                        marginInlineEnd: 0,
                                        borderRadius: 999,
                                        background: 'rgba(239,68,68,0.10)',
                                        color: '#fda4af',
                                        border: '1px solid rgba(239,68,68,0.18)',
                                        padding: '4px 10px',
                                    }}
                                >
                                    Complaint Detection
                                </Tag>
                            </Space>

                            <div
                                style={{
                                    marginTop: 6,
                                    padding: 16,
                                    borderRadius: 18,
                                    background: 'rgba(2,6,23,0.35)',
                                    border: '1px solid rgba(148,163,184,0.10)',
                                }}
                            >
                                {selectedGame ? (
                                    <Space orientation="vertical" size={10} style={{width: '100%'}}>
                                        <img
                                            className="selected-game-cover"
                                            src={selectedGame.coverUrl || buildSteamHeaderImage(selectedGame.appId)}
                                            alt={selectedGame.label}
                                            style={{
                                                width: '100%',
                                                maxWidth: 280,
                                                height: 132,
                                                objectFit: 'cover',
                                                borderRadius: 16,
                                                border: '1px solid rgba(148,163,184,0.14)',
                                                boxShadow: '0 12px 28px rgba(0,0,0,0.22)',
                                                background: 'rgba(15,23,42,0.8)',
                                            }}
                                            onError={(event) => {
                                                event.currentTarget.src =
                                                    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="460" height="215" viewBox="0 0 460 215"><rect width="460" height="215" rx="18" fill="%230f172a"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8" font-size="20" font-family="Arial">No Game Cover</text></svg>';
                                            }}
                                        />

                                        <Space orientation="vertical" size={4}>
                                            <Text style={{color: '#94a3b8'}}>Selected game</Text>
                                            <Text
                                                style={{
                                                    color: '#f8fafc',
                                                    fontSize: 16,
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {selectedGame.label}
                                            </Text>
                                            <Text style={{color: '#67e8f9'}}>
                                                Steam App ID: #{selectedGame.appId}
                                            </Text>
                                        </Space>
                                    </Space>
                                ) : (
                                    <Space orientation="vertical" size={4}>
                                        <Text style={{color: '#94a3b8'}}>Quick examples</Text>
                                        <Text style={{color: '#e2e8f0'}}>
                                            Elden Ring, Hades, Black Myth: Wukong
                                        </Text>
                                        <Text style={{color: '#94a3b8'}}>
                                            You can also paste a numeric Steam App ID directly.
                                        </Text>
                                    </Space>
                                )}
                            </div>
                        </Space>
                    </div>
                </Col>

                <Col xs={24} lg={13}>
                    <div
                        style={{
                            padding: 28,
                            background:
                                'linear-gradient(180deg, rgba(30,41,59,0.16), rgba(15,23,42,0.08))',
                        }}
                    >
                        <Space orientation="vertical" size={18} style={{width: '100%'}}>
                            <div>
                                <Text
                                    style={{
                                        display: 'block',
                                        marginBottom: 8,
                                        color: '#cbd5e1',
                                        fontWeight: 600,
                                    }}
                                >
                                    Game title or Steam App ID
                                </Text>
                                <GameAutocomplete
                                    value={gameQuery}
                                    options={gameOptions}
                                    onChange={onGameChange}
                                    onSelect={onGameSelect}
                                />
                            </div>

                            <div>
                                <Text
                                    style={{
                                        display: 'block',
                                        marginBottom: 8,
                                        color: '#cbd5e1',
                                        fontWeight: 600,
                                    }}
                                >
                                    Review sample size
                                </Text>
                                <ReviewLimitInput value={limit} onChange={onLimitChange}/>
                            </div>

                            <div
                                style={{
                                    padding: 16,
                                    borderRadius: 18,
                                    background: 'rgba(15,23,42,0.45)',
                                    border: '1px solid rgba(148,163,184,0.10)',
                                }}
                            >
                                <Space orientation="vertical" size={6}>
                                    <Text style={{color: '#f8fafc', fontWeight: 600}}>
                                        Analysis output
                                    </Text>
                                    <Text style={{color: '#94a3b8'}}>
                                        The report will include sentiment distribution, praised
                                        features, recurring complaints, and an AI-generated
                                        summary.
                                    </Text>
                                </Space>
                            </div>

                            <AnalyzeButton loading={loading} onClick={onAnalyze}/>
                        </Space>
                    </div>
                </Col>
            </Row>
        </Card>
    );
}

export default SearchPanel;
