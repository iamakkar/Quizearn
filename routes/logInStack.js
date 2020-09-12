import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SignOut from '../screens/LoginScreen';
import UpdateProfile from '../screens/UpdateProfile';
import CreateAccount from '../screens/CreateAccount';

const Stack = createStackNavigator();

export default function LoginStack() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Log In">
        <Stack.Screen
          name="Log In"
          component={SignOut}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Update Profile"
          component={UpdateProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Create an Account" component={CreateAccount} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
