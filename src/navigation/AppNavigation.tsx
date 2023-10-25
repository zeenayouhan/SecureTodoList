import { NavigationContainer, Route } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { AppRoutes } from './AppRoutes';
import { navigationRef } from './NavigatorService';

export default () => {
  const routeNameRef = useRef<string>('');
  const onNavStateChange = async () => {
    if (routeNameRef && navigationRef) {
      const currentRoute: Route<string> | undefined =
        navigationRef.current?.getCurrentRoute();
      const currentRouteName = currentRoute?.name ?? '';
      routeNameRef.current = currentRouteName;
    }
  };
  const onReady = () => {
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
      <AppRoutes isAuthenticated={false} />
    </NavigationContainer>
  );
};