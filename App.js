import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import Wrapper from './routes/Wrapper';
import rootReducer from './store/reducers/combinedReducers';

import {NavigationContainer} from '@react-navigation/native';

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer independent={true}>
        <Wrapper />
      </NavigationContainer>
    </Provider>
  );
}
