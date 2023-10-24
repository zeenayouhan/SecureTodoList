import React from 'react';

import { NavigationContainerRef } from '@react-navigation/native';

export const navigationRef = React.createRef<NavigationContainerRef<{}>>();

export function navigate({
  name,
  params = {},
}: {
  name: string;
  params?: any;
  key?: string;
}) {
  navigationRef.current?.navigate({ name, params });
}
