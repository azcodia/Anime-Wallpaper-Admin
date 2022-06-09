import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    BackHandler,
    Alert,
    Linking,
    SafeAreaView
} from 'react-native';
import { Router, Scene, Drawer, Actions, Stack, Modal, Tabs } from 'react-native-router-flux';

import DashboardScreen from './Screen/Dashboard/dashboard';
import CreateKategoryScreen from './Screen/Dashboard/CRUD/createKategory';
import CreateSubKategoryScreen from './Screen/Dashboard/CRUD/createSubKategory';
import CreateImage from './Screen/Dashboard/CRUD/createImage';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Router>
                    <Scene
                        initial={true}
                        key="root"
                        titleStyle={{
                            color: '#000',
                            fontWeight: 'normal'
                        }}
                    >
                        <Scene key={"dashboard"} component={DashboardScreen} drawerLockMode={'locked-closed'} iconName="home" iconTitle="Home" hideNavBar navTransparent />
                        <Scene key={"kategory"} component={CreateKategoryScreen} drawerLockMode={'locked-closed'} iconName="home" iconTitle="Home" hideNavBar navTransparent />
                        <Scene key={"subKategory"} component={CreateSubKategoryScreen} drawerLockMode={'locked-closed'} iconName="home" iconTitle="Home" hideNavBar navTransparent />
                        <Scene key={"image"} component={CreateImage} drawerLockMode={'locked-closed'} iconName="home" iconTitle="Home" hideNavBar navTransparent />
                    </Scene>
                </Router>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'gray',
    }
})
