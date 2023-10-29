import { NavigationContainer, Route } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { isAuthenticatedUserSelector } from '../common/selectors/authSelector.selector';
import { AppRoutes } from './AppRoutes';
import { navigationRef } from './NavigatorService';

export default () => {
  const isAuthenticated = useSelector(isAuthenticatedUserSelector);
  const routeNameRef = useRef<string>('');
  const onNavStateChange = async () => {
    // handle changes in the navigation state
    if (routeNameRef && navigationRef) {
      const currentRoute: Route<string> | undefined =
        navigationRef.current?.getCurrentRoute();
      const currentRouteName = currentRoute?.name ?? '';
      routeNameRef.current = currentRouteName;
    }
  };
  const onReady = () => {
    // setting the initial value of routeNameRef
    routeNameRef.current =
      navigationRef.current?.getCurrentRoute?.()?.name ?? '';
  };
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={onReady}
      onStateChange={onNavStateChange}
      independent
    >
      <AppRoutes isAuthenticated={isAuthenticated} />
    </NavigationContainer>
  );
};
