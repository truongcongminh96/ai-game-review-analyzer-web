import {useEffect, useMemo, useState} from 'react';
import {Col, Row, Space, Typography} from 'antd';
import {getAnalysisRunEvidence} from '../../services/api';
import type {
    AdvancedAnalyzeResult,
    AnalyzeEvidenceResponse,
    AnalyzeInsightItem,
    AnalyzeInsightKind,
} from '../../types/analyze';
import AdvancedInsightsPanel from './AdvancedInsightsPanel';
import EvidenceDrawer from './EvidenceDrawer';
import StructuredInsightList from './StructuredInsightList';

type AdvancedResultViewProps = {
    result: AdvancedAnalyzeResult;
};

const buildEvidenceCacheKey = (runId: string, item: AnalyzeInsightItem) =>
    `${runId}:${item.kind}:${item.label.trim().toLowerCase()}`;

const EVIDENCE_QUERY_KEYS = {
    runId: 'evidenceRun',
    kind: 'evidenceKind',
    label: 'evidenceLabel',
} as const;

const isInsightKind = (value: string | null): value is AnalyzeInsightKind =>
    value === 'praise' || value === 'issue' || value === 'topic';

const getCurrentSearch = () => (typeof window === 'undefined' ? '' : window.location.search);

const getCurrentUrl = () => new URL(window.location.href);

const writeEvidenceQuery = (selection: {runId: string; item: AnalyzeInsightItem} | null) => {
    if (typeof window === 'undefined') {
        return '';
    }

    const url = getCurrentUrl();

    if (!selection) {
        url.searchParams.delete(EVIDENCE_QUERY_KEYS.runId);
        url.searchParams.delete(EVIDENCE_QUERY_KEYS.kind);
        url.searchParams.delete(EVIDENCE_QUERY_KEYS.label);
    } else {
        url.searchParams.set(EVIDENCE_QUERY_KEYS.runId, selection.runId);
        url.searchParams.set(EVIDENCE_QUERY_KEYS.kind, selection.item.kind);
        url.searchParams.set(EVIDENCE_QUERY_KEYS.label, selection.item.label);
    }

    const nextUrl = `${url.pathname}${url.search}${url.hash}`;
    window.history.replaceState({}, '', nextUrl);

    return url.search;
};

const readEvidenceQuery = (search: string) => {
    const params = new URLSearchParams(search);
    const runId = params.get(EVIDENCE_QUERY_KEYS.runId)?.trim();
    const kind = params.get(EVIDENCE_QUERY_KEYS.kind)?.trim() ?? null;
    const label = params.get(EVIDENCE_QUERY_KEYS.label)?.trim();

    if (!runId || !isInsightKind(kind) || !label) {
        return null;
    }

    return {
        runId,
        kind,
        label: label.toLowerCase(),
    };
};

