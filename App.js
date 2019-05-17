import TabNavigation from './src/routes/TabNavigation';
import SplashScreen from './src/components/SplashScreen';
import Search from './src/screens/Search';
import Save from './src/screens/Save';
import {createAppContainer,createSwitchNavigator,createStackNavigator} from 'react-navigation';
import React, { Component } from 'react';

const Main = createStackNavigator({
  Search: Search,
  Save: Save
})
const App = createSwitchNavigator(
    {
     SplashScreen: SplashScreen,
     TabNavigation: TabNavigation,
     Main: Main,
    },
    {
      initialRouteName: 'SplashScreen',
    }
)

export default createAppContainer(App);
