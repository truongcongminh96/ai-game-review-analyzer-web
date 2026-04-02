import {lazy, Suspense, useEffect, useRef, useState} from 'react';
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
import type {AnalysisMode} from '../types/analyze';
import {useGameSearch} from '../hooks/useGameSearch';
import type {GameOption} from '../types/game';
import {DEFAULT_REVIEW_LIMIT} from '../utils/constants';

const SourceReviewPage = lazy(() => import('../pages/SourceReviewPage.tsx'));
const ResultGrid = lazy(() => import('../components/results/ResultGrid'));
const LearningJourneyPage = lazy(() => import('../pages/LearningJourneyPage.tsx'));

type AnalysisContext = {
    game: GameOption;
    reviewLimit: number;
    mode: AnalysisMode;
};

type AppPage = 'home' | 'source-review' | 'learning-journey';

function App() {
    const [currentPage, setCurrentPage] = useState<AppPage>('home');
    const [limit, setLimit] = useState(DEFAULT_REVIEW_LIMIT);
    const [analysisMode, setAnalysisMode] = useState<AnalysisMode>(env.defaultAnalysisMode);
    const [analysisContext, setAnalysisContext] = useState<AnalysisContext | null>(null);
    const resultSectionRef = useRef<HTMLDivElement | null>(null);
    const {query, selectedGame, suggestions, handleQueryChange, handleSelect} = useGameSearch();
    const {result, loading, error, progress, runAnalysis} = useAnalyzeReviews();
    const dataSourceMode = env.mockMode ? 'mock' : 'live';

    const handleAnalyze = async () => {
        const analyzedResult = await runAnalysis(selectedGame, limit, analysisMode);

        if (analyzedResult && selectedGame) {
            setAnalysisContext({
                game: selectedGame,
                reviewLimit: limit,
                mode: analysisMode,
            });
        }
    };

    useEffect(() => {
        if (currentPage !== 'home' || loading || !result) {
            return undefined;
        }

        if (typeof window === 'undefined' || window.innerWidth >= 992) {
            return undefined;
        }

        const timeoutId = window.setTimeout(() => {
            resultSectionRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }, 180);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [currentPage, loading, result]);

    const homeContent = (
        <div className="app-section-stack">
            <MotionReveal y={20} blur={12}>
                <AppHero/>
            </MotionReveal>

            <MotionReveal delay={0.08}>
                <SearchPanel
                    gameQuery={query}
                    gameOptions={suggestions}
                    selectedGame={selectedGame}
                    limit={limit}
                    analysisMode={analysisMode}
                    loading={loading}
                    onGameChange={handleQueryChange}
                    onGameSelect={handleSelect}
                    onLimitChange={setLimit}
                    onAnalysisModeChange={setAnalysisMode}
                    onAnalyze={handleAnalyze}
                />
            </MotionReveal>

            {error ? (
                <MotionReveal delay={0.04} y={18} blur={8} trigger="mount">
                    <ErrorBlock message={error}/>
                </MotionReveal>
            ) : null}

            {loading ? (
                <MotionReveal delay={0.04} y={18} blur={8} trigger="mount">
                    <LoadingBlock
                        description={progress?.message}
                        progressPercent={progress?.progressPercent}
                    />
                </MotionReveal>
            ) : null}

            {!loading && result ? (
                <MotionReveal
                    delay={0.06}
                    trigger="mount"
                    style={{scrollMarginTop: 108}}
                >
                    <div ref={resultSectionRef}>
                        <Suspense fallback={<LoadingBlock/>}>
                            <ResultGrid
                                result={result}
                                dataSourceMode={dataSourceMode}
                                analysisContext={analysisContext}
                            />
                        </Suspense>
                    </div>
                </MotionReveal>
            ) : null}

            {!loading && !result ? (
                <MotionReveal delay={0.12} y={22} trigger="mount">
                    <div className="home-support-grid">
                        <div>
                            <EmptyBlock
                                title="Ready to analyze player feedback"
                                description="Search for a Steam game, choose the review sample size, and generate an AI-powered insight report in seconds."
                            />
                        </div>
                        <div>
                            <BackendShowcase/>
                        </div>
                    </div>
                </MotionReveal>
            ) : null}
        </div>
    );

    return (
        <div className="app-shell">
            <AmbientBackdrop/>
            <CinematicIntro/>

            <AppHeader
                dataSourceMode={dataSourceMode}
                currentPage={currentPage}
                onNavigate={setCurrentPage}
            />

            <main
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
            </main>
        </div>
    );
}

export default App;
