import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

/** A checkbox input component with label support, two color themes, and custom children rendering. */
import { Checkbox } from './Checkbox';

const InteractiveCheckbox = (args: React.ComponentProps<typeof Checkbox>) => {
  const [checked, setChecked] = React.useState(args.checked ?? false);
  return <Checkbox {...args} checked={checked} onChange={setChecked} />;
};

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: {
    onChange: fn(),
  },
  argTypes: {
    label: {
      description: 'Text label displayed next to the checkbox.',
      control: 'text',
    },
    children: {
      description: 'Custom content to render instead of the label text.',
      control: false,
    },
    checked: {
      description: 'Whether the checkbox is checked.',
      control: 'boolean',
    },
    onChange: {
      description: 'Callback fired when the checked state changes. Receives the new boolean value.',
    },
    color: {
      description: 'The color theme of the checked checkbox.',
      control: 'select',
      options: ['primary', 'black'],
    },
    disabled: {
      description: 'Whether the checkbox is disabled.',
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'Checkbox label',
    checked: false,
  },
  render: (args) => <InteractiveCheckbox {...args} />,
};

export const Checked: Story = {
  args: {
    label: 'Checked checkbox',
    checked: true,
  },
  render: (args) => <InteractiveCheckbox {...args} />,
};

export const PrimaryColor: Story = {
  args: {
    label: 'Primary color',
    checked: true,
    color: 'primary',
  },
  render: (args) => <InteractiveCheckbox {...args} />,
};

export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    checked: false,
    disabled: true,
  },
};

export const WithCustomChildren: Story = {
  args: {
    checked: false,
    children: (
      <span style={{ fontSize: '14px' }}>
        I agree to the <a href="#" style={{ color: '#0069FF', textDecoration: 'underline' }}>terms and conditions</a>
      </span>
    ),
  },
  render: (args) => <InteractiveCheckbox {...args} />,
};
