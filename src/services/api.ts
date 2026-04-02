import axios from 'axios';
import {env} from '../config/env';
import {
    getMockAnalyzeApiResponse,
    getMockAnalysisRunEvidence,
    getMockCompareAnalysisRuns,
    getMockGameHistory,
} from '../data/mock/mockAnalyzeResult';
import type {
    AnalysisMode,
    AnalysisProgress,
    AnalysisStage,
    AnalyzeApiResponse,
    AnalyzeCompareResponse,
    AnalyzeEvidenceItem,
    AnalyzeEvidenceQuery,
    AnalyzeEvidenceResponse,
    AnalyzeGameHistory,
    AnalyzeV2QueuedResponse,
} from '../types/analyze';

type AnalyzeReviewsOptions = {
    mode?: AnalysisMode;
    onProgress?: (progress: AnalysisProgress) => void;
};

type ApiErrorResponse = {
    error?: string;
};

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
    typeof value === 'object' && value !== null;

const coerceEvidenceItem = (value: unknown): AnalyzeEvidenceItem | null => {
    if (!isPlainObject(value) || typeof value.quote !== 'string') {
        return null;
    }

    return {
        review_id:
            typeof value.review_id === 'string'
                ? value.review_id
                : typeof value.id === 'string'
                  ? value.id
                  : 'unknown-review',
        quote: value.quote,
        review_text: typeof value.review_text === 'string' ? value.review_text : undefined,
        voted_up: typeof value.voted_up === 'boolean' ? value.voted_up : false,
        language: typeof value.language === 'string' ? value.language : 'english',
        helpful_votes: typeof value.helpful_votes === 'number' ? value.helpful_votes : 0,
        funny_votes: typeof value.funny_votes === 'number' ? value.funny_votes : 0,
        playtime_hours: typeof value.playtime_hours === 'number' ? value.playtime_hours : 0,
        reviewed_at: typeof value.reviewed_at === 'string' ? value.reviewed_at : undefined,
    };
};

const sanitizeEvidenceItems = (value: unknown) => {
    if (!Array.isArray(value)) {
        return [] as AnalyzeEvidenceItem[];
    }

    return value
        .map(coerceEvidenceItem)
        .filter((item): item is AnalyzeEvidenceItem => item !== null);
};

const normalizeEvidenceResponse = (
    payload: unknown,
    fallback: AnalyzeEvidenceQuery
): AnalyzeEvidenceResponse => {
    if (Array.isArray(payload)) {
        const items = sanitizeEvidenceItems(payload);

        return {
            run_id: fallback.runId,
            kind: fallback.kind,
            label: fallback.label,
            total: items.length,
            items,
        };
    }

    if (!isPlainObject(payload)) {
        return {
            run_id: fallback.runId,
            kind: fallback.kind,
            label: fallback.label,
            total: 0,
            items: [],
        };
    }

    const items = sanitizeEvidenceItems(payload.items ?? payload.evidence);
    const total =
        typeof payload.total === 'number'
            ? payload.total
            : typeof payload.total_count === 'number'
              ? payload.total_count
              : items.length;

    return {
        run_id: typeof payload.run_id === 'string' ? payload.run_id : fallback.runId,
        kind:
            payload.kind === 'praise' || payload.kind === 'issue' || payload.kind === 'topic'
                ? payload.kind
                : fallback.kind,
        label: typeof payload.label === 'string' ? payload.label : fallback.label,
        total,
        items,
    };
};

const ANALYSIS_STAGE_LABELS: Record<AnalysisStage, string> = {
    queued: 'Queued',
    fetching_reviews: 'Fetching reviews',
    storing_reviews: 'Storing review snapshots',
    analyzing: 'Running AI analysis',
    saving: 'Saving report',
    completed: 'Completed',
    failed: 'Failed',
};

const resolveMode = (mode?: AnalysisMode): AnalysisMode => mode ?? env.defaultAnalysisMode;

const resolveApiVersionForMode = (mode: AnalysisMode) => (mode === 'advanced' ? 'v2' : 'v1');

const sleep = (ms: number) =>
    new Promise((resolve) => {
        window.setTimeout(resolve, ms);
    });

