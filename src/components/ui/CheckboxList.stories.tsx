import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CheckboxList } from './CheckboxList';
import type { CheckboxListItem } from './CheckboxList';

const meta: Meta<typeof CheckboxList> = {
  title: 'UI/CheckboxList',
  component: CheckboxList,
  tags: ['autodocs'],
  argTypes: {
    columns: { control: 'select', options: [1, 2, 4, 5], description: '컬럼 수' },
    maxHeight: { control: 'text', description: '최대 높이' },
  },
};
export default meta;
type Story = StoryObj<typeof CheckboxList>;

const sampleItems: CheckboxListItem[] = [
  { id: '1', name: 'EC2 인스턴스', description: 'AWS 가상 서버' },
  { id: '2', name: 'S3 버킷', description: 'AWS 스토리지' },
  { id: '3', name: 'RDS', description: 'AWS 데이터베이스' },
  { id: '4', name: 'Lambda', description: 'AWS 서버리스' },
  { id: '5', name: 'CloudFront', description: 'AWS CDN' },
  { id: '6', name: 'VPC', description: 'AWS 네트워크' },
];

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['1', '3']);
    return (
      <div style={{ width: 400 }}>
        <CheckboxList items={sampleItems} selectedIds={selected} onToggle={(id) => setSelected((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id])} />
      </div>
    );
  },
};

export const TwoColumns: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <div style={{ width: 600 }}>
        <CheckboxList items={sampleItems} selectedIds={selected} onToggle={(id) => setSelected((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id])} columns={2} />
      </div>
    );
  },
};
