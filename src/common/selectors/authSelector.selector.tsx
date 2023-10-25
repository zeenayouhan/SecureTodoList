import { createSelector } from 'reselect';
import { Reducers } from '../../types';

export const authSelector = (state: Reducers) => state.auth;

export const isAuthenticatedUserSelector = createSelector(
  (state: Reducers) => state.auth,
  (auth) => auth.isAuthenticatedUser
);
