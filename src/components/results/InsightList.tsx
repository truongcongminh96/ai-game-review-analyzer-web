import {List} from 'antd';
import SectionCard from '../common/SectionCard';

type InsightListProps = {
    title: string;
    items: string[];
};

function InsightList({title, items}: InsightListProps) {
    return (
        <SectionCard title={title}>
            <List
                dataSource={items}
                renderItem={(item) => <List.Item>- {item}</List.Item>}
            />
        </SectionCard>
    );
}

export default InsightList;
