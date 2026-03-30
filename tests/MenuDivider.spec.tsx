import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { axe } from 'jest-axe';
import { ThemeProvider } from '@thanh-libs/theme';
import { Menu } from '../src/lib/components/Menu';
import { MenuDivider } from '../src/lib/components/MenuDivider';
import { MenuItem } from '../src/lib/components/MenuItem';

describe('MenuDivider', () => {
  it('renders correctly', () => {
    render(
      <ThemeProvider>
        <Menu>
          <MenuDivider data-testid="divider-test" />
        </Menu>
      </ThemeProvider>,
    );
    expect(screen.getByRole('separator')).toBeInTheDocument();
    expect(screen.getByTestId('divider-test')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <Menu>
          <MenuDivider />
          <MenuItem>Item</MenuItem>
        </Menu>
      </ThemeProvider>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
