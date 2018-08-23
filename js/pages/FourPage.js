import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    FlatList,
    View,
    TouchableWithoutFeedback,
    UIManager,
    Image, Dimensions, DeviceEventEmitter
} from 'react-native';
import {StackNavigator, TabNavigator, DrawerNavigator} from 'react-navigation';
import UserProfile from "../SingleTon/UserProfile";
import HttpUtils from "../Http/HttpUtils"
import StringUtils from "../utils/StringUtils";
import Constant from "../utils/Constant";

const {width, height} = Dimensions.get('window')

export default class FourPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userName: null, bannerUrl: "",
            tools: []
        }

    }
    componentDidMount() {


        UserProfile.getInstance().getUser().then(user => {
            this.setState({userName: user.userName})
        })

        HttpUtils.getMyselfConfigData().then(data => {
            console.log(data)
           let tools=JSON.parse(data).saas.data.functionEntry.options;
            tools.push(...JSON.parse(data).saas.data.subjectList.options.list)
            this.setState({tools: tools.filter((item)=>{
                return item.noneed == false
                })})
            this.setState({bannerUrl: JSON.parse(data).saas.data.functionEntry.options})
        }).catch(function (err) {
            console.log(err)
        })

    }


    render() {
        let whiteWidth = width - 24;
        return (<View style={{flex: 1}}>
            <Image source={require("../image/bg_myself.png")} style={{height: 150, width}} resizeMode={"stretch"}/>
            <View style={{flexDirection: "row", position: "absolute", marginTop: 12, marginLeft: 12}}>
                <Image source={require("../image/icon_setting.png")} style={{width: 24, height: 24}}/>
                <View style={{flex: 1}}/>
                <Image source={require("../image/icon_message.png")} style={{width: 24, height: 24, marginRight: 12}}/>
            </View>

            <View style={{
                shadowColor: '#000',
                shadowOffset: {width: 4, height: 4},
                shadowOpacity: 0.8,
                shadowRadius: 6,
                backgroundColor: "white",
                elevation: 10,
                position: "absolute",
                marginTop: 50,
                width: whiteWidth,
                marginLeft: 12,
                marginRight: 12,
            }}>

                <View style={{
                    flexDirection: "row",
                }}>
                    <TouchableWithoutFeedback style={{height: 80, width: 80, margin: 12}}  onPress={()=>{
                        DeviceEventEmitter.emit(Constant.sNavigator, {pageName:"setting",params:{title:""}});
                                           }
                    }>
                    <Image style={{height: 80, width: 80, margin: 12}}
                           source={require("../image/icon_avatar_default.png")}
                          />
                    </TouchableWithoutFeedback>
                    <Text style={{
                        color: "black",
                        fontsize: 18,
                        marginTop: 24,
                        fontWeight: 'bold'
                    }}> {this.state.userName}</Text>
                    <Image ref="image"
                           style={{marginTop: 50, position: "absolute", width: 90, height: 30, marginLeft: 90}}
                           resizeMode={"center"} source={require("../image/icon_verificationing.png")}/>
                </View>

                <View style={{
                    flexDirection: "row",
                    backgroundColor: "white",
                    justifyContent: "space-around",
                    marginLeft: 12,
                    marginRight: 12,
                    height: 30
                }}>
                    <View style={{flexDirection: "row", flex: 1, justifyContent: "center"}}>
                        <Text style={{fontSize: 20, color: "black", fontWeight: "bold"}}> 22222</Text>
                    </View>

                    <View style={{width: 1, backgroundColor: "grey"}}/>

                    <View style={{flexDirection: "row", flex: 1, justifyContent: "center"}}>
                        <Text style={{fontSize: 20, color: "black", fontWeight: "bold"}}> 22222</Text>
                    </View>
                    <View style={{width: 1, backgroundColor: "grey"}}/>
                    <View style={{flexDirection: "row", flex: 1, justifyContent: "center"}}>
                        <Text style={{fontSize: 20, color: "black", fontWeight: "bold"}}> 22222</Text>
                    </View>

                </View>
                <View style={{
                    flexDirection: "row",
                    backgroundColor: "white",
                    justifyContent: "space-around",
                    marginLeft: 12,
                    marginRight: 12,
                    marginBottom: 12,
                    height: 40,

                }}>
                    <View style={{flexDirection: "row", flex: 1, justifyContent: "center"}}>

                        <Text style={{fontSize: 18}}> 可提现</Text>
                    </View>
                    <View style={{width: 1, backgroundColor: "grey"}}/>

                    <View style={{flexDirection: "row", flex: 1, justifyContent: "center"}}>
                        <Text style={{fontSize: 18}}> 待生效</Text>
                    </View>
                    <View style={{width: 1, backgroundColor: "grey"}}/>

                    <View style={{flexDirection: "row", flex: 1, justifyContent: "center"}}>
                        <Text style={{fontSize: 18}}> 累计收入</Text>
                    </View>
                </View>
            </View>

            <View style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 100,
                marginLeft: 12,
                marginRight: 12
            }}>
                <View style={{flexDirection: "row", flex: 1, alignItems: "center", justifyContent: "center",backgroundColor:"#e5f9f2",paddingTop:12,paddingBottom:12}}>
                    <Image style={{height: 30, width: 30}} resizeMode={"center"}
                           source={require("../image/icon_myorder.png")}/>
                    <Text style={{fontSize: 20, color: "black", marginLeft: 12}}>我的订单</Text>
                </View>
                <View style={{width:12}}/>
                <View style={{flexDirection: "row", flex: 1, alignItems: "center", justifyContent: "center",backgroundColor:"#e5f9f2",paddingTop:12,paddingBottom:12}}>
                    <Image style={{height: 30, width: 30}} resizeMode={"center"}
                           source={require("../image/icon_mycustomer.png")}/>
                    <Text style={{fontSize: 20, color: "black", marginLeft: 12}}>我的客户</Text>
                </View>
            </View>
            <Image style={{paddingLeft: 12, paddingRight: 12, marginTop: 12, marginBottom: 12}} resizeMode={"center"}/>
            <FlatList
                data={this.state.tools}
                horizontal={false}
                renderItem={({item}) => this.createToolsItem(item)}
            >
            </FlatList>
        </View>)

    }

    createToolsItem(item) {
        return (<View style={{flexDirection:"row",paddingTop:12,paddingBottom:12,marginLeft:12}}>
                    <Image style={{width:30,height:30}}  resizeMode={"center"} source={{uri:StringUtils.get3xUrlFromString(item.icon)} }/>
            <Text style={{marginLeft:12, fontSize:16}}> {item.name}</Text>
            <View style={{flex:1}}/>
            <Image style={{height:30,width:30,marginRight:12}} resizeMode={"center"} source={require("../image/icon_next_gray.png")}/>
        </View>)
    }

    _skip() {
        this.props.navigation.goBack();
    }
}
const styles = StyleSheet.create({
    icon: {
        width: 20,
        height: 20,
    },
});