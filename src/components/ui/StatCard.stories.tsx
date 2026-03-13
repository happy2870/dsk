import type { Meta, StoryObj } from '@storybook/react';
import { StatCard, StatCardGrid } from './StatCard';
import type { StatCardItem } from './StatCard';

const meta: Meta<typeof StatCard> = {
  title: 'UI/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['default', 'compact'],
      description: '카드 크기',
    },
    refreshKey: {
      control: 'number',
      description: '카운트 애니메이션 리프레시 키',
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatCard>;

const sampleItem: StatCardItem = {
  title: '총 사용자',
  count: 1234,
  unit: '명',
  description: '전월 대비 +12%',
  color: 'bg-[#0069FF]',
};

const sampleItems: StatCardItem[] = [
  {
    title: '총 사용자',
    count: 1234,
    unit: '명',
    description: '전월 대비 +12%',
    color: 'bg-[#0069FF]',
  },
  {
    title: '활성 세션',
    count: 567,
    unit: '건',
    description: '현재 접속 중',
    color: 'bg-[#00C853]',
  },
  {
    title: '오류 발생',
    count: 23,
    unit: '건',
    description: '최근 24시간',
    color: 'bg-[#FF3B30]',
  },
  {
    title: 'API 호출',
    count: 89012,
    unit: '회',
    description: '이번 달 누적',
    color: 'bg-[#FF9500]',
  },
];

export const Default: Story = {
  args: {
    item: sampleItem,
    size: 'default',
  },
  decorators: [
    (Story) => (
      <div className="w-[280px]">
        <Story />
      </div>
    ),
  ],
};

export const Compact: Story = {
  args: {
    item: sampleItem,
    size: 'compact',
  },
  decorators: [
    (Story) => (
      <div className="w-[280px]">
        <Story />
      </div>
    ),
  ],
};

export const Grid: StoryObj<typeof StatCardGrid> = {
  render: () => (
    <StatCardGrid items={sampleItems} columns={4} size="default" />
  ),
};
