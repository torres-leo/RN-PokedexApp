import {StyleProp, Image, ImageStyle} from 'react-native';
import React, {useContext} from 'react';
import {ThemeContext} from '@/presentation/context/ThemeContext';

interface Props {
  style?: StyleProp<ImageStyle>;
}

export default function Pokeballbg({style}: Props) {
  const {isDark} = useContext(ThemeContext);

  const pokeballImg = isDark
    ? require('@/assets/pokeball-light.png')
    : require('@/assets/pokeball-dark.png');

  return (
    <Image
      source={pokeballImg}
      style={[{width: 300, height: 300, opacity: 0.3}, style]}
    />
  );
}
