import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import HomeScreen from '../screens/HomeScreen';
import Login from '../screens/authScreen/Login';
import Register from '../screens/authScreen/Register';
import DetailScreen from '../screens/DetailScreen';
import EditProfile from '../screens/EditProfile';
import EditScreen from '../screens/EditScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Journey } from '../types/Types';

export type RootStackParamList = {
  Root: undefined;
  HomeScreen: undefined;
  Login: undefined;
  Register: undefined;
  ProfileScreen: undefined;
  DetailScreen: {journey: Journey};
  EditProfile: undefined;
  EditScreen: {journey: Journey};
};

const Stack = createStackNavigator<RootStackParamList>();

const MainNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={TabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{title: 'HomeScreen'}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: 'Login'}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{title: 'Register'}}
        />
        <Stack.Screen
          name="DetailScreen"
          component={DetailScreen}
          options={{title: 'DetailScreen'}}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{title: 'EditProfile'}}
        />
        <Stack.Screen
          name="EditScreen"
          component={EditScreen}
          options={{title: 'EditScreen'}}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{title: 'ProfileScreen'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
