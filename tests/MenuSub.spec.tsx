import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { axe } from 'jest-axe';
import { ThemeProvider } from '@thanh-libs/theme';
import { Menu } from '../src/lib/components/Menu';
import { MenuSub } from '../src/lib/components/MenuSub';
import { MenuSubTrigger } from '../src/lib/components/MenuSubTrigger';
import { MenuSubContent } from '../src/lib/components/MenuSubContent';
import { MenuItem } from '../src/lib/components/MenuItem';

describe('MenuSub', () => {
  it('renders and toggles correctly', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <Menu>
          <MenuSub>
            <MenuSubTrigger>Sub Menu</MenuSubTrigger>
            <MenuSubContent data-testid="sub-content">
              <MenuItem>Sub Item 1</MenuItem>
              <MenuItem>Sub Item 2</MenuItem>
            </MenuSubContent>
          </MenuSub>
        </Menu>
      </ThemeProvider>,
    );

    const trigger = screen.getByRole('menuitem', { name: /sub menu/i });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    // Click to open
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    // Click to close
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('auto-expands when a child is selected', () => {
    render(
      <ThemeProvider>
        <Menu>
          <MenuSub>
            <MenuSubTrigger>Sub Menu</MenuSubTrigger>
            <MenuSubContent>
              <MenuItem selected>Selected Sub Item</MenuItem>
            </MenuSubContent>
          </MenuSub>
        </Menu>
      </ThemeProvider>,
    );

    const trigger = screen.getByRole('menuitem', { name: /sub menu/i });
    // It should be open by default since child is selected
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('does not toggle when trigger is disabled', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <Menu>
          <MenuSub>
            <MenuSubTrigger disabled>Sub Menu</MenuSubTrigger>
            <MenuSubContent>
              <MenuItem>Sub Item</MenuItem>
            </MenuSubContent>
          </MenuSub>
        </Menu>
      </ThemeProvider>,
    );

    const trigger = screen.getByRole('menuitem', { name: /sub menu/i });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('handles uncontrolled defaultOpen', () => {
    render(
      <ThemeProvider>
        <Menu>
          <MenuSub defaultOpen>
            <MenuSubTrigger>Sub Menu</MenuSubTrigger>
            <MenuSubContent>
              <MenuItem>Sub Item</MenuItem>
            </MenuSubContent>
          </MenuSub>
        </Menu>
      </ThemeProvider>,
    );

    const trigger = screen.getByRole('menuitem', { name: /sub menu/i });
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('handles keyboard enter to toggle', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <Menu>
          <MenuSub>
            <MenuSubTrigger>Sub Menu</MenuSubTrigger>
            <MenuSubContent>
              <MenuItem>Sub Item</MenuItem>
            </MenuSubContent>
          </MenuSub>
        </Menu>
      </ThemeProvider>,
    );

    const trigger = screen.getByRole('menuitem', { name: /sub menu/i });
    trigger.focus();
    await user.keyboard('{Enter}');
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <Menu>
          <MenuSub>
            <MenuSubTrigger>Sub Menu</MenuSubTrigger>
            <MenuSubContent>
              <MenuItem>Sub Item</MenuItem>
            </MenuSubContent>
          </MenuSub>
        </Menu>
      </ThemeProvider>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
