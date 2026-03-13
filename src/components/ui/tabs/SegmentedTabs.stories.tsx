import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SegmentedTabs } from './SegmentedTabs';
import type { SegmentedTabsItem } from './SegmentedTabs';

const meta: Meta<typeof SegmentedTabs> = {
  title: 'UI/Tabs/SegmentedTabs',
  component: SegmentedTabs,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'], description: '크기' },
    disabled: { control: 'boolean', description: '비활성화' },
  },
};
export default meta;
type Story = StoryObj<typeof SegmentedTabs>;

const items: SegmentedTabsItem[] = [
  { id: 'all', label: '전체' },
  { id: 'active', label: '활성' },
  { id: 'inactive', label: '비활성' },
];

export const Default: Story = {
  render: () => {
    const [activeId, setActiveId] = useState('all');
    return (
      <div style={{ width: 400 }}>
        <SegmentedTabs items={items} activeId={activeId} onSelect={setActiveId} />
      </div>
    );
  },
};

export const WithDescription: Story = {
  render: () => {
    const [activeId, setActiveId] = useState('weekly');
    const descItems: SegmentedTabsItem[] = [
      { id: 'daily', label: '일간', description: '매일 업데이트' },
      { id: 'weekly', label: '주간', description: '매주 업데이트' },
      { id: 'monthly', label: '월간', description: '매월 업데이트' },
    ];
    return (
      <div style={{ width: 500 }}>
        <SegmentedTabs items={descItems} activeId={activeId} onSelect={setActiveId} size="lg" />
      </div>
    );
  },
};

export const AllSizes: Story = {
  render: () => {
    const [active, setActive] = useState('all');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 400 }}>
        <SegmentedTabs items={items} activeId={active} onSelect={setActive} size="sm" />
        <SegmentedTabs items={items} activeId={active} onSelect={setActive} size="md" />
        <SegmentedTabs items={items} activeId={active} onSelect={setActive} size="lg" />
      </div>
    );
  },
};