const resolveApiErrorMessage = (error: unknown, fallback: string) => {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
        const responseMessage = error.response?.data?.error?.trim();

        if (responseMessage) {
            return responseMessage;
        }

        const requestMessage = error.message.trim();

        if (requestMessage) {
            return requestMessage;
        }
    }

    if (error instanceof Error && error.message.trim()) {
        return error.message;
    }

    return fallback;
};

const buildProgressMessage = (
    stage?: AnalysisStage,
    progressPercent?: number,
    runId?: string,
    mode: AnalysisMode = 'advanced'
) => {
    const stageLabel = stage ? ANALYSIS_STAGE_LABELS[stage] ?? stage : 'Working';
    const progressLabel =
        typeof progressPercent === 'number' && !Number.isNaN(progressPercent)
            ? ` ${progressPercent}%`
            : '';
    const runLabel = runId ? ` [run ${runId.slice(0, 8)}]` : '';

    if (mode === 'standard') {
        return `Running fast standard analysis${progressLabel}`;
    }

    return `Processing AI pipeline • ${stageLabel}${progressLabel}${runLabel}`;
};

const emitProgress = (
    options: AnalyzeReviewsOptions | undefined,
    progress: AnalysisProgress
) => {
    options?.onProgress?.(progress);
};

const submitV1Analysis = async (
    appId: string,
    limit: number,
    options?: AnalyzeReviewsOptions
) => {
    emitProgress(options, {
        message: buildProgressMessage(undefined, undefined, undefined, 'standard'),
        progressPercent: null,
    });

    const response = await axios.post<AnalyzeApiResponse>(`${env.apiBaseUrl}/steam/analyze`, {
        appId,
        limit,
        language: env.defaultReviewLanguage,
    });

    return response.data;
};

const queueV2Analysis = async (appId: string, limit: number) => {
    const response = await axios.post<AnalyzeV2QueuedResponse>(`${env.apiBaseUrl}/v2/steam/analyze`, {
        appId,
        limit,
        language: env.defaultReviewLanguage,
    });

    return response.data;
};

const getV2RunDetail = async (runId: string) => {
    const response = await axios.get<AnalyzeApiResponse>(`${env.apiBaseUrl}/v2/analysis-runs/${runId}`);

    return response.data;
};

const buildV2FailureMessage = (payload: AnalyzeApiResponse) => {
    const responseError = payload.error?.trim();

    if (responseError) {
        return responseError;
    }

    const runError = payload.error_message?.trim();

    if (runError) {
        return runError;
    }

    if (payload.current_stage && payload.current_stage !== 'failed') {
        return `Analysis run failed during ${ANALYSIS_STAGE_LABELS[payload.current_stage].toLowerCase()}.`;
    }

    return 'Analysis run failed. The backend did not provide an error message.';
};

const buildV2TimeoutMessage = (payload: AnalyzeApiResponse, fallbackRunId: string) => {
    const stageLabel = payload.current_stage
        ? ANALYSIS_STAGE_LABELS[payload.current_stage] ?? payload.current_stage
        : 'processing';
    const progressLabel =
        typeof payload.progress_percent === 'number' && !Number.isNaN(payload.progress_percent)
            ? ` at ${payload.progress_percent}%`
            : '';
    const runId = payload.run_id ?? fallbackRunId;

    return `Analysis is still running during ${stageLabel}${progressLabel} [run ${runId.slice(0, 8)}]. Increase VITE_API_POLL_TIMEOUT_MS if your local backend needs more time, then retry or wait for the run to finish.`;
};

