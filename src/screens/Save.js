import React, { Component } from 'react';
import {Text} from 'react-native-paper';
import { View,ScrollView,ActivityIndicator} from 'react-native';
import firebase from 'firebase';
import Info from './../components/Info';


export default class SaveScreen extends Component {
  static navigationOptions = {
    title: 'Find Saved Verses',
    headerTintColor: 'orange',
    headerTitleStyle: {
      fontFamily: 'Raleway-Bold'
    }
  }

  constructor(props){
    super(props);
    console.log('Constructor');
    console.log(this.props);
    this.state = {
      verses: [],
      loaded: false,
    }
  }

  componentDidMount(){
    const email = firebase.auth().currentUser.email.split('@')[0];
    console.log(email + '- Save - Email');
    const verses = [];
    firebase.database().ref(email + '/').on('value',(snapshot) => {
       snapshot.forEach(item => {
         const verse = item.val();
         verses.push(verse);
         return false;
       });  

       this.setState({
         verses:verses
       },() => this.setState({loaded: true})); 
    
    })
  }

  displayDetails = () => {
    if(!this.state.loaded){
      return <ActivityIndicator size = "large" color = "orange"/>
    }else{
      return <Info verses = {this.state.verses} />
    }
  }

  render() {
    return (
      <ScrollView>
        <View>
          {this.displayDetails()}
        </View>
      </ScrollView>
    )
  }
}
