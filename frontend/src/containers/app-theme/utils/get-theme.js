import { THEME_NAME } from '../../../constants';
import { DARK_THEME, LIGHT_THEME } from '../theme';

export const getTheme = (theme) => {
  switch (theme) {
    case THEME_NAME.DARK:
      return DARK_THEME;

    case THEME_NAME.LIGHT:
      return LIGHT_THEME;

    default:
      return DARK_THEME;
  }
};
