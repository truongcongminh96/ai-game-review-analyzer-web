import {Card, Col, Row, Space, Tag, Typography} from 'antd';
import {
    ControlOutlined,
    FileSearchOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import type {GameOption} from '../../types/game';
import AnalyzeButton from './AnalyzeButton';
import GameAutocomplete from './GameAutocomplete';
import ReviewLimitInput from './ReviewLimitInput';
import {buildSteamHeaderImage} from "../../utils/steam.ts";
import HudOverlay from '../motion/HudOverlay';

type SearchPanelProps = {
    gameQuery: string;
    gameOptions: GameOption[];
    selectedGame: GameOption | null;
    limit: number;
    loading: boolean;
    onGameChange: (value: string) => void;
    onGameSelect: (value: string) => void;
    onLimitChange: (value: number) => void;
    onAnalyze: () => void | Promise<void>;
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
            className="glass-card hud-shell hud-angled-shell search-panel-card"
            style={{
                borderRadius: 28,
                overflow: 'hidden',
                background:
                    'radial-gradient(circle at top left, rgba(255,90,54,0.14), transparent 24%), radial-gradient(circle at bottom right, rgba(94,231,255,0.10), transparent 26%), linear-gradient(180deg, rgba(8,11,18,0.92), rgba(13,18,29,0.84))',
            }}
            styles={{
                body: {padding: 0}
            }}
        >
            <HudOverlay scanDelay={0.35} />
            <Row gutter={0}>
                <Col xs={24} lg={11}>
                    <div
                        className="hud-panel hud-angled-panel search-panel-side"
                        style={{
                            height: '100%',
                            padding: 28,
                            borderRight: '1px solid rgba(255, 255, 255, 0.08)',
                            background:
                                'linear-gradient(180deg, rgba(13,18,29,0.78), rgba(8,11,18,0.52))',
                        }}
                    >
                        <Space orientation="vertical" size={14} style={{width: '100%'}}>
                            <Tag
                                className="hud-chip"
                                style={{
                                    width: 'fit-content',
                                    marginInlineEnd: 0,
                                    borderRadius: 999,
                                    padding: '6px 12px',
                                    border: '1px solid rgba(255,90,54,0.24)',
                                    background: 'rgba(255,90,54,0.12)',
                                    color: '#ffd7c9',
                                }}
                            >
                                Review Console
                            </Tag>

                            <div className="ui-title-row">
                                <span className="ui-icon-badge ui-icon-badge-ember">
                                    <SearchOutlined />
                                </span>
                                <div className="ui-title-stack">
                                    <span className="ui-kicker">Input Console</span>
                                    <Title
                                        className="ui-title-tight"
                                        level={3}
                                        style={{margin: 0, color: '#f8fafc'}}
                                    >
                                        Analyze a Steam game
                                    </Title>
                                </div>
                            </div>

                            <Paragraph
                                className="ui-copy-muted"
                                style={{
                                    marginBottom: 0,
                                    color: '#cbd5e1',
                                    fontSize: 16,
                                    lineHeight: 1.7,
                                }}
                            >
                                Search by title or paste a Steam App ID to generate an AI insight
                                report from recent reviews.
                            </Paragraph>

                            <Space wrap size={[8, 8]}>
                                <Tag
                                className="hud-chip"
                                style={{
                                    marginInlineEnd: 0,
                                    borderRadius: 999,
                                    background: 'rgba(94,231,255,0.10)',
                                    color: '#d6f9ff',
                                    border: '1px solid rgba(94,231,255,0.20)',
                                    padding: '4px 10px',
                                }}
                            >
                                    Sentiment
                                </Tag>
                                <Tag
                                className="hud-chip"
                                style={{
                                    marginInlineEnd: 0,
                                    borderRadius: 999,
                                    background: 'rgba(255,90,54,0.10)',
                                    color: '#ffd7c9',
                                    border: '1px solid rgba(255,90,54,0.18)',
                                    padding: '4px 10px',
                                }}
                            >
                                    Praise Mining
                                </Tag>
                                <Tag
                                className="hud-chip"
                                style={{
                                    marginInlineEnd: 0,
                                    borderRadius: 999,
                                    background: 'rgba(255,122,24,0.10)',
                                    color: '#fed7aa',
                                    border: '1px solid rgba(255,122,24,0.20)',
                                    padding: '4px 10px',
                                }}
                            >
                                    Complaint Detection
                                </Tag>
                            </Space>

                            <div
                                className="hud-panel hud-angled-panel search-panel-preview"
                                style={{
                                    marginTop: 6,
                                    padding: 16,
                                    borderRadius: 18,
                                    background:
                                        'linear-gradient(180deg, rgba(5,7,13,0.62), rgba(10,14,22,0.72))',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
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
                                                border: '1px solid rgba(255,90,54,0.14)',
                                                boxShadow: '0 16px 34px rgba(0,0,0,0.30)',
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
                                            <Text style={{color: '#5ee7ff'}}>
                                                Steam App ID: #{selectedGame.appId}
                                            </Text>
                                        </Space>
                                    </Space>
                                ) : (
                                    <Space orientation="vertical" size={4}>
                                        <Text style={{color: '#94a3b8'}}>Quick examples</Text>
                                        <Text style={{color: '#e2e8f0'}}>
                                            Elden Ring, Hades, Wukong
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
                        className="hud-panel hud-angled-panel search-panel-main"
                        style={{
                            padding: 28,
                            background:
                                'linear-gradient(180deg, rgba(18,24,36,0.24), rgba(8,11,18,0.12))',
                        }}
                    >
                        <Space orientation="vertical" size={18} style={{width: '100%'}}>
                            <div>
                                <Text
                                    className="ui-field-label"
                                    style={{
                                        display: 'block',
                                        marginBottom: 8,
                                        color: '#cbd5e1',
                                        fontWeight: 600,
                                    }}
                                >
                                    <SearchOutlined />
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
                                    className="ui-field-label"
                                    style={{
                                        display: 'block',
                                        marginBottom: 8,
                                        color: '#cbd5e1',
                                        fontWeight: 600,
                                    }}
                                >
                                    <ControlOutlined />
                                    Review sample size
                                </Text>
                                <ReviewLimitInput value={limit} onChange={onLimitChange}/>
                            </div>

                            <div
                                className="hud-panel hud-angled-panel search-panel-output"
                                style={{
                                    padding: 16,
                                    borderRadius: 18,
                                    background:
                                        'linear-gradient(180deg, rgba(11,15,24,0.88), rgba(16,22,34,0.72))',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                }}
                            >
                                <Space orientation="vertical" size={6}>
                                    <Text className="ui-field-label" style={{color: '#f8fafc'}}>
                                        <FileSearchOutlined />
                                        Analysis output
                                    </Text>
                                    <Text style={{color: '#b6c2d3'}}>
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
