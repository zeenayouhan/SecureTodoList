import * as LocalAuthentication from 'expo-local-authentication';

const isHardwareSupported = async () => {
  return await LocalAuthentication.hasHardwareAsync();
};

const getEnrolledSecurityLevel = async () => {
  return await LocalAuthentication.getEnrolledLevelAsync();
};

const authenticate = async () => {
  return await LocalAuthentication.authenticateAsync({
    promptMessage: 'Please authenticate',
  });
};

export default { authenticate, getEnrolledSecurityLevel, isHardwareSupported };
