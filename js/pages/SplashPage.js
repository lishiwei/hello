import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Button,
    View,
    Image, Dimensions
} from 'react-native';
import {NavigationActions} from 'react-navigation';

import Constant from "../utils/Constant";
import Toast, {DURATION} from 'react-native-easy-toast'
import UserProfile from "../SingleTon/UserProfile";
import HttpUtils from "../Http/HttpUtils"
import AppConfigUtils from "../utils/AppConfigUtils";

const {width, height} = Dimensions.get('window')

export default class SplashPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {splashUrl: ""}
    }

    componentWillMount() {
console.log("splash","willMount")
        HttpUtils.getAppConfig().then((data) => {
            this.setState({splashUrl: AppConfigUtils.getSplashUrl(data, AppConfigUtils.TYPE_SPLASH)})
            setTimeout(() => {
                UserProfile.getInstance().getUser().then((user)=>{
                    console.log(user)
                    this.props.navigation.navigate("Main",{data:data})
                }).catch((error)=>{
//执行重置路由方法
                    this.props.navigation.navigate("login")
                })
            }, 2000)


        }).catch((error) => {
console.log(error)
        })


    }

    componentDidMount() {
        console.log("splash","willMount")
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Image source={{uri: this.state.splashUrl}} style={{resizeMode: "cover", width, height}}/>
                <Toast ref="toast"/>

            </View>)
    }
}
const styles = StyleSheet.create({
    icon: {
        width: 20,
        height: 20,
    },
});