import { useState } from 'react';
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

// ─── Basic ───────────────────────────────────────────────

const BasicStory = () => (
  <div style={{ padding: 32 }}>
    <Menu style={{ width: 240 }}>
      <MenuItem onClick={() => console.log('Home')}>Home</MenuItem>
      <MenuItem onClick={() => console.log('Profile')}>Profile</MenuItem>
      <MenuItem onClick={() => console.log('Settings')}>Settings</MenuItem>
    </Menu>
  </div>
);

// ─── States ──────────────────────────────────────────────

const StatesStory = () => (
  <div style={{ padding: 32 }}>
    <Menu style={{ width: 240 }}>
      <MenuItem>Home</MenuItem>
      <MenuItem selected>Users</MenuItem>
      <MenuItem>Analytics</MenuItem>
      <MenuDivider />
      <MenuItem disabled>Admin (restricted)</MenuItem>
      <MenuItem danger>Logout</MenuItem>
    </Menu>
  </div>
);

// ─── Grouped ─────────────────────────────────────────────

const GroupedStory = () => (
  <div style={{ padding: 32 }}>
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
  </div>
);

// ─── With Sub-menus (hover to expand) ────────────────────

const WithSubMenusStory = () => {
  const [selected, setSelected] = useState('reports');

  return (
    <div style={{ padding: 32 }}>
      <Menu style={{ width: 260 }}>
        <MenuItem
          selected={selected === 'home'}
          onClick={() => setSelected('home')}
        >
          🏠 Dashboard
        </MenuItem>

        <MenuSub>
          <MenuSubTrigger>📊 Analytics</MenuSubTrigger>
          <MenuSubContent>
            <MenuItem
              selected={selected === 'overview'}
              onClick={() => setSelected('overview')}
            >
              Overview
            </MenuItem>
            <MenuItem
              selected={selected === 'reports'}
              onClick={() => setSelected('reports')}
            >
              Reports
            </MenuItem>
            <MenuItem
              selected={selected === 'exports'}
              onClick={() => setSelected('exports')}
            >
              Exports
            </MenuItem>
          </MenuSubContent>
        </MenuSub>

        <MenuSub>
          <MenuSubTrigger>⚙ Settings</MenuSubTrigger>
          <MenuSubContent>
            <MenuItem
              selected={selected === 'general'}
              onClick={() => setSelected('general')}
            >
              General
            </MenuItem>
            <MenuItem
              selected={selected === 'security'}
              onClick={() => setSelected('security')}
            >
              Security
            </MenuItem>
            <MenuItem
              selected={selected === 'notifications'}
              onClick={() => setSelected('notifications')}
            >
              Notifications
            </MenuItem>
          </MenuSubContent>
        </MenuSub>

        <MenuDivider />
        <MenuItem danger>🚪 Logout</MenuItem>
      </Menu>
    </div>
  );
};

// ─── Nested Sub-menus ────────────────────────────────────

const NestedSubMenusStory = () => (
  <div style={{ padding: 32 }}>
    <Menu style={{ width: 260 }}>
      <MenuItem>🏠 Home</MenuItem>

      <MenuSub>
        <MenuSubTrigger>📁 Projects</MenuSubTrigger>
        <MenuSubContent>
          <MenuItem>All Projects</MenuItem>
          <MenuItem>Starred</MenuItem>
          <MenuSub>
            <MenuSubTrigger>By Team</MenuSubTrigger>
            <MenuSubContent>
              <MenuItem>Frontend</MenuItem>
              <MenuItem>Backend</MenuItem>
              <MenuItem>DevOps</MenuItem>
            </MenuSubContent>
          </MenuSub>
        </MenuSubContent>
      </MenuSub>

      <MenuItem>📊 Analytics</MenuItem>
    </Menu>
  </div>
);

// ─── Auto-expand (selected child expands parents) ────────

