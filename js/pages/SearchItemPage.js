import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    Alert,
    TouchableHighlight,
    Image,
    View
} from 'react-native';
export default class SearchItemPage extends React.Component {
    onEnter() {
        console.log('enter: ' + this.props.i); // eslint-disable-line no-console
    }

    onLeave() {
        console.log('leave: ' + this.props.i); // eslint-disable-line no-console
    }

    render() {
        const i = this.props.i;
        return <Text key={i}>{`tab${i}`}</Text>;
    }
}