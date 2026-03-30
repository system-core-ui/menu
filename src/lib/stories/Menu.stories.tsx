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

// ─── With Sub-menus (Inline Toggle) ────────────────────────

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

// ─── Max Height (Scroll) ─────────────────────────────────

const MaxHeightStory = () => (
  <div style={{ padding: 32 }}>
    <div style={{ fontSize: 13, color: '#888', marginBottom: 16 }}>
      Menu has a fixed maxHeight. Scroll or use Arrow keys to navigate.
    </div>
    <Menu maxHeight={250} style={{ width: 260 }}>
      {Array.from({ length: 20 }).map((_, i) => (
        <MenuItem key={i}>Item {i + 1}</MenuItem>
      ))}
    </Menu>
  </div>
);

// ─── Keyboard Navigation (Typeahead) ─────────────────────

const KeyboardNavigationStory = () => (
  <div style={{ padding: 32 }}>
    <div style={{ fontSize: 13, color: '#888', marginBottom: 16 }}>
      Focus the menu and type letters (e.g. "a", "s", "b") to jump to matching items.
    </div>
    <Menu style={{ width: 260 }}>
      <MenuItem>Apple</MenuItem>
      <MenuItem>Apricot</MenuItem>
      <MenuItem>Banana</MenuItem>
      <MenuItem>Blueberry</MenuItem>
      <MenuItem>Cherry</MenuItem>
      <MenuDivider />
      <MenuItem>Strawberry</MenuItem>
      <MenuItem>Watermelon</MenuItem>
    </Menu>
  </div>
);

// ─── Popover vs Inline Comparison ────────────────────────────

const PopoverSubMenusStory = () => {
  const [selected, setSelected] = useState('reports');

  return (
    <div style={{ padding: 32, display: 'flex', gap: 64, flexWrap: 'wrap' }}>
      <aside style={{ background: '#f8fafc', padding: 24, borderRadius: 12, border: '1px solid #e2e8f0' }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#334155', marginBottom: 16 }}>
          Mode: Inline (Default)
        </div>
        <Menu mode="inline" style={{ width: 260, background: '#ffffff' }}>
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
            </MenuSubContent>
          </MenuSub>
        </Menu>
      </aside>

      <aside style={{ background: '#f0fdf4', padding: 24, borderRadius: 12, border: '1px solid #bbf7d0' }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#166534', marginBottom: 16 }}>
          Mode: Popover (Floating)
        </div>
        <Menu mode="popover" style={{ width: 260, background: '#ffffff' }}>
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
              <MenuSub>
                <MenuSubTrigger>More Data</MenuSubTrigger>
                <MenuSubContent>
                  <MenuItem>Exports</MenuItem>
                  <MenuItem>Insights</MenuItem>
                </MenuSubContent>
              </MenuSub>
            </MenuSubContent>
          </MenuSub>
        </Menu>
      </aside>
    </div>
  );
};

// ─── Icon-Only Display Mode (Sidebar Mini) ─────────────────

const IconDisplayStory = () => {
  const [selected, setSelected] = useState('home');

  return (
    <div style={{ padding: 32, height: 400 }}>
      <aside style={{ background: '#f5f5f5', padding: 16, height: '100%', width: 'fit-content', borderRadius: 12, border: '1px solid #e5e5e5' }}>
        <div style={{ fontSize: 13, color: '#888', marginBottom: 16, textAlign: 'center' }}>
          Mini Sidebar
        </div>
        <Menu display="icon" mode="popover" style={{ height: 'calc(100% - 32px)', background: '#ffffff', borderRadius: 8 }}>
          <MenuItem
            icon={<>🏠</>}
            selected={selected === 'home'}
            onClick={() => setSelected('home')}
          >
            Home
          </MenuItem>
          <MenuItem
            icon={<>👤</>}
            selected={selected === 'profile'}
            onClick={() => setSelected('profile')}
          >
            Profile
          </MenuItem>

          <MenuSub>
            <MenuSubTrigger icon={<>📊</>}>Analytics</MenuSubTrigger>
            <MenuSubContent>
              <MenuItem>Overview</MenuItem>
              <MenuItem>Reports</MenuItem>
            </MenuSubContent>
          </MenuSub>

          <MenuSub>
            <MenuSubTrigger icon={<>⚙</>}>Settings</MenuSubTrigger>
            <MenuSubContent>
              <MenuItem>General</MenuItem>
              <MenuItem>Security</MenuItem>
            </MenuSubContent>
          </MenuSub>
          
          <MenuDivider />
          <MenuItem icon={<>🚪</>} danger>Logout</MenuItem>
        </Menu>
      </aside>
    </div>
  );
};

// ─── Playground ──────────────────────────────────────────

const PlaygroundStory = (args: {
  mode: 'inline' | 'popover';
  display: 'default' | 'icon';
  dense: boolean;
  width: number;
  maxHeight: number;
  showIcons: boolean;
  showShortcuts: boolean;
  showSubMenu: boolean;
  showDanger: boolean;
  showDisabled: boolean;
  showSelected: boolean;
  showLabels: boolean;
}) => (
  <div style={{ padding: 32 }}>
    <Menu dense={args.dense} mode={args.mode} display={args.display} maxHeight={args.maxHeight || undefined} style={{ width: args.display === 'icon' ? undefined : args.width }}>
      {args.showLabels && args.display !== 'icon' && <MenuLabel>Navigation</MenuLabel>}

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
export const WithSubMenus: StoryObj = { name: 'Sub-menus (Inline)', render: () => <WithSubMenusStory /> };
export const NestedSubMenus: StoryObj = { name: 'Nested Sub-menus', render: () => <NestedSubMenusStory /> };
export const AutoExpand: StoryObj = { name: 'Auto-expand (selected)', render: () => <AutoExpandStory /> };
export const Dense: StoryObj = { name: 'Dense', render: () => <DenseStory /> };
export const MaxHeight: StoryObj = { name: 'Max Height', render: () => <MaxHeightStory /> };
export const KeyboardNavigation: StoryObj = { name: 'Keyboard Navigation', render: () => <KeyboardNavigationStory /> };
export const PopoverSubMenus: StoryObj = { name: 'Popover Sub-menus', render: () => <PopoverSubMenusStory /> };
export const IconDisplay: StoryObj = { name: 'Icon-Only Display (Mini Sidebar)', render: () => <IconDisplayStory /> };

export const Playground: StoryObj<typeof PlaygroundStory> = {
  name: 'Playground',
  argTypes: {
    mode: { control: 'radio', options: ['inline', 'popover'] },
    display: { control: 'radio', options: ['default', 'icon'] },
    dense: { control: 'boolean' },
    width: { control: { type: 'range', min: 160, max: 400, step: 10 } },
    maxHeight: { control: { type: 'range', min: 0, max: 800, step: 10 } },
    showIcons: { control: 'boolean' },
    showShortcuts: { control: 'boolean' },
    showSubMenu: { control: 'boolean' },
    showDanger: { control: 'boolean' },
    showDisabled: { control: 'boolean' },
    showSelected: { control: 'boolean' },
    showLabels: { control: 'boolean' },
  },
  args: {
    mode: 'inline',
    display: 'default',
    dense: false,
    width: 260,
    maxHeight: 0,
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
