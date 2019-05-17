import React from 'react'
import {Text,Button,PaperProvider} from 'react-native-paper';
import {View,StyleSheet,ScrollView} from 'react-native';
const Details = (props) => {
  return (
      <ScrollView>
        <View>
            <View style = {styles.container}>
                <Text style = {styles.heading}>MEANING</Text>
                <Text style = {styles.textInput}>{props.info.meaning}</Text>
            </View>
            <View style = {styles.container}>
                <Text style = {styles.heading}>TEXT</Text>
                <Text style = {styles.textInput}>{props.info.text}</Text>
            </View>
            <View style = {styles.container}>
                <Text style = {styles.heading}>TRANSLITERATION</Text>
                <Text style = {styles.textInput}>{props.info.transliteration}</Text>
            </View>
            <View style = {styles.container}>
                <Text style = {styles.heading}>WORD-MEANINGS</Text>
                <Text style = {styles.textInput}>{props.info.word_meanings}</Text>
            </View>
            <View style = {styles.buttonContainer}>
                <Button
                    mode = "contained"
                    style = {styles.buttonStyle}
                    onPress = {props.save}
                >
                    Save to Favorites
                </Button>
                <Button
                    mode = "contained"
                    style = {styles.buttonStyle}
                    onPress = {props.view}
                >
                    view Favorites
                </Button>
            </View>
        </View>
      </ScrollView>
  );
}
const styles = StyleSheet.create({
    heading: {
        fontWeight: 'bold',
        color: 'white',
        textAlign:'center'
    },
    textInput: {
        color: 'white',
        textAlign:'center'
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
        fontFamily: 'Raleway-Regular',
        marginBottom: 10
    },
    container: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: 'orange'
    }
})
export default Details;