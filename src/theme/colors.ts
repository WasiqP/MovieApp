export const palette = {
  black: '#000000',
  white: '#FFFFFF',
  red: '#FF1111',
  redAlt: '#FF3B30',
  gray: '#1A1A1A',
  grayMid: '#2A2A2A',
  grayLight: '#3A3A3A'
};

export const theme = {
  background: palette.black,
  backgroundAlt: palette.gray,
  primary: palette.red,
  primaryAlt: palette.redAlt,
  text: palette.white,
  textDim: 'rgba(255,255,255,0.65)',
  border: palette.grayLight,
  card: palette.grayMid,
};

export type AppTheme = typeof theme;