function AdvancedResultView({result}: AdvancedResultViewProps) {
    const {Text} = Typography;
    const [locationSearch, setLocationSearch] = useState(getCurrentSearch);
    const [evidenceError, setEvidenceError] = useState<string | null>(null);
    const [evidenceReloadKey, setEvidenceReloadKey] = useState(0);
    const [evidenceCache, setEvidenceCache] = useState<Record<string, AnalyzeEvidenceResponse>>({});
    const runId = result.report?.run_id ?? result.runId ?? null;
    const querySelection = useMemo(() => {
        if (!runId) {
            return null;
        }

        const query = readEvidenceQuery(locationSearch);

        if (!query || query.runId !== runId) {
            return null;
        }

        const insights = [...result.praises, ...result.issues, ...result.topics];

        return (
            insights.find(
                (item) =>
                    item.kind === query.kind &&
                    item.label.trim().toLowerCase() === query.label
            ) ?? null
        );
    }, [locationSearch, result.issues, result.praises, result.topics, runId]);
    const drawerOpen = Boolean(querySelection);
    const selectedEvidence =
        runId && querySelection
            ? evidenceCache[buildEvidenceCacheKey(runId, querySelection)] ?? null
            : null;
    const evidenceLoading = drawerOpen && !selectedEvidence && !evidenceError;

    useEffect(() => {
        if (typeof window === 'undefined') {
            return undefined;
        }

        const handlePopState = () => {
            setLocationSearch(window.location.search);
            setEvidenceError(null);
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    useEffect(() => {
        if (!drawerOpen || !querySelection || !runId || selectedEvidence) {
            return;
        }

        const cacheKey = buildEvidenceCacheKey(runId, querySelection);

        let cancelled = false;

        getAnalysisRunEvidence(runId, querySelection.kind, querySelection.label)
            .then((response) => {
                if (cancelled) {
                    return;
                }

                setEvidenceCache((current) => ({
                    ...current,
                    [cacheKey]: response,
                }));
            })
            .catch((error: unknown) => {
                if (cancelled) {
                    return;
                }

                console.error(error);
                setEvidenceError(
                    error instanceof Error && error.message.trim()
                        ? error.message
                        : 'Unable to load evidence for this signal.'
                );
            });

        return () => {
            cancelled = true;
        };
    }, [drawerOpen, evidenceReloadKey, querySelection, runId, selectedEvidence]);

    const handleSelectInsight = (item: AnalyzeInsightItem) => {
        if (!runId || item.evidence_count <= 0) {
            return;
        }

        const nextSearch = writeEvidenceQuery({runId, item});

        setLocationSearch(nextSearch);
        setEvidenceError(null);
    };

    const handleCloseDrawer = () => {
        const nextSearch = writeEvidenceQuery(null);

        setLocationSearch(nextSearch);
        setEvidenceError(null);
    };

    const handleRetryEvidence = () => {
        if (!runId || !querySelection) {
            return;
        }

        const cacheKey = buildEvidenceCacheKey(runId, querySelection);

        setEvidenceCache((current) => {
            const next = {...current};
            delete next[cacheKey];
            return next;
        });
        setEvidenceError(null);
        setEvidenceReloadKey((value) => value + 1);
    };

    return (
        <Space direction="vertical" size={16} style={{width: '100%'}}>
            <div
                className="hud-panel hud-angled-panel"
                style={{
                    padding: 18,
                    borderRadius: 20,
                    border: '1px solid rgba(255,122,24,0.18)',
                    background:
                        'linear-gradient(135deg, rgba(42,23,14,0.78), rgba(13,18,29,0.92))',
                }}
            >
                <Text style={{display: 'block', color: '#fed7aa', marginBottom: 8, fontWeight: 700}}>
                    Advanced analysis profile
                </Text>
                <Text style={{color: '#cbd5e1'}}>
                    Structured `v2` output is rendered directly from praise, issue, and topic signals
                    instead of being collapsed back into the legacy result shape. Click any signal to
                    inspect the stored review evidence behind it.
                </Text>
            </div>

            <Row gutter={[16, 16]}>
                <Col xs={24} xl={8}>
                    <StructuredInsightList
                        title="Priority Praises"
                        items={result.praises}
                        variant="praise"
                        onSelectInsight={runId ? handleSelectInsight : undefined}
                    />
                </Col>
                <Col xs={24} xl={8}>
                    <StructuredInsightList
                        title="Critical Issues"
                        items={result.issues}
                        variant="issue"
                        onSelectInsight={runId ? handleSelectInsight : undefined}
                    />
                </Col>
                <Col xs={24} xl={8}>
                    <StructuredInsightList
                        title="Tracked Topics"
                        items={result.topics}
                        variant="topic"
                        onSelectInsight={runId ? handleSelectInsight : undefined}
                    />
                </Col>
            </Row>

            {result.report ? (
                <Row gutter={[16, 16]}>
                    <Col xs={24}>
                        <AdvancedInsightsPanel
                            report={result.report}
                            onSelectInsight={runId ? handleSelectInsight : undefined}
                        />
                    </Col>
                </Row>
            ) : null}

            <EvidenceDrawer
                open={drawerOpen}
                insight={querySelection}
                evidence={selectedEvidence}
                loading={evidenceLoading}
                error={evidenceError}
                onClose={handleCloseDrawer}
                onRetry={handleRetryEvidence}
            />
        </Space>
    );
}

export default AdvancedResultView;
