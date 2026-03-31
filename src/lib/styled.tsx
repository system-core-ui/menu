import { type CSSObject, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import type { ThemeSchema } from '@thanh-libs/theme';
import type { MenuColorScheme } from './models';
import {
  FONT_SIZE_DEFAULT, FONT_SIZE_DENSE, FONT_SIZE_SHORTCUT,
  FONT_SIZE_LABEL, FONT_SIZE_SUB_ARROW,
  ICON_SIZE, CHECK_WIDTH, BORDER_RADIUS, LINE_HEIGHT,
  COLLAPSE_DURATION, TRANSITION_BG_DURATION, OPACITY_DURATION,
  POPOVER_MIN_WIDTH, POPOVER_Z_INDEX,
} from './constants';

/* ─── Menu Container ──────────────────────────────────────── */

interface MenuContainerStyledProps {
  ownerMaxHeight?: number | string;
  ownerColorScheme?: MenuColorScheme;
}

export const MenuContainerStyled = styled.div<MenuContainerStyledProps>(
  ({ ownerMaxHeight, ownerColorScheme }): CSSObject => {
    const { palette }: ThemeSchema = useTheme();

    return {
      display: 'flex',
      flexDirection: 'column',
      ...(ownerColorScheme?.background && { backgroundColor: ownerColorScheme.background }),
      color: ownerColorScheme?.color ?? palette?.text?.primary ?? 'rgba(0,0,0,0.87)',
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
  ownerIconOnly: boolean;
  ownerColorScheme?: MenuColorScheme;
}

export const MenuItemStyled = styled.div<MenuItemStyledProps>(
  ({ ownerDanger, ownerDisabled, ownerSelected, ownerSoftSelected, ownerDense, ownerIconOnly, ownerColorScheme }): CSSObject => {
    const { palette, spacing }: ThemeSchema = useTheme();

    const selectedBg = ownerColorScheme?.activeBg ?? palette?.action?.selected ?? 'rgba(25,118,210,0.08)';
    const softSelectedBg = ownerColorScheme?.softSelectedBg ?? palette?.action?.hover ?? 'rgba(0,0,0,0.04)';

    const textColor = ownerDanger
      ? (ownerColorScheme?.dangerColor ?? palette?.error?.main ?? '#d32f2f')
      : ownerDisabled
        ? (ownerColorScheme?.disabledColor ?? palette?.text?.disabled ?? 'rgba(0,0,0,0.38)')
        : (ownerColorScheme?.color ?? palette?.text?.primary ?? 'rgba(0,0,0,0.87)');

    return {
      display: 'flex',
      alignItems: 'center',
      ...(ownerIconOnly && {
        justifyContent: 'center',
      }),
      gap: ownerIconOnly ? 0 : (spacing?.small ?? '0.5rem'),
      padding: ownerDense
        ? (ownerIconOnly ? `${spacing?.tiny ?? '0.25rem'}` : `${spacing?.tiny ?? '0.25rem'} ${spacing?.medium ?? '0.75rem'}`)
        : (ownerIconOnly ? `${spacing?.small ?? '0.5rem'}` : `${spacing?.small ?? '0.5rem'} ${spacing?.large ?? '1rem'}`),
      color: textColor,
      fontSize: ownerDense ? FONT_SIZE_DENSE : FONT_SIZE_DEFAULT,
      lineHeight: LINE_HEIGHT,
      cursor: ownerDisabled ? 'default' : 'pointer',
      userSelect: 'none',
      position: 'relative',
      outline: 'none',
      borderRadius: BORDER_RADIUS,
      transition: `background-color ${TRANSITION_BG_DURATION}ms`,

      ...(!ownerDisabled && {
        '&:hover': {
          backgroundColor: ownerDanger
            ? (ownerColorScheme?.dangerHoverBg ?? palette?.error?.light ?? 'rgba(211,47,47,0.08)')
            : (ownerColorScheme?.hoverBg ?? palette?.action?.hover ?? 'rgba(0,0,0,0.04)'),
          ...(ownerColorScheme?.hoverColor && { color: ownerColorScheme.hoverColor }),
        },

        '&:focus-visible': {
          outline: '2px solid transparent',
          boxShadow: `inset 0 0 0 2px ${ownerColorScheme?.focusRingColor ?? palette?.primary?.main ?? '#1976d2'}`,
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
        ...(ownerColorScheme?.activeColor && { color: ownerColorScheme.activeColor }),
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
  width: ICON_SIZE,
  height: ICON_SIZE,
  '& > svg': {
    width: '100%',
    height: '100%',
    fill: 'currentColor',
  },
});

interface MenuItemLabelStyledProps {
  ownerIconOnly?: boolean;
}

export const MenuItemLabelStyled = styled.span<MenuItemLabelStyledProps>(
  ({ ownerIconOnly }): CSSObject => ({
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    ...(ownerIconOnly && {
      display: 'none',
    }),
  }),
);

interface MenuItemShortcutStyledProps {
  ownerColorScheme?: MenuColorScheme;
}

export const MenuItemShortcutStyled = styled.span<MenuItemShortcutStyledProps>(
  ({ ownerColorScheme }): CSSObject => {
    const { palette }: ThemeSchema = useTheme();

    return {
      marginLeft: 'auto',
      paddingLeft: '2rem',
      color: ownerColorScheme?.secondaryColor ?? palette?.text?.secondary ?? 'rgba(0,0,0,0.6)',
      fontSize: FONT_SIZE_SHORTCUT,
      flexShrink: 0,
    };
  },
);

export const MenuItemCheckStyled = styled.span({
  display: 'inline-flex',
  width: CHECK_WIDTH,
  flexShrink: 0,
});

/* ─── MenuLabel ───────────────────────────────────────────── */

interface MenuLabelStyledProps {
  ownerColorScheme?: MenuColorScheme;
}

export const MenuLabelStyled = styled.div<MenuLabelStyledProps>(
  ({ ownerColorScheme }): CSSObject => {
    const { palette, spacing }: ThemeSchema = useTheme();

    return {
      padding: `${spacing?.small ?? '0.5rem'} ${spacing?.large ?? '1rem'}`,
      color: ownerColorScheme?.secondaryColor ?? palette?.text?.secondary ?? 'rgba(0,0,0,0.6)',
      fontSize: FONT_SIZE_LABEL,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      userSelect: 'none',
    };
  },
);

/* ─── MenuDivider ─────────────────────────────────────────── */

interface MenuDividerStyledProps {
  ownerColorScheme?: MenuColorScheme;
}

export const MenuDividerStyled = styled.hr<MenuDividerStyledProps>(
  ({ ownerColorScheme }): CSSObject => {
    const { palette, spacing }: ThemeSchema = useTheme();

    return {
      border: 'none',
      borderTop: `1px solid ${ownerColorScheme?.dividerColor ?? palette?.divider ?? 'rgba(0,0,0,0.12)'}`,
      margin: `${spacing?.tiny ?? '0.25rem'} 0`,
    };
  },
);

/* ─── SubTrigger arrow indicator ──────────────────────────── */

interface SubArrowStyledProps {
  ownerColorScheme?: MenuColorScheme;
}

export const SubArrowStyled = styled.span<SubArrowStyledProps>(
  ({ ownerColorScheme }): CSSObject => {
    const { palette }: ThemeSchema = useTheme();

    return {
      marginLeft: 'auto',
      paddingLeft: '1rem',
      color: ownerColorScheme?.secondaryColor ?? palette?.text?.secondary ?? 'rgba(0,0,0,0.6)',
      fontSize: FONT_SIZE_SUB_ARROW,
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
      transition: `max-height ${COLLAPSE_DURATION}ms ease, opacity ${OPACITY_DURATION}ms ease`,
      paddingLeft: spacing?.large ?? '1rem',
    };
  },
);

/* ─── Popover SubContent (floating) ───────────────────────── */

interface PopoverSubContentStyledProps {
  ownerColorScheme?: MenuColorScheme;
}

export const PopoverSubContentStyled = styled.div<PopoverSubContentStyledProps>(
  ({ ownerColorScheme }): CSSObject => {
    const { palette, spacing }: ThemeSchema = useTheme();

    return {
      minWidth: POPOVER_MIN_WIDTH,
      backgroundColor: ownerColorScheme?.popoverBg ?? palette?.background?.paper ?? '#fff',
      borderRadius: BORDER_RADIUS,
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      border: `1px solid ${ownerColorScheme?.popoverBorderColor ?? palette?.divider ?? 'rgba(0,0,0,0.12)'}`,
      padding: `${spacing?.tiny ?? '0.25rem'} 0`,
      zIndex: POPOVER_Z_INDEX,
      display: 'flex',
      flexDirection: 'column',
    };
  },
);
