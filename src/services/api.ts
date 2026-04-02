import axios from 'axios';
import {env} from '../config/env';
import {
    getMockAnalyzeApiResponse,
    getMockCompareAnalysisRuns,
    getMockGameHistory,
} from '../data/mock/mockAnalyzeResult';
import type {
    AnalysisMode,
    AnalysisProgress,
    AnalysisStage,
    AnalyzeApiResponse,
    AnalyzeCompareResponse,
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
            message: buildProgressMessage(
                runDetail.current_stage,
                runDetail.progress_percent,
                runDetail.run_id,
                'advanced'
            ),
        });

        if (runDetail.status === 'success') {
            return runDetail;
        }

        if (runDetail.status === 'failed') {
            throw new Error(buildV2FailureMessage(runDetail));
        }

        await sleep(env.apiPollIntervalMs);
    }

    throw new Error('Analysis timed out while waiting for API v2 to complete.');
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
