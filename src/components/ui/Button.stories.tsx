import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

/** A versatile button component supporting multiple variants, sizes, and rounded corner options. */
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    onClick: fn(),
  },
  argTypes: {
    children: {
      description: 'The content rendered inside the button.',
      control: 'text',
    },
    onClick: {
      description: 'Callback fired when the button is clicked.',
    },
    className: {
      description: 'Additional CSS class names to apply to the button.',
      control: 'text',
    },
    disabled: {
      description: 'Whether the button is disabled.',
      control: 'boolean',
    },
    type: {
      description: 'The HTML button type attribute.',
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
    size: {
      description: 'Controls the height and padding of the button.',
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      description: 'The visual style variant of the button.',
      control: 'select',
      options: ['primary', 'secondary', 'error', 'black', 'ghost'],
    },
    roundedSize: {
      description: 'Controls the border-radius of the button.',
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="error">Error</Button>
      <Button variant="black">Black</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
    variant: 'primary',
  },
};

export const RoundedLarge: Story = {
  args: {
    children: 'Rounded Large',
    roundedSize: 'lg',
    variant: 'primary',
  },
};
