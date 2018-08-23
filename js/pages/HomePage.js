import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    Alert,
    Dimensions,
    FlatList,
    TouchableWithoutFeedback,
    ImageBackground,
    Image,
    ScrollView,
    View
} from 'react-native';
import ScrollVertical from "../component/ScrollVertical";
import Banner from '../component/Banner'
import HttpUtils from '../Http/HttpUtils'
import AppConfigUtils from "../utils/AppConfigUtils";
import StringUtils from "../utils/StringUtils";
const {width} = Dimensions.get('window')
export default class HomePage extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            MessageArray: [{title: "订单核保失败提醒"}, {title: "下单成功"}, {title: "你好哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈"}],
            toolsArray: [

            ],
            bannerUrlArray: [],
            recommandArray: []
        }
    }
bannerDataArray=[];

    componentDidMount() {
        HttpUtils.getHomeData().then(data => {
            this.setState({toolsArray:JSON.parse(data).functionEntry.options.showIcon})
            let bannerarray=[];
            JSON.parse(data).advertising.options.forEach((value)=>{
                this.bannerDataArray=[];
                this.bannerDataArray.push(value);
                bannerarray.push(StringUtils.get3xUrlFromString(value.url))
            })
            this.setState({bannerUrlArray:bannerarray})
this.setState({recommandArray:JSON.parse(data).recommend.options})
        }).catch(error=>{
            console.log(error)

        })
    }

    createToolsItem(item) {
        return <TouchableWithoutFeedback style={{height: 105, width: 105, marginTop: 12}} onPress={() => {

        }}>
            <View style={{height: 70, width: 105, marginTop: 12}}>

                <Image style={{height: 30, width:30, alignSelf: "center",resizeMode:"cover"}}
                       source={{uri:StringUtils.get3xUrlFromString(item.icon)}}/>
                <Text style={{fontSize: 12, color: "black", margin: 12, alignSelf: "center"}}> {item.name}</Text>

            </View>
        </TouchableWithoutFeedback>

    }

    createRecomandItem() {
        var recommandView = [];
        for (i = 0; i < this.state.recommandArray.length; i++) {
            let j =i ;
            recommandView.push(

                    <TouchableWithoutFeedback style={{margin:12}}onPress={()=>{
                    console.log(j)
                    console.log(this.state.recommandArray[j])
                }}>
                    <Image source={{uri:this.state.recommandArray[i].url}}
                           style={{width: 150, height: 150 ,resizeMode:"center"}}/>
                </TouchableWithoutFeedback>
            );
        }
        return recommandView
    }
    render() {
        let array = [{content: ''}];
        if (this.state.MessageArray && this.state.MessageArray.length > 0) {
            array = [];
            for (let item of this.state.MessageArray) {
                array.push({content: item.title});
            }
        }
        return (
            <ScrollView>
                <View style={{flex: 1, flexDirection: "column"}}>

                    <View style={{
                        borderRadius: 12,
                        backgroundColor: "white",
                        marginLeft: 12,
                        height: 30,
                        marginRight: 12,
                        marginTop: 12,
                        flexDirection: "row",
                    }}>
                        <Image source={require('../image/icon_home_info.png')}
                               style={{width: 40, height: 16, marginLeft: 12, marginRight: 12, marginTop: 7}}>

                        </Image>
                        <View style={{flexDirection: 'row', flex: 1}}>
                            <ScrollVertical
                                onChange={(index => {
                                    this.index = index;
                                })}
                                enableAnimation={true}
                                data={array}
                                delay={2500}
                                duration={1000}
                                onItemClick={(index) => {
                                    console.log(index + "bbbb")
                                }}
                                scrollHeight={34}
                                scrollStyle={{alignItems: 'flex-start'}}
                                textStyle={{color: "black", fontSize: 12}}/>
                        </View>
                    </View>
                    <View>
                        <FlatList
                            data={this.state.toolsArray}
                            numColumns={4}
                            renderItem={({item}) => this.createToolsItem(item)}>
                        </FlatList>
                    </View>

                    <Banner datas={this.state.bannerUrlArray} duration={1000} onItemPress={(index)=>{

                        console.log(this.bannerDataArray[index]
)
                    }}>

                    </Banner>
                    <View style={{height: 30, flexDirection: "row", marginTop: 12}}>
                        <View style={{
                            backgroundColor: "red",
                            height: 20,
                            width: 2,
                            alignSelf: "center",
                            marginLeft: 8,
                            marginRight: 8
                        }}/>
                        <Text style={{color: "black", fontSize: 14, alignSelf: "center"}}> 为您推荐</Text>
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={{flexDirection: "row"}}>
                        {this.createRecomandItem()}
                    </View>
                    </ScrollView>
                </View>
            </ScrollView>
        )
    }
}

const
    styles = StyleSheet.create({
        icon: {
            width: 20,
            height: 20,
        },
        page: {
            flex: 1,
            height: 130,
            resizeMode: 'stretch'
        },
        text: {
            color: '#fff',
            fontSize: 30,
            fontWeight: 'bold'
        },

        image: {
            width,
            flex: 1
        }
        , container: {
            flex: 1
        },

        wrapper: {},

        slide: {
            flex: 1,
            height: 120,
            justifyContent: 'center',
            backgroundColor: 'transparent'
        },

    });