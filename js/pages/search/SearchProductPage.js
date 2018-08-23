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
import HttpUtils from "../../Http/HttpUtils"

export default class SearchProductPage extends React.Component {
    searchContent;

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {data: []};
    }
    onEnter() {
        console.log('enter: ' + this.props.i); // eslint-disable-line no-console
    }

    doSearch(text) {
        if (this.searchContent!==text) {
            this.searchContent=text;

            HttpUtils.searchProduct(text).then(data => {
            this.setState({data: data})
        }).catch(function (err) {

        })}
    }

    onLeave() {
        console.log('leave: ' + this.props.i); // eslint-disable-line no-console
    }

    render() {
        const i = this.props.i;
        return <View style={{flex: 1}}>
            <FlatList
                renderItem={(item) => this.renderProduct(item)}
                ItemSeparatorComponent={this._separator}
                data={this.state.data}/>
        </View>;
    }
    _separator = () => {
        return <View style={{marginTop:12,height:1,backgroundColor:'grey',marginBottom:12}}/>;
    }
    renderProduct (item){
        console.log(item)
        return <View style={{flexDirection: "row"}}>
            <Text style={{flex: 1, fontSize: 16,color:"black"}}>{item.item.productName}</Text>
        </View>
    }
}