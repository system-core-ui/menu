import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThemeProvider } from '@thanh-libs/theme';
import {
  MenuContainerStyled,
  MenuItemStyled,
  MenuItemShortcutStyled,
  MenuLabelStyled,
  SubArrowStyled,
  MenuDividerStyled,
  PopoverSubContentStyled,
} from '../src/lib/styled';

// Utility for providing theme context
const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

// Utility to search injected styles for a specific value
const expectStyleToContain = (value: string) => {
  const styles = Array.from(document.querySelectorAll('style'));
  const allCss = styles.map((s) => s.textContent).join('\n');
  expect(allCss).toContain(value);
};

describe('ColorScheme Feature', () => {
  describe('MenuContainerStyled', () => {
    it('applies ownerColorScheme values correctly', () => {
      const { container } = renderWithTheme(
        <MenuContainerStyled ownerColorScheme={{ background: '#112233', color: '#445566' }} />
      );
      const el = container.firstChild as HTMLElement;
      expect(el).toHaveStyle({ backgroundColor: '#112233', color: '#445566' });
    });

    it('falls back to default theme when ownerColorScheme is not provided', () => {
      const { container } = renderWithTheme(<MenuContainerStyled />);
      const el = container.firstChild as HTMLElement;
      const styles = window.getComputedStyle(el);
      // ThemeProvider default text color is rgba(0,0,0,0.87)
      expect(styles.color).toBe('rgba(0, 0, 0, 0.87)');
    });
  });

  describe('MenuItemStyled', () => {
    const defaultProps = {
      ownerDanger: false,
      ownerDisabled: false,
      ownerSelected: false,
      ownerSoftSelected: false,
      ownerDense: false,
      ownerIconOnly: false,
    };

    it('applies normal state colors', () => {
      const { container } = renderWithTheme(
        <MenuItemStyled {...defaultProps} ownerColorScheme={{ color: '#000001' }} />
      );
      expect(container.firstChild).toHaveStyle({ color: '#000001' });
    });

    it('applies hover state colors (hoverBg, hoverColor)', () => {
      renderWithTheme(
        <MenuItemStyled
          {...defaultProps}
          ownerColorScheme={{ hoverBg: '#000002', hoverColor: '#000003' }}
        />
      );
      expectStyleToContain('#000002');
      expectStyleToContain('#000003');
    });

    it('applies selected state colors', () => {
      const { container } = renderWithTheme(
        <MenuItemStyled
          {...defaultProps}
          ownerSelected
          ownerColorScheme={{ activeBg: '#000004', activeColor: '#000005' }}
        />
      );
      expect(container.firstChild).toHaveStyle({ backgroundColor: '#000004', color: '#000005' });
    });

    it('applies disabled color', () => {
      const { container } = renderWithTheme(
        <MenuItemStyled {...defaultProps} ownerDisabled ownerColorScheme={{ disabledColor: '#000006' }} />
      );
      expect(container.firstChild).toHaveStyle({ color: '#000006' });
    });

    it('applies danger styling correctly', () => {
      const { container } = renderWithTheme(
        <MenuItemStyled
          {...defaultProps}
          ownerDanger
          ownerColorScheme={{ dangerColor: '#000007', dangerHoverBg: '#000008' }}
        />
      );
      expect(container.firstChild).toHaveStyle({ color: '#000007' });
      // hover bg should be injected into css class
      expectStyleToContain('#000008');
    });

    it('applies soft-selected background', () => {
      const { container } = renderWithTheme(
        <MenuItemStyled
          {...defaultProps}
          ownerSoftSelected
          ownerColorScheme={{ softSelectedBg: '#000009' }}
        />
      );
      expect(container.firstChild).toHaveStyle({ backgroundColor: '#000009' });
    });

    it('applies focus ring color', () => {
      renderWithTheme(
        <MenuItemStyled {...defaultProps} ownerColorScheme={{ focusRingColor: '#000010' }} />
      );
      expectStyleToContain('#000010');
    });
  });

  describe('Secondary styled components', () => {
    it('applies secondaryColor to MenuItemShortcutStyled', () => {
      const { container } = renderWithTheme(
        <MenuItemShortcutStyled ownerColorScheme={{ secondaryColor: '#000011' }} />
      );
      expect(container.firstChild).toHaveStyle({ color: '#000011' });
    });

    it('applies secondaryColor to MenuLabelStyled', () => {
      const { container } = renderWithTheme(
        <MenuLabelStyled ownerColorScheme={{ secondaryColor: '#000012' }} />
      );
      expect(container.firstChild).toHaveStyle({ color: '#000012' });
    });

    it('applies secondaryColor to SubArrowStyled', () => {
      const { container } = renderWithTheme(
        <SubArrowStyled ownerColorScheme={{ secondaryColor: '#000013' }} />
      );
      expect(container.firstChild).toHaveStyle({ color: '#000013' });
    });

    it('applies dividerColor to MenuDividerStyled', () => {
      const { container } = renderWithTheme(
        <MenuDividerStyled ownerColorScheme={{ dividerColor: '#000014' }} />
      );
      const el = container.firstChild as HTMLElement;
      const styles = window.getComputedStyle(el);
      // toHaveStyle might have issues with borderTop shorthands sometimes so check explicitly
      expect(styles.borderTopColor).toBe('#000014'.replace('#000014', 'rgb(0, 0, 20)'));
      // Just check the injected string instead since jsdom parses borders differently sometimes
      expectStyleToContain('#000014');
    });
  });

  describe('PopoverSubContentStyled', () => {
    it('applies popoverBg and popoverBorderColor', () => {
      const { container } = renderWithTheme(
        <PopoverSubContentStyled
          ownerColorScheme={{ popoverBg: '#000015', popoverBorderColor: '#000016' }}
        />
      );
      const el = container.firstChild as HTMLElement;
      expect(el).toHaveStyle({ backgroundColor: '#000015' });
      expectStyleToContain('#000016');
    });
  });

  describe('Partial colorScheme behavior', () => {
    it('falls back to theme values when fields are missing', () => {
      const { container } = renderWithTheme(
        <PopoverSubContentStyled ownerColorScheme={{ popoverBg: '#000017' }} /> // only testing one field
      );
      const el = container.firstChild as HTMLElement;
      expect(el).toHaveStyle({ backgroundColor: '#000017' });
      const styles = window.getComputedStyle(el);
      // Ensure the border color exists and is the fallback
      expect(styles.border).toBeTruthy();
      expectStyleToContain('#F0F0F0'); // Fallback string used in theme palette.divider
    });

    it('behaves unchanged when colorScheme is empty ({})', () => {
      const { container } = renderWithTheme(<MenuContainerStyled ownerColorScheme={{}} />);
      const el = container.firstChild as HTMLElement;
      const styles = window.getComputedStyle(el);
      expect(styles.color).toBe('rgba(0, 0, 0, 0.87)'); // fallback from theme
    });
  });
});
