import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
    WebView
} from 'react-native';
import CookieManager from 'react-native-cookiemanager';
import UserProfile from "../SingleTon/UserProfile";
import Constant from "../utils/Constant";

export default class WebViewPage extends Component {

    static navigationOptions = ({navigation, screenProps}) => ({
        title: navigation.getParam("title", "webview"),
        headerRight: <View style={{marginRight: 12, flexDirection: "row"}}>
            <TouchableWithoutFeedback onPress={() => {
                navigation.setParams({title: "google"})
            }}>
                <Text style={{fontSize: 18, color: "black"}}> 右边</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => {

                navigation.state.params.jsbridge("/pruduct")

            }

            }>
                <Text style={{fontSize: 18, color: "black"}}> js方法调用</Text>
            </TouchableWithoutFeedback>
        </View>
    });

    componentDidMount() {
        // this.props.navigation.setParams({post : this.postMessageImpl()})

        this.props.navigation.setParams({jsbridge: this.postMessage.bind(this)})



    }

    showProduct=()=>{
        UserProfile.getInstance().getUser().then(user => {
            console.log("user11111", user)

            let options1 = {
                name: 'http_usertoken',
                value: user.token,
                origin: Constant.sHttpUrlIndex,
                domain: '',
                path: '',
                expiration: '',
            };
            let options2 = {
                name: 'http_ostype',
                value: "android",
                origin: Constant.sHttpUrlIndex,
                domain: '',
                path: '',
                expiration: '',
            };
            let options3 = {
                name: 'appName',
                value: "baoa",
                origin: Constant.sHttpUrlIndex,
                domain: '',
                path: '',
                expiration: '',
            };
            let options4 = {
                name: 'http_phoneNo',
                value: user.loginName,
                origin: Constant.sHttpUrlIndex,
                domain: '',
                path: '',
                expiration: '',
            };
            let options5 = {
                name: 'http_userID',
                value: user.id + "",
                origin: Constant.sHttpUrlIndex,
                domain: '',
                path: '',
                expiration: '',
            };
            let options6 = {
                name: 'http_userType',
                value: user.userType + "",
                origin: Constant.sHttpUrlIndex,
                domain: '',
                path: '',
                expiration: '',
            };

            CookieManager.setCookie(options1);
            CookieManager.setCookie(options2);
            CookieManager.setCookie(options3);
            CookieManager.setCookie(options4);
            CookieManager.setCookie(options5);
            CookieManager.setCookie(options6);

            let {initMethod} = this.props.navigation.state.params;


            this.invokeJsBridge(initMethod)
            CookieManager.getCookie(Constant.sHttpUrlIndex, (res) => {
                console.log(JSON.stringify(res))
            });
        }).catch(error => {

        })
    }
    invokeJsBridge = (method) => {
        this.props.navigation.state.params.jsbridge(method)
    }

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    webview = null;


    postMessage(method) {
        if (this.webview) {
            // this.webview.postMessage('window.postMessage("Title："+document.title);');
            this.webview.postMessage('window.postMessage(' + JSON.stringify(method) + ');');
            // this.webview.injectedJavaScript(+"/"+method);

        }
    }

    onMessage = e => {
        // console.log("onMessage", e.nativeEvent.data)
        // alert(e.nativeEvent.data);
    }

    render() {
        let {url} = this.props.navigation.state.params;
        return (<View style={{flex: 1}}>
            <WebView style={{flex: 1}}
                     source={{uri: url}}
                     ref={webview => {
                         this.webview = webview;
                     }}
                     injectedJavaScript="document.addEventListener('message', function(e) {eval(e.data);});"
                     onMessage={this.onMessage}
                     onLoadStart={this.showProduct()}
                     // onLoadEnd={this.showProduct}
            />

        </View>)
    }
}