import { type CSSObject, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import type { ThemeSchema } from '@thanh-libs/theme';
import type { MenuColorScheme } from '../models';

interface ActiveIndicatorStyledProps {
  ownerColorScheme?: MenuColorScheme;
}

export const MenuItemIndicatorStyled = styled.span({
  display: 'inline-flex',
  alignItems: 'center',
  marginLeft: 'auto',
  paddingLeft: '0.5rem',
  flexShrink: 0,
});

export const DotIndicatorStyled = styled.span<ActiveIndicatorStyledProps>(
  ({ ownerColorScheme }): CSSObject => {
    const { palette }: ThemeSchema = useTheme();
    const indicatorColor = ownerColorScheme?.activeIconColor
      ?? palette?.primary?.main ?? '#1976d2';

    return {
      display: 'inline-block',
      width: 6,
      height: 6,
      borderRadius: '50%',
      backgroundColor: indicatorColor,
      transition: 'background-color 150ms',
    };
  },
);

export const BarIndicatorStyled = styled.span<ActiveIndicatorStyledProps>(
  ({ ownerColorScheme }): CSSObject => {
    const { palette }: ThemeSchema = useTheme();
    const indicatorColor = ownerColorScheme?.activeIconColor
      ?? palette?.primary?.main ?? '#1976d2';

    return {
      display: 'inline-block',
      width: 3,
      height: 16,
      borderRadius: 1.5,
      backgroundColor: indicatorColor,
      transition: 'background-color 150ms',
    };
  },
);
