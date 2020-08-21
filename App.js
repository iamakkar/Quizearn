import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import Wrapper from './routes/Wrapper';
import rootReducer from './store/reducers/combinedReducers';

import {NavigationContainer} from '@react-navigation/native';

import AsyncStorage from '@react-native-community/async-storage';

const store = createStore(rootReducer);

export default function App() {
  const [isloggedin, setLogged] = useState(true);
  const detectLogin = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  };
  useEffect(() => {
    detectLogin();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer independent={true}>
        <Wrapper />
      </NavigationContainer>
    </Provider>
  );
}
