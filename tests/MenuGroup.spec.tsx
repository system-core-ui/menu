import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { axe } from 'jest-axe';
import { ThemeProvider } from '@thanh-libs/theme';
import { Menu } from '../src/lib/components/Menu';
import { MenuGroup } from '../src/lib/components/MenuGroup';
import { MenuItem } from '../src/lib/components/MenuItem';

describe('MenuGroup', () => {
  it('renders correctly', () => {
    render(
      <ThemeProvider>
        <Menu>
          <MenuGroup label="Group Label" data-testid="group-test">
            <MenuItem>Group Item</MenuItem>
          </MenuGroup>
        </Menu>
      </ThemeProvider>,
    );
    expect(screen.getByTestId('group-test')).toBeInTheDocument();
    expect(screen.getByText('Group Label')).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /group item/i })).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <Menu>
          <MenuGroup label="Group">
            <MenuItem>Item</MenuItem>
          </MenuGroup>
        </Menu>
      </ThemeProvider>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
