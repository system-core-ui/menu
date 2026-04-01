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

// ─── Custom Color Scheme ───────────────────────────────────

const CustomColorSchemeStory = (args: { mode: 'inline' | 'popover' }) => {
  const [selectedBlue, setSelectedBlue] = useState('users');
  const [selectedDark, setSelectedDark] = useState('analytics');

  return (
    <div style={{ display: 'flex', gap: '2rem', padding: '2rem', backgroundColor: '#f5f5f5', height: 440 }}>
      {/* Blue sidebar */}
      <aside style={{ display: 'flex', flexDirection: 'column', width: 260, border: '1px solid #115293', borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ background: '#115293', color: '#fff', padding: '12px 16px', fontWeight: 600, fontSize: 14 }}>Blue Sidebar</div>
        <Menu
          mode={args.mode}
          colorScheme={{
            background: '#1565c0',
            color: '#fff',
            hoverBg: 'rgba(255,255,255,0.12)',
            hoverColor: '#fff',
            activeBg: 'rgba(255,255,255,0.24)',
            activeColor: '#fff',
            softSelectedBg: 'rgba(255,255,255,0.08)',
            secondaryColor: 'rgba(255,255,255,0.7)',
            dividerColor: 'rgba(255,255,255,0.2)',
            focusRingColor: '#fff',
            dangerColor: '#ff8a80',
            dangerHoverBg: 'rgba(255,138,128,0.16)',
            disabledColor: 'rgba(255,255,255,0.38)',
            popoverBg: '#115293',
            popoverBorderColor: 'rgba(255,255,255,0.2)',
          }}
          style={{ flex: 1, borderRadius: 0 }}
        >
          <MenuLabel>Navigation</MenuLabel>
          <MenuItem icon={<span>🏠</span>} selected={selectedBlue === 'home'} onClick={() => setSelectedBlue('home')}>Home</MenuItem>
          <MenuItem icon={<span>👤</span>} selected={selectedBlue === 'users'} onClick={() => setSelectedBlue('users')}>Users</MenuItem>
          <MenuSub>
            <MenuSubTrigger icon={<span>⚙️</span>}>Settings</MenuSubTrigger>
            <MenuSubContent>
              <MenuItem>General</MenuItem>
              <MenuItem>Security</MenuItem>
              <MenuSub>
                <MenuSubTrigger>Advanced</MenuSubTrigger>
                <MenuSubContent>
                  <MenuItem>API Keys</MenuItem>
                  <MenuItem>Webhooks</MenuItem>
                </MenuSubContent>
              </MenuSub>
            </MenuSubContent>
          </MenuSub>
          <MenuDivider />
          <MenuItem disabled>Archived</MenuItem>
          <MenuItem danger>Delete Account</MenuItem>
        </Menu>
      </aside>

      {/* Dark sidebar */}
      <aside style={{ display: 'flex', flexDirection: 'column', width: 260, border: '1px solid #181825', borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ background: '#181825', color: '#cdd6f4', padding: '12px 16px', fontWeight: 600, fontSize: 14 }}>Dark Sidebar</div>
        <Menu
          mode={args.mode}
          colorScheme={{
            background: '#1e1e2e',
            color: '#cdd6f4',
            hoverBg: 'rgba(205,214,244,0.08)',
            activeBg: 'rgba(137,180,250,0.2)',
            activeColor: '#89b4fa',
            softSelectedBg: 'rgba(137,180,250,0.08)',
            secondaryColor: 'rgba(205,214,244,0.5)',
            dividerColor: 'rgba(205,214,244,0.12)',
            focusRingColor: '#89b4fa',
            dangerColor: '#f38ba8',
            dangerHoverBg: 'rgba(243,139,168,0.12)',
            disabledColor: 'rgba(205,214,244,0.3)',
            popoverBg: '#181825',
            popoverBorderColor: 'rgba(205,214,244,0.1)',
          }}
          style={{ flex: 1, borderRadius: 0 }}
        >
          <MenuLabel>Workspace</MenuLabel>
          <MenuItem icon={<span>📁</span>} selected={selectedDark === 'projects'} onClick={() => setSelectedDark('projects')}>Projects</MenuItem>
          <MenuItem icon={<span>📊</span>} selected={selectedDark === 'analytics'} onClick={() => setSelectedDark('analytics')}>Analytics</MenuItem>
          <MenuSub>
            <MenuSubTrigger icon={<span>🔧</span>}>Tools</MenuSubTrigger>
            <MenuSubContent>
              <MenuItem>Debugger</MenuItem>
              <MenuItem>Profiler</MenuItem>
            </MenuSubContent>
          </MenuSub>
          <MenuDivider />
          <MenuItem disabled>Legacy Module</MenuItem>
          <MenuItem danger>Reset Workspace</MenuItem>
        </Menu>
      </aside>

      {/* No colorScheme — default behavior */}
      <aside style={{ display: 'flex', flexDirection: 'column', width: 260, border: '1px solid #e0e0e0', borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ background: '#f5f5f5', color: '#333', padding: '12px 16px', fontWeight: 600, borderBottom: '1px solid #e0e0e0', fontSize: 14 }}>Default Sidebar</div>
        <Menu mode={args.mode} style={{ flex: 1, background: '#fff', borderRadius: 0 }}>
          <MenuLabel>Account</MenuLabel>
          <MenuItem icon={<span>👤</span>}>Profile</MenuItem>
          <MenuItem icon={<span>🔔</span>} selected>Notifications</MenuItem>
          <MenuSub>
            <MenuSubTrigger icon={<span>🎨</span>}>Theme</MenuSubTrigger>
            <MenuSubContent>
              <MenuItem>Light</MenuItem>
              <MenuItem>Dark</MenuItem>
              <MenuSub>
                <MenuSubTrigger>Custom</MenuSubTrigger>
                <MenuSubContent>
                  <MenuItem>Red Theme</MenuItem>
                  <MenuItem>Blue Theme</MenuItem>
                </MenuSubContent>
              </MenuSub>
            </MenuSubContent>
          </MenuSub>
          <MenuDivider />
          <MenuItem disabled>Billing</MenuItem>
          <MenuItem danger>Log Out</MenuItem>
        </Menu>
      </aside>
    </div>
  );
};

