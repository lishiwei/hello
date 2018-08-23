import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    DeviceEventEmitter,
    Dimensions,
    FlatList,
    TouchableWithoutFeedback,
    ImageBackground,
    Image,
    ScrollView,
    View
} from 'react-native';
import {StackNavigator, TabNavigator} from "react-navigation";
import HomeScreen from "./HomePage";
import XueaPage from "./ThreePage";
import ProductPage from "./SecondPage";
import MySelfPage from "./FourPage";
import HomePageTitle from "../component/HomePageTitle"
import SearchPage from "./SearchPage";
import AppConfigUtils from "../utils/AppConfigUtils";
import WebViewPage from "./WebViewPage";
import Constant from "../utils/Constant";
import HttpUtils from "../Http/HttpUtils"
import UserProfile from "../SingleTon/UserProfile";
export default class MainPage extends Component {

// 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            tabArray: [],
            tab: <View/>,
            data:{}
        };
    }
createTabStack(){
    this.homeStack = StackNavigator({
        homeStack: {
            screen: HomeScreen,
            navigationOptions: ({navigation}) => ({
                header: () => (
                    <View style={{backgroundColor: "red", height: 120}}>
                        {this.createHomePageTitle(navigation)}
                    </View>

                ),
                headerStyle: {
                    height: 120
                }
            })
        }

    })
    this.ProductStack = StackNavigator({
            ProductStack: {
                screen: ProductPage,
                navigationOptions: {
                    headerTitle: (
                        <Text style={styles.title}> 产品</Text>
                    ),
                    headerTitleStyle: {
                        alignSelf: 'center'
                    },

                }
            },
            // webview:{
            //     screen:WebViewPage
            // }
        }
        )
    this.XueaStack = StackNavigator({
        XueaStack: {
            screen: WebViewPage,
            navigationOptions: {
                headerTitle: (
                    <Text style={styles.title}> 学啊</Text>
                ),
                headerLayoutPreset: "center",
                //导航栏的style
                headerStyle: {
                    backgroundColor: '#fff'
                },
                headerTitleStyle: {
                    color: 'green',
                    //居中显示
                    alignSelf: 'center',
                },

            }
        }
    },{
        initialRouteParams:{url:Constant.sHttpUrlIndex
            ,initMethod:this.state.tabArray[2].jsMethod
        }
    })
    this.MyselfStack = StackNavigator({
        MyselfStack: {
            screen: MySelfPage,
            navigationOptions: {

                headerLayoutPreset: "center",
                //导航栏的style
                headerStyle: {
                    height:0,
                    backgroundColor: '#fff'
                },


            }
        }
    },{
        initialRouteParams:{url:Constant.sHttpUrlIndex
            ,initMethod:this.state.tabArray.jsMethod

        }
    })
}
    componentWillMount() {
        HttpUtils.getAppConfig().then((data) => {

            this.setState({data:data})

        }).catch((error) => {
            console.log(error)
        })

        HttpUtils.getBottomTabData().then(data=>{
            this.setState({tabArray:data})
            this.createTabStack();
            this.setState({tab: this.createTab()})

        }).catch(error=>{

        })
        this.deEmitter = DeviceEventEmitter.addListener(Constant.sNavigator, (router) => {
            let {pageName,params} = router;
            this.navigateOtherStackPage(pageName,params);
        });
    }
    createTab() {
        Tab = TabNavigator(
            {
                HomeStack: {
                    screen: this.homeStack,
                    navigationOptions: {
                        tabBarLabel: this.state.tabArray[0].text,
                        tabBarIcon: ({focused}) => {
                            let map = !focused ?AppConfigUtils.get3xImageUrl(this.state.tabArray[0].defaultDrawable) : AppConfigUtils.get3xImageUrl(this.state.tabArray[0].selectDrawable)
                            return <View>
                                <Image
                                    source={{uri:map}}
                                    style={styles.icon}
                                />
                            </View>
                        }
                    }
                },
                ProductPage: {
                    screen: this.ProductStack,
                    navigationOptions: {
                        tabBarLabel: this.state.tabArray[1].text,
                        tabBarIcon: ({focused}) => {
                            let map = !focused ?AppConfigUtils.get3xImageUrl(this.state.tabArray[1].defaultDrawable) : AppConfigUtils.get3xImageUrl(this.state.tabArray[1].selectDrawable)
                            return <View>
                                <Image
                                    source={{uri:map}}
                                    style={styles.icon}
                                />
                            </View>
                        }
                    }
                },
                XueaPage: {
                    screen: this.XueaStack,
                    navigationOptions: {
                        tabBarLabel: this.state.tabArray[2].text,
                        tabBarIcon: ({focused}) => {
                            let map = !focused ?AppConfigUtils.get3xImageUrl(this.state.tabArray[2].defaultDrawable) : AppConfigUtils.get3xImageUrl(this.state.tabArray[2].selectDrawable)
                            return <View>
                                <Image
                                    source={{uri:map}}
                                    style={styles.icon}
                                />
                            </View>
                        }
                    }
                },

                MyselfPage: {
                    screen: this.MyselfStack,
                    navigationOptions: {
                        tabBarLabel: this.state.tabArray[3].text,
                        tabBarIcon: ({focused}) => {
                            let map = !focused ?AppConfigUtils.get3xImageUrl(this.state.tabArray[3].defaultDrawable) : AppConfigUtils.get3xImageUrl(this.state.tabArray[3].selectDrawable)
                            return <View>
                                <Image
                                    source={{uri:map}}
                                    style={styles.icon}
                                />
                            </View>
                        }
                    }
                },

            },
            {
                tabBarPosition: 'bottom',
                animationEnabled: false, // 切换页面时是否有动画效果
                swipeEnabled: true, // 是否可以左右滑动切换tab 如果设置这个属性，这事例中下面设置的按钮 Go back home | Go to notifications就不好使了
                backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
                //第一次加载时，显示的tab
                tabBarOptions: {
                    activeTintColor: this.state.tabArray[2].selectColor, // 文字和图片选中颜色
                    inactiveTintColor: this.state.tabArray[2].defaultColor, // 文字和图片未选中颜色
                    showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
                    showLabel: true, // android 是否展现文字 默认 true
                    upperCaseLabel: false, //android 文字是否需要大写 默认true
                    // pressColor: 'blue', // android 按压时显示的颜色
                    scrollEnabled: false,
                    indicatorStyle: {
                        height: 0 // 如TabBar下面显示有一条线，可以设高度为0后隐藏
                    },
                    style: {
                        backgroundColor: '#ffffff', // TabBar 背景色
                        // height: 50,
                    },
                    labelStyle: {
                        fontSize: 15, // 文字大小
                        paddingTop: 0,
                        marginTop: 0,
                    },
                    tabStyle: {
                        marginTop: 10,
                        height: 50,
                    },
                },
            }
        )

        return (<View style={{flex: 1}}>
            <Tab/>
        </View>)
    }

    createHomePageTitle(navigation) {

        let data1 = this.props.navigation.state.params;
        if (data1==undefined)
        {
            console.log("dataaaa","nulllll")

        }else {
            console.log("dataaaa",data1)
        }
        return (<HomePageTitle style={{backgroundColor: "red", height: 120}}
                               navigation={navigation}
                               titleUrl={AppConfigUtils.getTitleLogoUrl(this.state.data)}
                               gradientColors={AppConfigUtils.getActionbarColor(this.state.data)}
        onSearchClick={()=>{this.navigateOtherStackPage("search")}}/>)
    }
    componentWillUnmount() {
        this.deEmitter.remove();
    }
    navigateOtherStackPage(pageName = "", params = {}) {
        console.log(pageName)
        this.props.navigation.navigate(pageName, params)
    }
    render() {
        return (
            <View style={{flex: 1}}>
                {this.state.tab}
            </View>
        )

    }


}
const styles = StyleSheet.create({
    icon: {
        width: 20,
        height: 20,
    },
    title: {
        flex: 1,
        textAlign: 'center',
        fontSize: 20,
        color: "#000"
    }

});
