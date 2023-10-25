import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RoundedButton from '../../components/RoundedButton.component';
import { getScaledNumber } from '../../lib/utils';
import colors from '../../res/colors';
import * as LocalAuthentication from 'expo-local-authentication';
import { Linking } from 'react-native';
import authenticationManager from '../../common/lib/authenticationManager';

const OnboardingScreen = () => {
  const [authenticationResult, setAuthenticationResult] = useState('');
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
          //navigate to home screen
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
