import { AuthReducer } from '../../types';
import { ACTIONS } from '../actions/actionTypes';

const INITIAL_STATE: AuthReducer = {
  isAuthenticatedUser: false,
};

export default (
  state = INITIAL_STATE,
  { type, payload }: { type: string; payload: boolean }
): AuthReducer => {
  switch (type) {
    case ACTIONS.SET_AUTHENTICATED_USER:
      return {
        ...state,
        isAuthenticatedUser: payload as boolean,
      };
    default:
      return state;
  }
};
