import React, { Component } from 'react'
import { Image,View,StyleSheet,ImageBackground,AsyncStorage} from 'react-native';
import firebase from 'firebase';

// Import the Image Asset
import logo from './../assets/radhakrishna.png';

class SplashScreen extends Component{
    constructor(props){
        super(props);
        //this.bootstrapAsync();
    }

    componentWillMount = () => {
        const firebaseConfig = {
            apiKey: "AIzaSyCHGImV5Q3IB3inYRohbAMTnUDaLDqQdao",
            authDomain: "bhagavadgita-1bee7.firebaseapp.com",
            databaseURL: "https://bhagavadgita-1bee7.firebaseio.com",
            projectId: "bhagavadgita-1bee7",
            storageBucket: "bhagavadgita-1bee7.appspot.com",
            messagingSenderId: "198199721151",
            appId: "1:198199721151:web:f666022e06fc7b6c"
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        this.bootstrapAsync();
    };
    

    bootstrapAsync = async () => {
        const authenticated = await AsyncStorage.getItem('isAuthenticated');
        this.props.navigation.navigate(authenticated === 'true'? 'Main' : 'TabNavigation');
    };
    render(){
        return(
            <View style = {styles.container}>
                <Image source = {logo} style = {styles.image}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
    },  
    image: {
        width: '50%'
    }
});

export default SplashScreen;