import {AutoComplete, Typography} from 'antd';
import type {GameOption} from '../../types/game';

type GameAutocompleteProps = {
    value: string;
    options: GameOption[];
    onChange: (value: string) => void;
    onSelect: (value: string) => void;
};

function GameAutocomplete({value, options, onChange, onSelect}: GameAutocompleteProps) {
    const {Text} = Typography;

    return (
        <AutoComplete
            size="large"
            value={value}
            options={options.map((game) => ({
                value: game.label,
                label: (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: 12,
                        }}
                    >
                        <span>{game.label}</span>
                        <Text type="secondary">#{game.appId}</Text>
                    </div>
                ),
            }))}
            placeholder="Search a Steam game or paste the app id"
            onChange={onChange}
            onSelect={onSelect}
            showSearch={{
                filterOption: false
            }}
        />
    );
}

export default GameAutocomplete;
