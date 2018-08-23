import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    DeviceEventEmitter,
} from 'react-native';
import {StackNavigator, TabNavigator, DrawerNavigator} from 'react-navigation';

export default class Test2 extends React.Component {

    constructor(props) {
        super(props)

    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.data2 === this.props.data2) {

            return false
        }
        return true;

    }


    render() {
        console.log("test2========" + this.props.data2)
        return (
            <Text style={{margin: 12}} onPress={() => {
                this.props.onPressed()
            }}>{this.props.data2}</Text>)

    }
}
const styles = StyleSheet.create({
    icon: {
        width: 20,
        height: 20,
    },
});