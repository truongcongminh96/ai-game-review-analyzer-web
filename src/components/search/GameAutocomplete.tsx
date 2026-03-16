import { AutoComplete, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { GameOption } from '../../types/game';

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
            style={{ width: '100%' }}
            options={options.map((option) => ({
                value: option.appId,
                label: (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: 12,
                        }}
                    >
            <span style={{ color: '#e2e8f0', fontWeight: 500 }}>
              {option.label}
            </span>
                        <span style={{ color: '#67e8f9', fontSize: 13 }}>
              #{option.appId}
            </span>
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
                prefix={<SearchOutlined style={{ color: '#60a5fa' }} />}
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
