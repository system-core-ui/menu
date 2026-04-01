import { type CSSObject, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import type { ThemeSchema } from '@thanh-libs/theme';
import type { MenuColorScheme } from '../models';
import { FONT_SIZE_LABEL } from '../constants';

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