const AutoExpandStory = () => {
  const [selected, setSelected] = useState('backend');

  return (
    <div style={{ padding: 32 }}>
      <div style={{ fontSize: 13, color: '#888', marginBottom: 16 }}>
        Click any item — parent subs auto-expand to reveal the active item.
      </div>
      <Menu style={{ width: 260 }}>
        <MenuItem
          selected={selected === 'home'}
          onClick={() => setSelected('home')}
        >
          🏠 Home
        </MenuItem>

        <MenuSub>
          <MenuSubTrigger>📁 Projects</MenuSubTrigger>
          <MenuSubContent>
            <MenuItem
              selected={selected === 'all'}
              onClick={() => setSelected('all')}
            >
              All Projects
            </MenuItem>
            <MenuSub>
              <MenuSubTrigger>By Team</MenuSubTrigger>
              <MenuSubContent>
                <MenuItem
                  selected={selected === 'frontend'}
                  onClick={() => setSelected('frontend')}
                >
                  Frontend
                </MenuItem>
                <MenuItem
                  selected={selected === 'backend'}
                  onClick={() => setSelected('backend')}
                >
                  Backend
                </MenuItem>
                <MenuItem
                  selected={selected === 'devops'}
                  onClick={() => setSelected('devops')}
                >
                  DevOps
                </MenuItem>
              </MenuSubContent>
            </MenuSub>
          </MenuSubContent>
        </MenuSub>

        <MenuSub>
          <MenuSubTrigger>⚙ Settings</MenuSubTrigger>
          <MenuSubContent>
            <MenuItem
              selected={selected === 'general'}
              onClick={() => setSelected('general')}
            >
              General
            </MenuItem>
            <MenuItem
              selected={selected === 'security'}
              onClick={() => setSelected('security')}
            >
              Security
            </MenuItem>
          </MenuSubContent>
        </MenuSub>
      </Menu>
    </div>
  );
};

// ─── Dense ───────────────────────────────────────────────

const DenseStory = () => (
  <div style={{ padding: 32 }}>
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
  </div>
);

// ─── Playground ──────────────────────────────────────────

const PlaygroundStory = (args: {
  dense: boolean;
  width: number;
  showIcons: boolean;
  showShortcuts: boolean;
  showSubMenu: boolean;
  showDanger: boolean;
  showDisabled: boolean;
  showSelected: boolean;
  showLabels: boolean;
}) => (
  <div style={{ padding: 32 }}>
    <Menu dense={args.dense} style={{ width: args.width }}>
      {args.showLabels && <MenuLabel>Navigation</MenuLabel>}

      <MenuItem
        icon={args.showIcons ? <>🏠</> : undefined}
        shortcut={args.showShortcuts ? '⌘1' : undefined}
        selected={args.showSelected}
      >
        Home
      </MenuItem>
      <MenuItem
        icon={args.showIcons ? <>👤</> : undefined}
        shortcut={args.showShortcuts ? '⌘2' : undefined}
      >
        Profile
      </MenuItem>

      {args.showSubMenu && (
        <>
          <MenuDivider />
          <MenuSub>
            <MenuSubTrigger icon={args.showIcons ? <>⚙</> : undefined}>
              Settings
            </MenuSubTrigger>
            <MenuSubContent>
              <MenuItem>General</MenuItem>
              <MenuItem>Security</MenuItem>
              <MenuItem>Notifications</MenuItem>
            </MenuSubContent>
          </MenuSub>
        </>
      )}

      <MenuDivider />

      {args.showDisabled && <MenuItem disabled>Admin (restricted)</MenuItem>}
      {args.showDanger && <MenuItem danger>Logout</MenuItem>}
    </Menu>
  </div>
);

// ─── Meta & Exports ──────────────────────────────────────

const meta: Meta = {
  title: 'Menu/Menu',
};

export default meta;

export const Basic: StoryObj = { name: 'Basic', render: () => <BasicStory /> };
export const States: StoryObj = { name: 'States', render: () => <StatesStory /> };
export const Grouped: StoryObj = { name: 'Grouped', render: () => <GroupedStory /> };
export const WithSubMenus: StoryObj = { name: 'Sub-menus (hover)', render: () => <WithSubMenusStory /> };
export const NestedSubMenus: StoryObj = { name: 'Nested Sub-menus', render: () => <NestedSubMenusStory /> };
export const AutoExpand: StoryObj = { name: 'Auto-expand (selected)', render: () => <AutoExpandStory /> };
export const Dense: StoryObj = { name: 'Dense', render: () => <DenseStory /> };

export const Playground: StoryObj<typeof PlaygroundStory> = {
  name: 'Playground',
  argTypes: {
    dense: { control: 'boolean' },
    width: { control: { type: 'range', min: 160, max: 400, step: 10 } },
    showIcons: { control: 'boolean' },
    showShortcuts: { control: 'boolean' },
    showSubMenu: { control: 'boolean' },
    showDanger: { control: 'boolean' },
    showDisabled: { control: 'boolean' },
    showSelected: { control: 'boolean' },
    showLabels: { control: 'boolean' },
  },
  args: {
    dense: false,
    width: 260,
    showIcons: true,
    showShortcuts: false,
    showSubMenu: true,
    showDanger: true,
    showDisabled: true,
    showSelected: true,
    showLabels: true,
  },
  render: (args) => <PlaygroundStory {...args} />,
};
