import React from 'react';
import Icon from '@react-native-vector-icons/ionicons';

type IconName = React.ComponentProps<typeof Icon>['name'];

interface Props {
  name: IconName;
  color?: string;
  size?: number;
}

export default function CustomIcon({name, color = '#000', size = 25}: Props) {
  return <Icon name={name} size={size} color={color} />;
}
