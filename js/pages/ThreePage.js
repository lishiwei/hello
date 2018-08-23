import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Button,
    View,
    Image
} from 'react-native';

export default class ThreePage extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Text style={{flex: 1, fontSize: 12}}>
                    第三页
                </Text>

            </View>)
    }
}
const styles = StyleSheet.create({
    icon: {
        width: 20,
        height: 20,
    },
});