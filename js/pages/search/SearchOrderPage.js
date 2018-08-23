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

export default class SearchOrderPage extends React.Component {
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
            this.searchContent = text;

            HttpUtils.searchOrder(text).then(data => {
                this.setState({data: data})
            }).catch(function (err) {

            })
        }
    }

    onLeave() {
        console.log('leave: ' + this.props.i); // eslint-disable-line no-console
    }

    renderOrder  (item) {
        return <View style={{paddingRight: 12, paddingLeft: 12}}>
            <Text style={{fontSize: 16, flex: 1,color:"black"}}>{item.item.insuredName}</Text>
            <Text style={{fontSize: 14, flex: 1}}>{item.item.orderNo}</Text>
        </View>
    }
    _separator = () => {
        return <View style={{marginTop:12,height:1,backgroundColor:'grey',marginBottom:12}}/>;
    }
    render() {
        const i = this.props.i;
        return <View style={{flex: 1}}>
            <FlatList
                renderItem={(item) => this.renderOrder(item)}
                ItemSeparatorComponent={this._separator}
                data={this.state.data}/>
        </View>;
    }
}