import React, { Component } from 'react';
import {Text,Button,Provider as PaperProvider,TextInput,DefaultTheme} from 'react-native-paper';
import { StyleSheet,View,ActivityIndicator,ScrollView,ToastAndroid,YellowBox} from 'react-native';
import axios from 'axios';
import Details from './../components/Details';
import firebase from 'firebase';

const theme = {
  ...DefaultTheme,
  roundness: 1,
  colors: {
    ...DefaultTheme.colors,
    primary: 'orange',
    accent: 'white',
  },
  fonts: {
    regular: 'Raleway-Regular'
  }
};
class SearchScreen extends Component{
    static navigationOptions = {
        title: 'Search for Verses',
        headerTintColor: 'orange'
    }
    constructor(props){
        super(props);
        // Navigation.events().bindComponent(this);
        this.state = {
            chap_num: '',
            verse_num: '' ,
            access_token: '',
            info: [],
            loading: false,
            display: false,
        }
        YellowBox.ignoreWarnings(['Setting a timer']);
    }

    //Setting up the access token, as soon as the component loads
    componentDidMount(){
        var headers = {
            'accept': 'application/json',
            'content-type': 'application/x-www-form-urlencoded'
        };

        var dataString = 'client_id=JTxnJwg7pyyQd4y7WsVomdSbvUck6Atwhlh4BeFg&client_secret=zgaWJtBMcyow9pxaGMBOxTGMNzDzeXYVIbeI3UtyLovaoOequO&grant_type=client_credentials&scope=verse%20chapter';

        axios.post('https://bhagavadgita.io/auth/oauth/token', dataString, {headers:headers})
        .then((response) => {
            this.setState({
                access_token: response.data.access_token
            }, () => {
                console.log(this.state.access_token);
            })
        })
        .catch((error) => {
            console.log(error.message);
        });
    }

    getDetails = () => {
        // Set loading to true
        this.setState({
            display: true,
            loading: true
        })
        // Retrieve the inputs
        const chapter = this.state.chap_num;
        const verse = this.state.verse_num;
        // Log it to confirm it
        console.log(chapter + '-' + verse);
        // Get request
        axios.get(
            'https://bhagavadgita.io/api/v1/chapters/' + chapter + '/verses/' + verse,
            {
                params: {
                    access_token:this.state.access_token
                }
            }
        ).then((response) => {
            //console.log(response.data);
            this.setState({
                info: response.data
            }, () => {
                console.log(this.state.info);
                this.setState({
                    loading: false
                })
            })
        });
    }

    saveToFavorites = () => {
        const data = {
            meaning: this.state.info.meaning,
            text: this.state.info.text,
            transliteration: this.state.info.transliteration,
            chapter: this.state.chap_num,
            verse: this.state.verse_num
        };
        const email = firebase.auth().currentUser.email.split('@')[0];
        console.log('email: ' + email);
        firebase.database().ref(email + '/')
            .push(data)
            .then((data) => console.log(data))
            .then(() => ToastAndroid.show(
                'Verse added to Favorites',
                ToastAndroid.SHORT
            ))
            .catch((err) => console.log(err));
    }

    displayDetails(){
        if(this.state.display){
            if(this.state.loading){
                return <ActivityIndicator size="large" color="orange"/>
            }
            return <Details info = {this.state.info} save = {this.saveToFavorites} view = {() => this.props.navigation.navigate('Save')} />
        }else{
            return <Text></Text>
        }
    }

    render(){
        return (
            <PaperProvider theme = {theme}>
                <ScrollView>
                    <TextInput 
                        label = "Chapter Number"
                        value = {this.state.chap_num}
                        onChangeText = {chap_num => this.setState({chap_num})}
                        type = "outlined"
                        style = {styles.tinput}
                    />

                    <TextInput 
                        label = "Verse Number"
                        value = {this.state.verse_num}
                        onChangeText = {verse_num => this.setState({verse_num})}
                        type = "outlined"
                        style = {styles.tinput}
                    />
                    <View style = {styles.buttonContainer}>
                        <Button 
                            mode = "contained" 
                            style = {styles.buttonStyle}
                            onPress = {this.getDetails}
                        >
                            Search
                        </Button>
                    </View>
                    <View>
                        {this.displayDetails()}
                    </View>   
                </ScrollView>        
            </PaperProvider>
        );
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
        width: '60%',
        borderRadius: 10,
        fontFamily: 'Raleway-Regular'
    }
})

export default SearchScreen;