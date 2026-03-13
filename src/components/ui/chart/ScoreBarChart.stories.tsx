import type { Meta, StoryObj } from '@storybook/react';
import { ScoreBarChart } from './ScoreBarChart';
import type { ScoreBarChartData } from './ScoreBarChart';

const meta: Meta<typeof ScoreBarChart> = {
  title: 'UI/Chart/ScoreBarChart',
  component: ScoreBarChart,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    height: { control: { type: 'number', min: 150, max: 500 }, description: '차트 높이' },
    barSize: { control: { type: 'number', min: 16, max: 64 }, description: '바 너비' },
    referenceLine: { control: 'number', description: '기준선 점수' },
  },
};
export default meta;
type Story = StoryObj<typeof ScoreBarChart>;

const sampleData: ScoreBarChartData[] = [
  { label: 'AWS', score: 85 },
  { label: 'GCP', score: 72 },
  { label: 'Azure', score: 45 },
  { label: 'NCP', score: 90 },
  { label: 'KT Cloud', score: 15 },
];

export const Default: Story = {
  args: { data: sampleData },
  decorators: [(Story) => <div style={{ width: 600 }}><Story /></div>],
};

export const WithReferenceLine: Story = {
  args: { data: sampleData, referenceLine: 70 },
  decorators: [(Story) => <div style={{ width: 600 }}><Story /></div>],
};

export const CustomColors: Story = {
  args: {
    data: sampleData,
    getColor: (score: number) => score >= 80 ? '#0069FF' : score >= 50 ? '#FFA500' : '#FF3B30',
  },
  decorators: [(Story) => <div style={{ width: 600 }}><Story /></div>],
};
