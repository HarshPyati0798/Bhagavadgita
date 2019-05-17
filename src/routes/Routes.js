import React, { Component } from 'react'
import {createStackNavigator,createAppContainer} from 'react-navigation';

import Login from './screens/Login';
import SignUp from './screens/SignUp';

// const Main = createStackNavigator({
//     Login: Login,
//     SignUp: SignUp
// });


export default createAppContainer(Main);