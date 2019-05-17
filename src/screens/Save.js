import React, { Component } from 'react';
import {Text} from 'react-native-paper';
import { View } from 'react-native';
import firebase from 'firebase';


export default class SaveScreen extends Component {
  static navigationOptions = {
    title: 'Find Saved Verses',
    headerTintColor: 'orange'
  }
  constructor(props){
    super(props);
    console.log('Constructor');
    console.log(this.props);
    this.state = {
      info: []
    }
  }
  
  render() {
    return (
      <View>
        <Text>Save Screen</Text>
      </View>
    )
  }
}
