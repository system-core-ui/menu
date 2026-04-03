import { type CSSObject, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import type { ThemeSchema } from '@thanh-libs/theme';
import { pxToRem } from '@thanh-libs/utils';
import type { MenuColorScheme } from '../models';

interface MenuDividerStyledProps {
  ownerColorScheme?: MenuColorScheme;
}

export const MenuDividerStyled = styled.hr<MenuDividerStyledProps>(
  ({ ownerColorScheme }): CSSObject => {
    const { palette, spacing }: ThemeSchema = useTheme();

    return {
      border: 'none',
      borderTop: `${pxToRem(1)} solid ${ownerColorScheme?.dividerColor ?? palette?.divider ?? 'rgba(0,0,0,0.12)'}`,
      margin: `${spacing?.tiny ?? '0.25rem'} 0`,
    };
  },
);
