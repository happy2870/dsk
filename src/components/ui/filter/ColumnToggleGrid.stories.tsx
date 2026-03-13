import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ColumnToggleGrid } from './ColumnToggleGrid';

const meta: Meta<typeof ColumnToggleGrid> = {
  title: 'UI/Filter/ColumnToggleGrid',
  component: ColumnToggleGrid,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    columns: { control: 'select', options: [2, 3], description: '그리드 컬럼 수' },
  },
};
export default meta;
type Story = StoryObj<typeof ColumnToggleGrid>;

const initialOptions = [
  { id: 'name', label: '이름', visible: true },
  { id: 'status', label: '상태', visible: true },
  { id: 'score', label: '점수', visible: true },
  { id: 'region', label: '리전', visible: false },
  { id: 'account', label: '계정', visible: true },
  { id: 'date', label: '날짜', visible: false },
];

export const Default: Story = {
  render: () => {
    const [options, setOptions] = useState(initialOptions);
    const handleToggle = (id: string) => {
      setOptions((prev) => prev.map((o) => o.id === id ? { ...o, visible: !o.visible } : o));
    };
    return (
      <div style={{ width: 400 }}>
        <ColumnToggleGrid options={options} onToggle={handleToggle} />
      </div>
    );
  },
};

export const ThreeColumns: Story = {
  render: () => {
    const [options, setOptions] = useState(initialOptions);
    const handleToggle = (id: string) => {
      setOptions((prev) => prev.map((o) => o.id === id ? { ...o, visible: !o.visible } : o));
    };
    return (
      <div style={{ width: 500 }}>
        <ColumnToggleGrid options={options} onToggle={handleToggle} columns={3} />
      </div>
    );
  },
};
