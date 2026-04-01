import { type CSSObject, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import type { ThemeSchema } from '@thanh-libs/theme';
import type { MenuColorScheme } from '../models';

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
