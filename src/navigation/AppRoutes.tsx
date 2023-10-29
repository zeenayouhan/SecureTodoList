import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import SCREENS from '../screens';
import OnboardingScreen from '../screens/Auth/onboarding.screen';
import HomeScreen from '../screens/Dashboard/home.screen';
import { RootStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const navigatorScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

export const AppRoutes = ({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) => {
  const initialRouteName = isAuthenticated
    ? undefined
    : SCREENS.ONBOARDING_SCREEN;
  const renderRoutes = () => {
    //check whether the user is authenticated successfuly
    if (isAuthenticated) {
      return (
        <>
          <Stack.Screen name={SCREENS.HOME_SCREEN} component={HomeScreen} />
        </>
      );
    } else {
      return (
        <>
          <Stack.Screen
            name={SCREENS.ONBOARDING_SCREEN}
            component={OnboardingScreen}
          />
        </>
      );
    }
  };

  return (
    <Stack.Navigator
      screenOptions={navigatorScreenOptions}
      initialRouteName={initialRouteName}
    >
      {renderRoutes()}
    </Stack.Navigator>
  );
};
