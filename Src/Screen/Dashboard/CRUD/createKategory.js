import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    TextInput,
    ActivityIndicator
} from 'react-native';
import { Actions } from 'react-native-router-flux';
// Firestore
import firestore from '@react-native-firebase/firestore';
import { showMessage } from "react-native-flash-message";

class CreateKategoryScreen extends Component {

    constructor() {
        super()
        this.state = {
            name: "",
            loading: false,
            disabledBtn: false
        }
    }

    loopData() {
        return (
            <View style={[Styles.container]}>
                <TextInput
                    style={[Styles.formStyles]}
                    keyboardType='default'
                    onChangeText={(temp) => this.setState({ name: temp })}
                    placeholder='Name Kategory'
                    placeholderTextColor='black'
                />
                <View>
                    {
                        this.state.loading === false ?
                            <TouchableOpacity
                                disabled={this.state.disabledBtn}
                                onPress={() => this.addData()}
                                style={[Styles.buttonActions]}
                            >
                                <Text style={[Styles.fontButton]}>ADD KATEGORY</Text>
                            </TouchableOpacity>
                            :
                            <View style={[Styles.buttonActions]}>
                                <ActivityIndicator size="small" color="white" />
                            </View>
                    }
                </View>
            </View>
        )
    }

    addData() {
        this.setState({
            loading: true,
            disabledBtn: true
        })
        if (this.state.name == "") {
            this.setState({
                loading: false,
                disabledBtn: false,
            })
            // showMessage({
            //     message: 'Form cannot be empty!',
            //     type: "info",
            //     icon: { icon: "info", position: "left" },
            // })
            alert("Form cannot be empty!")
        } else {
            this.setState({
                loading: true,
                disabledBtn: true,
            })
            firestore()
                .collection('Kategory')
                .add({
                    name: this.state.name,
                })
                .then(() => {
                    showMessage({
                        message: 'Add kategory success!',
                        type: "success",
                        icon: { icon: "success", position: "left" },
                    })
                    this.setState({
                        loading: false,
                        disabledBtn: false,
                    })
                    Actions.pop()
                }).catch((error) => {
                    showMessage({
                        message: 'Add kategory failed!',
                        type: "danger",
                        icon: { icon: "danger", position: "left" },
                    })
                    this.setState({
                        loading: false,
                        disabledBtn: false
                    })
                    Actions.pop()
                })
        }
    }

    render() {

        return (
            this.loopData()
        )
    }

}

export default CreateKategoryScreen;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    formStyles: {
        height: 50,
        width: 300,
        padding: 10,
        backgroundColor: 'white',
        color: 'black',
        borderRadius: 5,
        marginTop: 5,
        borderWidth: 0.5,
        borderColor: 'black',
    },
    buttonActions: {
        height: 50,
        width: 300,
        backgroundColor: '#107dac',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginVertical: 5
    },
    fontButton: {
        color: 'white',
    }
})