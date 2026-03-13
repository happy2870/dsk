import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

/** A toggle switch component for boolean on/off states, available in small and medium sizes. */
import Toggle from './Toggle';

const InteractiveToggle = (args: React.ComponentProps<typeof Toggle>) => {
  const [checked, setChecked] = React.useState(args.checked ?? false);
  return <Toggle {...args} checked={checked} onChange={setChecked} />;
};

const meta: Meta<typeof Toggle> = {
  title: 'UI/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  args: {
    onChange: fn(),
  },
  argTypes: {
    checked: {
      description: 'Whether the toggle is in the on state.',
      control: 'boolean',
    },
    onChange: {
      description: 'Callback fired when the toggle state changes. Receives the new boolean value.',
    },
    disabled: {
      description: 'Whether the toggle is disabled.',
      control: 'boolean',
    },
    size: {
      description: 'The size of the toggle switch.',
      control: 'select',
      options: ['sm', 'md'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    checked: false,
  },
  render: (args) => <InteractiveToggle {...args} />,
};

export const Checked: Story = {
  args: {
    checked: true,
  },
  render: (args) => <InteractiveToggle {...args} />,
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
  },
};

export const MediumSize: Story = {
  args: {
    checked: false,
    size: 'md',
  },
  render: (args) => <InteractiveToggle {...args} />,
};
