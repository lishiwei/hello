import React, {Component} from 'react';
import {
    Text,
    Dimensions,
    StyleSheet,
    TextInput,
    Image,
    Button,
    ScrollView,
    TouchableWithoutFeedback,
    AsyncStorage,
    View
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast'
import Loading from "../component/Loading";
import HttpUtils from "../Http/HttpUtils";
import Mystorage from "../utils/Mystorage";
import Constant from "../utils/Constant";
import ImagePicker from 'react-native-image-picker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import UserProfile from "../SingleTon/UserProfile";


export default class SettingPage extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            avatarUrl: {},
            sex:"男",
            sexData:[{}],
            isDateTimePickerVisible: false,
            birthday: "1990-10-10"};
    }
static navigationOptions=()=>({

    title:"个人资料"
})
    componentWillMount() {

        this.setState({avatarUrl: {uri: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3454914715,2716418936&fm=15&gp=0.jpg"}
        });

    }

    render() {
        return (<View style={{paddingLeft:12,paddingRight:12}}>

            <View style={{flexDirection: "row", alignItems: "center",height:80}}>
                <Text style={{color: "black", fontSize: 18}}> 头像</Text>
                <View style={{flex: 1}}/>
                <TouchableWithoutFeedback style={{width: 50, height: 50}} onPress={this.showSelectDialog}>
                    <Image style={{width: 50, height: 50}} resizeMode={"center"} source={this.state.avatarUrl}/>
                </TouchableWithoutFeedback>
                <Image style={{width: 30, height: 30}} resizeMode={"center"}
                       source={require("../image/icon_next_gray.png")}/>
            </View>
            <View style={{backgroundColor:"grey",height:1}}/>
            <View style={{flexDirection: "row", alignItems: "center",paddingTop:12,paddingBottom:12}}>
                <Text style={{color: "black", fontSize: 18}}> 手机号码</Text>
                <View style={{flex: 1}}/>
                <Text style={{color: "black", fontSize: 18}}> 139999999999</Text>
                <Image style={{width: 30, height: 30}} resizeMode={"center"}
                       source={require("../image/icon_next_gray.png")}/>
            </View>
            <View style={{backgroundColor:"grey",height:1}}/>

            <View style={{flexDirection: "row", alignItems: "center",paddingTop:12,paddingBottom:12}}>
                <Text style={{color: "black", fontSize: 18}}> 性别</Text>
                <View style={{flex: 1}}/>
                <Text style={{color: "black", fontSize: 18}} onPress={this.showSexSelectorDialog}> 男</Text>
                <Image style={{width: 30, height: 30}} resizeMode={"center"}
                       source={require("../image/icon_next_gray.png")}/>
            </View>
            <View style={{backgroundColor:"grey",height:1}}/>

            <View style={{flexDirection: "row", alignItems: "center",paddingTop:12,paddingBottom:12}}>
                <Text style={{color: "black", fontSize: 18}}> 出生日期</Text>
                <View style={{flex: 1}}/>
                <Text style={{color: "black", fontSize: 18}} onPress={this._showDateTimePicker}> {this.state.birthday}</Text>
                <Image style={{width: 30, height: 30}} resizeMode={"center"}
                       source={require("../image/icon_next_gray.png")}/>
            </View>

            <Button title="退出登录" onPress={this._clearUserProfile}/>


            {/*<ModalPicker*/}
                {/*data={this.state.sexData}*/}
                {/*initValue="Select something yummy!"*/}
                {/*onChange={(option)=>{ this.setState({sex:option.label}) }}/>*/}
            <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                mode={"date"}
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
            />
        </View>)
    }
showSexSelectorDialog=()=> {
let index = 0;
this.setState({sexData:[{key:index++,label:"男"},{key:index++,label:"女"}]})
}
    showSelectDialog = () => {
        console.log("aaaaa")
        var options = {
            title: '选择头像',
            takePhotoButtonTitle: "拍照",
            chooseFromLibraryButtonTitle: "从相册选择",
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {

                let source = {uri: response.uri};
                this.setState({
                    avatarUrl: source
                });
            }
        })
    }
    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        this._hideDateTimePicker();
        console.log(date)
        console.log("11111111")
        this.setState({ birthday: date.getFullYear()+"-"+date.getMonth()+"-"+date.getDay()})
    };

    _clearUserProfile=()=>{
UserProfile.getInstance().clearUser()
        this.props.navigation.navigate("splash")
    }


}
