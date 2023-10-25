import { ACTIONS } from './actionTypes';

export const authenticateUser = (payload: boolean) => ({
  type: ACTIONS.SET_AUTHENTICATED_USER,
  payload,
});
