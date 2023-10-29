import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { getScaledNumber } from '../lib/utils';
import colors from '../res/colors';

const RoundedButton = ({
  label,
  onPress,
  buttonStyle,
  buttonContentStyle,
}: {
  label: string;
  onPress: (() => void) | undefined;
  buttonStyle?: StyleProp<TextStyle>;
  buttonContentStyle?: StyleProp<ViewStyle>;
}) => {
  const buttonLabelStyle = [styles.labelStyle, buttonStyle];
  const buttonContainerStyle = [styles.container, buttonContentStyle];
  return (
    <TouchableOpacity onPress={onPress} style={buttonContainerStyle}>
      <Text style={buttonLabelStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: getScaledNumber(30),
    paddingVertical: getScaledNumber(16),
    marginVertical: getScaledNumber(10),
    width: getScaledNumber(150),
    height: getScaledNumber(55),
    padding: getScaledNumber(12),
    backgroundColor: colors.blue,
  },
  labelStyle: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default RoundedButton;
