import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { getScaledNumber } from '../lib/utils';
import colors from '../res/colors';

const ItemCardComponent = ({
  label,
  index,
  onPressRemove,
  onPressUpdate,
}: {
  label: string;
  index: string;
  onPressRemove: ((index: string) => void) | undefined;
  onPressUpdate: (() => void) | undefined;
}) => {
  return (
    <TouchableOpacity
      onPress={onPressUpdate}
      style={styles.cardStyle}
      key={index}
    >
      <View style={styles.contentContainer}>
        <View style={styles.rawStyle}>
          <Text style={styles.bulletPoint}>•</Text>

          <Text style={styles.labelStyle}>{label}</Text>
        </View>
        <View style={styles.rawStyle}>
          <TouchableOpacity
            onPress={() => onPressRemove(index)}
            style={styles.removeButton}
          >
            <Text style={styles.labelStyle}>REMOVE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rawStyle: { flexDirection: 'row' },
  cardStyle: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    marginHorizontal: getScaledNumber(20),
    marginVertical: getScaledNumber(10),
    borderRadius: getScaledNumber(30),
    overflow: 'hidden',
  },
  bulletPoint: {
    fontSize: 120,
    color: colors.blue,
    marginTop: getScaledNumber(-30),
    height: getScaledNumber(100),
    marginBottom: getScaledNumber(-40),
    marginLeft: getScaledNumber(20),
  },
  labelStyle: {
    fontSize: 18,
    color: colors.gray,
    marginLeft: getScaledNumber(15),
    width: getScaledNumber(150),
    minWidth: getScaledNumber(130),
    marginVertical: getScaledNumber(35),
  },
  removeButton: {
    marginRight: getScaledNumber(20),
  },
  contentContainer: {
    flexDirection: 'row',
    maxWidth: getScaledNumber(200),
    justifyContent: 'space-between',
  },
});
export default ItemCardComponent;
