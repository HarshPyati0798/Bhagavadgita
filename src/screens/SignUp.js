import React,{Component} from 'react'
import {TextInput,DefaultTheme,Provider as PaperProvider,Button} from 'react-native-paper';
import { StyleSheet,View,ToastAndroid } from 'react-native';
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
class HomeScreen extends Component{
  static navigationOptions = {
    title: 'Bhagavadgita'
  }
  state = {
    name: '',
    email: '',
    password: '',
    loading: false
  }

  signUpHandler = () => {
    const {name,email,password} = this.state;
    
    if(password.length < 8){
      ToastAndroid.showWithGravity(
        'Password should contain a minimum of 8 characters',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      return;
    }

    firebase.auth().createUserWithEmailAndPassword(email,password)
      .then(user => {
          console.log('User is created');
          ToastAndroid.show(
            'Account created successfully',
            ToastAndroid.SHORT
          );
      })
      .then(() => this.props.navigation.navigate('Login'))
      .catch(err => console.log(err.message));    
  }

  render() {
    return (
      <PaperProvider theme = {theme}>
        <TextInput 
          label = "Enter your Name"
          value = {this.state.name}
          onChangeText = {name => this.setState({name})}
          type = "outlined"
          style = {styles.tinput}
        />
        <TextInput 
          label = "Enter your email"
          value = {this.state.email}
          onChangeText = {email => this.setState({email})}
          type = "outlined"
          style = {styles.tinput}
        />

        <TextInput 
          label = "Enter your password"
          value = {this.state.password}
          secureTextEntry
          onChangeText = {password => this.setState({password})}
          type = "outlined"
          style = {styles.tinput}
        />

        <View style = {styles.buttonContainer}>
          <Button 
            loading = {this.state.loading}
            mode = "contained" 
            style = {styles.buttonStyle}
            onPress = {this.signUpHandler}
          >Create an Account
          </Button>
        </View>

      </PaperProvider>
    )
  }
}

const styles = StyleSheet.create({
  tinput: {
    marginBottom: 10,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    
  },
  buttonStyle: {
    width: '50%',
    borderRadius: 10,
  }
})

export default HomeScreen;