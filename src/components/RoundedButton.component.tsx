import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { getScaledNumber } from '../lib/utils';
import colors from '../res/colors';

const RoundedButton = ({
  label,
  onPress,
}: {
  label: string;
  onPress: (() => void) | undefined;
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.labelStyle}>{label}</Text>
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
    height: getScaledNumber(50),
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
