import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SummaryStatCard } from './SummaryStatCard';

const meta: Meta<typeof SummaryStatCard> = {
  title: 'UI/Card/SummaryStatCard',
  component: SummaryStatCard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    isExpanded: { control: 'boolean', description: '확장 상태' },
    backgroundColor: { control: 'color', description: '배경 색상' },
  },
};
export default meta;
type Story = StoryObj<typeof SummaryStatCard>;

export const Default: Story = {
  args: {
    title: '전체 자산',
    mainValue: 1234,
    mainSuffix: '개',
    backgroundColor: '#0069FF',
    refreshKey: 0,
    isExpanded: false,
    items: [
      { label: 'AWS', value: 500, suffix: '개' },
      { label: 'GCP', value: 400, suffix: '개' },
      { label: 'Azure', value: 334, suffix: '개' },
    ],
  },
};

export const Expanded: Story = {
  args: {
    title: '보안 점수',
    mainValue: 85,
    mainSuffix: '점',
    backgroundColor: '#00C853',
    changeIndicator: { value: 5 },
    refreshKey: 0,
    isExpanded: true,
    items: [
      { label: '네트워크', value: 90, suffix: '점' },
      { label: '접근제어', value: 80, suffix: '점' },
      { label: '암호화', value: 85, suffix: '점' },
    ],
  },
};

export const WithDecrease: Story = {
  args: {
    title: '취약점',
    mainValue: 42,
    mainSuffix: '건',
    backgroundColor: '#FF3B30',
    changeIndicator: { value: -3 },
    refreshKey: 0,
    isExpanded: true,
    items: [
      { label: '높음', value: 5, suffix: '건' },
      { label: '중간', value: 15, suffix: '건' },
      { label: '낮음', value: 22, suffix: '건' },
    ],
  },
};

export const Interactive: Story = {
  render: () => {
    const [expanded, setExpanded] = useState(false);
    return (
      <div style={{ width: 300 }}>
        <button onClick={() => setExpanded(!expanded)} style={{ marginBottom: 8, padding: '4px 12px', border: '1px solid #ccc', borderRadius: 8 }}>
          {expanded ? '접기' : '펼치기'}
        </button>
        <SummaryStatCard
          title="전체 자산"
          mainValue={1234}
          mainSuffix="개"
          backgroundColor="#0069FF"
          changeIndicator={{ value: 12 }}
          refreshKey={0}
          isExpanded={expanded}
          items={[
            { label: 'AWS', value: 500, suffix: '개' },
            { label: 'GCP', value: 400, suffix: '개' },
            { label: 'Azure', value: 334, suffix: '개' },
          ]}
        />
      </div>
    );
  },
};
