import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

/** A square icon-only button component supporting multiple variants and sizes, ideal for toolbars and compact actions. */
import { IconButton } from './IconButton';

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const meta: Meta<typeof IconButton> = {
  title: 'UI/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  args: {
    onClick: fn(),
  },
  argTypes: {
    children: {
      description: 'The icon element rendered inside the button.',
      control: false,
    },
    onClick: {
      description: 'Callback fired when the button is clicked.',
    },
    className: {
      description: 'Additional CSS class names to apply.',
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
      description: 'Controls the width and height of the icon button.',
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      description: 'The visual style variant of the icon button.',
      control: 'select',
      options: ['primary', 'secondary', 'error', 'black', 'ghost'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    children: <PlusIcon />,
    variant: 'secondary',
    size: 'md',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <IconButton variant="primary"><PlusIcon /></IconButton>
      <IconButton variant="secondary"><PlusIcon /></IconButton>
      <IconButton variant="error"><PlusIcon /></IconButton>
      <IconButton variant="black"><PlusIcon /></IconButton>
      <IconButton variant="ghost"><PlusIcon /></IconButton>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <IconButton size="sm"><PlusIcon /></IconButton>
      <IconButton size="md"><PlusIcon /></IconButton>
      <IconButton size="lg"><PlusIcon /></IconButton>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    children: <PlusIcon />,
    disabled: true,
    variant: 'primary',
  },
};
