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

class CreateImage extends Component {

    constructor() {
        super()
        this.state = {
            dataKat: "",
            dataSubKat: "",
            countLike: 0,
            countSet: 0,
            linkImage: "",
            nameImage: "",
            nameKat: "",
            nameSubKat: "",
            source: "",
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
                dataKat: doc.docs,
                nameKat: doc.docs[0].data().name
            })
            this.loadSubKategory(doc.docs[0].data().name)
        })
    }

    loadSubKategory(data) {
        this.setState({
            nameKat: data
        })
        firestore().collection("SubKategory").where('nameKategory', '==', data).onSnapshot(doc => {
            if (doc.docs.length == 0) {
                this.setState({
                    dataSubKat: "",
                    nameSubKat: ""
                })
            } else {
                this.setState({
                    dataSubKat: doc.docs,
                    nameSubKat: doc.docs[0].data().nameSubKategory
                })
            }
        })
    }

    loopData() {
        if (this.state.dataKat == "") {
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
                    <View style={[Styles.formPickerStyles]}>
                        <Picker
                            selectedValue={this.state.nameKat}
                            style={{ height: 50, width: 300, }}
                            onValueChange={(itemValue, itemIndex) =>
                                this.loadSubKategory(itemValue)
                            }>
                            {
                                this.state.dataKat !== ""
                                    ?
                                    this.state.dataKat.map((data) => {
                                        return (
                                            <Picker.Item label={data.data().name} value={data.data().name} />
                                        )
                                    })
                                    :
                                    <Picker.Item label="DATA KOSONG" value="DATA KOSONG" />
                            }
                        </Picker>
                    </View>

                    <View style={[Styles.formPickerStyles]}>
                        <Picker
                            selectedValue={this.state.nameSubKat}
                            style={{ height: 50, width: 300, }}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({
                                    nameSubKat: itemValue
                                })
                            }>
                            {
                                this.state.dataSubKat !== ""
                                    ?
                                    this.state.dataSubKat.map((data) => {
                                        return (
                                            <Picker.Item label={data.data().nameSubKategory} value={data.data().nameSubKategory} />
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
                        onChangeText={(temp) => this.setState({ nameImage: temp })}
                        placeholder='Name Image'
                        placeholderTextColor='black'
                    />
                    <TextInput
                        style={[Styles.formStyles]}
                        keyboardType='default'
                        onChangeText={(temp) => this.setState({ linkImage: temp })}
                        placeholder='Link Image'
                        placeholderTextColor='black'
                    />
                    <View style={[Styles.formPickerStyles]}>
                        <Picker
                            selectedValue={this.state.source}
                            style={{ height: 50, width: 300, }}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({
                                    source: itemValue
                                })
                            }>
                            <Picker.Item label={"CHOICE YOUR SOURCE"} value="CHOICE YOUR SOURCE" />
                            <Picker.Item label={"My Pictures"} value="My Pictures" />
                            <Picker.Item label={"Pinterest"} value="Pinterest" />
                            <Picker.Item label={"Pixabay"} value="Pixabay" />
                            <Picker.Item label={"Pexels"} value="Pexels" />
                            <Picker.Item label={"Freepik"} value="Freepik" />
                            <Picker.Item label={"Unplash"} value="Unplash" />
                            <Picker.Item label={"Flickr"} value="Flickr" />
                            <Picker.Item label={"FreeStocks"} value="FreeStocks" />
                        </Picker>
                    </View>
                    <View>
                        {
                            this.state.loading === false ?
                                <TouchableOpacity
                                    disabled={this.state.disabledBtn}
                                    onPress={() => this.addData()}
                                    style={[Styles.buttonActions]}
                                >
                                    <Text style={[Styles.fontButton]}>ADD IMAGE</Text>
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
        if (this.state.linkImage == "" || this.state.nameImage == "" || this.state.nameKat == "" || this.state.nameSubKat == "DATA KOSONG" || this.state.nameSubKat == "" || this.state.source == "CHOICE YOUR SOURCE" || this.state.source == "") {
            alert("Form cannot be empty!")
        } else {
            this.setState({
                loading: true,
                disabledBtn: true
            })
            firestore()
                .collection('Image').add({
                    countLike: this.state.countLike,
                    countSet: this.state.countSet,
                    link: this.state.linkImage,
                    nameImage: this.state.nameImage,
                    nameKategory: this.state.nameKat,
                    nameSubKategory: this.state.nameSubKat,
                    source: this.state.source,
                }).then(() => {
                    console.log("Success Add Data")
                    this.setState({
                        loading: false,
                        disabledBtn: false,
                    })
                    showMessage({
                        message: 'Add Image success!',
                        type: "success",
                        icon: { icon: "success", position: "left" },
                    })
                    Actions.pop()
                }).catch((error) => {
                    console.log("error Add Data", error)
                    showMessage({
                        message: 'Add Image failed!',
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

export default CreateImage;

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
    formPickerStyles: {
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 5,
        marginTop: 5
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