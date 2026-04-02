import {useEffect, useState} from 'react';
import {AutoComplete, Input} from 'antd';
import {LoadingOutlined, RadarChartOutlined, SearchOutlined} from '@ant-design/icons';
import {useReducedMotion} from 'framer-motion';
import type {GameOption} from '../../types/game';
import {buildSteamCapsuleImage} from '../../utils/steam';

type GameAutocompleteProps = {
    value: string;
    options: GameOption[];
    onChange: (value: string) => void;
    onSelect: (value: string) => void;
};

function GameAutocomplete({
                              value,
                              options,
                              onChange,
                              onSelect,
                          }: GameAutocompleteProps) {
    const reduceMotion = useReducedMotion();
    const basePlaceholder = 'Search a Steam game...';
    const [typedLength, setTypedLength] = useState(reduceMotion ? basePlaceholder.length : 0);
    const [cursorVisible, setCursorVisible] = useState(true);
    const [isScanning, setIsScanning] = useState(false);

    useEffect(() => {
        if (reduceMotion || typedLength >= basePlaceholder.length) {
            return;
        }

        const timer = window.setTimeout(() => {
            setTypedLength((current) => Math.min(current + 1, basePlaceholder.length));
        }, 58);

        return () => window.clearTimeout(timer);
    }, [basePlaceholder.length, reduceMotion, typedLength]);

    useEffect(() => {
        if (reduceMotion || value) {
            return;
        }

        const timer = window.setInterval(() => {
            setCursorVisible((current) => !current);
        }, 520);

        return () => window.clearInterval(timer);
    }, [reduceMotion, value]);

    useEffect(() => {
        const normalizedValue = value.trim();

        if (!normalizedValue) {
            const resetTimer = window.setTimeout(() => {
                setIsScanning(false);
            }, 0);

            return () => window.clearTimeout(resetTimer);
        }

        const startTimer = window.setTimeout(() => {
            setIsScanning(true);
        }, 0);

        const timer = window.setTimeout(() => {
            setIsScanning(false);
        }, reduceMotion ? 0 : 240);

        return () => {
            window.clearTimeout(startTimer);
            window.clearTimeout(timer);
        };
    }, [reduceMotion, value]);

    const placeholder = reduceMotion
        ? `${basePlaceholder} or paste the app id`
        : `${basePlaceholder.slice(0, typedLength)}${cursorVisible ? '|' : ' '}`;
    const normalizedValue = value.trim();
    const emptyTitle = !normalizedValue
        ? 'Awaiting Search Input'
        : isScanning
            ? 'Scanning Steam Registry'
            : 'No Match Detected';
    const emptyCopy = !normalizedValue
        ? 'Type a game title or paste a Steam App ID to open the live lookup channel.'
        : isScanning
            ? 'Query signature received. Matching title aliases and App IDs against the local game registry.'
            : 'No matching title or App ID was found in the current suggestion set. Try a broader title or paste the numeric app id.';
    const emptyKicker = !normalizedValue
        ? 'Idle channel'
        : isScanning
            ? 'Lookup in progress'
            : 'Zero signal';
    const emptyIcon = isScanning ? <LoadingOutlined spin /> : !normalizedValue ? <SearchOutlined /> : <RadarChartOutlined />;

    return (
        <AutoComplete
            size="large"
            className="search-console-autocomplete"
            classNames={{
                popup: {
                    root: 'search-console-dropdown',
                },
            }}
            style={{width: '100%'}}
            options={options.map((option) => ({
                value: option.appId,
                label: (
                    <div className="search-console-option">
                        <img
                            src={option.coverUrl || buildSteamCapsuleImage(option.appId)}
                            alt={option.label}
                            className="search-console-option__cover"
                            onError={(event) => {
                                event.currentTarget.src =
                                    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="184" height="69" viewBox="0 0 184 69"><rect width="184" height="69" rx="10" fill="%230f172a"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8" font-size="14" font-family="Arial">No Cover</text></svg>';
                            }}
                        />

                        <div className="search-console-option__meta">
                            <span className="search-console-option__label">{option.label}</span>
                            <span className="search-console-option__id">Steam App ID: #{option.appId}</span>
                        </div>
                    </div>
                ),
            }))}
            value={value}
            onSelect={onSelect}
            onChange={onChange}
            notFoundContent={
                <div className={`search-console-empty${isScanning ? ' search-console-empty-loading' : ''}`}>
                    <div className="search-console-empty__badge">
                        <span className="search-console-empty__icon">{emptyIcon}</span>
                        <span>{emptyKicker}</span>
                    </div>
                    <div className="search-console-empty__title">{emptyTitle}</div>
                    <p className="search-console-empty__copy">{emptyCopy}</p>
                    <div className="search-console-empty__rail" />
                </div>
            }
            showSearch={{
                filterOption: false,
            }}
        >
            <Input
                size="large"
                className="search-console-input"
                prefix={<SearchOutlined style={{color: '#60a5fa'}} />}
                placeholder={value ? '' : placeholder}
                style={{
                    height: 64,
                    fontSize: 16,
                }}
            />
        </AutoComplete>
    );
}

export default GameAutocomplete;
