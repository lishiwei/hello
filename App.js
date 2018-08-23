/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Button
    , Image,
    View,
    AsyncStorage
} from 'react-native';
import {StackNavigator, TabNavigator, SwitchNavigator} from 'react-navigation';

import {YellowBox} from 'react-native';
import SearchPage from "./js/pages/SearchPage";
import Login from "./js/pages/Login";
import Mystorage from "./js/utils/Mystorage";
import SplashPage from "./js/pages/SplashPage";
import MainPage from "./js/pages/MainPage";
import WebViewPage from "./js/pages/WebViewPage";
import SettingPage from "./js/pages/SettingPage";
import HttpUtils from "./js/Http/HttpUtils";

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);


const Navigator = StackNavigator(
    {
        Main: {
            screen: MainPage,
            navigationOptions: ({navigation}) => ({
                headerStyle: {
                    height: 0
                }
            })
        },

        webview: {screen: WebViewPage},

        search: {
            screen: SearchPage
        },
        setting: {
            screen: SettingPage
        }
    },
    {
        mode: 'card',

    }
);
const LoginStackNavigator = StackNavigator(
    {login: {screen: Login}}
)
const SplashNavigator = SwitchNavigator(
    {
        splash: SplashPage,
        Main: Navigator,
        login:LoginStackNavigator
    },
    {
        initialRouteName: 'splash',
    }
)

export default class App extends React.Component {

// 构造
  constructor(props) {
    super(props);
    // 初始状态
  }
    componentWillMount() {
        Mystorage._getStorage()

    }


    render() {
        return (
            <View style={{flex: 1}}>
                <SplashNavigator/>

            </View>
        );
    }
}