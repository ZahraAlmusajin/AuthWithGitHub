import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Auth from './Screens/Auth';
import ProfilePage from './Screens/ProfilePage';
import Star from './Screens/stared';


const AppNavigator = createStackNavigator(
  {
    Login: Auth,
    Profile : ProfilePage,
    Star:Star
  },
  {
    initialRouteName: 'Login',
  }
);

const AppContainer = createAppContainer(AppNavigator)

export default function App() {
  return <AppContainer/>
}
