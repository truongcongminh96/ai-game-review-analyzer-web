import {Col, Layout, Row, Space} from 'antd';
import {useState} from 'react';
import EmptyBlock from '../components/common/EmptyBlock';
import ErrorBlock from '../components/common/ErrorBlock';
import LoadingBlock from '../components/common/LoadingBlock';
import AppHeader from '../components/layout/AppHeader';
import AppHero from '../components/layout/AppHero';
import BackendShowcase from '../components/layout/BackendShowcase';
import ResultGrid from '../components/results/ResultGrid';
import SearchPanel from '../components/search/SearchPanel';
import {useAnalyzeReviews} from '../hooks/useAnalyzeReviews';
import {useGameSearch} from '../hooks/useGameSearch';
import {DEFAULT_REVIEW_LIMIT} from '../utils/constants';

const {Content} = Layout;

function App() {
    const [limit, setLimit] = useState(DEFAULT_REVIEW_LIMIT);
    const {query, selectedGame, suggestions, handleQueryChange, handleSelect} = useGameSearch();
    const {result, loading, error, runAnalysis} = useAnalyzeReviews();

    const handleAnalyze = () => {
        void runAnalysis(selectedGame, limit);
    };

    return (
        <Layout style={{minHeight: '100vh', background: '#f5f7fb'}}>
            <AppHeader />

            <Content
                style={{
                    padding: '32px 24px',
                    maxWidth: 1280,
                    margin: '0 auto',
                    width: '100%',
                }}
            >
                <Space orientation="vertical" size={24} style={{width: '100%'}}>
                    <AppHero />

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

                    {error ? <ErrorBlock message={error} /> : null}

                    {loading ? <LoadingBlock /> : null}

                    {!loading && result ? <ResultGrid result={result} /> : null}

                    {!loading && !result ? (
                        <Row gutter={[16, 16]}>
                            <Col xs={24} lg={16}>
                                <EmptyBlock
                                    title="No analysis yet"
                                    description="Pick a Steam title, choose the review limit, and run the analysis to fill the result grid."
                                />
                            </Col>
                            <Col xs={24} lg={8}>
                                <BackendShowcase />
                            </Col>
                        </Row>
                    ) : null}
                </Space>
            </Content>
        </Layout>
    );
}

export default App;