const submitV2Analysis = async (
    appId: string,
    limit: number,
    options?: AnalyzeReviewsOptions
) => {
    const queuedResponse = await queueV2Analysis(appId, limit);

    emitProgress(options, {
        runId: queuedResponse.run_id,
        status: queuedResponse.status,
        stage: queuedResponse.current_stage,
        progressPercent: queuedResponse.progress_percent,
        queueDebug: queuedResponse.queue_debug,
        message: buildProgressMessage(
            queuedResponse.current_stage,
            queuedResponse.progress_percent,
            queuedResponse.run_id,
            'advanced'
        ),
    });

    const startedAt = Date.now();

    while (Date.now() - startedAt <= env.apiPollTimeoutMs) {
        const runDetail = await getV2RunDetail(queuedResponse.run_id);

        emitProgress(options, {
            runId: runDetail.run_id,
            status: runDetail.status,
            stage: runDetail.current_stage,
            progressPercent: runDetail.progress_percent ?? null,
            queueDebug: runDetail.queue_debug ?? queuedResponse.queue_debug,
            debug: runDetail.debug,
            message: buildProgressMessage(
                runDetail.current_stage,
                runDetail.progress_percent,
                runDetail.run_id,
                'advanced'
            ),
        });

        if (runDetail.status === 'success') {
            return {
                ...runDetail,
                queue_debug: runDetail.queue_debug ?? queuedResponse.queue_debug,
                request: runDetail.request ?? queuedResponse.request,
                links: runDetail.links ?? queuedResponse.links,
            };
        }

        if (runDetail.status === 'failed') {
            throw new Error(buildV2FailureMessage(runDetail));
        }

        await sleep(env.apiPollIntervalMs);
    }

    const finalRunDetail = await getV2RunDetail(queuedResponse.run_id);

    emitProgress(options, {
        runId: finalRunDetail.run_id,
        status: finalRunDetail.status,
        stage: finalRunDetail.current_stage,
        progressPercent: finalRunDetail.progress_percent ?? null,
        queueDebug: finalRunDetail.queue_debug ?? queuedResponse.queue_debug,
        debug: finalRunDetail.debug,
        message: buildProgressMessage(
            finalRunDetail.current_stage,
            finalRunDetail.progress_percent,
            finalRunDetail.run_id,
            'advanced'
        ),
    });

    if (finalRunDetail.status === 'success') {
        return {
            ...finalRunDetail,
            queue_debug: finalRunDetail.queue_debug ?? queuedResponse.queue_debug,
            request: finalRunDetail.request ?? queuedResponse.request,
            links: finalRunDetail.links ?? queuedResponse.links,
        };
    }

    if (finalRunDetail.status === 'failed') {
        throw new Error(buildV2FailureMessage(finalRunDetail));
    }

    throw new Error(buildV2TimeoutMessage(finalRunDetail, queuedResponse.run_id));
};

export const analyzeReviews = async (
    appId: string,
    limit: number,
    options?: AnalyzeReviewsOptions
) => {
    const mode = resolveMode(options?.mode);

    if (env.mockMode) {
        emitProgress(options, {
            message: buildProgressMessage(undefined, 100, undefined, mode),
            progressPercent: 100,
            status: 'success',
            stage: mode === 'advanced' ? 'completed' : undefined,
        });

        return Promise.resolve<AnalyzeApiResponse>(getMockAnalyzeApiResponse(appId, mode));
    }

    try {
        const apiVersion = resolveApiVersionForMode(mode);

        if (apiVersion === 'v2') {
            return await submitV2Analysis(appId, limit, options);
        }

        return await submitV1Analysis(appId, limit, options);
    } catch (error) {
        throw new Error(resolveApiErrorMessage(error, 'Unable to analyze reviews right now.'));
    }
};

export const getGameHistory = async (appId: string, limit = 10) => {
    if (env.mockMode) {
        return Promise.resolve<AnalyzeGameHistory>(getMockGameHistory(appId, limit));
    }

    const response = await axios.get<AnalyzeGameHistory>(`${env.apiBaseUrl}/v2/games/${appId}/history`, {
        params: {limit},
    });

    return response.data;
};

export const compareAnalysisRuns = async (runA: string, runB: string) => {
    if (env.mockMode) {
        return Promise.resolve<AnalyzeCompareResponse>(getMockCompareAnalysisRuns(runA, runB));
    }

    const response = await axios.get<AnalyzeCompareResponse>(`${env.apiBaseUrl}/v2/compare`, {
        params: {runA, runB},
    });

    return response.data;
};

export const getAnalysisRunEvidence = async (
    runId: string,
    kind: AnalyzeEvidenceQuery['kind'],
    label: string
) => {
    const query: AnalyzeEvidenceQuery = {
        runId,
        kind,
        label,
    };

    if (env.mockMode) {
        return Promise.resolve<AnalyzeEvidenceResponse>(getMockAnalysisRunEvidence(runId, kind, label));
    }

    try {
        const response = await axios.get<unknown>(`${env.apiBaseUrl}/v2/analysis-runs/${runId}/evidence`, {
            params: {
                kind,
                label,
            },
        });

        return normalizeEvidenceResponse(response.data, query);
    } catch (error) {
        throw new Error(resolveApiErrorMessage(error, 'Unable to load evidence right now.'));
    }
};
