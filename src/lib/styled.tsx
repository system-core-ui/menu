import { type CSSObject, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import type { ThemeSchema } from '@thanh-libs/theme';

/* ─── MenuContent ─────────────────────────────────────────── */

interface MenuContentStyledProps {
  ownerDense: boolean;
  ownerMaxHeight: string;
  ownerMinWidth: string;
}

export const MenuContentStyled = styled.div<MenuContentStyledProps>(
  ({ ownerDense, ownerMaxHeight, ownerMinWidth }): CSSObject => {
    const { palette, spacing, shadows, shape }: ThemeSchema = useTheme();

    return {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: palette?.background?.paper ?? '#fff',
      borderRadius: shape?.borderRadius ?? '0.5rem',
      boxShadow:
        shadows?.[8] ??
        '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
      padding: ownerDense
        ? (spacing?.tiny ?? '0.25rem') + ' 0'
        : (spacing?.small ?? '0.5rem') + ' 0',
      minWidth: ownerMinWidth,
      maxHeight: ownerMaxHeight,
      overflowY: 'auto',
      outline: 'none',

      // Scrollbar styling
      '&::-webkit-scrollbar': {
        width: 6,
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: palette?.action?.hover ?? 'rgba(0,0,0,0.1)',
        borderRadius: 3,
      },
    };
  },
);

/* ─── MenuItem ────────────────────────────────────────────── */

interface MenuItemStyledProps {
  ownerDanger: boolean;
  ownerDisabled: boolean;
  ownerSelected: boolean;
  ownerDense: boolean;
}

export const MenuItemStyled = styled.div<MenuItemStyledProps>(
  ({ ownerDanger, ownerDisabled, ownerSelected, ownerDense }): CSSObject => {
    const { palette, spacing }: ThemeSchema = useTheme();

    const textColor = ownerDanger
      ? (palette?.error?.main ?? '#d32f2f')
      : ownerDisabled
        ? (palette?.text?.disabled ?? 'rgba(0,0,0,0.38)')
        : (palette?.text?.primary ?? 'rgba(0,0,0,0.87)');

    return {
      display: 'flex',
      alignItems: 'center',
      gap: spacing?.small ?? '0.5rem',
      padding: ownerDense
        ? `${spacing?.tiny ?? '0.25rem'} ${spacing?.medium ?? '0.75rem'}`
        : `${spacing?.small ?? '0.5rem'} ${spacing?.large ?? '1rem'}`,
      color: textColor,
      fontSize: ownerDense ? '0.8125rem' : '0.875rem',
      lineHeight: 1.5,
      cursor: ownerDisabled ? 'default' : 'pointer',
      userSelect: 'none',
      position: 'relative',
      outline: 'none',
      transition: 'background-color 150ms',

      ...(!ownerDisabled && {
        '&:hover, &[data-highlighted]': {
          backgroundColor: ownerDanger
            ? (palette?.error?.light ?? 'rgba(211,47,47,0.08)')
            : (palette?.action?.hover ?? 'rgba(0,0,0,0.04)'),
        },

        '&:focus-visible': {
          outline: '2px solid transparent',
          boxShadow: `inset 0 0 0 2px ${palette?.primary?.main ?? '#1976d2'}`,
        },
      }),

      ...(ownerSelected && {
        fontWeight: 600,
      }),
    };
  },
);

/* ─── MenuItem layout helpers ─────────────────────────────── */

export const MenuItemIconStyled = styled.span(
  (): CSSObject => {
    const { palette }: ThemeSchema = useTheme();

    return {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      width: 20,
      height: 20,
      color: 'inherit',
      '& > svg': {
        width: '100%',
        height: '100%',
        fill: 'currentColor',
      },
    };
  },
);

export const MenuItemLabelStyled = styled.span({
  flex: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const MenuItemShortcutStyled = styled.span(
  (): CSSObject => {
    const { palette }: ThemeSchema = useTheme();

    return {
      marginLeft: 'auto',
      paddingLeft: '2rem',
      color: palette?.text?.secondary ?? 'rgba(0,0,0,0.6)',
      fontSize: '0.75rem',
      flexShrink: 0,
    };
  },
);

export const MenuItemCheckStyled = styled.span({
  display: 'inline-flex',
  width: 20,
  flexShrink: 0,
});

/* ─── MenuLabel ───────────────────────────────────────────── */

export const MenuLabelStyled = styled.div(
  (): CSSObject => {
    const { palette, spacing }: ThemeSchema = useTheme();

    return {
      padding: `${spacing?.small ?? '0.5rem'} ${spacing?.large ?? '1rem'}`,
      color: palette?.text?.secondary ?? 'rgba(0,0,0,0.6)',
      fontSize: '0.75rem',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      userSelect: 'none',
    };
  },
);

/* ─── MenuDivider ─────────────────────────────────────────── */

export const MenuDividerStyled = styled.hr(
  (): CSSObject => {
    const { palette, spacing }: ThemeSchema = useTheme();

    return {
      border: 'none',
      borderTop: `1px solid ${palette?.divider ?? 'rgba(0,0,0,0.12)'}`,
      margin: `${spacing?.tiny ?? '0.25rem'} 0`,
    };
  },
);

/* ─── MenuSubTrigger arrow ────────────────────────────────── */

export const SubArrowStyled = styled.span(
  (): CSSObject => {
    const { palette }: ThemeSchema = useTheme();

    return {
      marginLeft: 'auto',
      paddingLeft: '1rem',
      color: palette?.text?.secondary ?? 'rgba(0,0,0,0.6)',
      fontSize: '0.625rem',
      flexShrink: 0,
    };
  },
);

/* ─── Inline SubContent collapse ──────────────────────────── */

interface InlineSubContentStyledProps {
  ownerOpen: boolean;
}

export const InlineSubContentStyled = styled.div<InlineSubContentStyledProps>(
  ({ ownerOpen }): CSSObject => {
    const { spacing }: ThemeSchema = useTheme();

    return {
      overflow: 'hidden',
      maxHeight: ownerOpen ? '100vh' : 0,
      opacity: ownerOpen ? 1 : 0,
      transition: 'max-height 250ms ease, opacity 200ms ease',
      paddingLeft: spacing?.large ?? '1rem',
    };
  },
);
