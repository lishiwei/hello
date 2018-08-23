import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    FlatList,
    Alert,
    TouchableHighlight,
    Image,
    View
} from 'react-native';
import HttpUtils from "../../Http/HttpUtils";
import Constant from "../../utils/Constant";
import DateUtils from "../../utils/DateUtils";

export default class SearchAll extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            data: [],
            searchHistory: [],
        };
    }

    componentDidMount() {

        HttpUtils.searchHistory().then(data => {
            console.log(data)
            this.setState({
                searchHistory: data
            })
        }).catch(error => {
console.log(error)
        })
    }

    onEnter() {
        console.log('enter: ' + this.props.i); // eslint-disable-line no-console
    }

    doSearch(text) {
        HttpUtils.searchAll(text).then(data => {
            console.log(data)
            let all = [];
            if (data.learn !== null && data.learn.length !== 0) {
                all.push({"title": "学啊", "type": "header"})
                data.learn.forEach(item => {
                    item["type"] = "learn";
                    all.push(item)
                })
            }

            if (data.product !== null && data.product.length !== 0) {
                all.push({"title": "产品", "type": "header"})
                data.product.forEach(item => {
                    item["type"] = "product";
                    all.push(item)

                })
            }

            if (data.customer !== null && data.customer.length !== 0) {
                all.push({"title": "客户", "type": "header"})
                data.customer.forEach(item => {
                    item["type"] = "customer";
                    all.push(item)

                })
            }

            if (data.policy !== null && data.policy.length !== 0) {
                all.push({"title": "订单", "type": "header"})
                data.policy.forEach(item => {
                    item["type"] = "order";
                    all.push(item)
                })

            }
            this.setState({data: all})
        }).catch(error => {
            console.log(error)
        })
    }

    onLeave() {
        console.log('leave: ' + this.props.i); // eslint-disable-line no-console
    }

    renderItem(itemData) {
        let item = itemData.item;
        if (item.type === Constant.sHearder) {
            let image = null;

            if (item["title"] === "客户") {
                image = require("../../image/customer.png")
            } else if (item["title"] === "产品") {
                image = require("../../image/product.png")
            } else if (item["title"] === "学啊") {
                image = require("../../image/xuea.png")
            } else if (item["title"] === "订单") {
                image = require("../../image/order.png")
            }
            return <View
                style={{flexDirection: "row", justifyContent: "center", alignItems: "center", paddingRight: 12}}>
                <Image style={{width: 32, height: 32,}} resizeMode={"center"}
                       source={image}/>
                <Text style={{fontSize: 16}}>{item.title}</Text>
                <View style={{flex: 1}}/>
                <Text style={{fontSize: 16}}> 全部</Text>
            </View>
        }
        else if (item.type === Constant.sCustomer) {
            return this.renderCustomer(item)
        } else if (item.type === Constant.sProduct) {
            return this.renderProduct(item)
        } else if (item.type === Constant.sLearn) {
            return this.renderXuea(item)
        } else if (item.type === Constant.sOrder) {
            return this.renderOrder(item)
        }
    }

    renderProduct(item) {
        console.log(item)
        return <View style={{flexDirection: "row"}}>
            <Text style={{flex: 1, fontSize: 16, color: "black"}}>{item.productName}</Text>
        </View>
    }

    renderXuea(item) {
        return <View style={{paddingRight: 12, paddingLeft: 12}}>
            <Text style={{fontSize: 16, flex: 1, color: "black"}}>{item.title}</Text>
            <Text
                style={{fontSize: 14, marginTop: 4, marginBottom: 4}}>{DateUtils.formatterDate(item.publishTime)}</Text>
            <Text style={{fontSize: 14, flex: 1}} numberOfLines={2}>{item.content}</Text>

        </View>
    }

    renderCustomer(item) {
        console.log(item)
        return <View style={{paddingRight: 12, paddingLeft: 12}}>
            <Text style={{fontSize: 16, flex: 1, color: "black"}}>{item.customerName}</Text>
            <Text style={{fontSize: 14, marginTop: 12, marginBottom: 12}}>{item.customerPhone}</Text>
        </View>
    }

    renderOrder(item) {
        return <View style={{paddingRight: 12, paddingLeft: 12}}>
            <Text style={{fontSize: 16, flex: 1, color: "black"}}>{item.insuredName}</Text>
            <Text style={{fontSize: 14, flex: 1}}>{item.orderNo}</Text>
        </View>
    }

    _separator = () => {
        return <View style={{marginTop: 12, height: 1, backgroundColor: 'grey', marginBottom: 12}}/>;
    }

    renderHistory = (item) => {

        return(<View style={{flex:1, justifyContent: "center", alignItems: "flex-start",height:30,margin:12,
        }}>
            <View style={{width:80,height:30,backgroundColor: "grey",justifyContent:"center",alignItems:"center"}}>
                <Text onPress={()=>{
                    this.props.parentComponent.searchContent=item.item;
                    this.props.parentComponent.updateTextInput(item.item);
                    this.doSearch(item.item);this.setState({searchHistory:[]})}}>

                    {item.item}
                </Text>
            </View>
        </View>)
    }

    render() {
        if (this.state.searchHistory.length!==0) {
            return (<View style={{marginTop: 12}}>
                <Text>搜索历史</Text>

                <FlatList
                    renderItem={this.renderHistory}
                    numColumns={4}
                    data={this.state.searchHistory}/>
            </View>);
        }else {
            return <View style={{flex: 1}}>

                <FlatList
                    renderItem={(item) => this.renderItem(item)}
                    ItemSeparatorComponent={this._separator}
                    data={this.state.data}/>
            </View>;
        }

    }
}