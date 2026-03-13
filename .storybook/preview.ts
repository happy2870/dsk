import type { Preview } from '@storybook/react';
import './storybook.css';

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: { toc: true },
    layout: 'centered',
  },
};

export default preview;
