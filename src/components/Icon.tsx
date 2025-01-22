import React from 'react';
import { Image, TouchableOpacity, ImageStyle, StyleProp } from 'react-native';
import icons from '../constants/icons';

type IconProps = {
  onPress?: () => void;
  icon: keyof typeof icons; // Menentukan bahwa `icon` adalah key dari `icons`
  style?: StyleProp<ImageStyle>;
  size?: number;
};

const Icon: React.FC<IconProps> = ({ onPress, icon, style, size = 32 }) => {
  const image = (
    <Image
      source={icons[icon]}
      style={[{ width: size, height: size, resizeMode: 'cover' }, style]}
    />
  );

  if (onPress) {
    return <TouchableOpacity onPress={onPress}>{image}</TouchableOpacity>;
  }
  return image;
};

export default Icon;
