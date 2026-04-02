import {useState} from 'react';
import {analyzeReviews} from '../services/api.ts';
import type {
    AnalysisMode,
    AnalysisProgress,
    AnalyzeResult,
} from '../types/analyze';
import type {GameOption} from '../types/game';
import {VALIDATION_MESSAGES} from '../utils/constants';
import {mapAnalyzeResult} from '../utils/resultMapper';

export const useAnalyzeReviews = () => {
    const [result, setResult] = useState<AnalyzeResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState<AnalysisProgress | null>(null);

    const runAnalysis = async (
        game: GameOption | null,
        limit: number,
        mode: AnalysisMode = 'standard'
    ) => {
        if (!game) {
            setError(VALIDATION_MESSAGES.missingGame);
            return null;
        }

        if (!Number.isFinite(limit) || limit <= 0) {
            setError(VALIDATION_MESSAGES.invalidLimit);
            return null;
        }

        try {
            setLoading(true);
            setError(null);
            setProgress({
                message:
                mode === 'advanced'
                        ? 'Preparing advanced analysis pipeline'
                        : 'Preparing standard analysis request',
                progressPercent: null,
            });

            const data = await analyzeReviews(game.appId, limit, {
                mode,
                onProgress: setProgress,
            });
            const mappedResult = mapAnalyzeResult(data, game.label, mode);

            setResult(mappedResult);
            setProgress(null);

            return mappedResult;
        } catch (err) {
            console.error(err);
            setProgress(null);
            setError(
                err instanceof Error && err.message.trim()
                    ? err.message
                    : VALIDATION_MESSAGES.backendUnavailable
            );

            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        result,
        loading,
        error,
        progress,
        runAnalysis,
    };
};
