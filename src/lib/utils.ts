import { Dimensions, PixelRatio, Platform } from 'react-native';
import { Item } from '../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const getScaledNumber = (size: number = 0) => {
  const scale = SCREEN_WIDTH / 375;
  const newSize = size * scale;
  const nearestPixel = PixelRatio.roundToNearestPixel(newSize);

  if (Platform.OS === 'ios') {
    return Math.round(nearestPixel);
  } else {
    return Math.round(nearestPixel) - 2;
  }
};

export const items: Item[] = [
  {
    key: '1',
    label: 'First Item',
  },
  {
    key: '2',
    label: 'Second Item',
  },
];
