import type { Meta, StoryObj } from '@storybook/react';

/** A small label component for displaying status, categories, or tags with color-coded variants. */
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'The color variant of the badge.',
      control: 'select',
      options: ['green', 'blue', 'gray', 'yellow', 'orange', 'red', 'brown', 'white', 'w-line'],
    },
    icon: {
      description: 'An optional icon rendered before the badge text.',
      control: false,
    },
    children: {
      description: 'The text content of the badge.',
      control: 'text',
    },
    className: {
      description: 'Additional CSS class names to apply.',
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'green',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', padding: '16px', background: '#333' }}>
      <Badge variant="green">Green</Badge>
      <Badge variant="blue">Blue</Badge>
      <Badge variant="gray">Gray</Badge>
      <Badge variant="yellow">Yellow</Badge>
      <Badge variant="orange">Orange</Badge>
      <Badge variant="red">Red</Badge>
      <Badge variant="brown">Brown</Badge>
      <Badge variant="white">White</Badge>
      <Badge variant="w-line">W-Line</Badge>
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    children: 'Status',
    variant: 'blue',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
};
