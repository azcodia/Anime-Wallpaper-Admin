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
import { Picker } from '@react-native-picker/picker';
import { Actions } from 'react-native-router-flux';
// Firestore
import firestore from '@react-native-firebase/firestore';
import { showMessage } from "react-native-flash-message";

class CreateSubKategoryScreen extends Component {

    constructor() {
        super()
        this.state = {
            data: "",
            nameKat: "",
            nameSubKat: "",
            linkImage: "",
            loading: false,
            disabledBtn: false,
            language: 'java',
        }
    }

    componentDidMount() {
        this.loadKategory()
    }

    loadKategory() {
        firestore().collection("Kategory").onSnapshot(doc => {
            this.setState({
                data: doc.docs,
                nameKat: doc.docs[0].data().name
            })
        })
    }

    loopData() {
        if (this.state.data == "") {
            return (
                <View
                    style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}
                >
                    <ActivityIndicator size="large" color="black" />
                </View>
            )
        } else {
            return (
                <View style={[Styles.container]}>
                    <View style={[ Styles.formPickerStyles ]}>
                        <Picker
                            selectedValue={this.state.nameKat}
                            style={{ height: 50, width: 300, }}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ nameKat: itemValue })
                            }>
                            {
                                this.state.data !== ""
                                    ?
                                    this.state.data.map((data) => {
                                        return (
                                            <Picker.Item label={data.data().name} value={data.data().name} />
                                        )
                                    })
                                    :
                                    <Picker.Item label="DATA KOSONG" value="DATA KOSONG" />
                            }
                        </Picker>
                    </View>
                    <TextInput
                        style={[Styles.formStyles]}
                        keyboardType='default'
                        onChangeText={(temp) => this.setState({ nameSubKat: temp })}
                        placeholder='Name Sub Kategory'
                        placeholderTextColor='black'
                    />
                    <TextInput
                        style={[Styles.formStyles]}
                        keyboardType='default'
                        onChangeText={(temp) => this.setState({ linkImage: temp })}
                        placeholder='Link Image'
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
                                    <Text style={[Styles.fontButton]}>ADD SUB KATEGORY</Text>
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
    }

    addData() {
        if (this.state.nameSubKat == "" || this.state.linkImage == "") {
            alert("Form cannot be empty!")
        } else {
            this.setState({
                loading: true,
                disabledBtn: true
            })
            firestore()
                .collection('SubKategory').add({
                    linkImage: this.state.linkImage,
                    nameKategory: this.state.nameKat,
                    nameSubKategory: this.state.nameSubKat,
                }).then(() => {
                    showMessage({
                        message: 'Add sub kategory success!',
                        type: "success",
                        icon: { icon: "success", position: "left" },
                        // backgroundColor: 'green',
                        // color: 'white'
                    })
                    this.setState({
                        loading: false,
                        disabledBtn: false,
                    })
                    Actions.pop()
                }).catch((error) => {
                    showMessage({
                        message: 'Add sub kategory failed!',
                        type: "danger",
                        icon: { icon: "danger", position: "left" },
                        // backgroundColor: 'green',
                        // color: 'white'
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

export default CreateSubKategoryScreen;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    formPickerStyles: {
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 5,
        marginVertical: 2.5
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
        // fontSize: 18
    }
})