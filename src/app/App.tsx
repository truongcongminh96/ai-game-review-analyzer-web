import {Col, Layout, Row, Space} from 'antd';
import {lazy, Suspense, useState} from 'react';
import EmptyBlock from '../components/common/EmptyBlock';
import ErrorBlock from '../components/common/ErrorBlock';
import LoadingBlock from '../components/common/LoadingBlock';
import {env} from '../config/env';
import AppHeader from '../components/layout/AppHeader';
import AppHero from '../components/layout/AppHero';
import BackendShowcase from '../components/layout/BackendShowcase';
import AmbientBackdrop from '../components/motion/AmbientBackdrop';
import CinematicIntro from '../components/motion/CinematicIntro';
import {MotionReveal} from '../components/motion/Reveal';
import SearchPanel from '../components/search/SearchPanel';
import {useAnalyzeReviews} from '../hooks/useAnalyzeReviews';
import {useGameSearch} from '../hooks/useGameSearch';
import type {GameOption} from '../types/game';
import {DEFAULT_REVIEW_LIMIT} from '../utils/constants';

const SourceReviewPage = lazy(() => import('../pages/SourceReviewPage.tsx'));
const ResultGrid = lazy(() => import('../components/results/ResultGrid'));
const LearningJourneyPage = lazy(() => import('../pages/LearningJourneyPage.tsx'));

const {Content} = Layout;

type AnalysisContext = {
    game: GameOption;
    reviewLimit: number;
};

type AppPage = 'home' | 'source-review' | 'learning-journey';

function App() {
    const [currentPage, setCurrentPage] = useState<AppPage>('home');
    const [limit, setLimit] = useState(DEFAULT_REVIEW_LIMIT);
    const [analysisContext, setAnalysisContext] = useState<AnalysisContext | null>(null);
    const {query, selectedGame, suggestions, handleQueryChange, handleSelect} = useGameSearch();
    const {result, loading, error, runAnalysis} = useAnalyzeReviews();
    const dataSourceMode = env.mockMode ? 'mock' : 'live';

    const handleAnalyze = async () => {
        const analyzedResult = await runAnalysis(selectedGame, limit);

        if (analyzedResult && selectedGame) {
            setAnalysisContext({
                game: selectedGame,
                reviewLimit: limit,
            });
        }
    };

    const homeContent = (
        <Space orientation="vertical" size={24} style={{width: '100%'}}>
            <MotionReveal y={20} blur={12}>
                <AppHero/>
            </MotionReveal>

            <MotionReveal delay={0.08}>
                <SearchPanel
                    gameQuery={query}
                    gameOptions={suggestions}
                    selectedGame={selectedGame}
                    limit={limit}
                    loading={loading}
                    onGameChange={handleQueryChange}
                    onGameSelect={handleSelect}
                    onLimitChange={setLimit}
                    onAnalyze={handleAnalyze}
                />
            </MotionReveal>

            {error ? (
                <MotionReveal delay={0.04} y={18} blur={8}>
                    <ErrorBlock message={error}/>
                </MotionReveal>
            ) : null}

            {loading ? (
                <MotionReveal delay={0.04} y={18} blur={8}>
                    <LoadingBlock/>
                </MotionReveal>
            ) : null}

            {!loading && result ? (
                <MotionReveal delay={0.06}>
                    <Suspense fallback={<LoadingBlock/>}>
                        <ResultGrid
                            result={result}
                            dataSourceMode={dataSourceMode}
                            analysisContext={analysisContext}
                        />
                    </Suspense>
                </MotionReveal>
            ) : null}

            {!loading && !result ? (
                <MotionReveal delay={0.12} y={22}>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} lg={16}>
                            <EmptyBlock
                                title="Ready to analyze player feedback"
                                description="Search for a Steam game, choose the review sample size, and generate an AI-powered insight report in seconds."
                            />
                        </Col>
                        <Col xs={24} lg={8}>
                            <BackendShowcase/>
                        </Col>
                    </Row>
                </MotionReveal>
            ) : null}
        </Space>
    );

    return (
        <Layout className="app-shell">
            <AmbientBackdrop/>
            <CinematicIntro/>

            <AppHeader
                dataSourceMode={dataSourceMode}
                currentPage={currentPage}
                onNavigate={setCurrentPage}
            />

            <Content
                className="app-content"
                style={{
                    padding: '32px 24px 56px',
                    maxWidth: 1280,
                    margin: '0 auto',
                    width: '100%',
                }}
            >
                {currentPage === 'home' ? (
                    homeContent
                ) : currentPage === 'source-review' ? (
                    <Suspense fallback={<LoadingBlock/>}>
                        <SourceReviewPage/>
                    </Suspense>
                ) : (
                    <Suspense fallback={<LoadingBlock/>}>
                        <LearningJourneyPage/>
                    </Suspense>
                )}
            </Content>
        </Layout>
    );
}

export default App;
