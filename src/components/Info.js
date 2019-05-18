import React, { Component } from 'react';
import { View,StyleSheet,Text} from 'react-native';
import {PaperProvider} from 'react-native-paper';

class Info extends Component{
    setData = () => {
        return this.props.verses.map((item,index) => {
            return(
                <View key = {index} style = {styles.container}>
                    <Text style={styles.header}>Chapter {item.chapter} Verse {item.verse}</Text>
                    <View>
                        <Text style = {styles.text}>{item.text}</Text>
                        <Text style = {styles.text}>{item.transliteration}</Text>
                        <Text style = {styles.text}>{item.meaning}</Text>
                    </View>
                </View>
            );
        });
        // return <Text>Not null</Text>
    }
    render(){
        return(
            <View>
                {this.setData()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 5,
        borderColor:'orange',
        borderRadius: 5,
        margin: 10
    },
    text: {
        color: 'black',
        fontSize: 16,
        marginBottom: 10,
        fontFamily:'Raleway-Regular'
    },
    header: {
        color: 'orange',
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 5,
        fontFamily: 'Raleway-Regular'
    }
})

export default Info;