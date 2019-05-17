import {createBottomTabNavigator,createAppContainer} from 'react-navigation';
import Login from './../screens/Login';
import SignUp from './../screens/SignUp';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { Component } from 'react';


const TabNavigator = createBottomTabNavigator(
    {
        Login: Login,
        SignUp: SignUp
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused,horizontal,tintColor}) => {
                const {routeName} = navigation.state;
                let IconComponent = Ionicons;
                let iconName;
                if(routeName === 'Login'){
                    iconName = 'md-log-in'
                }else if(routeName === 'SignUp'){
                    iconName = 'md-contact'
                }            
                return <IconComponent name= {iconName} size = {25} color = {tintColor} />
            },            
        }),
        tabBarOptions: {
            activeTintColor: 'orange',
            inactiveTintColor: 'gray',
            labelStyle: {
                fontSize: 15,
            }
        }
    }
);

export default createAppContainer(TabNavigator);
