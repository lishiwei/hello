import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    Alert,
    TouchableWithoutFeedback,
    Image,
    View
} from 'react-native';
import ScrollableTabView, {ScrollableTabBar,} from 'react-native-scrollable-tab-view';
import SearchItemPage from "./SearchItemPage";
import SearchAll from "./search/SearchAll";
import SearchProductPage from "./search/SearchProductPage";
import SearchCustomerPage from "./search/SearchCustomerPage";
import SearchOrderPage from "./search/SearchOrderPage";
import SearchXuea from "./search/SearchXuea";
import HttpUtils from "../Http/HttpUtils";

export default class SearchPage extends React.Component {
    mixins: [TimerMixin,]
    searchContent;
    searchCurrentTime;
    currentTab = 0;

    constructor(props) {
        super(props)
        this.state = {
            tabs: ["全部", "产品", "客户", "订单", "学啊"],
            inputValue:""
        }
        this.children = []

    }


    doSearch(text) {
        this.children[this.currentTab].doSearch(text);
    }

    onChangeText(input) {
        console.log(input)
        if (this.searchContent !== input) {
            this.searchContent = input;
            this.doSearch(this.searchContent)
        }

    }
updateTextInput(content)
{
    // this.refs.textinput.defaultValue=content;
    this.setState({inputValue:content})
}
    onTextSubmit(event) {
        this.doSearch(event.nativeEvent.text)
    }

    renderTab = (name, page, isTabActive, onPressHandler, onLayoutHandler) => {
        return <TouchableWithoutFeedback
            key={`${name}_${page}`}
            onPress={() => onPressHandler(page)}
            onLayout={onLayoutHandler}
            style={{flex: 1, justifyContent: "center", alignItems: "center"}}
            underlayColor="#ff0000"
        >
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Text style={{alignSelf: "center"}}>{name}</Text>
            </View>
        </TouchableWithoutFeedback>;
    }
    handleChangeTab = ({i, ref, from,}) => {
        this.currentTab = i;
        this.children[i].onEnter();
        this.children[i].doSearch(this.searchContent)
        this.children[from].onLeave();
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{
                    flexDirection: "row",
                    marginRight: 12,
                    marginLeft: 12,
                    marginTop: 12,
                    marginBottom: 12,
                    alignItems: "center"
                }}>
                    <View style={{
                        flex: 1,
                        flexDirection: "row",
                        backgroundColor: "#f6f6f6",
                        borderRadius: 5,
                        alignItems: "center",
                        height: 40
                    }}>
                        <Image style={{height: 30, width: 30, alignSelf: "center"}} resizeMode={"center"}
                               source={require("../image/icon_search.png")}/>
                        <TextInput style={{flex: 1, fontSize: 14}} placeholder="搜索产品客户订单和学啊"
                                   ref="textinput"
                                   defaultValue={this.state.inputValue}
                                   onChangeText={input => this.onChangeText(input)}
                                   onSubmitEditing={event => this.onTextSubmit(event)}
                                   underlineColorAndroid={"transparent"}/>
                    </View>
                    <Text style={{color: "black", fontSize: 18, marginLeft: 12}}>取消</Text>
                </View>
                <ScrollableTabView style={{flex: 1}}
                                   renderTabBar={() => <ScrollableTabBar renderTab={this.renderTab} underlineStyle={{
                                       height: 2,
                                       backgroundColor: "red",
                                       flex: 1
                                   }}
                                   />}
                                   initialPage={0}
                                   onChangeTab={this.handleChangeTab}>


                    <SearchAll ref={(ref) => {
                        this.children[0] = ref
                    }} tabLabel={this.state.tabs[0]} i={0} parentComponent={this}/>
                    <SearchProductPage ref={(ref) => {
                        this.children[1] = ref
                    }} tabLabel={this.state.tabs[1]} i={1}/>
                    <SearchCustomerPage ref={(ref) => {
                        this.children[2] = ref
                    }} tabLabel={this.state.tabs[2]} i={2}/>
                    <SearchOrderPage ref={(ref) => {
                        this.children[3] = ref
                    }} tabLabel={this.state.tabs[3]} i={3}/>
                    <SearchXuea ref={(ref) => {
                        this.children[4] = ref
                    }} tabLabel={this.state.tabs[4]} i={4}/>

                    {/*{this.state.tabs.map((tab, i) => {*/}
                    {/**/}
                    {/**/}
                    {/**/}
                    {/*return <SearchItemPage*/}
                    {/*ref={(ref) => (this.children[i] = ref)}*/}
                    {/*tabLabel={tab}*/}
                    {/*i={i}*/}
                    {/*key={i}*/}
                    {/*/>;*/}
                    {/*})}*/}
                </ScrollableTabView>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    icon: {
        width: 20,
        height: 20,
    },
});