import { type CSSObject, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import type { ThemeSchema } from '@thanh-libs/theme';
import { pxToRem } from '@thanh-libs/utils';
import type { MenuColorScheme } from '../models';
import {
  FONT_SIZE_DEFAULT, FONT_SIZE_DENSE, FONT_SIZE_SHORTCUT,
  ICON_SIZE, CHECK_WIDTH, BORDER_RADIUS, LINE_HEIGHT,
  TRANSITION_BG_DURATION
} from '../constants';

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

    const selectedBg = ownerColorScheme?.activeBg ?? palette?.action?.selected ?? 'rgba(25,118,210,0.16)';
    const softSelectedBg = ownerColorScheme?.softSelectedBg ?? palette?.action?.hover ?? 'rgba(25,118,210,0.06)';

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
          boxShadow: `inset 0 0 0 ${pxToRem(2)} ${ownerColorScheme?.focusRingColor ?? palette?.primary?.main ?? '#1976d2'}`,
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
