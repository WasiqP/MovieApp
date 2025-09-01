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
  // Light, clean onboarding aesthetic
  background: palette.white,
  backgroundAlt: '#F5F5F5',
  primary: palette.red,
  primaryAlt: palette.redAlt,
  text: palette.black,
  textDim: 'rgba(0,0,0,0.55)',
  border: '#E2E2E2',
  card: palette.white,
};

export type AppTheme = typeof theme;