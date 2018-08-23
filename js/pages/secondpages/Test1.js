import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    DeviceEventEmitter,
} from 'react-native';
import {StackNavigator, TabNavigator, DrawerNavigator} from 'react-navigation';

export default class Test1 extends React.Component {
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
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.data1 === this.props.data1) {

            return false
        }
        return true;
    }

    render() {
        console.log("test1=========" + this.props.data1)

        return (

            <Text style={{margin: 12}} onPress={() => {
                this.props.onPressed()
            }}>{this.props.data1}</Text>

        )
    }


}
const styles = StyleSheet.create({
    icon: {
        width: 20,
        height: 20,
    },
});