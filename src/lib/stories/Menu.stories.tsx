import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuLabel,
  MenuDivider,
  MenuGroup,
} from '../components';

const meta: Meta = {
  title: 'Components/Menu',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj;

/**
 * Basic menu with simple action items.
 */
export const Basic: Story = {
  render: () => (
    <Menu>
      <MenuTrigger>
        <button>Open Menu</button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem onClick={() => console.log('Cut')}>Cut</MenuItem>
        <MenuItem onClick={() => console.log('Copy')}>Copy</MenuItem>
        <MenuItem onClick={() => console.log('Paste')}>Paste</MenuItem>
      </MenuContent>
    </Menu>
  ),
};

/**
 * Menu with icons and keyboard shortcuts.
 */
export const WithIcons: Story = {
  render: () => (
    <Menu>
      <MenuTrigger>
        <button>Edit</button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem shortcut="⌘X">Cut</MenuItem>
        <MenuItem shortcut="⌘C">Copy</MenuItem>
        <MenuItem shortcut="⌘V">Paste</MenuItem>
        <MenuDivider />
        <MenuItem danger>Delete</MenuItem>
      </MenuContent>
    </Menu>
  ),
};

/**
 * Menu with grouped items and labels.
 */
export const Grouped: Story = {
  render: () => (
    <Menu>
      <MenuTrigger>
        <button>Format</button>
      </MenuTrigger>
      <MenuContent>
        <MenuGroup label="Text">
          <MenuItem>Single</MenuItem>
          <MenuItem>1.15</MenuItem>
          <MenuItem>Double</MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup label="Spacing">
          <MenuItem>Add space before paragraph</MenuItem>
          <MenuItem>Add space after paragraph</MenuItem>
        </MenuGroup>
      </MenuContent>
    </Menu>
  ),
};

/**
 * Menu with disabled and selected items.
 */
export const States: Story = {
  render: () => (
    <Menu>
      <MenuTrigger>
        <button>View</button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem selected>Compact</MenuItem>
        <MenuItem>Comfortable</MenuItem>
        <MenuItem>Cozy</MenuItem>
        <MenuDivider />
        <MenuItem disabled>Custom (Pro only)</MenuItem>
      </MenuContent>
    </Menu>
  ),
};

/**
 * Dense menu with smaller padding.
 */
export const Dense: Story = {
  render: () => (
    <Menu>
      <MenuTrigger>
        <button>Dense Menu</button>
      </MenuTrigger>
      <MenuContent dense>
        <MenuItem>Option 1</MenuItem>
        <MenuItem>Option 2</MenuItem>
        <MenuItem>Option 3</MenuItem>
        <MenuItem>Option 4</MenuItem>
        <MenuItem>Option 5</MenuItem>
      </MenuContent>
    </Menu>
  ),
};
