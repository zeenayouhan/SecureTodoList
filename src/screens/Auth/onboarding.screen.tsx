import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RoundedButton from '../../components/RoundedButton.component';
import { getScaledNumber } from '../../lib/utils';
import colors from '../../res/colors';
import * as LocalAuthentication from 'expo-local-authentication';
import { Linking } from 'react-native';
import authenticationManager from '../../common/lib/authenticationManager';
import { navigate } from '../../navigation/NavigatorService';
import SCREENS from '..';
import { useDispatch } from 'react-redux';
import { authenticateUser } from '../../common/actions/auth.actions';

const OnboardingScreen = () => {
  const dispatch = useDispatch();
  const openSettings = async () => {
    try {
      const isEnrolled = await authenticationManager.isHardwareSupported();
      const securityLevel =
        await authenticationManager.getEnrolledSecurityLevel();
      if (
        isEnrolled &&
        securityLevel !== LocalAuthentication.SecurityLevel.NONE
      ) {
        const result = await authenticationManager.authenticate();
        if (result.success) {
          dispatch(authenticateUser(true));
          navigate({ name: SCREENS.HOME_SCREEN });
        }
        return null;
      } else {
        Linking.sendIntent('android.settings.SECURITY_SETTINGS');
      }
    } catch (error) {}
  };
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.titleStyle}>Set Authentication to Proceed</Text>
      <RoundedButton label='Go to Settings' onPress={openSettings} />
    </View>
  );
};
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: getScaledNumber(10),
  },
  titleStyle: {
    color: colors.black,
    fontSize: 25,
  },
});
export default OnboardingScreen;
