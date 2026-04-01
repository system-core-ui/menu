# @thanh-libs/menu

Persistent navigation menu for React — compound-component API with **inline collapsible** and **floating popover** sub-menus, keyboard navigation, typeahead search, customisable color schemes, and active-state indicators. Built with [Emotion](https://emotion.sh/) and [Floating UI](https://floating-ui.com/).

## Installation

```bash
npm install @thanh-libs/menu
```

### Peer dependencies

```bash
npm install react react-dom @emotion/react @emotion/styled @floating-ui/react @thanh-libs/theme @thanh-libs/dialog
```

---

## Quick Start

```tsx
import {
  Menu, MenuItem, MenuLabel, MenuDivider,
  MenuGroup, MenuSub, MenuSubTrigger, MenuSubContent,
} from '@thanh-libs/menu';

function Sidebar() {
  const [active, setActive] = useState('home');

  return (
    <Menu style={{ width: 260 }}>
      <MenuItem
        icon={<HomeIcon />}
        selected={active === 'home'}
        onClick={() => setActive('home')}
      >
        Home
      </MenuItem>

      <MenuSub>
        <MenuSubTrigger icon={<SettingsIcon />}>Settings</MenuSubTrigger>
        <MenuSubContent>
          <MenuItem
            selected={active === 'general'}
            onClick={() => setActive('general')}
          >
            General
          </MenuItem>
          <MenuItem
            selected={active === 'security'}
            onClick={() => setActive('security')}
          >
            Security
          </MenuItem>
        </MenuSubContent>
      </MenuSub>

      <MenuDivider />
      <MenuItem danger>Logout</MenuItem>
    </Menu>
  );
}
```

---

## Components

### Menu

Root container. Provides context (mode, density, color scheme, …) to all descendants. Always rendered — this is a **persistent visible list**, not a dropdown/popover.

```tsx
<Menu dense mode="inline" display="default" style={{ width: 260 }}>
  {/* MenuItem, MenuSub, MenuDivider, MenuGroup, MenuLabel … */}
</Menu>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **(required)** | Menu items and sub-components |
| `dense` | `boolean` | `false` | Compact mode — smaller padding and font size |
| `maxHeight` | `number \| string` | — | Fixed max height with overflow scroll |
| `mode` | `MenuSubMode` | `'inline'` | Default sub-menu mode for all nested `MenuSub` |
| `display` | `MenuDisplay` | `'default'` | `'icon'` shows only icons (mini-sidebar) |
| `trigger` | `MenuSubTriggerType` | `'hover'` | Default popover trigger type (`'hover'` or `'click'`) |
| `floatingSettings` | `MenuFloatingSettings` | — | Global Floating UI settings for popover sub-menus |
| `colorScheme` | `MenuColorScheme` | — | Custom color scheme (raw CSS color strings) |
| `activeIndicator` | `MenuActiveIndicator` | `'dot'` | Active indicator on selected items (see below) |
| `showDot` | `boolean` | `false` | Show inline dot bullets on child items inside `MenuSubContent` |

Also accepts all native `<div>` HTML attributes (`className`, `style`, `id`, `onKeyDown`, etc.).

#### Active Indicator

Controls the visual marker beside selected items:

| Value | Description |
|-------|-------------|
| `'dot'` (default) | Small filled circle beside the selected item |
| `'bar'` | Vertical bar beside the selected item |
| `false` | No indicator |
| `ReactNode` | Custom indicator element |

```tsx
<Menu activeIndicator="bar">…</Menu>
<Menu activeIndicator={false}>…</Menu>
<Menu activeIndicator={<CustomIcon />}>…</Menu>
```

---

### MenuItem

Clickable action or navigation item. Supports icon, shortcut, disabled, danger, and selected states.

```tsx
<MenuItem
  icon={<UserIcon />}
  shortcut="⌘K"
  selected
  onClick={() => navigate('/users')}
>
  Users
</MenuItem>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **(required)** | Label content |
| `icon` | `ReactNode` | — | Leading icon (20×20 container, SVGs auto-fill) |
| `shortcut` | `ReactNode` | — | Trailing keyboard shortcut text |
| `disabled` | `boolean` | `false` | Disabled state — no click, muted color |
| `danger` | `boolean` | `false` | Destructive/danger styling (red) |
| `selected` | `boolean` | `false` | Selected/active state — bold text + background highlight |
| `onClick` | `() => void` | — | Click handler (blocked when disabled) |

Also accepts all native `<div>` HTML attributes except `onClick` (redefined as `() => void`).

**Auto-expand behaviour**: When `selected={true}` and the item is inside a `MenuSub`, the parent sub-menu (and all ancestors) automatically expand to reveal the active item on mount.

---

### MenuLabel

Non-interactive group heading text.

```tsx
<MenuLabel>Navigation</MenuLabel>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **(required)** | Label text |
| `className` | `string` | — | Additional CSS class |
| `style` | `CSSProperties` | — | Inline styles |
| `id` | `string` | — | Element ID |

---

### MenuDivider

Visual horizontal separator between menu items.

```tsx
<MenuDivider />
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional CSS class |
| `style` | `CSSProperties` | — | Inline styles |

---

### MenuGroup

Semantic grouping of items with an optional label shorthand.

```tsx
<MenuGroup label="Account">
  <MenuItem>Profile</MenuItem>
  <MenuItem>Settings</MenuItem>
</MenuGroup>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **(required)** | Menu items inside the group |
| `label` | `ReactNode` | — | Optional group label (renders a `MenuLabel` internally) |
| `className` | `string` | — | Additional CSS class |

---

### MenuSub

Container for a collapsible or floating sub-menu. Wraps `MenuSubTrigger` + `MenuSubContent`.

Supports **two modes**:
- **`inline`** (default) — Collapsible accordion within the parent list
- **`popover`** — Floating panel that opens to the side via Floating UI

```tsx
<MenuSub mode="inline" defaultOpen>
  <MenuSubTrigger icon={<SettingsIcon />}>Settings</MenuSubTrigger>
  <MenuSubContent>
    <MenuItem>General</MenuItem>
    <MenuItem>Security</MenuItem>
  </MenuSubContent>
</MenuSub>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **(required)** | Must contain `MenuSubTrigger` + `MenuSubContent` |
| `open` | `boolean` | — | Controlled open state |
| `defaultOpen` | `boolean` | `false` | Initial open state (uncontrolled) |
| `onOpenChange` | `(open: boolean) => void` | — | Callback when open state changes |
| `mode` | `MenuSubMode` | inherited | Override parent sub-menu mode (`'inline'` or `'popover'`) |
| `trigger` | `MenuSubTriggerType` | inherited | Override popover trigger type (`'hover'` or `'click'`) |

**Controlled vs Uncontrolled**:
- Pass `open` + `onOpenChange` for controlled mode
- Pass `defaultOpen` for uncontrolled mode (internal state)

**Auto-expand**: When any descendant `MenuItem` has `selected={true}`, the sub-menu automatically opens and propagates upward through all ancestor `MenuSub` components.

**Soft-select**: When any descendant is selected, the `MenuSubTrigger` renders with a soft-selected background to indicate it contains the active item.

---

### MenuSubTrigger

The item that toggles a sub-menu open/closed. Renders a trailing arrow indicator.

```tsx
<MenuSubTrigger icon={<FolderIcon />}>Projects</MenuSubTrigger>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **(required)** | Label content |
| `icon` | `ReactNode` | — | Leading icon |
| `disabled` | `boolean` | `false` | Disabled state |

Also accepts all native `<div>` HTML attributes except `onClick`.

**Arrow indicators**:
- Inline mode: `▾` (closed) / `▴` (open)
- Popover mode: `▸` (always)

---

### MenuSubContent

Content container for sub-menu items. Automatically renders as inline (animated collapse) or floating popover based on the resolved mode.

```tsx
<MenuSubContent>
  <MenuItem>Child Item 1</MenuItem>
  <MenuItem>Child Item 2</MenuItem>
</MenuSubContent>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **(required)** | Sub-menu items |

Also accepts all native `<div>` HTML attributes.

---

## Types

### MenuSubMode

```ts
type MenuSubMode = 'inline' | 'popover';
```

| Value | Description |
|-------|-------------|
| `'inline'` | Collapsible sub-menu rendered inline within parent |
| `'popover'` | Floating sub-menu using Floating UI positioning |

### MenuDisplay

```ts
type MenuDisplay = 'default' | 'icon';
```

| Value | Description |
|-------|-------------|
| `'default'` | Full display — icons, labels, shortcuts visible |
| `'icon'` | Icon-only mode (mini sidebar) — labels and shortcuts hidden |

### MenuSubTriggerType

```ts
type MenuSubTriggerType = 'hover' | 'click';
```

Controls how popover sub-menus are triggered. Only applies when `mode="popover"`.

### MenuActiveIndicator

```ts
type MenuActiveIndicator = 'dot' | 'bar' | false | ReactNode;
```

### MenuFloatingSettings

Global Floating UI configuration for all popover sub-menus.

```ts
interface MenuFloatingSettings {
  placement?: Placement;  // default: 'right-start'
  offset?: number;        // gap between trigger and popover (px)
  flip?: boolean;         // flip placement if space is limited
  shift?: boolean;        // shift to stay in viewport
}
```

### MenuColorScheme

Full color customisation via raw CSS color strings. All properties are optional — only override what you need.

```ts
interface MenuColorScheme {
  // Container
  background?: string;
  color?: string;

  // Hover state
  hoverBg?: string;
  hoverColor?: string;

  // Active/selected item
  activeBg?: string;
  activeColor?: string;

  // Soft-selected (parent trigger of active child)
  softSelectedBg?: string;

  // Danger item
  dangerColor?: string;
  dangerHoverBg?: string;

  // Disabled text
  disabledColor?: string;

  // Secondary text (labels, shortcuts, arrows)
  secondaryColor?: string;

  // Divider line
  dividerColor?: string;

  // Focus ring
  focusRingColor?: string;

  // Popover sub-menu
  popoverBg?: string;
  popoverBorderColor?: string;

  // Inline dot indicator
  dotColor?: string;
  dotActiveColor?: string;

  // Child item hover (items inside SubContent)
  childHoverColor?: string;
  childHoverBg?: string;

  // Active indicator icon color
  activeIconColor?: string;
}
```

---

## Keyboard Navigation

Full keyboard support following [WAI-ARIA Menu Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu/):

| Key | Action |
|-----|--------|
| `↓` Arrow Down | Move focus to next visible item (wraps to first) |
| `↑` Arrow Up | Move focus to previous visible item (wraps to last) |
| `Home` | Move focus to first item |
| `End` | Move focus to last item |
| `Enter` / `Space` | Activate focused item or toggle sub-menu |
| `→` Arrow Right | Open inline sub-menu (on trigger) |
| `←` Arrow Left | Close current sub-menu, return focus to trigger |
| `Escape` | Close current sub-menu |
| **Typeahead** | Type characters to jump to matching item (500ms buffer) |

- Focus management uses roving tabindex — only the focused item has `tabIndex={0}`
- Collapsed sub-menu items are excluded from keyboard navigation
- Popover sub-menus have independent keyboard navigation within their floating panel

---

## Accessibility

| Feature | Implementation |
|---------|---------------|
| Roles | `menu` (container), `menuitem` (items), `separator` (dividers), `group` (groups) |
| `aria-disabled` | Set on disabled items |
| `aria-current="page"` | Set on selected items |
| `aria-haspopup="menu"` | Set on sub-menu triggers |
| `aria-expanded` | Set on sub-menu triggers (true/false) |
| `aria-labelledby` | Groups and sub-content reference their labels/triggers |
| Focus ring | Visible `box-shadow` outline on `:focus-visible` |

---

## Theming

### Theme Provider

Wrap your app with `ThemeProvider` from `@thanh-libs/theme`. The menu reads `palette`, `spacing` from the theme context.

```tsx
import { ThemeProvider } from '@thanh-libs/theme';
import { Menu, MenuItem } from '@thanh-libs/menu';

<ThemeProvider>
  <Menu style={{ width: 260 }}>
    <MenuItem>Home</MenuItem>
  </Menu>
</ThemeProvider>
```

### Custom Color Scheme

For full control without modifying the theme, pass a `colorScheme` prop with raw CSS color strings:

```tsx
<Menu
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
>
  …
</Menu>
```

---

## Usage Patterns

### Sidebar with Grouped Items

```tsx
<Menu style={{ width: 260 }}>
  <MenuGroup label="Navigation">
    <MenuItem icon={<DashboardIcon />} selected>Dashboard</MenuItem>
    <MenuItem icon={<UsersIcon />}>Users</MenuItem>
    <MenuItem icon={<ChartIcon />}>Analytics</MenuItem>
  </MenuGroup>
  <MenuDivider />
  <MenuGroup label="Account">
    <MenuItem icon={<ProfileIcon />}>Profile</MenuItem>
    <MenuItem icon={<SettingsIcon />}>Settings</MenuItem>
    <MenuItem icon={<LogoutIcon />} danger>Logout</MenuItem>
  </MenuGroup>
</Menu>
```

### Icon-Only Mini Sidebar (with Popover Sub-menus)

```tsx
<Menu display="icon" mode="popover" style={{ width: 'fit-content' }}>
  <MenuItem icon={<HomeIcon />} selected>Home</MenuItem>
  <MenuItem icon={<UserIcon />}>Profile</MenuItem>
  <MenuSub>
    <MenuSubTrigger icon={<SettingsIcon />}>Settings</MenuSubTrigger>
    <MenuSubContent>
      <MenuItem>General</MenuItem>
      <MenuItem>Security</MenuItem>
    </MenuSubContent>
  </MenuSub>
</Menu>
```

### Nested Sub-menus (Multi-level)

```tsx
<Menu style={{ width: 260 }}>
  <MenuItem>Home</MenuItem>
  <MenuSub>
    <MenuSubTrigger>Projects</MenuSubTrigger>
    <MenuSubContent>
      <MenuItem>All Projects</MenuItem>
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
</Menu>
```

### Popover Sub-menus (Floating)

```tsx
<Menu mode="popover" trigger="hover" floatingSettings={{ placement: 'right-start', offset: 4 }}>
  <MenuItem>Dashboard</MenuItem>
  <MenuSub>
    <MenuSubTrigger>Analytics</MenuSubTrigger>
    <MenuSubContent>
      <MenuItem>Overview</MenuItem>
      <MenuItem>Reports</MenuItem>
    </MenuSubContent>
  </MenuSub>
</Menu>
```

### Inline Dot Indicators

Show dot bullets beside child items inside expanded sub-menus:

```tsx
<Menu showDot style={{ width: 280 }}>
  <MenuItem icon={<HomeIcon />} selected>Dashboard</MenuItem>
  <MenuSub defaultOpen>
    <MenuSubTrigger icon={<ChartIcon />}>Analytics</MenuSubTrigger>
    <MenuSubContent>
      <MenuItem>Overview</MenuItem>
      <MenuItem selected>Reports</MenuItem>
      <MenuItem>Exports</MenuItem>
    </MenuSubContent>
  </MenuSub>
</Menu>
```

### Dense Mode

```tsx
<Menu dense style={{ width: 220 }}>
  <MenuItem>Home</MenuItem>
  <MenuItem selected>Users</MenuItem>
  <MenuItem>Analytics</MenuItem>
</Menu>
```

### Scrollable Menu

```tsx
<Menu maxHeight={300} style={{ width: 260 }}>
  {items.map((item) => (
    <MenuItem key={item.id}>{item.label}</MenuItem>
  ))}
</Menu>
```

---

## Design Tokens

| Token | Value | Description |
|-------|-------|-------------|
| Font size (default) | `0.875rem` (14px) | Regular item text |
| Font size (dense) | `0.8125rem` (13px) | Dense mode item text |
| Font size (shortcut) | `0.75rem` (12px) | Keyboard shortcut text |
| Font size (label) | `0.75rem` (12px) | Group label text |
| Icon size | `20×20px` | Leading icon container |
| Border radius | `0.375rem` (6px) | Item border radius |
| Collapse duration | `250ms` | Inline sub-menu expand/collapse |
| Background transition | `150ms` | Hover/select background change |
| Typeahead timeout | `500ms` | Character buffer reset delay |
| Popover min width | `160px` | Minimum floating panel width |
| Popover z-index | `1300` | Floating panel z-index |
| Sub close delay | `150ms` | Popover close delay (hover mode) |

---

## License

MIT
