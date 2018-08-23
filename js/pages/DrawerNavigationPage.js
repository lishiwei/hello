import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Button,
    View
} from 'react-native';
import {StackNavigator, TabNavigator, DrawerNavigator} from 'react-navigation';
import FourPage from './FourPage'
import SecondPage from "./SecondPage";



const SecondStackNavigator = StackNavigator({
    SecondPage: {screen: SecondPage},
    FourPage: {screen: FourPage}
});
const Navigator = DrawerNavigator({
    FourPage: {screen: FourPage},
    S1Page: SecondStackNavigator,

});
SecondStackNavigator.navigationOptions = ({ navigation }) => {
    let drawerLockMode = 'unlocked';
    if (navigation.state.index > 0) {
        drawerLockMode = 'locked-closed';
    }

    return {
        drawerLockMode,
    };
};
const styles = StyleSheet.create({container: {flex: 1}})


export default class DrawerNavigationPage extends Component {

    constructor(props) {
        super(props)
        const { params } = this.props.navigation.state;
        state={
            title:params.user
        }
        console.log(this.props.navigation.state)
    }

    render() {
        return (<Navigator/>)
    }

}