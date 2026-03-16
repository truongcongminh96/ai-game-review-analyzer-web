import {ResponsiveContainer, BarChart, Bar, Cell, XAxis, YAxis} from 'recharts';
import SectionCard from '../common/SectionCard';
import type {SentimentBreakdown} from '../../types/analyze';

type SentimentChartProps = {
    sentiment: SentimentBreakdown;
};

function SentimentChart({sentiment}: SentimentChartProps) {
    const data = [
        {name: 'Positive', value: sentiment.positive, color: '#4ade80'},
        {name: 'Neutral', value: sentiment.neutral, color: '#fbbf24'},
        {name: 'Negative', value: sentiment.negative, color: '#fb7185'},
    ];

    return (
        <SectionCard title="Sentiment Breakdown">
            <div style={{width: '100%', height: 280}}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} barCategoryGap={28}>
                        <XAxis
                            dataKey="name"
                            tick={{fill: '#cbd5e1', fontSize: 13}}
                            axisLine={{stroke: 'rgba(148,163,184,0.14)'}}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{fill: '#94a3b8', fontSize: 12}}
                            axisLine={false}
                            tickLine={false}
                            domain={[0, 100]}
                        />
                        <Bar dataKey="value" radius={[12, 12, 4, 4]}>
                            {data.map((entry) => (
                                <Cell key={entry.name} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </SectionCard>
    );
}

export default SentimentChart;
