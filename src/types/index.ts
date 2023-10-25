import SCREENS from '../screens';

export type RootStackParamList = {
  [SCREENS.ONBOARDING_SCREEN]: {};
  [SCREENS.HOME_SCREEN]: {};
};

export type Reducers = {
  auth: AuthReducer;
};

export type AuthReducer = {
  isAuthenticatedUser: boolean;
};
