import React, {Component} from 'react'
import {
    ListView,
    StyleSheet,
    RefreshControl,
    TouchableOpacity,
    Text,
    Image,
    Linking,
    View,
    TouchableWithoutFeedback
} from 'react-native'
import {StackNavigator, TabNavigator, DrawerNavigator} from 'react-navigation';
import PropTypes from 'prop-types';
import Toast, {DURATION} from 'react-native-easy-toast'
import LinearGradient from "react-native-linear-gradient"
import BVLinearGraient from 'react-native'

export default class HomePageTitle extends React.Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        titleUrl: PropTypes.string,
        style: PropTypes.style,
        gradientColors: PropTypes.array,
        onSearchClick:PropTypes.func,
    }

    render() {
        return (
            <View style={this.props.style}>
                <LinearGradient colors={this.props.gradientColors} style={{height: 150}} start={{x: 0, y: 0}}
                                end={{x: 1, y: 0}}>
                    <View style={{height: 30, flexDirection: "row", justifyContent: "flex-start", marginTop: 12}}>
                        <Image
                            style={{height: 30, width: 30, marginStart: 12, opacity: 0}}
                            source={require("../image/icon_message.png")}
                        />
                        <Image
                            style={{flex: 1, resizeMode: "center", alignSelf: "center", height: 30, width: 80}}
                            source={{uri: this.props.titleUrl}}
                        >
                        </Image>
                        <Image
                            style={{height: 30, width: 30, marginEnd: 12, alignSelf: "center"}}
                            source={require("../image/icon_message.png")}/>
                    </View>
                    <TouchableWithoutFeedback onPress={()=>{this.props.onSearchClick()}}>
                        <View>
                            <Text
                                style={{
                                    color: "#000",
                                    fontSize: 12,
                                    backgroundColor: "white",
                                    paddingLeft: 50,
                                    paddingRight: 50,
                                    paddingTop: 12,
                                    paddingBottom: 12,
                                    alignSelf: "center",
                                    marginTop: 12,
                                    marginBottom: 12,
                                    borderRadius: 12,
                                    borderBottomLeftRadius: 12,
                                    borderBottomRightRadius: 12
                                }}>
                                搜索产品,商户,订单,和学啊
                            </Text>
                        </View>

                    </TouchableWithoutFeedback>


                </LinearGradient>

            </View>)
    }

    _skip() {
        let navigation = this.props.navigation;
        navigation.navigate("search");
    }
}

const styles = StyleSheet.create({
    title: {
        backgroundColor: "yellow",
        alignSelf: "center"
    },
});