// ─── Playground ──────────────────────────────────────────

const PlaygroundStory = (args: {
  activeItem: string;
  mode: 'inline' | 'popover';
  display: 'default' | 'icon';
  trigger: 'hover' | 'click';
  floatingPlacement: 'right-start' | 'right' | 'right-end' | 'bottom-start' | 'bottom' | 'bottom-end' | 'left-start' | 'left' | 'left-end' | 'top-start' | 'top' | 'top-end';
  floatingOffset: number;
  floatingShift: boolean;
  floatingFlip: boolean;
  dense: boolean;
  width: number;
  maxHeight: number;
  showIcons: boolean;
  showShortcuts: boolean;
  showSubMenu: boolean;
  showDanger: boolean;
  showDisabled: boolean;
  showLabels: boolean;
}) => (
  <div style={{ padding: 32 }}>
    <Menu
      dense={args.dense}
      mode={args.mode}
      display={args.display}
      trigger={args.trigger}
      maxHeight={args.maxHeight || undefined}
      floatingSettings={{
        placement: args.floatingPlacement,
        offset: args.floatingOffset,
        shift: args.floatingShift,
        flip: args.floatingFlip,
      }}
      style={{ width: args.display === 'icon' ? undefined : args.width }}
    >
      {args.showLabels && args.display !== 'icon' && <MenuLabel>Navigation</MenuLabel>}

      <MenuItem
        icon={args.showIcons ? <>🏠</> : undefined}
        shortcut={args.showShortcuts ? '⌘1' : undefined}
        selected={args.activeItem === 'home'}
      >
        Home
      </MenuItem>
      <MenuItem
        icon={args.showIcons ? <>👤</> : undefined}
        shortcut={args.showShortcuts ? '⌘2' : undefined}
        selected={args.activeItem === 'profile'}
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
              <MenuItem selected={args.activeItem === 'general'}>General</MenuItem>
              <MenuItem selected={args.activeItem === 'security'}>Security</MenuItem>
              <MenuItem selected={args.activeItem === 'notifications'}>Notifications</MenuItem>
            </MenuSubContent>
          </MenuSub>
        </>
      )}

      <MenuDivider />

      {args.showDisabled && <MenuItem disabled>Admin (restricted)</MenuItem>}
      {args.showDanger && <MenuItem danger selected={args.activeItem === 'logout'}>Logout</MenuItem>}
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

export const CustomColorScheme: StoryObj<typeof CustomColorSchemeStory> = {
  name: 'Custom Color Scheme',
  argTypes: {
    mode: { control: 'radio', options: ['inline', 'popover'] },
  },
  args: {
    mode: 'popover',
  },
  render: (args) => <CustomColorSchemeStory {...args} />,
};

export const Playground: StoryObj<typeof PlaygroundStory> = {
  name: 'Playground',
  argTypes: {
    activeItem: {
      control: 'select',
      options: ['home', 'profile', 'general', 'security', 'notifications', 'logout', 'none'],
    },
    mode: { control: 'radio', options: ['inline', 'popover'] },
    display: { control: 'radio', options: ['default', 'icon'] },
    trigger: { control: 'radio', options: ['hover', 'click'] },
    floatingPlacement: { control: 'select', options: ['right-start', 'right', 'right-end', 'bottom-start', 'bottom', 'bottom-end', 'left-start', 'left', 'left-end', 'top-start', 'top', 'top-end'] },
    floatingOffset: { control: 'number' },
    floatingShift: { control: 'boolean' },
    floatingFlip: { control: 'boolean' },
    dense: { control: 'boolean' },
    width: { control: { type: 'range', min: 160, max: 400, step: 10 } },
    maxHeight: { control: { type: 'range', min: 0, max: 800, step: 10 } },
    showIcons: { control: 'boolean' },
    showShortcuts: { control: 'boolean' },
    showSubMenu: { control: 'boolean' },
    showDanger: { control: 'boolean' },
    showDisabled: { control: 'boolean' },
    showLabels: { control: 'boolean' },
  },
  args: {
    activeItem: 'home',
    mode: 'inline',
    display: 'default',
    trigger: 'hover',
    floatingPlacement: 'right-start',
    floatingOffset: 4,
    floatingShift: true,
    floatingFlip: true,
    dense: false,
    width: 260,
    maxHeight: 0,
    showIcons: true,
    showShortcuts: false,
    showSubMenu: true,
    showDanger: true,
    showDisabled: true,
    showLabels: true,
  },
  render: (args) => <PlaygroundStory {...args} />,
};
