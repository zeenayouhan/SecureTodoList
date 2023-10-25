import { applyMiddleware, createStore, Store } from 'redux';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './root.reducer';

const sagaMiddleware = createSagaMiddleware();
const store: Store = createStore(
  rootReducer,
  {},
  applyMiddleware(sagaMiddleware)
);

const persistor = persistStore(store);

export { store, persistor };
