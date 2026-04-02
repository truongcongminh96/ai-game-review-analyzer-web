import {
    ControlOutlined,
    ExperimentOutlined,
    FileSearchOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import type {AnalysisMode} from '../../types/analyze';
import type {GameOption} from '../../types/game';
import AnalysisModeSwitch from './AnalysisModeSwitch';
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
    analysisMode: AnalysisMode;
    loading: boolean;
    onGameChange: (value: string) => void;
    onGameSelect: (value: string) => void;
    onLimitChange: (value: number) => void;
    onAnalysisModeChange: (mode: AnalysisMode) => void;
    onAnalyze: () => void | Promise<void>;
};

function SearchPanel({
                         gameQuery,
                         gameOptions,
                         selectedGame,
                         limit,
                         analysisMode,
                         loading,
                         onGameChange,
                         onGameSelect,
                         onLimitChange,
                         onAnalysisModeChange,
                         onAnalyze,
                     }: SearchPanelProps) {
    const isAdvanced = analysisMode === 'advanced';

    return (
        <section
            className="glass-card hud-shell hud-angled-shell search-panel-card"
            style={{
                borderRadius: 28,
                overflow: 'hidden',
                background:
                    'radial-gradient(circle at top left, rgba(255,90,54,0.14), transparent 24%), radial-gradient(circle at bottom right, rgba(94,231,255,0.10), transparent 26%), linear-gradient(180deg, rgba(8,11,18,0.92), rgba(13,18,29,0.84))',
            }}
        >
            <HudOverlay scanDelay={0.35} />
            <div className="search-panel-grid">
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
                        <div style={{display: 'flex', flexDirection: 'column', gap: 14, width: '100%'}}>
                            <span
                                className="hud-chip"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    width: 'fit-content',
                                    borderRadius: 999,
                                    padding: '6px 12px',
                                    border: '1px solid rgba(255,90,54,0.24)',
                                    background: 'rgba(255,90,54,0.12)',
                                    color: '#ffd7c9',
                                }}
                            >
                                Review Console
                            </span>

                            <div className="ui-title-row">
                                <span className="ui-icon-badge ui-icon-badge-ember">
                                    <SearchOutlined />
                                </span>
                                <div className="ui-title-stack">
                                    <span className="ui-kicker">Input Console</span>
                                    <h3
                                        className="ui-title-tight"
                                        style={{margin: 0, color: '#f8fafc', fontSize: 32}}
                                    >
                                        Analyze a Steam game
                                    </h3>
                                </div>
                            </div>

                            <p
                                className="ui-copy-muted"
                                style={{
                                    margin: 0,
                                    color: '#cbd5e1',
                                    fontSize: 16,
                                    lineHeight: 1.7,
                                }}
                            >
                                Search by title or paste a Steam App ID to generate an AI insight
                                report from recent reviews.
                            </p>

                            <div style={{display: 'flex', flexWrap: 'wrap', gap: 8}}>
                                <span
                                className="hud-chip"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    borderRadius: 999,
                                    background: 'rgba(94,231,255,0.10)',
                                    color: '#d6f9ff',
                                    border: '1px solid rgba(94,231,255,0.20)',
                                    padding: '4px 10px',
                                }}
                            >
                                    Sentiment
                                </span>
                                <span
                                className="hud-chip"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    borderRadius: 999,
                                    background: 'rgba(255,90,54,0.10)',
                                    color: '#ffd7c9',
                                    border: '1px solid rgba(255,90,54,0.18)',
                                    padding: '4px 10px',
                                }}
                            >
                                    Praise Mining
                                </span>
                                <span
                                className="hud-chip"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    borderRadius: 999,
                                    background: 'rgba(255,122,24,0.10)',
                                    color: '#fed7aa',
                                    border: '1px solid rgba(255,122,24,0.20)',
                                    padding: '4px 10px',
                                }}
                            >
                                    Complaint Detection
                                </span>
                            </div>

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
                                    <div style={{display: 'flex', flexDirection: 'column', gap: 10, width: '100%'}}>
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

                                        <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
                                            <span style={{color: '#94a3b8'}}>Selected game</span>
                                            <span
                                                style={{
                                                    color: '#f8fafc',
                                                    fontSize: 16,
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {selectedGame.label}
                                            </span>
                                            <span style={{color: '#5ee7ff'}}>
                                                Steam App ID: #{selectedGame.appId}
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
                                        <span style={{color: '#94a3b8'}}>Quick examples</span>
                                        <span style={{color: '#e2e8f0'}}>
                                            Elden Ring, Hades, Wukong
                                        </span>
                                        <span style={{color: '#94a3b8'}}>
                                            You can also paste a numeric Steam App ID directly.
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div
                        className="hud-panel hud-angled-panel search-panel-main"
                        style={{
                            padding: 28,
                            background:
                                'linear-gradient(180deg, rgba(18,24,36,0.24), rgba(8,11,18,0.12))',
                        }}
                    >
                        <div style={{display: 'flex', flexDirection: 'column', gap: 18, width: '100%'}}>
                            <div>
                                <label
                                    className="ui-field-label"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        marginBottom: 8,
                                        color: '#cbd5e1',
                                        fontWeight: 600,
                                    }}
                                >
                                    <SearchOutlined />
                                    Game title or Steam App ID
                                </label>
                                <GameAutocomplete
                                    value={gameQuery}
                                    options={gameOptions}
                                    onChange={onGameChange}
                                    onSelect={onGameSelect}
                                />
                            </div>

                            <div>
                                <label
                                    className="ui-field-label"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        marginBottom: 8,
                                        color: '#cbd5e1',
                                        fontWeight: 600,
                                    }}
                                >
                                    <ControlOutlined />
                                    Review sample size
                                </label>
                                <ReviewLimitInput value={limit} onChange={onLimitChange}/>
                            </div>

                            <AnalysisModeSwitch
                                value={analysisMode}
                                onChange={onAnalysisModeChange}
                            />

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
                                <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
                                    <span
                                        className="ui-field-label"
                                        style={{
                                            color: '#f8fafc',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: 8,
                                        }}
                                    >
                                        {isAdvanced ? <ExperimentOutlined /> : <FileSearchOutlined />}
                                        {isAdvanced ? 'Advanced output' : 'Analysis output'}
                                    </span>
                                    <p style={{color: '#b6c2d3', margin: 0}}>
                                        {isAdvanced
                                            ? 'Deeper insights with AI reasoning, evidence samples, confidence scores, and history-aware comparison.'
                                            : 'Fast analysis with instant sentiment distribution, praised features, recurring complaints, and an AI-generated summary.'}
                                    </p>
                                </div>
                            </div>

                            <AnalyzeButton
                                loading={loading}
                                mode={analysisMode}
                                onClick={onAnalyze}
                            />
                        </div>
                    </div>
            </div>
        </section>
    );
}

export default SearchPanel;
