import type { Meta, StoryObj } from '@storybook/react';

/** A styled text input component with built-in error state and size variants. */
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    size: {
      description: 'Controls the height of the input.',
      control: 'select',
      options: ['sm', 'md'],
    },
    error: {
      description: 'Whether the input is in an error state.',
      control: 'boolean',
    },
    errorMessage: {
      description: 'Error message displayed below the input when error is true.',
      control: 'text',
    },
    disabled: {
      description: 'Whether the input is disabled.',
      control: 'boolean',
    },
    placeholder: {
      description: 'Placeholder text displayed when the input is empty.',
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    placeholder: 'Small input',
    size: 'sm',
  },
};

export const WithError: Story = {
  args: {
    error: true,
    errorMessage: 'This field is required.',
    placeholder: 'Enter text...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
  },
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Search for something...',
    size: 'md',
  },
};
