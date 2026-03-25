import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Menu,
  MenuItem,
  MenuLabel,
  MenuDivider,
  MenuGroup,
  MenuSub,
  MenuSubTrigger,
  MenuSubContent,
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
 * Basic persistent menu list.
 */
export const Basic: Story = {
  render: () => (
    <Menu style={{ width: 240 }}>
      <MenuItem onClick={() => console.log('Home')}>Home</MenuItem>
      <MenuItem onClick={() => console.log('Profile')}>Profile</MenuItem>
      <MenuItem onClick={() => console.log('Settings')}>Settings</MenuItem>
    </Menu>
  ),
};

/**
 * Menu with selected and disabled items.
 */
export const States: Story = {
  render: () => (
    <Menu style={{ width: 240 }}>
      <MenuItem>Home</MenuItem>
      <MenuItem selected>Users</MenuItem>
      <MenuItem>Analytics</MenuItem>
      <MenuDivider />
      <MenuItem disabled>Admin (restricted)</MenuItem>
      <MenuItem danger>Logout</MenuItem>
    </Menu>
  ),
};

/**
 * Menu with grouped items and labels.
 */
export const Grouped: Story = {
  render: () => (
    <Menu style={{ width: 240 }}>
      <MenuGroup label="Navigation">
        <MenuItem>Dashboard</MenuItem>
        <MenuItem selected>Users</MenuItem>
        <MenuItem>Analytics</MenuItem>
      </MenuGroup>
      <MenuDivider />
      <MenuGroup label="Account">
        <MenuItem>Profile</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuItem danger>Logout</MenuItem>
      </MenuGroup>
    </Menu>
  ),
};

/**
 * Menu with inline collapsible sub-menus (sidebar-style).
 */
export const WithSubMenus: Story = {
  render: () => (
    <Menu style={{ width: 260 }}>
      <MenuItem>🏠 Dashboard</MenuItem>

      <MenuSub defaultOpen>
        <MenuSubTrigger>📊 Analytics</MenuSubTrigger>
        <MenuSubContent>
          <MenuItem>Overview</MenuItem>
          <MenuItem selected>Reports</MenuItem>
          <MenuItem>Exports</MenuItem>
        </MenuSubContent>
      </MenuSub>

      <MenuSub>
        <MenuSubTrigger>⚙ Settings</MenuSubTrigger>
        <MenuSubContent>
          <MenuItem>General</MenuItem>
          <MenuItem>Security</MenuItem>
          <MenuItem>Notifications</MenuItem>
        </MenuSubContent>
      </MenuSub>

      <MenuDivider />
      <MenuItem danger>🚪 Logout</MenuItem>
    </Menu>
  ),
};

/**
 * Dense mode — smaller padding and text.
 */
export const Dense: Story = {
  render: () => (
    <Menu dense style={{ width: 220 }}>
      <MenuItem>Home</MenuItem>
      <MenuItem selected>Users</MenuItem>
      <MenuItem>Analytics</MenuItem>
      <MenuDivider />
      <MenuSub>
        <MenuSubTrigger>Settings</MenuSubTrigger>
        <MenuSubContent>
          <MenuItem>General</MenuItem>
          <MenuItem>Security</MenuItem>
        </MenuSubContent>
      </MenuSub>
    </Menu>
  ),
};
