import { type CSSObject, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import type { ThemeSchema } from '@thanh-libs/theme';
import type { MenuColorScheme } from '../models';

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
      '&:focus': {
        outline: 'none',
      },
      ...(ownerColorScheme?.background && { backgroundColor: ownerColorScheme.background }),
      color: ownerColorScheme?.color ?? palette?.text?.primary ?? 'rgba(0,0,0,0.87)',
      ...(ownerMaxHeight !== undefined && {
        maxHeight: typeof ownerMaxHeight === 'number' ? `${ownerMaxHeight}px` : ownerMaxHeight,
        overflowY: 'auto',
      }),
    };
  },
);
