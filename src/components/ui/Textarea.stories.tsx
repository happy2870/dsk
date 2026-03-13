import type { Meta, StoryObj } from '@storybook/react';

/** A multi-line text input component with size variants, error states, and configurable resize behavior. */
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'UI/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    size: {
      description: 'Controls the minimum height and padding of the textarea.',
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    error: {
      description: 'Whether the textarea is in an error state.',
      control: 'boolean',
    },
    errorMessage: {
      description: 'Error message displayed below the textarea when error is true.',
      control: 'text',
    },
    resize: {
      description: 'Controls which directions the textarea can be resized.',
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
    },
    disabled: {
      description: 'Whether the textarea is disabled.',
      control: 'boolean',
    },
    placeholder: {
      description: 'Placeholder text displayed when the textarea is empty.',
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    placeholder: 'Small textarea',
    size: 'sm',
  },
};

export const WithError: Story = {
  args: {
    error: true,
    errorMessage: 'This field is required.',
    placeholder: 'Enter your message...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled textarea',
  },
};

export const NoResize: Story = {
  args: {
    resize: 'none',
    placeholder: 'This textarea cannot be resized.',
  },
};
