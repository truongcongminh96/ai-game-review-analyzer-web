import type {ReactElement} from 'react';
import {
    BulbOutlined,
    EyeOutlined,
    RadarChartOutlined,
    WarningOutlined,
} from '@ant-design/icons';
import type {AnalyzeInsightKind} from '../../types/analyze';

type EvidenceTooltipContentProps = {
    evidenceCount: number;
    kind: AnalyzeInsightKind;
};

const KIND_LABELS: Record<AnalyzeInsightKind, string> = {
    praise: 'Praise Signal',
    issue: 'Issue Signal',
    topic: 'Topic Signal',
};

const KIND_TITLES: Record<AnalyzeInsightKind, string> = {
    praise: 'Inspect praise evidence',
    issue: 'Inspect issue evidence',
    topic: 'Inspect topic evidence',
};

const KIND_COPY: Record<AnalyzeInsightKind, string> = {
    praise:
        'Open the drawer to verify why players praise this area through raw quotes, full review text, playtime, votes, and review date.',
    issue:
        'Open the drawer to inspect the exact complaints behind this issue, including raw quotes, full review text, playtime, votes, and review date.',
    topic:
        'Open the drawer to trace how this topic recurs across raw quotes, full review text, playtime, votes, and review date.',
};

const KIND_ICONS: Record<AnalyzeInsightKind, ReactElement> = {
    praise: <BulbOutlined />,
    issue: <WarningOutlined />,
    topic: <RadarChartOutlined />,
};

function EvidenceTooltipContent({evidenceCount, kind}: EvidenceTooltipContentProps) {
    return (
        <div className={`result-evidence-tooltip-content result-evidence-tooltip-content-${kind}`}>
            <div className="result-evidence-tooltip-head">
                <span className="result-evidence-tooltip-kicker">
                    {KIND_ICONS[kind]}
                    {KIND_LABELS[kind]}
                </span>
                <span className="result-evidence-tooltip-badge">
                    {evidenceCount} stored
                </span>
            </div>

            <div className="result-evidence-tooltip-title">
                <EyeOutlined />
                <span>{KIND_TITLES[kind]}</span>
            </div>

            <p className="result-evidence-tooltip-copy">{KIND_COPY[kind]}</p>
        </div>
    );
}

export default EvidenceTooltipContent;
