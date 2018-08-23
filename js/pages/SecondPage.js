import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    DeviceEventEmitter,
} from 'react-native';
import {StackNavigator, TabNavigator, DrawerNavigator} from 'react-navigation';
import Constant from "../utils/Constant";
import Test1 from "./secondpages/Test1";
import Test2 from "./secondpages/Test2";

export default class SecondPage extends React.Component {
    // static navigationOptions = {
    //     tabBarLabel: '产品',
    //     tabBarIcon: ({focused}) => {
    //         let map = focused ? require("../image/icon_product_full.png") : require("../image/icon_product.png")
    //         return <View>
    //             <Image
    //                 source={map}
    //                 style={styles.icon}>
    //             </Image>
    //         </View>
    //
    //     }
    // }

    constructor(props) {
        super(props)
        this.state={data1:1,
        data2:2}
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Test1 data1={this.state.data1} onPressed={()=>{
                    // let value = this.state.data1++
                    this.setState({data1:++this.state.data1})}}/>
                <Test2 data2={this.state.data2}  onPressed={()=>{this.setState({data2:++this.state.data2})}}/>
            </View>)
    }

    _skip() {
        DeviceEventEmitter.emit(Constant.sNavigator, {pageName: "webview", params: {title: "百度"}});
    }

}
const styles = StyleSheet.create({
    icon: {
        width: 20,
        height: 20,
    },
});