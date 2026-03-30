import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { axe } from 'jest-axe';
import { ThemeProvider } from '@thanh-libs/theme';
import { Menu } from '../src/lib/components/Menu';
import { MenuLabel } from '../src/lib/components/MenuLabel';
import { MenuItem } from '../src/lib/components/MenuItem';

describe('MenuLabel', () => {
  it('renders correctly', () => {
    render(
      <ThemeProvider>
        <Menu>
          <MenuLabel>Test Label</MenuLabel>
        </Menu>
      </ThemeProvider>,
    );
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <Menu>
          <MenuLabel>Test</MenuLabel>
          <MenuItem>Item</MenuItem>
        </Menu>
      </ThemeProvider>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
