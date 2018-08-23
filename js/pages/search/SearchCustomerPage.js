import React, {Component} from 'react';
import {
    Platform,
    FlatList,
    Text,
    TextInput,
    Alert,
    TouchableHighlight,
    Image,
    View
} from 'react-native';
import HttpUtils from "../../Http/HttpUtils"

export default class SearchCustomerPage extends React.Component {
    onEnter() {
        console.log('enter: ' + this.props.i); // eslint-disable-line no-console
    }
    searchContent;
// 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {data: []};
    }

    doSearch(text) {
        if (this.searchContent!==text) {
            this.searchContent=text;

        HttpUtils.searchCustomer(text).then(data => {
            this.setState({data: data})
        }).catch(function (err) {

        })
        }

    }

    onLeave() {
        console.log('leave: ' + this.props.i); // eslint-disable-line no-console
    }

    renderCustomer(item) {
        console.log(item)
        return <View style={{paddingRight: 12, paddingLeft: 12}}>
            <Text style={{fontSize: 16, flex: 1, color: "black"}}>{item.item.customerName}</Text>
            <Text style={{fontSize: 14, marginTop: 12, marginBottom: 12}}>{item.item.customerPhone}</Text>
        </View>
    }

    _separator = () => {
        return <View style={{marginTop: 12, height: 1, backgroundColor: 'grey', marginBottom: 12}}/>;
    }

    render() {
        const i = this.props.i;
        return <View style={{flex: 1}}>
            <FlatList
                renderItem={(item) => this.renderCustomer(item)}
                ItemSeparatorComponent={this._separator}
                data={this.state.data}/>
        </View>;
    }
}