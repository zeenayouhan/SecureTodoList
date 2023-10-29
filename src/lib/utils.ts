import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const getScaledNumber = (size: number = 0) => {
  //scale a given size value according to the device's screen dimensions and pixel density
  const scale = SCREEN_WIDTH / 375;
  const newSize = size * scale;
  const nearestPixel = PixelRatio.roundToNearestPixel(newSize);

  if (Platform.OS === 'ios') {
    return Math.round(nearestPixel);
  } else {
    return Math.round(nearestPixel) - 2;
  }
};
