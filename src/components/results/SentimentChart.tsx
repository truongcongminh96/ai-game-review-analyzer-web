import {BarChartOutlined} from '@ant-design/icons';
import {Space, Tag, Typography} from 'antd';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    LabelList,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from 'recharts';
import type {SentimentBreakdown} from '../../types/analyze';
import SectionCard from '../common/SectionCard';

type SentimentChartProps = {
    sentiment: SentimentBreakdown;
};

function SentimentChart({sentiment}: SentimentChartProps) {
    const {Text} = Typography;
    const data = [
        {name: 'Positive', code: 'POS', value: sentiment.positive},
        {name: 'Neutral', code: 'NEU', value: sentiment.neutral},
        {name: 'Negative', code: 'NEG', value: sentiment.negative},
    ];
    const formatAxisValue = (value: number) => String(value).padStart(3, '0');
    const formatTelemetryValue = (value: number) => `${String(value).padStart(3, '0')}%`;

    return (
        <SectionCard
            title="Sentiment Breakdown"
            kicker="Telemetry Matrix"
            icon={<BarChartOutlined />}
            iconTone="cyan"
            className="result-section-tone-cyan"
        >
            <Space orientation="vertical" size={18} style={{width: '100%'}}>
                <Text className="ui-copy-muted" style={{marginBottom: 0}}>
                    Relative share of sampled review sentiment rendered as a quick-read signal chart.
                </Text>

                <div className="result-chart-legend">
                    {data.map((entry) => (
                        <Tag
                            className="hud-chip"
                            key={entry.name}
                            style={{
                                margin: 0,
                                borderRadius: 999,
                                padding: '6px 12px',
                                border:
                                    entry.name === 'Positive'
                                        ? '1px solid rgba(153,176,112,0.22)'
                                        : entry.name === 'Neutral'
                                            ? '1px solid rgba(191,151,83,0.22)'
                                            : '1px solid rgba(176,104,88,0.22)',
                                background:
                                    entry.name === 'Positive'
                                        ? 'rgba(70,88,44,0.22)'
                                        : entry.name === 'Neutral'
                                            ? 'rgba(94,67,28,0.22)'
                                            : 'rgba(78,40,35,0.24)',
                                color:
                                    entry.name === 'Positive'
                                        ? '#d9e3b4'
                                        : entry.name === 'Neutral'
                                            ? '#e2c88e'
                                            : '#e3b0a3',
                            }}
                        >
                            {entry.name}: {entry.value}%
                        </Tag>
                    ))}
                </div>

                <div className="hud-panel hud-angled-panel result-chart-panel">
                    <div className="result-chart-ornament result-chart-ornament-top-left">
                        Sector A-17
                    </div>
                    <div className="result-chart-ornament result-chart-ornament-top-right">
                        Range 000-100
                    </div>
                    <div className="result-chart-crosshair result-chart-crosshair-left" />
                    <div className="result-chart-crosshair result-chart-crosshair-bottom" />

                    <div className="result-chart-core" style={{width: '100%', height: 290}}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data} barCategoryGap={26}>
                                <defs>
                                    <linearGradient id="sentiment-positive-gradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#9fb87a" stopOpacity={1} />
                                        <stop offset="100%" stopColor="#6f864c" stopOpacity={0.9} />
                                    </linearGradient>
                                    <linearGradient id="sentiment-neutral-gradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#d7b06c" stopOpacity={1} />
                                        <stop offset="100%" stopColor="#9b6f30" stopOpacity={0.9} />
                                    </linearGradient>
                                    <linearGradient id="sentiment-negative-gradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#c77c6b" stopOpacity={1} />
                                        <stop offset="100%" stopColor="#86463b" stopOpacity={0.9} />
                                    </linearGradient>
                                </defs>

                                <CartesianGrid
                                    vertical={false}
                                    stroke="rgba(148,163,184,0.10)"
                                    strokeDasharray="3 10"
                                />

                                <XAxis
                                    dataKey="code"
                                    tick={{
                                        fill: '#cfd7bb',
                                        fontSize: 12,
                                        fontFamily:
                                            'ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, monospace',
                                        fontWeight: 700,
                                        letterSpacing: '0.18em',
                                    }}
                                    axisLine={{stroke: 'rgba(148,163,184,0.14)'}}
                                    tickLine={false}
                                    tickMargin={12}
                                    interval={0}
                                />
                                <YAxis
                                    tick={{
                                        fill: '#8f9c87',
                                        fontSize: 11,
                                        fontFamily:
                                            'ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, monospace',
                                        fontWeight: 700,
                                        letterSpacing: '0.12em',
                                    }}
                                    tickFormatter={formatAxisValue}
                                    axisLine={false}
                                    tickLine={false}
                                    domain={[0, 100]}
                                    ticks={[0, 25, 50, 75, 100]}
                                    width={42}
                                />

                                <Bar dataKey="value" radius={[14, 14, 6, 6]}>
                                    {data.map((entry) => (
                                        <Cell
                                            key={entry.name}
                                            fill={
                                                entry.name === 'Positive'
                                                    ? 'url(#sentiment-positive-gradient)'
                                                    : entry.name === 'Neutral'
                                                        ? 'url(#sentiment-neutral-gradient)'
                                                        : 'url(#sentiment-negative-gradient)'
                                            }
                                        />
                                    ))}
                                    <LabelList
                                        dataKey="value"
                                        position="top"
                                        offset={10}
                                        formatter={(value) => formatTelemetryValue(Number(value ?? 0))}
                                        style={{
                                            fill: '#e6ebda',
                                            fontSize: 11,
                                            fontFamily:
                                                'ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, monospace',
                                            fontWeight: 700,
                                            letterSpacing: '0.14em',
                                        }}
                                    />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="result-chart-ornament result-chart-ornament-bottom-right">
                        Scan ready
                    </div>
                </div>
            </Space>
        </SectionCard>
    );
}

export default SentimentChart;
