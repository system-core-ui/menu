import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { axe } from 'jest-axe';
import { ThemeProvider } from '@thanh-libs/theme';
import { Menu } from '../src/lib/components/Menu';

describe('Menu', () => {
  it('renders correctly', () => {
    render(
      <ThemeProvider>
        <Menu data-testid="menu-test">
          <div>child item</div>
        </Menu>
      </ThemeProvider>,
    );
    expect(screen.getByTestId('menu-test')).toBeInTheDocument();
  });

  it('renders with dense prop correctly', () => {
    render(
      <ThemeProvider>
        <Menu dense data-testid="menu-test">
          <div>child item</div>
        </Menu>
      </ThemeProvider>,
    );
    expect(screen.getByTestId('menu-test')).toBeInTheDocument();
    // Context is tested implicitly via child items, but we test the prop application
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <Menu>
          <div>child</div>
        </Menu>
      </ThemeProvider>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
