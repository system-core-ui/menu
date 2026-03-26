import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { axe } from 'jest-axe';
import { ThemeProvider } from '@thanh-libs/theme';
import { Menu } from '../src/lib/components/Menu';
import { MenuItem } from '../src/lib/components/MenuItem';

describe('MenuItem', () => {
  it('renders correctly', () => {
    render(
      <ThemeProvider>
        <Menu>
          <MenuItem>Test Item</MenuItem>
        </Menu>
      </ThemeProvider>,
    );
    expect(screen.getByRole('menuitem', { name: /test item/i })).toBeInTheDocument();
  });

  it('handles clicks', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <ThemeProvider>
        <Menu>
          <MenuItem onClick={handleClick}>Clickable</MenuItem>
        </Menu>
      </ThemeProvider>,
    );
    const item = screen.getByRole('menuitem', { name: /clickable/i });
    await user.click(item);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not trigger click when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <ThemeProvider>
        <Menu>
          <MenuItem disabled onClick={handleClick}>Disabled</MenuItem>
        </Menu>
      </ThemeProvider>,
    );
    const item = screen.getByRole('menuitem', { name: /disabled/i });
    expect(item).toHaveAttribute('aria-disabled', 'true');
    await user.click(item);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders selected state correctly', () => {
    render(
      <ThemeProvider>
        <Menu>
          <MenuItem selected>Selected Item</MenuItem>
        </Menu>
      </ThemeProvider>,
    );
    expect(screen.getByText('✓')).toBeInTheDocument();
  });

  it('handles keyboard enter', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <ThemeProvider>
        <Menu>
          <MenuItem onClick={handleClick}>Keyboard Item</MenuItem>
        </Menu>
      </ThemeProvider>,
    );
    const item = screen.getByRole('menuitem', { name: /keyboard item/i });
    item.focus();
    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <Menu>
          <MenuItem>Item</MenuItem>
        </Menu>
      </ThemeProvider>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
