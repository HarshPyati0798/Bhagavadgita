import React, { Component } from 'react';
import { View,StyleSheet } from 'react-native';
import {Text,PaperProvider} from 'react-native-paper';

class Info extends Component{
    setData = () => {
        if(!this.props.info){
            return <Text>Info</Text>
        }
        const mapped = this.props.info.forEach(item => {
            return(
                <View>
                    <Text>item.text</Text>
                    <Text>item.meaning</Text>
                </View>
            )
        });

        console.log(mapped);

        return mapped;
    }
    render(){
        return(
            <View>
                {this.setData()}
            </View>
        );
    }
}

export default Info;