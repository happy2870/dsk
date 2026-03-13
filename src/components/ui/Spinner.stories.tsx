import type { Meta, StoryObj } from '@storybook/react';

/** A loading spinner component available in three sizes for indicating async operations. */
import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'UI/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: {
      description: 'The size of the spinner.',
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    className: {
      description: 'Additional CSS class names to apply.',
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    size: 'md',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};
