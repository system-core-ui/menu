import { type CSSObject, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import type { ThemeSchema } from '@thanh-libs/theme';
import { pxToRem } from '@thanh-libs/utils';
import type { MenuColorScheme } from '../models';
import {
  FONT_SIZE_SUB_ARROW,
  COLLAPSE_DURATION, OPACITY_DURATION,
  POPOVER_MIN_WIDTH, BORDER_RADIUS, POPOVER_Z_INDEX
} from '../constants';

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

interface InlineSubContentStyledProps {
  ownerOpen: boolean;
  ownerColorScheme?: MenuColorScheme;
  ownerShowDot?: boolean;
}

export const InlineSubContentStyled = styled.div<InlineSubContentStyledProps>(
  ({ ownerOpen, ownerColorScheme, ownerShowDot }): CSSObject => {
    const { spacing, palette }: ThemeSchema = useTheme();

    return {
      overflow: 'hidden',
      maxHeight: ownerOpen ? '100vh' : 0,
      opacity: ownerOpen ? 1 : 0,
      transition: `max-height ${COLLAPSE_DURATION}ms ease, opacity ${OPACITY_DURATION}ms ease`,
      paddingLeft: spacing?.large ?? '1rem',
      '& > [role="menuitem"]': {
        '&:hover': {
          backgroundColor: ownerColorScheme?.childHoverBg ?? 'rgba(25,118,210,0.06)',
          ...(ownerColorScheme?.childHoverColor && { color: ownerColorScheme.childHoverColor }),
        },
        ...(ownerShowDot && {
          '&::before': {
            content: '""',
            display: 'inline-block',
            width: 6,
            height: 6,
            borderRadius: '50%',
            border: `${pxToRem(1.5)} solid ${ownerColorScheme?.dotColor ?? palette?.text?.secondary ?? 'rgba(0,0,0,0.4)'}`,
            backgroundColor: 'transparent',
            marginRight: spacing?.small ?? '0.5rem',
            flexShrink: 0,
            transition: 'background-color 150ms, border-color 150ms',
          },

          // Hover → fill dot
          '&:hover::before': {
            backgroundColor: ownerColorScheme?.dotColor ?? palette?.text?.secondary ?? 'rgba(0,0,0,0.4)',
            borderColor: ownerColorScheme?.dotColor ?? palette?.text?.secondary ?? 'rgba(0,0,0,0.4)',
          },

          // Selected → fill dot with active color
          '&[aria-current="page"]::before': {
            backgroundColor: ownerColorScheme?.dotActiveColor ?? palette?.primary?.main ?? '#1976d2',
            borderColor: ownerColorScheme?.dotActiveColor ?? palette?.primary?.main ?? '#1976d2',
          },
        }),
      },
    };
  },
);

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
      border: `${pxToRem(1)} solid ${ownerColorScheme?.popoverBorderColor ?? palette?.divider ?? 'rgba(0,0,0,0.12)'}`,
      padding: `${spacing?.tiny ?? '0.25rem'} 0`,
      zIndex: POPOVER_Z_INDEX,
      display: 'flex',
      flexDirection: 'column',
    };
  },
);
