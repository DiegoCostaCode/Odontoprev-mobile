import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from '../screens/signup';
import OnBoarding from '../screens/onBoarding';
import Login from '../screens/login';
import Welcome from '../screens/welcome';

const Stack = createStackNavigator();

export default function Routers() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="onBoarding">
        <Stack.Screen name="onBoarding" options={{ headerShown: false }} component={OnBoarding} />
        <Stack.Screen name="signup" options={{ headerShown: false }} component={Signup} />
        <Stack.Screen name="login" options={{ headerShown: false }} component={Login} />
        <Stack.Screen name="welcome" options={{ headerShown: false }} component={Welcome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}