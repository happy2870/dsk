import type { Meta, StoryObj } from '@storybook/react';
import { DashboardCard } from './DashboardCard';

const meta: Meta<typeof DashboardCard> = {
  title: 'UI/Card/DashboardCard',
  component: DashboardCard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof DashboardCard>;

export const Type1: Story = {
  render: () => (
    <div style={{ width: 500 }}>
      <DashboardCard type="type1">
        <DashboardCard.Header description="최근 30일 기준">보안 현황</DashboardCard.Header>
        <DashboardCard.Content className="p-4">
          <p className="text-sm text-gray-600">대시보드 카드 컨텐츠 영역입니다.</p>
        </DashboardCard.Content>
      </DashboardCard>
    </div>
  ),
};

export const Type2: Story = {
  render: () => (
    <div style={{ width: 500 }}>
      <DashboardCard type="type2">
        <DashboardCard.Header description="실시간 모니터링" action={<button className="text-sm text-blue-500">더보기</button>}>취약점 현황</DashboardCard.Header>
        <DashboardCard.Content>
          <p className="text-sm text-gray-600">Type2 스타일 카드 컨텐츠입니다.</p>
        </DashboardCard.Content>
      </DashboardCard>
    </div>
  ),
};

export const WithoutTitleLine: Story = {
  render: () => (
    <div style={{ width: 500 }}>
      <DashboardCard>
        <DashboardCard.Header titleLine={false}>타이틀 라인 없음</DashboardCard.Header>
        <DashboardCard.Content className="p-4">
          <p className="text-sm text-gray-600">타이틀 라인이 없는 카드입니다.</p>
        </DashboardCard.Content>
      </DashboardCard>
    </div>
  ),
};
