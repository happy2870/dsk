import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

/** A radio button component with label support for single-select option groups. */
import { Radio } from './Radio';

const InteractiveRadio = (args: React.ComponentProps<typeof Radio>) => {
  const [checked, setChecked] = React.useState(args.checked ?? false);
  return <Radio {...args} checked={checked} onChange={setChecked} />;
};

const meta: Meta<typeof Radio> = {
  title: 'UI/Radio',
  component: Radio,
  tags: ['autodocs'],
  args: {
    onChange: fn(),
  },
  argTypes: {
    label: {
      description: 'Text label displayed next to the radio button.',
      control: 'text',
    },
    children: {
      description: 'Custom content to render instead of the label text.',
      control: false,
    },
    checked: {
      description: 'Whether the radio button is selected.',
      control: 'boolean',
    },
    onChange: {
      description: 'Callback fired when the selection state changes. Receives the new boolean value.',
    },
    disabled: {
      description: 'Whether the radio button is disabled.',
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {
    label: 'Radio option',
    checked: false,
  },
  render: (args) => <InteractiveRadio {...args} />,
};

export const Checked: Story = {
  args: {
    label: 'Selected option',
    checked: true,
  },
  render: (args) => <InteractiveRadio {...args} />,
};

export const Disabled: Story = {
  args: {
    label: 'Disabled option',
    checked: false,
    disabled: true,
  },
};
