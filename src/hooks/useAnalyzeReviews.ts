import {useState} from 'react';
import {analyzeReviews} from '../services/api.ts';
import type {AnalyzeResult} from '../types/analyze';
import type {GameOption} from '../types/game';
import {VALIDATION_MESSAGES} from '../utils/constants';
import {mapAnalyzeResult} from '../utils/resultMapper';

export const useAnalyzeReviews = () => {
    const [result, setResult] = useState<AnalyzeResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const runAnalysis = async (game: GameOption | null, limit: number) => {
        if (!game) {
            setError(VALIDATION_MESSAGES.missingGame);
            return;
        }

        if (!Number.isFinite(limit) || limit <= 0) {
            setError(VALIDATION_MESSAGES.invalidLimit);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const data = await analyzeReviews(game.appId, limit);

            setResult(mapAnalyzeResult(data, game.label));
        } catch (err) {
            console.error(err);
            setError(VALIDATION_MESSAGES.backendUnavailable);
        } finally {
            setLoading(false);
        }
    };

    return {
        result,
        loading,
        error,
        runAnalysis,
    };
};
