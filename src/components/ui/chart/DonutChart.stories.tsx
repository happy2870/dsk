import type { Meta, StoryObj } from '@storybook/react';
import { DonutChart } from './DonutChart';

const meta: Meta<typeof DonutChart> = {
  title: 'UI/Chart/DonutChart',
  component: DonutChart,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof DonutChart>;

export const Default: Story = {
  render: () => (
    <DonutChart
      data={[
        { value: 60, color: '#0069FF' },
        { value: 25, color: '#00C853' },
        { value: 15, color: '#FF9500' },
      ]}
      centerValue={85}
      centerUnit="%"
    />
  ),
};

export const WithBackground: Story = {
  render: () => (
    <DonutChart
      data={[
        { value: 75, color: '#0069FF' },
        { value: 25, color: '#E8E8E8' },
      ]}
      centerValue={75}
      centerUnit="점"
      showBackground
    />
  ),
};

export const LargeSize: Story = {
  render: () => (
    <DonutChart
      data={[
        { value: 60, color: '#0069FF' },
        { value: 25, color: '#00C853' },
        { value: 15, color: '#FF9500' },
      ]}
      centerValue={92}
      centerUnit="%"
      size={200}
      outerRadius={85}
      innerRadius={65}
    />
  ),
};

export const SmallSize: Story = {
  render: () => (
    <DonutChart
      data={[
        { value: 40, color: '#FF3B30' },
        { value: 60, color: '#E8E8E8' },
      ]}
      centerValue={40}
      centerUnit="%"
      size={100}
      outerRadius={42}
      innerRadius={32}
    />
  ),
};
