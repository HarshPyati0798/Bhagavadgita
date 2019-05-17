import React,{Component} from 'react'
import {TextInput,DefaultTheme,Provider as PaperProvider,Button} from 'react-native-paper';
import axios from 'axios';
import { StyleSheet,View,ToastAndroid,TouchableOpacity,AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';

const theme = {
  ...DefaultTheme,
  roundness: 1,
  colors: {
    ...DefaultTheme.colors,
    primary: 'orange',
    accent: 'white',
  }
};
class LoginScreen extends Component{
  static navigationOptions = {
    title: 'Bhagavadgita'
  }
  state = {
    email: '',
    password: '',
  }
  
  loginButtonHandler = () => {
    const {email,password} = this.state;
    firebase.auth().signInWithEmailAndPassword(email,password)
      .then(user => {
        console.log(user);
        ToastAndroid.show(
          'Login successfull',
          ToastAndroid.SHORT
        );
      })
      .then((AsyncStorage.setItem('isAuthenticated','true')))
      .then(() => this.props.navigation.navigate('Main'))
      .then(() => console.log('Authenticated'))
      .catch(err => console.log(err));
  }

  forgetPasswordButtonHandler = () => {
    const {email,password} = this.state;
    if(email){
      firebase.auth().sendPasswordResetEmail(email)
        .then(notify => {
          ToastAndroid.show(
            'Instructions sent to email',
            ToastAndroid.SHORT
          )
        })
        .catch(err => {
          console.log('Error Occurred')
        });
    }else{
      ToastAndroid.show(
        'Enter a Valid Email',
        ToastAndroid.SHORT
      );
    }
  }

  signUpButtonHandler = () => {
    console.log('Go to Sign Up Page');
    this.props.navigation.navigate('SignUp');
  }

  render() {
    return (
      <PaperProvider theme = {theme}>
        <TextInput 
          label = "Email"
          value = {this.state.email}
          onChangeText = {email => this.setState({email})}
          type = "outlined"
          style = {styles.tinput}
        />

        <TextInput 
          label = "Password"
          value = {this.state.password}
          onChangeText = {password => this.setState({password})}
          type = "outlined"
          style = {styles.tinput}
        />

        <View style = {styles.buttonContainer}>
          <Button 
            mode = "contained"
            style = {styles.buttonStyle}
            onPress = {this.loginButtonHandler}
          >Login!
          </Button>
        </View>
        <View style = {styles.buttonContainer}>
          <Button 
            mode = "contained" 
            style = {styles.buttonStyle}
            onPress = {this.forgetPasswordButtonHandler}
          >
            Forgot Password!
          </Button>
        </View>
        <View style = {styles.buttonContainer}>
          <Button 
            mode = "contained" 
            style = {styles.buttonStyle}
            onPress = {this.signUpButtonHandler}
          >
            Sign Up Instead!
          </Button>
        </View>
      </PaperProvider>
    )
  }
}

const styles = StyleSheet.create({
  tinput: {
    marginBottom: 10,
    fontFamily: 'Raleway-Regular'
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonStyle: {
    width: '60%',
    borderRadius: 10,
    fontFamily: 'Raleway-Regular'
  }
})

export default LoginScreen;