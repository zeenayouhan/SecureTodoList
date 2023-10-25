import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import AppNavigation from './navigation/AppNavigation';
import { persistor, store } from './store';
import { Provider } from 'react-redux';
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppNavigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
