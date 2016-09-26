import getMuiTheme from 'material-ui/styles/getMuiTheme';
import colors from './base/_colors.scss';
import variables from './base/_variables.scss';

export const palette = {
  primary1Color: colors.primary1Color,
  primary2Color: colors.primary2Color,
  primary3Color: colors.primary3Color,
  accent1Color: colors.accent1Color,
  // accent2Color: grey100,
  // accent3Color: grey500,
  textColor: colors.textColor,
  // secondaryTextColor: fade(darkBlack, 0.54),
  alternateTextColor: colors.alternateTextColor,
  // canvasColor: white,
  borderColor: colors.borderColor,
  // disabledColor: fade(darkBlack, 0.3),
  // pickerHeaderColor: cyan500,
  // clockCircleColor: fade(darkBlack, 0.07),
  // shadowColor: fullBlack,
};

const muiTheme = getMuiTheme({
  palette,
  fontFamily: variables.primaryFont,
});

export default muiTheme;
