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
import DateUtils from "../../utils/DateUtils";
import HttpUtils from "../../Http/HttpUtils"

export default class SearchXuea extends React.Component {
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {data: []};
    }
    searchContent;
    onEnter() {
        console.log('enter: ' + this.props.i); // eslint-disable-line no-console
    }

    doSearch(text) {
        if (this.searchContent !== text) {
            this.searchContent = text;

            HttpUtils.searchLearn(text).then(data => {
                this.setState({data: data})
            }).catch(function (err) {

            })
        }
    }

    onLeave() {
        console.log('leave: ' + this.props.i); // eslint-disable-line no-console
    }

    _separator = () => {
        return <View style={{marginTop: 12, height: 1, backgroundColor: 'grey', marginBottom: 12}}/>;
    }

    renderXuea(item) {
        return <View style={{paddingRight: 12, paddingLeft: 12}}>
            <Text style={{fontSize: 16, flex: 1, color: "black"}}>{item.item.title}</Text>
            <Text style={{
                fontSize: 14,
                marginTop: 4,
                marginBottom: 4
            }}>{DateUtils.formatterDate(item.item.publishTime)}</Text>
            <Text style={{fontSize: 14, flex: 1}} numberOfLines={2}>{item.item.content}</Text>
        </View>
    }

    render() {
        return <View style={{flex: 1}}>
            <FlatList
                renderItem={(item) => this.renderXuea(item)}
                ItemSeparatorComponent={this._separator}
                data={this.state.data}/>
        </View>;
    }
}