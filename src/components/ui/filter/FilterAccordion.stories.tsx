import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FilterAccordion } from './FilterAccordion';

const meta: Meta<typeof FilterAccordion> = {
  title: 'UI/Filter/FilterAccordion',
  component: FilterAccordion,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof FilterAccordion>;

const filterValues = ['Critical', 'High', 'Medium', 'Low', 'Info'];

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['Critical', 'High']);
    const [mode, setMode] = useState<'include' | 'exclude' | 'none'>('include');
    return (
      <div style={{ width: 400, border: '1px solid #ddd', borderRadius: 8 }}>
        <FilterAccordion
          id="severity"
          label="심각도"
          values={filterValues}
          selectedValues={selected}
          mode={mode}
          onToggleValue={(v) => setSelected((prev) => prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v])}
          onModeChange={(m) => { setMode(m); if (m === 'none') setSelected([]); }}
        />
      </div>
    );
  },
};

export const Expanded: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['Critical']);
    const [mode, setMode] = useState<'include' | 'exclude' | 'none'>('exclude');
    return (
      <div style={{ width: 400, border: '1px solid #ddd', borderRadius: 8 }}>
        <FilterAccordion
          id="severity-expanded"
          label="심각도"
          values={filterValues}
          selectedValues={selected}
          mode={mode}
          onToggleValue={(v) => setSelected((prev) => prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v])}
          onModeChange={(m) => { setMode(m); if (m === 'none') setSelected([]); }}
          isExpanded={true}
        />
      </div>
    );
  },
};
