import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import FlashMessage, { showMessage } from "react-native-flash-message";

class DashboardScreen extends Component {

    render() {

        return (
            <View style={[ Styles.container ]}>
                <TouchableOpacity
                    onPress={() => Actions.kategory()}
                    style={[ Styles.buttonActions ]}
                >
                    <Text style={[ Styles.fontButton ]}>ADD CATEGORY</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => Actions.subKategory()}
                    style={[ Styles.buttonActions ]}
                >
                    <Text style={[ Styles.fontButton ]}>ADD SUB CATEGORY</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => Actions.image()}
                    style={[ Styles.buttonActions ]}
                >
                    <Text style={[ Styles.fontButton ]}>ADD IMAGE</Text>
                </TouchableOpacity>
                <FlashMessage style={{ height: 50 }} position='top' animated={true} />
            </View>
        )
    }

}

export default DashboardScreen;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonActions: {
        height: 50,
        width: 250,
        backgroundColor: '#107dac',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5
    },
    fontButton: {
        color: 'white',
        fontSize: 18
    }
})