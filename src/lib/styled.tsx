import { type CSSObject, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import type { ThemeSchema } from '@thanh-libs/theme';

/* ─── Menu Container ──────────────────────────────────────── */

interface MenuContainerStyledProps {
  ownerMaxHeight?: number | string;
}

export const MenuContainerStyled = styled.div<MenuContainerStyledProps>(
  ({ ownerMaxHeight }): CSSObject => {
    const { palette }: ThemeSchema = useTheme();

    return {
      display: 'flex',
      flexDirection: 'column',
      color: palette?.text?.primary ?? 'rgba(0,0,0,0.87)',
      ...(ownerMaxHeight !== undefined && {
        maxHeight: typeof ownerMaxHeight === 'number' ? `${ownerMaxHeight}px` : ownerMaxHeight,
        overflowY: 'auto',
      }),
    };
  },
);

/* ─── MenuItem ────────────────────────────────────────────── */

interface MenuItemStyledProps {
  ownerDanger: boolean;
  ownerDisabled: boolean;
  ownerSelected: boolean;
  ownerSoftSelected: boolean;
  ownerDense: boolean;
}

export const MenuItemStyled = styled.div<MenuItemStyledProps>(
  ({ ownerDanger, ownerDisabled, ownerSelected, ownerSoftSelected, ownerDense }): CSSObject => {
    const { palette, spacing }: ThemeSchema = useTheme();

    const selectedBg = palette?.action?.selected ?? 'rgba(25,118,210,0.08)';
    const softSelectedBg = palette?.action?.hover ?? 'rgba(0,0,0,0.04)';

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
      borderRadius: '0.375rem',
      transition: 'background-color 150ms',

      ...(!ownerDisabled && {
        '&:hover': {
          backgroundColor: ownerDanger
            ? (palette?.error?.light ?? 'rgba(211,47,47,0.08)')
            : (palette?.action?.hover ?? 'rgba(0,0,0,0.04)'),
        },

        '&:focus-visible': {
          outline: '2px solid transparent',
          boxShadow: `inset 0 0 0 2px ${palette?.primary?.main ?? '#1976d2'}`,
        },
      }),

      // Soft-select: parent has selected child — light bg, no bold
      ...(ownerSoftSelected && !ownerSelected && {
        backgroundColor: softSelectedBg,
      }),

      // Full select: the actual selected item — darker bg + bold
      ...(ownerSelected && {
        backgroundColor: selectedBg,
        fontWeight: 600,
      }),
    };
  },
);

/* ─── MenuItem layout helpers ─────────────────────────────── */

export const MenuItemIconStyled = styled.span({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: 20,
  height: 20,
  '& > svg': {
    width: '100%',
    height: '100%',
    fill: 'currentColor',
  },
});

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

/* ─── SubTrigger arrow indicator ──────────────────────────── */

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

/* ─── Inline SubContent (collapse/expand) ─────────────────── */

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
