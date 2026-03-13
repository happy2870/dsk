import type { Meta, StoryObj } from '@storybook/react';
import { AppTooltip } from './AppTooltip';

const meta: Meta<typeof AppTooltip> = {
  title: 'UI/AppTooltip',
  component: AppTooltip,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    place: { control: 'select', options: ['top', 'bottom', 'left', 'right'], description: '툴팁 위치' },
    isArrow: { control: 'boolean', description: '화살표 표시 여부' },
  },
};
export default meta;
type Story = StoryObj<typeof AppTooltip>;

export const Default: Story = {
  render: () => (
    <div>
      <button data-tooltip-id="demo-tooltip" data-tooltip-content="이것은 툴팁입니다">
        마우스를 올려보세요
      </button>
      <AppTooltip id="demo-tooltip" place="top" />
    </div>
  ),
};

export const AllPlacements: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', padding: '60px' }}>
      {(['top', 'bottom', 'left', 'right'] as const).map((place) => (
        <div key={place}>
          <button data-tooltip-id={`tooltip-${place}`} data-tooltip-content={`${place} 툴팁`}>
            {place}
          </button>
          <AppTooltip id={`tooltip-${place}`} place={place} />
        </div>
      ))}
    </div>
  ),
};
