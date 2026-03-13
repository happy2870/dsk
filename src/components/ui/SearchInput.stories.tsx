import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

/** A search input with a built-in search icon, designed for filtering and search use cases. */
import { SearchInput } from './SearchInput';

const InteractiveSearchInput = (args: React.ComponentProps<typeof SearchInput>) => {
  const [value, setValue] = React.useState(args.value ?? '');
  return <SearchInput {...args} value={value} onChange={setValue} />;
};

const meta: Meta<typeof SearchInput> = {
  title: 'UI/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  args: {
    onChange: fn(),
  },
  argTypes: {
    value: {
      description: 'The current value of the search input.',
      control: 'text',
    },
    onChange: {
      description: 'Callback fired when the input value changes. Receives the new string value.',
    },
    placeholder: {
      description: 'Placeholder text displayed when the input is empty.',
      control: 'text',
    },
    disabled: {
      description: 'Whether the search input is disabled.',
      control: 'boolean',
    },
    size: {
      description: 'Controls the height of the search input.',
      control: 'select',
      options: ['sm', 'md'],
    },
    className: {
      description: 'Additional CSS class names to apply to the wrapper.',
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  args: {
    value: '',
    placeholder: 'Search...',
    size: 'md',
  },
  render: (args) => <InteractiveSearchInput {...args} />,
};

export const Small: Story = {
  args: {
    value: '',
    placeholder: 'Search...',
    size: 'sm',
  },
  render: (args) => <InteractiveSearchInput {...args} />,
};

export const Disabled: Story = {
  args: {
    value: '',
    placeholder: 'Search...',
    disabled: true,
  },
};
