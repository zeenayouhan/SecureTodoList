import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import authReducer from './common/reducers/auth.reducer';

const AuthPersistConfig = {
  storage: AsyncStorage,
  key: 'auth',
};

export default combineReducers({
  auth: persistReducer(AuthPersistConfig, authReducer),
});
