import {AutoComplete, Input} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
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
    return (
        <AutoComplete
            size="large"
            style={{width: '100%'}}
            options={options.map((option) => ({
                value: option.appId,
                label: (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                        }}
                    >
                        <img
                            src={option.coverUrl || buildSteamCapsuleImage(option.appId)}
                            alt={option.label}
                            style={{
                                width: 92,
                                height: 34,
                                objectFit: 'cover',
                                borderRadius: 8,
                                border: '1px solid rgba(148,163,184,0.14)',
                                flexShrink: 0,
                                background: 'rgba(15,23,42,0.8)',
                            }}
                            onError={(event) => {
                                event.currentTarget.src =
                                    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="184" height="69" viewBox="0 0 184 69"><rect width="184" height="69" rx="10" fill="%230f172a"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8" font-size="14" font-family="Arial">No Cover</text></svg>';
                            }}
                        />

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                minWidth: 0,
                            }}
                        >
                            <span
                                style={{
                                    color: '#e2e8f0',
                                    fontWeight: 600,
                                    lineHeight: 1.3,
                                }}
                            >
                                {option.label}
                            </span>
                            <span style={{color: '#67e8f9', fontSize: 13}}>
                                Steam App ID: #{option.appId}
                            </span>
                        </div>
                    </div>
                ),
            }))}
            value={value}
            onSelect={onSelect}
            onChange={onChange}
            showSearch={{
                filterOption: false,
            }}
        >
            <Input
                size="large"
                prefix={<SearchOutlined style={{color: '#60a5fa'}} />}
                placeholder="Search a Steam game or paste the app id"
                style={{
                    height: 54,
                    borderRadius: 18,
                    fontSize: 16,
                }}
            />
        </AutoComplete>
    );
}

export default GameAutocomplete;
