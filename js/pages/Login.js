import React, {Component} from 'react';
import {
    Text,
    Dimensions,
    StyleSheet,
    TextInput,
    Image,
    Button,
    ScrollView,
    ActivityIndicator,
    AsyncStorage,
    View
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast'
import Loading from "../component/Loading";
import HttpUtils from "../Http/HttpUtils";
import Mystorage from "../utils/Mystorage";
import Constant from "../utils/Constant";

const {width, height} = Dimensions.get('window')

export default class Login extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isLoading: false,
            isLogin: true
        };
    }

    phoneNumber;
    passWord;

    componentWillMount() {

    }

    componentDidMount() {


    }

    render() {


        return (<ScrollView>

            <View>


                <Image source={require("../image/logo_login.png")}
                       style={{alignSelf: "center", marginBottom: 0, resizeMode: "center"}}
                />

                <View style={{flexDirection: "row", marginLeft: 12}}>
                    <Image source={require("../image/icon_login_number.png")} style={{resizeMode: "center"}}/>
                    <TextInput
                        onChangeText={(text) => {
                            this.phoneNumber = text;
                            this.refs.toast.show(text);
                        }}
                        style={{flex: 1, marginRight: 12, marginBottom: 8}}
                        placeholder={"请输入手机号"}
                        keyboardType={"numeric"}
                    />
                </View>

                <View style={{marginTop: 0, flexDirection: "row", marginLeft: 12}}>
                    <Image source={require("../image/icon_login_password.png")} style={{resizeMode: "center"}}/>
                    <TextInput style={{flex: 1, marginRight: 12, marginBottom: 8}}
                               onChangeText={(text) => {
                                   this.passWord = text;
                               }}
                               placeholder={"请输入密码"}
                               secureTextEntry={true}
                    />
                </View>
                <View style={{flex: 1, marginLeft: 24, marginRight: 24}}>
                    <Button title="登录" onPress={this.login}
                    > </Button>

                </View>
                {this.loading()}
                <Toast ref="toast"/>

            </View>

        </ScrollView>)
    }

    loading() {
        return this.state.isLoading ? (<Loading/>) : (null)
    }

    login = () => {

        this.setState({isLoading: true})
        HttpUtils.login(this.phoneNumber, this.passWord).then((response) => {
            this.setState({isLoading: false})
                this.props.navigation.navigate("splash")
        }).catch((error) => {
            this.setState({isLoading: false})
            console.log(error)
            this.refs.toast.show(error.message)

        })
        // console.log(this.phoneNumber);
    }
}

const styles = StyleSheet.create({
    icon: {
        width: 20,
        height: 20,
    },
    loadingBox: { // Loading居中
        alignItems: "center",
        width,
        height,
        position: 'absolute',

        justifyContent: "center",
    }
});