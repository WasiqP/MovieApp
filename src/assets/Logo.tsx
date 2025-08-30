import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props { size?: number; color?: string; stroke?: string; }
const Logo: React.FC<Props> = ({ size = 96, color = '#FFFFFF', stroke = '#FF1111' }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <Path
      d="M50 8c3.9 0 7.44 2.1 9.34 5.5l31.07 55.5c4.05 7.26-1.2 16.25-9.34 16.25H18.93c-8.13 0-13.39-9-9.34-16.25L40.66 13.5C42.56 10.1 46.1 8 50 8Z"
      fill={color}
      stroke={stroke}
      strokeWidth={4}
    />
  </Svg>
);
export default Logo;