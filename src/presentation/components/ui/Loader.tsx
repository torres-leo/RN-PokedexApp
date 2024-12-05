import React from 'react';
import {ActivityIndicator, StyleProp, ViewStyle} from 'react-native';

import {globalTheme} from '@/config/theme/global-theme';

interface Props {
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

export default function Loader({color = 'grey', size = 50, style}: Props) {
  return (
    <ActivityIndicator
      size={size}
      style={[globalTheme.loader, style]}
      color={color}
    />
  );
}
