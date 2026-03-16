import {useState} from 'react';
import {mockGames} from '../data/mock/mockGames';
import type {GameOption} from '../types/game';
import {DEFAULT_GAME_QUERY, MAX_GAME_SUGGESTIONS} from '../utils/constants';

const resolveGame = (query: string): GameOption | null => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
        return null;
    }

    const exactMatch = mockGames.find((game) => {
        const normalizedLabel = game.label.toLowerCase();
        const normalizedQuery = trimmedQuery.toLowerCase();

        return normalizedLabel === normalizedQuery || game.appId === trimmedQuery;
    });

    if (exactMatch) {
        return exactMatch;
    }

    if (/^\d+$/.test(trimmedQuery)) {
        return {
            appId: trimmedQuery,
            value: trimmedQuery,
            label: trimmedQuery,
        };
    }

    return null;
};

export const useGameSearch = (initialQuery = DEFAULT_GAME_QUERY) => {
    const [query, setQuery] = useState(initialQuery);
    const [selectedGame, setSelectedGame] = useState<GameOption | null>(resolveGame(initialQuery));

    const normalizedQuery = query.trim().toLowerCase();

    const suggestions = mockGames
        .filter((game) => {
            if (!normalizedQuery) {
                return true;
            }

            return (
                game.label.toLowerCase().includes(normalizedQuery) ||
                game.appId.includes(normalizedQuery)
            );
        })
        .slice(0, MAX_GAME_SUGGESTIONS);

    const handleQueryChange = (nextQuery: string) => {
        setQuery(nextQuery);
        setSelectedGame(resolveGame(nextQuery));
    };

    const handleSelect = (nextQuery: string) => {
        const nextGame = resolveGame(nextQuery);

        setQuery(nextGame?.label ?? nextQuery);
        setSelectedGame(nextGame);
    };

    return {
        query,
        selectedGame,
        suggestions,
        handleQueryChange,
        handleSelect,
    };
};
