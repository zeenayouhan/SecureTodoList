import * as LocalAuthentication from 'expo-local-authentication';

const isHardwareSupported = async () => {
  // check whether the device has the necessary hardware for biometric (Face ID or Touch ID) authentication.
  return await LocalAuthentication.hasHardwareAsync();
};

const getEnrolledSecurityLevel = async () => {
  //check the security level
  return await LocalAuthentication.getEnrolledLevelAsync();
};

const authenticate = async () => {
  // prompting the pin/biometric to authenticate
  return await LocalAuthentication.authenticateAsync({
    promptMessage: 'Please authenticate',
  });
};

export default { authenticate, getEnrolledSecurityLevel, isHardwareSupported };
